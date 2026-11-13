import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  Clock3
} from 'lucide-react';
import { profile, skills, projects, experience, education, courses } from './data/portfolio';
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

const nav = [
  ['home', 'Início'], ['about', 'Sobre'], ['skills', 'Skills'],
  ['projects', 'Projetos'], ['studies', 'Estudos'], ['experience', 'Experiência'], ['contact', 'Contato']
];

function SectionHeading({ eyebrow, title, number }) {
  return <div className="section-heading"><span className="eyebrow">{number} / {eyebrow}</span><h2>{title}</h2></div>;
}

function App() {
  const [active, setActive] = useState('home');
  const modalRef = useRef(null);
  const paletteRef = useRef(null);
  const [filter, setFilter] = useState('Todos');
  const [studyFilter, setStudyFilter] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'light'; } catch { return false; } });
  const [copied, setCopied] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const categories = ['Todos', ...new Set(projects.map(p => p.category))];
  const visibleCourses = useMemo(() => studyFilter === 'Todos' ? courses : courses.filter(course => course.category === studyFilter), [studyFilter]);
  const visibleProjects = useMemo(() => filter === 'Todos' ? projects : projects.filter(p => p.category === filter), [filter]);
  const [showRibbon, setShowRibbon] = useState(true);

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

    <div className="app-shell">
      {showRibbon && (
        <button
          type="button"
          className="development-ribbon"
          onClick={() => setShowRibbon(false)}
          aria-label="Fechar aviso de site em desenvolvimento"
          title="Clique para fechar"
        >
          <span>
            ✳ EM DESENVOLVIMENTO ✳ EM DESENVOLVIMENTO ✳ EM DESENVOLVIMENTO ✳
          </span>
        </button>
      )}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
          <span className="brand-mark">BG</span><span>breno<span className="brand-dot">.</span>dev</span>
        </a>
        <nav id="primary-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegação principal">
          {nav.map(([id, label], i) => <button key={id} className={active === id ? 'nav-link active' : 'nav-link'} onClick={() => scrollTo(id)}><span>0{i + 1}</span>{label}</button>)}
        </nav>
        <div className="top-actions">
          <button className="icon-button" aria-label={light ? "Ativar tema escuro" : "Ativar tema claro"} aria-pressed={light} onClick={() => setLight(v => !v)}>{light ? <Moon size={17} /> : <Sun size={17} />}</button>
          <a className="resume-button" href={`mailto:${profile.email}`}>Vamos conversar <ArrowUpRight size={15} /></a>
          <button className="icon-button menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <aside className="side-rail">
        <span className="rail-label">NAVEGAR</span>
        {nav.map(([id], i) => <button key={id} aria-label={id} title={nav[i][1]} className={active === id ? 'rail-dot active' : 'rail-dot'} onClick={() => scrollTo(id)} />)}
        <span className="rail-line" />
        <span className="rail-index">0{nav.findIndex(n => n[0] === active) + 1} / 07</span>
      </aside>

      <main id="main-content">
        <section id="home" className="page-section hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="availability"><span className="pulse-dot" />{profile.availability}</div>
              <p className="hero-kicker">OLÁ, MEU NOME É BRENO <span>✳</span></p>
              <h1>Construindo<br /><span className="gradient-text">ideias em</span><br />experiências.</h1>
              <p className="hero-description">{profile.headline} <span>Desenvolvimento, tecnologia e aprendizado constante.</span></p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollTo('projects')}>Explorar projetos <ArrowDown size={16} /></button>
                <button className="text-button" onClick={() => scrollTo('about')}>Conheça minha trajetória <ArrowUpRight size={16} /></button>
              </div>
              <div className="hero-meta"><span><i /> {profile.location}</span><span>Ciência da Computação · FECAP</span></div>
            </div>
            <div className="hero-art" role="img" aria-label="Ilustração abstrata de elementos de desenvolvimento">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="floating-chip chip-top"><Terminal size={15} /> <span>hello_world()</span></div>
              <div className="code-window">
                <div className="window-bar"><span /><span /><span /><small>about-me.jsx</small></div>
                <div className="code-content">
                  <p><b>const</b> <em>developer</em> = {'{'}</p>
                  <p className="indent"><i>name:</i> <strong>'Breno'</strong>,</p>
                  <p className="indent"><i>focus:</i> <strong>'Full Stack'</strong>,</p>
                  <p className="indent"><i>learning:</i> [</p>
                  <p className="indent2"><strong>'React'</strong>, <strong>'C#'</strong>,</p>
                  <p className="indent2"><strong>'.NET'</strong>, <strong>'Cloud'</strong></p>
                  <p className="indent">],</p>
                  <p className="indent"><i>coffee:</i> <strong>true</strong></p>
                  <p>{'}'};</p>
                  <span className="code-cursor" />
                </div>
              </div>
              <div className="floating-chip chip-bottom"><Sparkles size={15} /> <span>Always learning</span></div>
              <div className="hero-orb"><Code2 size={34} /></div>
              <span className="art-caption">FIG. 001 — CREATIVE MINDSET</span>
            </div>
          </div>
          <div className="hero-bottom"><span>SCROLL PARA EXPLORAR</span><div className="scroll-track"><span /></div><span>01 — 07</span></div>
        </section>

        <section id="about" className="page-section content-section">
          <SectionHeading number="01" eyebrow="QUEM SOU" title={<>Um pouco sobre <span className="muted-title">mim.</span></>} />
          <div className="about-layout">
            <div className="about-intro"><p className="big-copy">Gosto de descobrir como as coisas funcionam — e transformar esse conhecimento em algo útil.</p><p>{profile.about}</p><p>Não acredito em saber tudo. Acredito em ter curiosidade, pesquisar, testar e evoluir a cada desafio.</p>
              <div className="about-stats"><div><strong>04<span>+</span></strong><small>Projetos em destaque</small></div><div><strong>02</strong><small>Experiências profissionais</small></div><div><strong>∞</strong><small>Coisas para aprender</small></div></div>
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
          <p className="section-lead">Um conjunto de ferramentas que venho utilizando em projetos, estudos e experiências profissionais.</p>
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
          <p className="section-lead">Da sala de aula aos projetos pessoais: o que estou estudando e explorando. Os cursos abaixo são exemplos editáveis, não certificados concluídos.</p>
          <div className="study-education">
            {education.map((item, i) => <article className="study-degree" key={item.title}>
              <div className="study-degree-icon"><GraduationCap size={23} /></div>
              <div><span className="study-label">{i === 0 ? 'GRADUAÇÃO' : 'FORMAÇÃO TÉCNICA'}</span><h3>{item.title}</h3><p>{item.place}</p></div>
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
              <div className="study-course-top"><span className="study-course-number">COURSE / {String(i + 1).padStart(2, '0')}</span><span className="study-status"><span className="study-status-dot" />{course.status}</span></div>
              <div className="study-course-icon">{course.category === 'Cloud' ? <Award size={26} /> : <BookOpen size={26} />}</div>
              <div className="study-course-category">{course.category} · {course.platform}</div>
              <h4>{course.title}</h4><p>{course.description}</p>
              <div className="study-course-bottom"><span><Clock3 size={13} /> {course.stage}</span><span className="study-arrow">↗</span></div>
            </article>)}
          </div>
          <div className="study-disclaimer"><Sparkles size={17} /><span>Os cursos são dados mockados. Atualize títulos, instituições, datas e status em <code>src/data/portfolio.js</code> antes de publicar.</span></div>
        </section>

        <section id="experience" className="page-section content-section experience-section">
          <SectionHeading number="05" eyebrow="TRAJETÓRIA" title={<>Onde venho <span className="muted-title">construindo.</span></>} />
          <div className="experience-layout"><div className="experience-intro"><BriefcaseBusiness size={22} /><p>Minha experiência com tecnologia também passa por resolver problemas reais, apoiar pessoas e entender diferentes ambientes.</p><span>EXPERIÊNCIA PROFISSIONAL</span></div>
            <div className="timeline">{experience.map((item, i) => <article className="timeline-item" key={item.company}><div className="timeline-marker">{i === 0 ? '01' : '02'}</div><div className="timeline-content"><span className="timeline-period">{item.period}</span><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.description}</p><div className="project-stack">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="contact-decoration">LET'S<br />BUILD<span>✳</span></div>
          <div className="contact-content"><SectionHeading number="06" eyebrow="PRÓXIMO PASSO" title={<>Vamos criar algo <span className="gradient-text">incrível?</span></>} />
            <p>Estou sempre aberto a trocar ideias, conhecer projetos e conversar sobre oportunidades na área de tecnologia.</p>
            <button className="contact-email" onClick={copyEmail}>{copied ? <Check /> : <Mail />}{copied ? 'E-mail copiado!' : profile.email}<span>{copied ? 'COPIADO' : <Copy size={15} />}</span></button>
            <div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href={`mailto:${profile.email}`}><Mail size={17} /> E-mail <ArrowUpRight size={14} /></a></div>
          </div>
          <footer className="site-footer"><a className="brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home') }}><span className="brand-mark">BG</span><span>breno<span className="brand-dot">.</span>dev</span></a><span>DESENHADO & DESENVOLVIDO POR BRENO GROBA</span><span>© 2026 — FEITO COM CURIOSIDADE.</span></footer>
        </section>
      </main>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }}><article ref={modalRef} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-button" onClick={() => setSelected(null)} aria-label="Fechar"><X /></button><span className="eyebrow">PROJETO / {selected.year}</span><div className={`modal-art accent-${selected.accent}`}><span>{selected.category.toUpperCase()}</span><b>{selected.title}</b></div><span className="project-status">{selected.status}</span><h2 id="modal-title">{selected.title}</h2><p>{selected.details}</p><div className="project-stack">{selected.stack.map(tag => <span key={tag}>{tag}</span>)}</div><a className="primary-button modal-link" href={selected.link} target="_blank" rel="noreferrer">Explorar no GitHub <ArrowUpRight size={16} /></a></article></div>}
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