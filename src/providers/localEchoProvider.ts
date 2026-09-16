import type { ChatMessage } from '../types';
import type { ChatProvider } from './types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function styleFor(model: string, fallback: string): 'concise' | 'balanced' | 'detailed' {
  if (model.includes('concise')) {
    return 'concise';
  }
  if (model.includes('detailed')) {
    return 'detailed';
  }
  if (fallback === 'concise' || fallback === 'detailed') {
    return fallback;
  }
  return 'balanced';
}

/**
 * A working offline provider. It never touches the network, so the app is fully
 * usable with zero API keys — useful for demos and for exercising the UI.
 */
export const localEchoProvider: ChatProvider = {
  id: 'local',
  label: 'Local (offline)',
  description: 'Runs entirely on device with no API key. Ideal for trying the app out.',
  models: ['local-concise', 'local-balanced', 'local-detailed'],
  requiresKey: false,
  isReady: () => true,

  async send({ messages, settings }) {
    await delay(600);

    const userMessages: ChatMessage[] = messages.filter((m) => m.role === 'user');
    const lastUser = userMessages[userMessages.length - 1]?.content.trim() ?? '';
    const wordCount = lastUser.split(/\s+/).filter(Boolean).length;
    const style = styleFor(settings.model, settings.responseStyle);
    const plural = wordCount === 1 ? '' : 's';
    const lines: string[] = [];

    if (style === 'concise') {
      lines.push(`Short answer: that is ${wordCount} word${plural} of input.`);
      lines.push('Connect a model provider in Settings to get a real reply.');
    } else if (style === 'detailed') {
      lines.push('Here is a structured take on your message:');
      lines.push('');
      lines.push(`1. You wrote: "${lastUser}"`);
      lines.push(`2. Input length: ${wordCount} word${plural}.`);
      lines.push(`3. Conversation turns so far: ${userMessages.length}.`);
      lines.push(`4. Response style: ${settings.responseStyle}.`);
      lines.push(`5. History is ${settings.includeHistory ? 'included in' : 'excluded from'} the request.`);
      lines.push('');
      lines.push('This is the offline provider, so no network request was made.');
    } else {
      lines.push(`Got it — "${lastUser}"`);
      lines.push('');
      lines.push(`That is ${wordCount} word${plural}, turn ${userMessages.length} in this conversation.`);
      lines.push('You are on the offline provider, so nothing was sent over the network.');
      lines.push('Open Settings to connect a real model.');
    }

    if (settings.systemPrompt.trim().length > 0) {
      lines.push('');
      lines.push(`System prompt in effect: "${settings.systemPrompt.trim()}"`);
    }

    return lines.join('\n');
  },
};
