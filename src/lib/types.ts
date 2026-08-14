export interface Artwork {
  id: string;
  title: string;
  artist: string;
  modelId: string;
  branchName: string;
  year: string;
  medium: string;
  description: string;
  prompt: string;
  imagePath: string;
  palette: string[];
}

export type Tab = "gallery" | "critic" | "methodology";

export interface ModelConfig {
  modelId: string;
  branchName: string;
  displayName: string;
  subject: string;
  prompt: string;
}
