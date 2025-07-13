export interface OutfitRequestPayload {
  occasionType: string;
  timeOfEvent: string;
  seasonWeather: string;
  preferredStyle: string;
  // Add other required fields as needed
}

export interface OutfitItem {
  id: string;
  accessoriesAndFootwear: string;
  outfitSummary: string;
  promptForAIImageGeneration: string;
  price?: string;
  store?: string;
  // Add other fields from the API response as needed
}

export interface OutfitResponse {
  outfits: OutfitItem[];
  // Add other fields from the API response as needed
}
