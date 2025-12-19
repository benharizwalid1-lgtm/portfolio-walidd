import { Personality } from '@/contexts/PersonalityContext';
import { routeToAgent, AgentResult } from '@/lib/agents';

export const getAIResponse = (question: string, personality: Personality): AgentResult => {
  return routeToAgent(question, personality);
};

export const getSuggestedQuestions = (personality: Personality): string[] => {
  if (personality === 'serious') {
    return [
      'Qui est Walid ?',
      'Quels projets a-t-il réalisés ?',
      'Quelles sont ses compétences techniques ?',
      'Pourquoi serait-il un bon choix pour une équipe ?',
      "Quelle est sa méthode de travail ?"
    ];
  } else {
    return [
      "Hey, c'est qui Walid ?",
      'Raconte-moi ses projets !',
      'Quels sont ses super-pouvoirs ?',
      'Pourquoi je devrais bosser avec lui ?',
      'Comment il travaille au quotidien ?'
    ];
  }
};
