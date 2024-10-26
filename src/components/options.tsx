import { ImageOption, TQuestion } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptionsProps {
  type: TQuestion["type"];
  options: (string | ImageOption)[];
  selectedAnswer: string | ImageOption | null;
  onSelect: (answer: string | ImageOption) => void;
  correctAnswer: string | ImageOption;
}

export function Options({
  type,
  options,
  selectedAnswer,
  onSelect,
  correctAnswer,
}: OptionsProps) {
  return (
    <div className="grid gap-4">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className={cn(
            "w-full text-left justify-start h-auto py-3 px-4 hover:bg-inherit",
            "whitespace-normal break-words min-h-[60px]",
            "touch-none select-none",
            selectedAnswer &&
              option === correctAnswer &&
              "bg-green-500 hover:bg-green-500",
            selectedAnswer === option &&
              option !== correctAnswer &&
              "bg-red-500 hover:bg-red-500",
          )}
          onClick={() => onSelect(option)}
          disabled={selectedAnswer !== null}
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
