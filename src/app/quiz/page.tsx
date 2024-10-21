"use client";

import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from "@/utils/api";
import { TQuestion } from "@/types";
import { Loader2 } from "lucide-react";
import { Question } from "@/components/question";

export default function QuizPage() {
  const [questions, setQuestions] = useState<TQuestion[] | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
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
    if (timer === 0) {
      setTimer(30);
    }
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimer]);

  const options = useMemo(() => {
    if (!questions) return [];
    return [
      questions[currentQuestionIdx].correctAnswer,
      ...questions[currentQuestionIdx].incorrectAnswers,
    ].sort(() => Math.random() - 0.5);
  }, [questions, currentQuestionIdx]);

  if (!questions) {
    return <Loader2 className="animate-spin" />;
  }

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Question
        currentQuestion={currentQuestion}
        timer={timer}
        options={options}
      />
    </div>
  );
}
