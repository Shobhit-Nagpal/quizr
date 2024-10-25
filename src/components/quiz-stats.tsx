import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Circle } from "lucide-react";

interface QuizStatsProps {
  totalPoints: number;
  currentRound: number;
}

export function QuizStats({ totalPoints, currentRound }: QuizStatsProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Star className="h-6 w-6 text-yellow-500" />
            <div className="text-center">
              <div className="text-3xl font-bold">{totalPoints}</div>
              <div className="text-sm text-gray-500">points</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Circle className="h-4 w-4 text-blue-500" />
            <div className="text-center">
              <div className="text-lg font-semibold">Round {currentRound}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
