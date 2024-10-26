import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "./category";
import { Tags } from "./tags";
import { Options } from "./options";
import { ImageOption, TQuestion } from "@/types";

interface QuestionProps {
  currentQuestion: TQuestion;
  options: (string | ImageOption)[];
  onNextQuestion: () => void;
  setTotalPoints: Dispatch<SetStateAction<number>>;
}

export function Question({
  currentQuestion,
  options,
  onNextQuestion,
  setTotalPoints,
}: QuestionProps) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | ImageOption | null
  >(null);
  const handleAnswerSelect = (answer: string | ImageOption) => {
    setSelectedAnswer(answer);
    const isCorrect =
      JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer);

    setIsCorrect(isCorrect);

    if (isCorrect) setTotalPoints((prev) => prev + 1);

    setTimeout(() => {
      setIsCorrect(null);
      setSelectedAnswer(null);
      onNextQuestion();
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Category category={currentQuestion.category.split("_").join(" ")} />
        <CardTitle className="text-2xl font-bold">
          {currentQuestion.question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Options
          type={currentQuestion.type}
          options={options}
          selectedAnswer={selectedAnswer}
          correctAnswer={currentQuestion.correctAnswer}
          onSelect={handleAnswerSelect}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {selectedAnswer && (
          <p
            className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}
          >
            {isCorrect
              ? "Correct!"
              : `The correct answer is ${currentQuestion.correctAnswer}.`}
          </p>
        )}
        <Tags tags={currentQuestion.tags} />
      </CardFooter>
    </Card>
  );
}
