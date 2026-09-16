import type { AppSettings, ChatMessage } from '../types';

export interface ChatRequest {
  messages: ChatMessage[];
  settings: AppSettings;
}

/**
 * Every AI backend implements this interface. The app never talks to a network
 * directly — it asks the active provider for an assistant reply.
 */
export interface ChatProvider {
  id: string;
  label: string;
  description: string;
  models: string[];
  requiresKey: boolean;
  isReady: () => boolean;
  send: (request: ChatRequest) => Promise<string>;
}
