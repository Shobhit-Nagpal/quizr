export interface ImageOption {
  url: string;
  height: number;
  width: number;
  size: number;
  author: {
    name: string;
    url: string;
  };
  source: {
    url: string;
  };
  description: string;
  license: {
    url: string;
    name: string;
  };
}

export interface Question {
  category: string;
  id: string;
  tags: string[];
  difficulty: string;
  regions: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  correctAnswer: ImageOption | string;
  incorrectAnswers: ImageOption[] | string[];
  type: "image_choice" | "text_choice";
}
