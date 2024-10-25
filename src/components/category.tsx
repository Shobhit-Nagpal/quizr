import React from "react";
import { Badge } from "./ui/badge";

interface CategoryProps {
  category: string;
}

export function Category({ category }: CategoryProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Badge variant="outline" className="text-sm">
        {category}
      </Badge>
    </div>
  );
}
