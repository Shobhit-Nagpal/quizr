import { ImageOption, Question } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface OptionsProps {
  type: Question["type"];
  options: (string | ImageOption)[];
  selectedAnswer: string | ImageOption | null;
  onSelect: (answer: string | ImageOption) => void;
  timer: number;
}

export function Options({
  type,
  options,
  selectedAnswer,
  timer,
  onSelect,
}: OptionsProps) {
  return (
    <div className="grid gap-4">
      {options.map((option, index) => (
        <Button
          key={index}
          variant={selectedAnswer === option ? "default" : "outline"}
          className="w-full text-left justify-start h-auto py-3 px-4"
          onClick={() => onSelect(option)}
          disabled={selectedAnswer !== null || timer === 0}
        >
          {type === "text_choice" ? (
            <p>{option as string}</p>
          ) : (
            <Image
              width={300}
              height={300}
              src={(option as ImageOption).url}
              alt={`Option ${index + 1}`}
            />
          )}
        </Button>
      ))}
    </div>
  );
}
