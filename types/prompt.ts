import { OpenAIModel } from './openai';

export interface Prompt {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  model: OpenAIModel;
  folderId: string | null;
}
