import knowledge from '@/data/knowledge.json';
import { Personality } from '@/contexts/PersonalityContext';

export const getAIResponse = (question: string, personality: Personality): string => {
  const q = question.toLowerCase();
  
  // Greeting patterns
  if (q.includes('bonjour') || q.includes('salut') || q.includes('hello') || q.includes('hey')) {
    return knowledge.responses.greeting[personality];
  }

  // Who is Walid
  if (q.includes('qui est') || q.includes('qui es') || q.includes('présente') || q.includes('parle-moi de')) {
    return knowledge.bio[personality];
  }

  // Projects
  if (q.includes('projet') || q.includes('réalisation') || q.includes('portfolio') || q.includes('travail')) {
    const projectIntro = personality === 'serious'
      ? "Walid a travaillé sur plusieurs projets significatifs :\n\n"
      : "Ah, les projets de Walid ! Chacun raconte une histoire :\n\n";
    
    const projectsList = knowledge.projects.map(p => 
      `• **${p.title}**: ${p[personality]}`
    ).join('\n\n');
    
    return projectIntro + projectsList;
  }

  // Skills
  if (q.includes('compétence') || q.includes('skill') || q.includes('technologie') || q.includes('sait faire')) {
    const skillIntro = personality === 'serious'
      ? "Voici les principales compétences techniques de Walid :\n\n"
      : "Les super-pouvoirs de Walid ? Les voici :\n\n";
    
    const skillsList = knowledge.skills.map(s => 
      `• **${s.name}** (${s.category}): ${s[personality]}`
    ).join('\n\n');
    
    return skillIntro + skillsList;
  }

  // Why hire / value
  if (q.includes('pourquoi') || q.includes('embaucher') || q.includes('recruter') || q.includes('équipe') || q.includes('valeur')) {
    if (personality === 'serious') {
      return `Walid apporte une valeur significative à une équipe grâce à :

• **Rigueur technique** : Code propre, maintenable et documenté
• **Adaptabilité** : Capacité à apprendre rapidement de nouvelles technologies
• **Esprit d'équipe** : Communication claire et collaboration efficace
• **Vision produit** : Compréhension des besoins utilisateurs et métier

${knowledge.bio.serious}`;
    } else {
      return `Pourquoi Walid ? Parce que les bons développeurs sont comme les bons cafés : rares et précieux !

• Il transforme les idées floues en solutions concrètes
• Il pose les bonnes questions avant de coder
• Il aime autant casser les problèmes que les résoudre
• Il croit que le code est un langage qui mérite d'être bien écrit

${knowledge.bio.playful}`;
    }
  }

  // Work style / method
  if (q.includes('méthode') || q.includes('travaill') || q.includes('approche') || q.includes('process')) {
    if (personality === 'serious') {
      return `L'approche de travail de Walid :

1. **Analyse** : Comprendre le besoin avant de coder
2. **Planification** : Structurer le travail en tâches claires
3. **Développement itératif** : Livrer des incréments fonctionnels
4. **Tests** : Valider chaque fonctionnalité
5. **Documentation** : Assurer la maintenabilité du code`;
    } else {
      return `Comment Walid travaille ? Imagine un chef qui goûte son plat à chaque étape :

1. D'abord, comprendre le "pourquoi" (sinon on code dans le vide)
2. Ensuite, dessiner le plan (même mental, ça compte)
3. Puis coder par petits bouts qu'on peut montrer
4. Tester comme si un enfant de 5 ans allait cliquer partout
5. Documenter pour le Walid du futur (il te remerciera)`;
    }
  }

  // Contact
  if (q.includes('contact') || q.includes('joindre') || q.includes('email') || q.includes('linkedin')) {
    if (personality === 'serious') {
      return `Vous pouvez contacter Walid via :

• **Email** : ${knowledge.profile.email}
• **LinkedIn** : ${knowledge.profile.linkedin}
• **GitHub** : ${knowledge.profile.github}

N'hésitez pas à le contacter pour discuter d'opportunités professionnelles.`;
    } else {
      return `Envie de papoter avec Walid ? Il est partout (ou presque) :

📧 Email : ${knowledge.profile.email}
💼 LinkedIn : ${knowledge.profile.linkedin}
🐙 GitHub : ${knowledge.profile.github}

Il répond généralement vite... sauf s'il est en plein debug. Là, patience !`;
    }
  }

  // Values
  if (q.includes('valeur') || q.includes('motivation') || q.includes('croit') || q.includes('important')) {
    const valuesIntro = personality === 'serious'
      ? "Les valeurs professionnelles de Walid :\n\n"
      : "Ce qui fait vibrer Walid au quotidien :\n\n";
    
    const valuesList = knowledge.values.map(v => 
      `• **${v.name}** : ${v[personality]}`
    ).join('\n\n');
    
    return valuesIntro + valuesList;
  }

  // Default response
  return knowledge.responses.unknown[personality];
};

export const getSuggestedQuestions = (personality: Personality): string[] => {
  if (personality === 'serious') {
    return [
      "Qui est Walid ?",
      "Quels projets a-t-il réalisés ?",
      "Quelles sont ses compétences techniques ?",
      "Pourquoi serait-il un bon choix pour une équipe ?",
      "Quelle est sa méthode de travail ?"
    ];
  } else {
    return [
      "Hey, c'est qui Walid ?",
      "Raconte-moi ses projets !",
      "Quels sont ses super-pouvoirs ?",
      "Pourquoi je devrais bosser avec lui ?",
      "Comment il travaille au quotidien ?"
    ];
  }
};
