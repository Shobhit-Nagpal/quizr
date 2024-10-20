"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const quizData = {
  category: "music",
  id: "5f9f1b9b0e1b9c0017a5f1a5",
  tags: ["france", "geography", "capital_cities", "cities"],
  difficulty: "easy",
  regions: ["string"],
  isNiche: true,
  question: {
    text: "What is the capital of France?"
  },
  correctAnswer: "Paris",
  incorrectAnswers: ["London", "Berlin", "Brussels"],
  type: "text_choice"
}

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timer, setTimer] = useState(30)

  const allAnswers = [quizData.correctAnswer, ...quizData.incorrectAnswers].sort(() => Math.random() - 0.5)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setIsCorrect(answer === quizData.correctAnswer)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-sm">
              {quizData.category}
            </Badge>
            <span className="text-2xl font-bold">{timer}s</span>
          </div>
          <CardTitle className="text-2xl font-bold">{quizData.question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {allAnswers.map((answer, index) => (
              <Button
                key={index}
                variant={selectedAnswer === answer ? "default" : "outline"}
                className="w-full text-left justify-start h-auto py-3 px-4"
                onClick={() => handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null || timer === 0}
              >
                {answer}
              </Button>
            ))}
          </div>
        </CardContent>
        {(selectedAnswer || timer === 0) && (
          <CardFooter className="flex flex-col items-start">
            <p className={`text-lg font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
              {isCorrect ? "Correct!" : `Incorrect. The correct answer is ${quizData.correctAnswer}.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quizData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
