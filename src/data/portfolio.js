export const profile = {
  name: 'Breno Groba',
  role: 'Desenvolvedor em construção.',
  headline: 'Transformo curiosidade em soluções digitais.',
  location: 'São Paulo, Brasil',
  email: 'seuemail@email.com',
  github: 'https://github.com/bren0groba',
  linkedin: 'https://www.linkedin.com/in/brenogroba/',
  availability: 'Aberto a oportunidades',
  about: 'Sou estudante de Ciência da Computação na FECAP e gosto de entender como as coisas funcionam — da interface ao que acontece por trás dela. Minha trajetória combina desenvolvimento de projetos acadêmicos, suporte técnico e muita vontade de aprender na prática.',
};

export const skills = [
  { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { group: 'Backend & dados', items: ['C#', '.NET / ASP.NET', 'Node.js', 'SQL', 'MySQL'] },
  { group: 'Ferramentas', items: ['Git', 'GitHub', 'Azure DevOps', 'Power BI', 'AWS'] },
];

export const projects = [
  {
    id: 'greenbyte', title: 'GreenByte', category: 'Games', year: '2025',
    description: 'Jogo educativo desenvolvido em Unity sobre gestão de recursos de uma cidade inteligente. O jogador administra água e energia, toma decisões e acompanha o impacto para os moradores.',
    stack: ['C#', 'Unity', 'Game Design'], accent: 'green', status: 'Projeto acadêmico',
    details: 'O projeto simula uma cidade com 32 residências e diferentes perfis de consumo. A proposta é transformar conceitos de sustentabilidade em decisões práticas dentro do jogo.',
    link: 'https://github.com/bren0groba'
  },
  {
    id: 'liderancas', title: 'Lideranças Empáticas', category: 'Web', year: '2025',
    description: 'Aplicação web com interface em React e uma API construída com Node.js e Express, conectada a um banco MySQL.',
    stack: ['React', 'CSS', 'Node.js', 'Express', 'MySQL'], accent: 'purple', status: 'Projeto acadêmico',
    details: 'Projeto full stack desenvolvido em equipe, com foco na organização das informações e na construção de uma experiência simples para o usuário.',
    link: 'https://github.com/bren0groba'
  },
  {
    id: 'rpg-clinic', title: 'RPG Clinic', category: 'Mobile', year: '2026',
    description: 'Aplicativo Android desenvolvido em Java para apoiar um fluxo de atendimento em uma clínica temática de RPG.',
    stack: ['Java', 'Android'], accent: 'blue', status: 'Projeto acadêmico',
    details: 'Experimento de desenvolvimento mobile que explora navegação entre telas, organização de dados e construção de uma aplicação Android.',
    link: 'https://github.com/bren0groba'
  },
  {
    id: 'portfolio', title: 'Developer Portfolio', category: 'Web', year: '2026',
    description: 'Este próprio portfólio: uma experiência responsiva, interativa e construída com React, CSS modular por página e dados mockados.',
    stack: ['React', 'Vite', 'CSS'], accent: 'orange', status: 'Em desenvolvimento',
    details: 'A estrutura foi pensada para evoluir: os dados estão separados da interface e podem futuramente ser conectados a um CMS ou backend.',
    link: 'https://github.com/bren0groba'
  }
];

export const experience = [
  {
    period: '2026 — atual', role: 'Analista de Suporte Jr.', company: 'Stoque',
    description: 'Atuação no suporte a soluções de gestão documental, análise de incidentes e apoio a integrações e configurações de ambientes.',
    tags: ['Suporte', 'Análise de incidentes', 'Integrações']
  },
  {
    period: '2025 — 2026', role: 'Assistente de TI', company: 'Uflow',
    description: 'Suporte N1/N2, administração de usuários e permissões no Active Directory, diagnóstico de redes, hardware, software e apoio ao ERP TOTVS Protheus.',
    tags: ['N1/N2', 'Active Directory', 'TOTVS Protheus']
  }
];

export const education = [
  { period: 'Em andamento', title: 'Ciência da Computação', place: 'FECAP' },
  { period: 'Concluído', title: 'Técnico em Informática', place: 'FECAP' }
];
// Dados de exemplo: substitua pelos cursos reais antes de publicar.
// Não representam certificações obtidas.
export const courses = [
  { id: 'react', title: 'React e desenvolvimento de interfaces', category: 'Frontend', platform: 'Estudos independentes', status: 'Em estudo', stage: 'Trilha prática', description: 'Componentes, hooks, acessibilidade e interfaces responsivas.' },
  { id: 'dotnet', title: 'ASP.NET e aplicações web', category: 'Backend', platform: 'Cursos online', status: 'Em estudo', stage: 'Projetos e exercícios', description: 'Desenvolvimento web com C#, APIs REST e padrões de organização.' },
  { id: 'aws', title: 'Fundamentos de computação em nuvem', category: 'Cloud', platform: 'AWS Skill Builder', status: 'Em estudo', stage: 'Fundamentos', description: 'Serviços de nuvem, arquitetura, segurança e conceitos essenciais.' },
  { id: 'sql', title: 'SQL e análise de dados', category: 'Dados', platform: 'Estudos independentes', status: 'Em estudo', stage: 'Exercícios práticos', description: 'Consultas, relacionamentos, modelagem e manipulação de dados.' }
];
