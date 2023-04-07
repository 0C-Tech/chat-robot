export interface ChatMessage {
  isRobot: boolean;
  content: string;
}

export interface ChatGPTResponse {
  id?: string;
  created?: number;
  choices: {
    message: {
      role?: string;
      content: string;
    }
  }[];
}
