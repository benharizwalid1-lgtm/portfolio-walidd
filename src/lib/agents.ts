import knowledge from '@/data/knowledge.json';
import { Personality } from '@/contexts/PersonalityContext';

export type AgentName = 'Greeter' | 'Bio' | 'Projects' | 'Skills' | 'ValueProp' | 'WorkStyle' | 'Contact' | 'Values' | 'Fallback';

export interface AgentResult {
  agent: AgentName;
  content: string;
}

// Each agent is a small, focused function that returns a response string
const greeterAgent = (personality: Personality): AgentResult => ({
  agent: 'Greeter',
  content: knowledge.responses.greeting[personality],
});

const bioAgent = (personality: Personality): AgentResult => ({
  agent: 'Bio',
  content: knowledge.bio[personality],
});

const projectsAgent = (personality: Personality): AgentResult => {
  const intro = personality === 'serious'
    ? 'Walid a travaillé sur plusieurs projets significatifs :\n\n'
    : 'Ah, les projets de Walid ! Chacun raconte une histoire :\n\n';
  const list = knowledge.projects.map(p => `• **${p.title}**: ${p[personality]}`).join('\n\n');
  return { agent: 'Projects', content: intro + list };
};

const skillsAgent = (personality: Personality): AgentResult => {
  const intro = personality === 'serious'
    ? 'Voici les principales compétences techniques de Walid :\n\n'
    : 'Les super-pouvoirs de Walid ? Les voici :\n\n';
  const list = knowledge.skills.map(s => `• **${s.name}** (${s.category}): ${s[personality]}`).join('\n\n');
  return { agent: 'Skills', content: intro + list };
};

const valuePropAgent = (personality: Personality): AgentResult => {
  if (personality === 'serious') {
    return {
      agent: 'ValueProp',
      content: `Walid apporte une valeur significative à une équipe grâce à :\n\n• **Rigueur technique** : Code propre, maintenable et documenté\n• **Adaptabilité** : Capacité à apprendre rapidement de nouvelles technologies\n• **Esprit d'équipe** : Communication claire et collaboration efficace\n• **Vision produit** : Compréhension des besoins utilisateurs et métier\n\n${knowledge.bio.serious}`,
    };
  }
  return {
    agent: 'ValueProp',
    content: `Pourquoi Walid ? Parce que les bons développeurs sont comme les bons cafés : rares et précieux !\n\n• Il transforme les idées floues en solutions concrètes\n• Il pose les bonnes questions avant de coder\n• Il aime autant casser les problèmes que les résoudre\n• Il croit que le code est un langage qui mérite d'être bien écrit\n\n${knowledge.bio.playful}`,
  };
};

const workStyleAgent = (personality: Personality): AgentResult => {
  if (personality === 'serious') {
    return {
      agent: 'WorkStyle',
      content: `L'approche de travail de Walid :\n\n1. **Analyse** : Comprendre le besoin avant de coder\n2. **Planification** : Structurer le travail en tâches claires\n3. **Développement itératif** : Livrer des incréments fonctionnels\n4. **Tests** : Valider chaque fonctionnalité\n5. **Documentation** : Assurer la maintenabilité du code`,
    };
  }
  return {
    agent: 'WorkStyle',
    content: `Comment Walid travaille ? Imagine un chef qui goûte son plat à chaque étape :\n\n1. D'abord, comprendre le "pourquoi" (sinon on code dans le vide)\n2. Ensuite, dessiner le plan (même mental, ça compte)\n3. Puis coder par petits bouts qu'on peut montrer\n4. Tester comme si un enfant de 5 ans allait cliquer partout\n5. Documenter pour le Walid du futur (il te remerciera)`,
  };
};

const contactAgent = (personality: Personality): AgentResult => {
  if (personality === 'serious') {
    return {
      agent: 'Contact',
      content: `Vous pouvez contacter Walid via :\n\n• **Email** : ${knowledge.profile.email}\n• **LinkedIn** : ${knowledge.profile.linkedin}\n• **GitHub** : ${knowledge.profile.github}\n\nN'hésitez pas à le contacter pour discuter d'opportunités professionnelles.`,
    };
  }
  return {
    agent: 'Contact',
    content: `Envie de papoter avec Walid ? Il est partout (ou presque) :\n\n📧 Email : ${knowledge.profile.email}\n💼 LinkedIn : ${knowledge.profile.linkedin}\n🐙 GitHub : ${knowledge.profile.github}\n\nIl répond généralement vite... sauf s'il est en plein debug. Là, patience !`,
  };
};

const valuesAgent = (personality: Personality): AgentResult => {
  const intro = personality === 'serious'
    ? 'Les valeurs professionnelles de Walid :\n\n'
    : 'Ce qui fait vibrer Walid au quotidien :\n\n';
  const list = knowledge.values.map(v => `• **${v.name}** : ${v[personality]}`).join('\n\n');
  return { agent: 'Values', content: intro + list };
};

const fallbackAgent = (personality: Personality): AgentResult => ({
  agent: 'Fallback',
  content: knowledge.responses.unknown[personality],
});

// Router: maps question to an agent
export const routeToAgent = (question: string, personality: Personality): AgentResult => {
  const q = question.toLowerCase();

  if (/(bonjour|salut|hello|hey)/.test(q)) return greeterAgent(personality);
  if (/(qui est|qui es|présente|parle-moi de)/.test(q)) return bioAgent(personality);
  if (/(projet|réalisation|portfolio|travail)/.test(q)) return projectsAgent(personality);
  if (/(compétence|skill|technologie|sait faire)/.test(q)) return skillsAgent(personality);
  if (/(pourquoi|embaucher|recruter|équipe|valeur)/.test(q)) return valuePropAgent(personality);
  if (/(méthode|travaill|approche|process)/.test(q)) return workStyleAgent(personality);
  if (/(contact|joindre|email|linkedin)/.test(q)) return contactAgent(personality);
  if (/(valeur|motivation|croit|important)/.test(q)) return valuesAgent(personality);

  return fallbackAgent(personality);
};
