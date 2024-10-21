import React from "react";
import { Badge } from "./ui/badge";

interface CategoryProps {
  category: string;
  timer: number;
}

export function Category({ category, timer }: CategoryProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Badge variant="outline" className="text-sm">
        {category}
      </Badge>
      <span className="text-2xl font-bold">{timer}s</span>
    </div>
  );
}
