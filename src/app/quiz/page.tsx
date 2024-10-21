"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/utils/api";
import { ImageOption, Question } from "@/types";
import { Loader2 } from "lucide-react";
import { Category } from "@/components/category";
import { Tags } from "@/components/tags";
import { Options } from "@/components/options";

export default function QuizPage() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | ImageOption | null
  >(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(`${BASE_URL}/questions`);
      const questions = await res.json();
      setQuestions(questions);
      setCurrentQuestionIdx(0);
    }

    getQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = (answer: string | ImageOption) => {
    setSelectedAnswer(answer);
    const isCorrect =
      JSON.stringify(answer) ===
      JSON.stringify(questions![currentQuestionIdx].correctAnswer);

    setIsCorrect(isCorrect);
    if (isCorrect) setTotalPoints((prev) => prev + 1);
    setTimeout(() => {
      setCurrentQuestionIdx((prev) =>
        prev === questions!.length - 1 ? 0 : prev + 1,
      );
      setSelectedAnswer(null);
      setTimer(30);
    }, 2000);
  };

  const allAnswers = useMemo(() => {
    if (!questions) return [];
    return [
      questions[currentQuestionIdx].correctAnswer,
      ...questions[currentQuestionIdx].incorrectAnswers,
    ].sort(() => Math.random() - 0.5);
  }, [questions, currentQuestionIdx]);

  if (!questions) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          {totalPoints}
          <Category
            category={questions[currentQuestionIdx].category
              .split("_")
              .join(" ")}
            timer={timer}
          />
          <CardTitle className="text-2xl font-bold">
            {questions[currentQuestionIdx].question.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Options
            type={questions[currentQuestionIdx].type}
            options={allAnswers}
            selectedAnswer={selectedAnswer}
            onSelect={handleAnswerSelect}
            timer={timer}
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          {(selectedAnswer || timer === 0) && (
            <p
              className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}
            >
              {isCorrect
                ? "Correct!"
                : `Incorrect. The correct answer is ${questions[currentQuestionIdx].correctAnswer}.`}
            </p>
          )}
          <Tags tags={questions[currentQuestionIdx].tags} />
        </CardFooter>
      </Card>
    </div>
  );
}
