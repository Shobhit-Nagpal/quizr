"use client";

import { useState, useEffect, useMemo } from "react";
import { BASE_URL } from "@/utils/api";
import { TQuestion } from "@/types";
import { Loader2 } from "lucide-react";
import { Question } from "@/components/question";
import { QuizStats } from "@/components/quiz-stats";

export default function QuizPage() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [questions, setQuestions] = useState<TQuestion[] | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [timer, setTimer] = useState(30);

  async function getQuestions() {
    const res = await fetch(`${BASE_URL}/questions`);
    const questions = await res.json();
    setQuestions((prev) => {
      if (prev === null) {
        return questions;
      } else {
        return [...prev, ...questions];
      }
    });
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIdx((prev) =>
      prev === questions!.length - 1 ? 0 : prev + 1,
    );
    setTimer(30);
  };

  const handleNextRound = () => {
    setCurrentRound((prev) => prev + 1);
  };

  useEffect(() => {
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

  useEffect(() => {
    if (!questions) return;

    if (currentQuestionIdx === questions.length - 6) {
      getQuestions();
    }

    if (currentQuestionIdx % 10 === 0) {
      handleNextRound();
    }
  }, [currentQuestionIdx, questions]);

  const options = useMemo(() => {
    if (!questions) return [];

    const array = [
      questions[currentQuestionIdx].correctAnswer,
      ...questions[currentQuestionIdx].incorrectAnswers,
    ];

    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }

    return array;
  }, [questions, currentQuestionIdx]);

  if (!questions) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIdx];

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-background p-4">
      <QuizStats totalPoints={totalPoints} currentRound={currentRound} />
      <Question
        currentQuestion={currentQuestion}
        timer={timer}
        options={options}
        onNextQuestion={handleNextQuestion}
        setTotalPoints={setTotalPoints}
      />
    </div>
  );
}
