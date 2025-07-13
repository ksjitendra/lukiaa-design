export type OutfitDataType = {
  id: string;
  heading: string;
  title: string;
  description: string;
  image: string;
  ai_score: number;
  CompleteLookData: {
    image: string;
    title: string;
    price: string;
    store: string;
  }[];
};

export type SkintoneOption = {
  value: number;
  color: string;
  type: string;
};

export type SkinundertoneOption = {
  id: string;
  title: string;
  subtitle: string;
};
