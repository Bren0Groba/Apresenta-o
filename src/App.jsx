import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Terminal,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Command,
  BookOpen,
  Award,
  Clock3,
  Instagram
} from 'lucide-react';
import { profile, skills, projects, experience, education, courses, activities, languages, otherRepositories } from './data/portfolio';
import './styles/layout.css';
import './styles/home.css';
import './styles/about.css';
import './styles/skills.css';
import './styles/projects.css';
import './styles/experience.css';
import './styles/contact.css';
import './styles/studies.css';
import './styles/polish.css';
import './styles/development-ribbon.css';
import './styles/profile-details.css';
import './styles/editorial.css';
import './styles/rounded.css';
import './styles/hero-terminal.css';
import './styles/sidebar.css';
import Typewriter from './components/Typewriter';

const nav = [
  ['home', 'Início'], ['about', 'Sobre'], ['skills', 'Skills'],
  ['projects', 'Projetos'], ['studies', 'Estudos'], ['experience', 'Experiência'], ['activities', 'Atividades'], ['contact', 'Contato']
];

function SectionHeading({ eyebrow, title, number }) {
  return <div className="section-heading"><span className="eyebrow">{number} / {eyebrow}</span><h2>{title}</h2></div>;
}

function App() {
  const [active, setActive] = useState('home');
  const [showRibbon, setShowRibbon] = useState(true);
  const [terminalReady, setTerminalReady] = useState(false);
  const finishTyping = useCallback(() => setTerminalReady(true), []);
  const modalRef = useRef(null);
  const paletteRef = useRef(null);
  const [filter, setFilter] = useState('Todos');
  const [studyFilter, setStudyFilter] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [light, setLight] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'light'; } catch { return false; } });
  const [copied, setCopied] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const categories = ['Todos', ...new Set(projects.map(p => p.category))];
  const visibleCourses = useMemo(() => studyFilter === 'Todos' ? courses : courses.filter(course => course.category === studyFilter), [studyFilter]);
  const visibleProjects = useMemo(() => filter === 'Todos' ? projects : projects.filter(p => p.category === filter), [filter]);

  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(current.target.id);
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5, .8] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light-theme', light);
    try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch { }
    return () => document.body.classList.remove('light-theme');
  }, [light]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') { setSelected(null); setMenuOpen(false); setPaletteOpen(false); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(open => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? Math.min(100, window.scrollY / max * 100) : 0);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) return;
    const items = document.querySelectorAll('.section-heading, .about-layout, .skill-card, .project-card, .study-degree, .study-course, .timeline-item');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });
    items.forEach(item => { item.classList.add('reveal-ready'); observer.observe(item); });
    return () => { observer.disconnect(); items.forEach(item => item.classList.remove('reveal-ready')); };
  }, [filter, studyFilter]);

  useEffect(() => {
    const locked = Boolean(selected || paletteOpen || menuOpen);
    document.body.classList.toggle('overlay-open', locked);
    return () => document.body.classList.remove('overlay-open');
  }, [selected, paletteOpen, menuOpen]);

  useEffect(() => {
    if (!selected && !paletteOpen) return;
    const previouslyFocused = document.activeElement;
    const dialog = selected ? modalRef.current : paletteRef.current;
    const focusTarget = dialog?.querySelector(selected ? '.modal-close' : '.palette-input');
    const trap = e => {
      if (e.key !== 'Tab' || !dialog) return;
      const nodes = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])')];
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', trap);
    focusTarget?.focus();
    return () => { window.removeEventListener('keydown', trap); previouslyFocused?.focus?.(); };
  }, [selected, paletteOpen]);

  const scrollTo = id => {
    setMenuOpen(false);
    setPaletteOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const tiltCard = event => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--tilt-x', `${((.5 - y) * 5).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${((x - .5) * 5).toFixed(2)}deg`);
    card.style.setProperty('--spot-x', `${(x * 100).toFixed(1)}%`);
    card.style.setProperty('--spot-y', `${(y * 100).toFixed(1)}%`);
  };
  const resetTilt = event => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { window.location.href = `mailto:${profile.email}`; }
  };

  return (
    <div className={`app-shell sidebar-layout ${sidebarCollapsed ? "sidebar-layout-collapsed" : ""}`}>
      {showRibbon && <button type="button" className="development-ribbon" aria-label="Fechar faixa: site em desenvolvimento" title="Clique para fechar" onClick={() => setShowRibbon(false)}>
        <div className="development-ribbon__track" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <span key={index}>✳ EM DESENVOLVIMENTO ✳</span>
          ))}
        </div>
      </button>}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
             <header className="sidebar-mobile-bar">
         <a className="sidebar-mobile-brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}><span className="brand-mark">BG</span><strong>breno.dev</strong></a>
         <button className="icon-button" aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-controls="sidebar-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
       </header>
       {menuOpen && <button type="button" className="sidebar-backdrop" aria-label="Fechar navegação" onClick={() => setMenuOpen(false)} />}
       <aside className={`portfolio-sidebar ${sidebarCollapsed ? 'is-collapsed' : ''} ${menuOpen ? 'is-open' : ''}`} aria-label="Menu lateral">
         <a className="sidebar-brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }} title="Início">
           <span className="brand-mark">BG</span><span className="sidebar-label">breno<span className="brand-dot">.</span>dev</span>
         </a>
         <div className="sidebar-nav-heading sidebar-label">NAVEGAÇÃO</div>
         <nav id="sidebar-navigation" className="sidebar-navigation" aria-label="Navegação principal">
           {nav.map(([id, label], i) => <button type="button" key={id} title={label} aria-current={active === id ? 'page' : undefined} className={active === id ? 'sidebar-nav-link active' : 'sidebar-nav-link'} onClick={() => scrollTo(id)}><span className="sidebar-number">{String(i + 1).padStart(2, '0')}</span><span className="sidebar-label">{label}</span></button>)}
         </nav>
         <div className="sidebar-bottom">
           <button type="button" className="sidebar-control" onClick={() => setLight(v => !v)} aria-label={light ? 'Ativar tema escuro' : 'Ativar tema claro'} title={light ? 'Ativar tema escuro' : 'Ativar tema claro'}>{light ? <Moon size={17} /> : <Sun size={17} />}<span className="sidebar-label">Alternar tema</span></button>
           <button type="button" className="sidebar-control sidebar-collapse-control" onClick={() => setSidebarCollapsed(v => !v)} aria-expanded={!sidebarCollapsed} aria-label={sidebarCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'} title={sidebarCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}><Menu size={17} /><span className="sidebar-label">{sidebarCollapsed ? 'Expandir' : 'Recolher menu'}</span></button>
           <a className="sidebar-control sidebar-contact" href={`mailto:${profile.email}`} title="Vamos conversar"><Mail size={17} /><span className="sidebar-label">Vamos conversar</span></a>
           <span className="sidebar-availability"><span className="pulse-dot" /><span className="sidebar-label">Aberto a oportunidades</span></span>
         </div>
       </aside>

<main id="main-content">
        <section id="home" className="page-section hero-section">
          <div className="hero-grid">
             <div className="hero-art hero-terminal-art">
               <div className="orbit orbit-a" aria-hidden="true" />
               <div className="orbit orbit-b" aria-hidden="true" />
               <div className="floating-chip chip-top" aria-hidden="true"><Terminal size={15} /> <span>arquivo_01 / pessoal</span></div>
               <div className="code-window hero-terminal">
                 <div className="window-bar"><span /><span /><span /><small><Terminal size={12} /> breno@portfolio: ~</small></div>
                 <div className="terminal-content">
                   <p className="terminal-command"><span aria-hidden="true">$</span> <Typewriter text="cat sobre-mim.txt" speed={65} delay={350} onComplete={finishTyping} /></p>
                   <div className={`terminal-intro terminal-reveal ${terminalReady ? "terminal-visible" : ""}`}>
                     <span className="terminal-label">01 / APRESENTAÇÃO</span>
                     <h2>Oi, eu sou <span>Breno Groba.</span></h2>
                     <p>Estudante de Ciência da Computação. Entre dados, código e a vontade de entender como as coisas funcionam.</p>
                   </div>
                   <div className="terminal-divider" />
                   <div className={`terminal-lines terminal-reveal ${terminalReady ? "terminal-visible" : ""}`} aria-label="Tecnologias e interesses">
                     <p><span className="terminal-key">const</span> foco = <span className="terminal-string">'Dados & Software'</span>;</p>
                     <p><span className="terminal-key">const</span> stack = [<span className="terminal-string">'Python'</span>, <span className="terminal-string">'SQL'</span>, <span className="terminal-string">'Pandas'</span>];</p>
                     <p><span className="terminal-key">const</span> status = <span className="terminal-string">'Sempre aprendendo'</span>;</p>
                   </div>
                   <div className={`terminal-actions terminal-reveal ${terminalReady ? "terminal-visible" : ""}`}>
                     <button className="primary-button" onClick={() => scrollTo('projects')}>Explorar projetos <ArrowUpRight size={15} /></button>
                     <button className="text-button" onClick={() => scrollTo('about')}>Sobre mim <ArrowDown size={15} /></button>
                   </div>
                 </div>
               </div>
               <div className="floating-chip chip-bottom" aria-hidden="true"><Sparkles size={15} /> <span>Em construção</span></div>
               <div className="hero-orb" aria-hidden="true"><Code2 size={34} /></div>
               <span className="art-caption">FIG. 01 — ARQUIVO PESSOAL / 2026</span>
             </div>
          </div>
          <div className="hero-bottom"><span>CONTINUE A LEITURA</span><div className="scroll-track"><span /></div><span>01 — 08</span></div>
        </section>

        <section id="about" className="page-section content-section">
          <SectionHeading number="01" eyebrow="QUEM SOU" title={<>Um pouco sobre <span className="muted-title">mim.</span></>} />
          <div className="about-layout">
            <div className="about-intro"><p className="big-copy">Gosto de descobrir como as coisas funcionam — e transformar esse conhecimento em algo útil.</p><p>{profile.about}</p><p>Não acredito em saber tudo. Acredito em ter curiosidade, pesquisar, testar e evoluir a cada desafio.</p>
              <div className="about-stats"><div><strong>{String(projects.length).padStart(2, "0")}</strong><small>Projetos em destaque</small></div><div><strong>03</strong><small>Experiências profissionais</small></div><div><strong>∞</strong><small>Coisas para aprender</small></div></div>
            </div>
            <div className="about-side">
              <div className="info-card profile-card"><div className="profile-avatar">BG<span>✳</span></div><div><small>ATUALMENTE</small><h3>Estudante & Developer</h3><p>Ciência da Computação · FECAP</p></div><span className="card-arrow"><ArrowUpRight /></span></div>
              <div className="info-card education-card"><div className="card-icon"><GraduationCap /></div><div><small>FORMAÇÃO</small>{education.map(item => <div className="education-item" key={item.title}><span>{item.period}</span><b>{item.title}</b><small>{item.place}</small></div>)}</div></div>
              <div className="quote-card"><span>“</span><p>O melhor jeito de aprender é colocando a mão no código.</p><small>— MINHA FILOSOFIA</small></div>
            </div>
          </div>
        </section>

        <section id="skills" className="page-section content-section skills-section">
          <SectionHeading number="02" eyebrow="FERRAMENTAS" title={<>Tecnologias que <span className="muted-title">exploro.</span></>} />
          <p className="section-lead">Destaque para Python, SQL, Pandas, Excel, Power BI e IA generativa — conhecimentos adquiridos em projetos, trabalho e estudos, com profundidades diferentes.</p>
          <div className="skills-grid">{skills.map((group, index) => <article className="skill-card" key={group.group}><div className="skill-card-top"><span>0{index + 1}</span><Code2 size={18} /></div><h3>{group.group}</h3><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div><div className="skill-card-foot"><span>STACK / {group.items.length.toString().padStart(2, '0')}</span><span className="skill-spark">✳</span></div></article>)}</div>
          <div className="skills-note"><span className="note-icon"><Sparkles size={17} /></span><p><b>Em constante evolução.</b> As tecnologias representam meu contato atual com cada ferramenta, não uma escala de domínio.</p></div>
        </section>

        <section id="projects" className="page-section content-section projects-section">
          <SectionHeading number="03" eyebrow="TRABALHOS SELECIONADOS" title={<>Projetos em <span className="muted-title">destaque.</span></>} />
          <div className="projects-toolbar"><p className="section-lead">Ideias que saíram do papel — cada projeto é uma oportunidade de aprender algo novo.</p><div className="filter-list" aria-label="Filtrar projetos">{categories.map(category => <button key={category} onClick={() => setFilter(category)} aria-pressed={filter === category} className={filter === category ? 'filter-chip selected' : 'filter-chip'}>{category}</button>)}</div></div>
          <div className="projects-grid">{visibleProjects.map((project, i) => <article className={`project-card accent-${project.accent}`} key={project.id} onPointerMove={tiltCard} onPointerLeave={resetTilt}>
            <button className="project-open" onClick={() => setSelected(project)} aria-label={`Ver detalhes de ${project.title}`}>
              <div className="project-visual"><div className="visual-grid" /><span className="project-number">0{i + 1}</span><div className="project-symbol">{project.category === 'Games' ? '◈' : project.category === 'Mobile' ? '▣' : '⌘'}</div><span className="visual-caption">{project.category.toUpperCase()} / {project.year}</span><span className="project-zoom"><ArrowUpRight /></span></div>
              <div className="project-info"><div className="project-title-row"><div><span className="project-status">{project.status}</span><h3>{project.title}</h3></div><ArrowUpRight className="project-arrow" /></div><p>{project.description}</p><div className="project-stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            </button>
          </article>)}</div>
          <div className="projects-foot"><span>EXIBINDO {visibleProjects.length.toString().padStart(2, '0')} PROJETOS</span><a href={profile.github} target="_blank" rel="noreferrer">Ver GitHub completo <ExternalLink size={14} /></a></div>
        </section>

        <section id="studies" className="page-section content-section studies-section">
          <SectionHeading number="04" eyebrow="FORMAÇÃO & APRENDIZADO" title={<>Sempre em <span className="muted-title">evolução.</span></>} />
          <p className="section-lead">Formação na FECAP e cursos complementares informados no meu histórico. A conclusão individual dos cursos ainda não foi confirmada.</p>
          <div className="study-education">
            {education.map((item, i) => <article className="study-degree" key={item.title}>
              <div className="study-degree-icon"><GraduationCap size={23} /></div>
              <div><span className="study-label">{i === 0 ? 'GRADUAÇÃO' : 'FORMAÇÃO TÉCNICA'}</span><h3>{item.title}</h3><p>{item.place}</p><p className="study-degree-detail">{item.detail}</p></div>
              <span className="study-period">{item.period}</span>
            </article>)}
          </div>
          <div className="study-header">
            <div><span className="eyebrow">TRILHAS DE APRENDIZADO</span><h3>Minha biblioteca de estudos<span className="study-star">✳</span></h3></div>
            <div className="study-filters" role="group" aria-label="Filtrar cursos">
              {['Todos', ...new Set(courses.map(c => c.category))].map(category => <button key={category} type="button" className={studyFilter === category ? 'study-filter selected' : 'study-filter'} onClick={() => setStudyFilter(category)} aria-pressed={studyFilter === category}>{category}</button>)}
            </div>
          </div>
          <div className="study-cards" aria-live="polite">
            {visibleCourses.map((course, i) => <article className="study-course" key={course.id} style={{ '--study-index': i }}>
              <div className="study-course-top"><span className="study-course-number">COURSE / {String(i + 1).padStart(2, '0')}</span><span className="study-status">Estudos complementares</span></div>
              <div className="study-course-icon">{course.category === 'Cloud' ? <Award size={26} /> : <BookOpen size={26} />}</div>
              <div className="study-course-category">{course.category} · {course.platform}</div>
              <h4>{course.title}</h4><p>Curso complementar listado no meu histórico de estudos.</p>
              <div className="study-course-bottom"><span><BookOpen size={13} /> Curso complementar</span><span className="study-arrow">↗</span></div>
            </article>)}
          </div>
          <div className="study-disclaimer"><Sparkles size={17} /><span>Os títulos foram extraídos do dossiê; status de conclusão e certificados não foram confirmados. Não há certificações presumidas.</span></div>
        </section>

        <section id="experience" className="page-section content-section experience-section">
          <SectionHeading number="05" eyebrow="TRAJETÓRIA" title={<>Onde venho <span className="muted-title">construindo.</span></>} />
          <div className="experience-layout"><div className="experience-intro"><BriefcaseBusiness size={22} /><p>Minha experiência com tecnologia também passa por resolver problemas reais, apoiar pessoas e entender diferentes ambientes.</p><span>EXPERIÊNCIA PROFISSIONAL</span></div>
            <div className="timeline">{experience.map((item, i) => <article className="timeline-item" key={item.company}><div className="timeline-marker">{i === 0 ? '01' : '02'}</div><div className="timeline-content"><span className="timeline-period">{item.period}</span><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.description}</p><div className="project-stack">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
          </div>
        </section>

        <section id="activities" className="page-section content-section profile-details-section">
          <SectionHeading number="06" eyebrow="LIDERANÇA & IDIOMAS" title={<>Além do <span className="muted-title">código.</span></>} />
          <div className="profile-details-grid">
            <div className="profile-detail-panel"><h3>Atividades e liderança</h3>{activities.map(item => <article key={item.title}><span>{item.period}</span><h4>{item.title}</h4><p>{item.description}</p></article>)}</div>
            <div className="profile-detail-panel"><h3>Idiomas</h3>{languages.map(item => <article key={item.name}><h4>{item.name}</h4><p>{item.level}</p></article>)}<h3>Outros repositórios</h3><div className="other-repos">{otherRepositories.map(item => <a key={item.url} href={item.url} target="_blank" rel="noreferrer">{item.title} <ArrowUpRight size={14} /></a>)}</div></div>
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="contact-decoration">LET'S<br />BUILD<span>✳</span></div>
          <div className="contact-content"><SectionHeading number="07" eyebrow="PRÓXIMO PASSO" title={<>Vamos criar algo <span className="gradient-text">incrível?</span></>} />
            <p>Estou sempre aberto a trocar ideias, conhecer projetos e conversar sobre oportunidades na área de tecnologia.</p>
            <button className="contact-email" onClick={copyEmail}>{copied ? <Check /> : <Mail />}{copied ? 'E-mail copiado!' : profile.email}<span>{copied ? 'COPIADO' : <Copy size={15} />}</span></button>
            <div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href={`mailto:${profile.email}`}><Mail size={17} /> E-mail <ArrowUpRight size={14} /></a><a href={profile.instagram} target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram <ArrowUpRight size={14} /></a><a href={profile.website} target="_blank" rel="noreferrer">Site <ArrowUpRight size={14} /></a></div>
          </div>
          <footer className="site-footer"><a className="brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home') }}><span className="brand-mark">BG</span><span>breno<span className="brand-dot">.</span>dev</span></a><span>DESENHADO & DESENVOLVIDO POR BRENO GROBA</span><span>© 2026 — FEITO COM CURIOSIDADE.</span></footer>
        </section>
      </main>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }}><article ref={modalRef} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-button" onClick={() => setSelected(null)} aria-label="Fechar"><X /></button><span className="eyebrow">PROJETO / {selected.year}</span><div className={`modal-art accent-${selected.accent}`}><span>{selected.category.toUpperCase()}</span><b>{selected.title}</b></div><span className="project-status">{selected.status}</span><h2 id="modal-title">{selected.title}</h2><p>{selected.details}</p><div className="project-stack">{selected.stack.map(tag => <span key={tag}>{tag}</span>)}</div>{selected.link && <a className="primary-button modal-link" href={selected.link} target="_blank" rel="noreferrer">Abrir projeto <ArrowUpRight size={16} /></a>}</article></div>}
      <button className="back-top" onClick={() => scrollTo('home')} aria-label="Voltar ao topo"><ArrowUp size={17} /></button>
      <button className="keyboard-hint" onClick={() => setPaletteOpen(true)} aria-label="Abrir navegação rápida" title="Abrir navegação rápida"><Command size={12} /> K <span>navegação rápida</span></button>
      {paletteOpen && <div className="palette-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setPaletteOpen(false); }}>
        <div ref={paletteRef} className="command-palette" role="dialog" aria-modal="true" aria-label="Navegação rápida">
          <div className="palette-search"><Command size={18} /><input className="palette-input" aria-label="Buscar seção" value={search} onChange={e => setSearch(e.target.value)} placeholder="Para onde vamos?" /><kbd>ESC</kbd></div>
          <div className="palette-results">{nav.filter(([, label]) => label.toLowerCase().includes(search.toLowerCase())).map(([id, label], i) => <button key={id} onClick={() => { scrollTo(id); setSearch(''); }}><span>↗</span>{label}<small>IR PARA SEÇÃO</small></button>)}{!nav.some(([, label]) => label.toLowerCase().includes(search.toLowerCase())) && <p>Nenhuma seção encontrada.</p>}</div>
          <div className="palette-footer">Dica: use Ctrl/⌘ + K para abrir ou fechar</div>
        </div>
      </div>}
    </div>
  );
}
export default App;