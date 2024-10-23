import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface QuizStatsProps {
  totalPoints: number;
}

export function QuizStats({ totalPoints }: QuizStatsProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center space-x-4">
          <Star className="h-6 w-6 text-yellow-500" />
          <div className="text-center">
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm text-gray-500">points</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
