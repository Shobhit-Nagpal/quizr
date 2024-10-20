interface ImageOption {
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
  }
}

export interface TextQuestion {
  category: string;
  id: string;
  tags: string[];
  difficulty: string;
  regions: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
  type: "text_choice";
}

export interface ImageQuestion {
  category: string;
  id: string;
  tags: string[];
  difficulty: string;
  regions: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  correctAnswer: ImageOption;
  incorrectAnswers: ImageOption[];
  type: "image_choice";
}
