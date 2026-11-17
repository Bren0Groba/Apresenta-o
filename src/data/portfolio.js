// Conteúdo baseado no dossiê de 16/11/2026. Revise pendências antes de publicar.
export const profile = {
  name: 'Breno Groba de Azevedo',
  role: 'Estudante de Ciência da Computação | Desenvolvimento e Dados',
  headline: 'Python • SQL • APIs • Power BI | Interesse em Engenharia de Dados',
  location: 'São Paulo, SP, Brasil',
  email: 'brenogroba@gmail.com',
  phone: '+55 (11) 97069-1099',
  website: 'https://brenogroba.com.br',
  github: 'https://github.com/Bren0Groba',
  linkedin: 'https://www.linkedin.com/in/brenogroba/',
  instagram: 'https://www.instagram.com/brenogroba/',
  availability: 'Aberto a oportunidades de estágio em Dados e Tecnologia',
  about: 'Sou estudante de Ciência da Computação na FECAP e formado como Técnico em Informática. Atuo com suporte e sustentação de sistemas corporativos, investigação de incidentes, integrações, APIs REST e estruturas JSON. Também desenvolvo projetos de software, bancos de dados e análise de dados. Tenho especial interesse em Engenharia de Dados e em soluções que conectem tecnologia a problemas reais.'
};

export const skills = [
  { group: 'Dados & BI', items: ['Python', 'SQL', 'SQL Server', 'MySQL', 'MongoDB', 'Pandas', 'Matplotlib', 'Power BI', 'Excel', 'Análise estatística'] },
  { group: 'IA & engenharia de dados (estudos)', items: ['IA generativa', 'Claude', 'Agentes LLM / MCP (conceitos)', 'PySpark (conhecimento a validar)', 'Normalização e tratamento de dados (estudos)'] },
  { group: 'Back-end & integrações', items: ['Node.js', 'Express', 'APIs REST', 'HTTP', 'JSON', 'C#', 'ASP.NET / .NET (estudos)', 'Entity Framework / LINQ (estudos)'] },
  { group: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Figma'] },
  { group: 'Infraestrutura & ferramentas', items: ['Git / GitHub', 'Microsoft 365', 'Active Directory', 'Windows Server', 'Windows / Linux', 'Redes TCP/IP', 'TOTVS Protheus', 'Visual Studio / VS Code', 'AWS (fundamentos)', 'Automation Anywhere / RPA'] },
  { group: 'Outras linguagens estudadas', items: ['Java', 'C++ (Arduino)', 'Kotlin', 'Visual Basic'] }
];

export const projects = [
  { id: 'cti', title: 'Dashboard CTI', category: 'Dados', year: '—', description: 'Dashboard para organização, manipulação e visualização de indicadores com Python, Pandas e Matplotlib.', stack: ['Python', 'Pandas', 'Matplotlib', 'Visualização de dados'], accent: 'blue', status: 'Projeto de dados · link a confirmar', details: 'Projeto priorizado no dossiê para demonstrar competências de análise e visualização de dados. Link e imagens do projeto ainda precisam ser confirmados.', link: null },
  { id: 'planify', title: 'Planify', category: 'Web', year: '—', description: 'Aplicação de organização de tarefas, projetos e documentos com Node.js, Express e MongoDB Atlas.', stack: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'JWT'], accent: 'purple', status: 'Projeto pessoal · publicação a confirmar', details: 'Inclui autenticação JWT, recuperação de senha e editor Quill. É necessário confirmar quais funcionalidades já estão publicadas.', link: null },
  { id: 'liderancas', title: 'Lideranças Empáticas', category: 'Web', year: '2025', description: 'Projeto acadêmico full stack com React, Node.js e Express.', stack: ['React', 'Node.js', 'Express', 'Banco de dados'], accent: 'purple', status: 'Projeto acadêmico', details: 'O dossiê registra divergência entre MySQL e SQLite. O banco específico deve ser confirmado no repositório.', link: 'https://github.com/Bren0Groba' },
  { id: 'greenbyte', title: 'GreenByte', category: 'Games', year: '2025', description: 'Jogo educativo de gestão sustentável de água e energia em uma cidade virtual.', stack: ['Unity', 'C#', 'Simulação'], accent: 'green', status: 'Projeto acadêmico', details: 'Simulação de consumo de recursos, evolução de construções e decisões sustentáveis.', link: 'https://github.com/Bren0Groba' },
  { id: 'maya', title: 'Maya Yamamoto', category: 'Mobile', year: '2026', description: 'Aplicativo acadêmico Android com interfaces e lógica de aplicação.', stack: ['Java', 'Android Studio'], accent: 'blue', status: 'Projeto acadêmico', details: 'Aplicativo mobile acadêmico; verificar o repositório antes de publicar um link direto.', link: 'https://github.com/Bren0Groba' },
  { id: 'portfolio', title: 'Portfólio pessoal', category: 'Web', year: '2026', description: 'Portfólio responsivo e interativo desenvolvido com React e Vite.', stack: ['React', 'Vite', 'CSS'], accent: 'orange', status: 'Em desenvolvimento', details: 'Site integrado ao GitHub e publicado via Vercel, com animações, navegação e seções dinâmicas.', link: 'https://brenogroba.com.br' },
  { id: 'StreetHoops', title: 'StreetHoops', category: 'Web', year: '2026', description: 'Website focado em conectar amantes do basquete, .', stack: ['React', 'node', 'Express', 'PostgreSQL'], accent: 'blue', status: 'Projeto de acadêmico', details: 'Projeto acadêmico, desenvolvido como uma Startup, com o intuiito de desenvolver algo inexistente!', link: 'https://github.com/Bren0Groba' },
];

export const experience = [
  { period: 'jun/2026 — atual', role: 'Analista de Suporte Júnior', company: 'Stoque', description: 'Sustentação da plataforma Abaris, investigação de incidentes e análise de integrações, APIs REST, requisições HTTP e JSON. Configuração de fluxos, autenticação e processos documentais; contato com clientes e equipes técnicas.', tags: ['APIs REST', 'HTTP / JSON', 'Integrações', 'Análise de incidentes'] },
  { period: 'jun/2025 — mai/2026', role: 'Assistente de TI', company: 'Uflow Serviços Digitais', description: 'Suporte N1/N2 a aproximadamente oito empresas; Active Directory, Windows Server, redes, Microsoft 365 e sustentação do ERP TOTVS Protheus.', tags: ['N1/N2', 'Active Directory', 'Windows Server', 'TOTVS Protheus'] },
  { period: '2025', role: 'Jovem Aprendiz', company: 'HortiSabor', description: 'Atendimento ao cliente, organização e reposição de mercadorias.', tags: ['Atendimento', 'Organização'] }
];

export const education = [
  { period: '2025 — dez/2028 (previsão)', title: 'Bacharelado em Ciência da Computação', place: 'FECAP', detail: 'Algoritmos, estruturas de dados, bancos de dados, ciência de dados, análise estatística, cálculo e engenharia de software.' },
  { period: '2022 — 2024 · concluído', title: 'Ensino Médio com Técnico em Informática', place: 'FECAP · bolsa integral', detail: 'Programação, desenvolvimento web, bancos de dados, sistemas operacionais, redes, manutenção, Arduino e ferramentas Office.' }
];

// Lista de cursos informada no dossiê; não há confirmação individual de conclusão.
export const courses = [
  { id: 'python', title: 'Python Completo: Do Zero ao Avançado', category: 'Dados & BI', platform: 'Udemy' },
  { id: 'sqlserver', title: 'Curso de SQL Server', category: 'Dados & BI', platform: 'Udemy' },
  { id: 'sqlanalytics', title: 'SQL para Análise de Dados: Do Básico ao Avançado', category: 'Dados & BI', platform: 'Udemy' },
  { id: 'powerbi1', title: 'Aprenda Microsoft Power BI em 7 Dias + Projetos Reais', category: 'Dados & BI', platform: 'Udemy' },
  { id: 'powerbi2', title: 'Microsoft Power BI para Business Intelligence e Data Science', category: 'Dados & BI', platform: 'Udemy' },
  { id: 'claude', title: 'Dominando o Claude AI para Máxima Produtividade', category: 'IA', platform: 'Udemy' },
  { id: 'node', title: 'Node.js do Zero à Maestria com Diversos Projetos', category: 'Desenvolvimento', platform: 'Udemy' },
  { id: 'frontend', title: 'Formação Front-end — HTML, CSS, JavaScript, React e mais', category: 'Desenvolvimento', platform: 'Udemy' },
  { id: 'csharp', title: 'C# Curso Completo: Do Básico ao Avançado', category: 'Desenvolvimento', platform: 'Udemy' },
  { id: 'rpa', title: 'RPA para Todos: Crie Seus Robôs com Automation Anywhere', category: 'IA', platform: 'Udemy' },
  { id: 'ad', title: 'Especialização em Active Directory — Windows Server 2022', category: 'Infraestrutura', platform: 'Udemy' },
  { id: 'support', title: 'Suporte Técnico na Prática', category: 'Infraestrutura', platform: 'Udemy' },
  { id: 'hardware', title: 'Hardware — Montagem e Manutenção de Computadores', category: 'Infraestrutura', platform: 'Udemy' }
];

export const activities = [
  { title: 'Líder Estudantil Campus Builder AWS', period: '2026', description: 'Divulgação de oportunidades de formação em cloud, IA e desenvolvimento; apresentações, mini pitches e ações com estudantes e professores.' },
  { title: 'Olimpíada Brasileira de Informática (OBI)', period: '2024', description: 'Participação acadêmica registrada no dossiê.' }
];
export const languages = [{ name: 'Português', level: 'Nativo' }, { name: 'Inglês', level: 'Intermediário (B1+) · Business English' }];
export const otherRepositories = [
  { title: 'Calculadora', url: 'https://github.com/Bren0Groba/Calculadora' },
  { title: 'Advanced Todo', url: 'https://github.com/Bren0Groba/Advanced-Todo' },
  { title: 'Project Gallery', url: 'https://github.com/Bren0Groba/Project-Gallery' },
  { title: 'StreetHoops', url: 'https://github.com/Bren0Groba/StreetHoops' }
];
