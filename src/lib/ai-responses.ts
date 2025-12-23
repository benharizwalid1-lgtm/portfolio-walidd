import { Personality } from '@/contexts/PersonalityContext';
import { routeToAgent, AgentResult } from '@/lib/agents';

export const getAIResponse = (question: string, personality: Personality): AgentResult => {
  return routeToAgent(question, personality);
};

import aiKnowledge from '@/data/ai-knowledge.json';

export const getSuggestedQuestions = (personality: Personality): string[] => {
  // Return a mix of questions from different languages to show off capabilities
  const suggestions = aiKnowledge.translations.suggestions;
  const languages = ['fr', 'en', 'tn', 'de', 'it', 'es'];

  // Pick one from each language (or random ones)
  const mixedQuestions = [
    suggestions.fr[0], // French
    suggestions.tn[0], // Tunisian
    suggestions.en[0], // English
    suggestions.de[0], // German
    suggestions.es[0], // Spanish
  ];

  // Shuffle array using Fisher-Yates (simple version)
  return mixedQuestions.sort(() => Math.random() - 0.5);
};
