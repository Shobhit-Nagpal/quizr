import React from "react";
import { Badge } from "./ui/badge";

interface TagsProps {
  tags: string[];
}

export function Tags({ tags }: TagsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag.split("_").join(" ")}
        </Badge>
      ))}
    </div>
  );
}
