import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BarChart3, Bot, Braces, Check, ChevronDown, FileText,
  Image, Layers3, Menu, MousePointerClick, Search, ShieldCheck,
  Sparkles, WandSparkles, X, Zap
} from 'lucide-react'
import './styles.css'

const categories = ['All tools', 'SEO', 'Writing', 'Image', 'Marketing', 'Developer']

const tools = [
  { name: 'SEO Site Checker', description: 'Find technical issues, content gaps, and quick wins on any page.', category: 'SEO', icon: BarChart3, color: 'lime', badge: 'Popular' },
  { name: 'AI Article Outline', description: 'Turn one idea into a search-ready article structure in seconds.', category: 'Writing', icon: FileText, color: 'purple', badge: 'AI' },
  { name: 'Schema Generator', description: 'Build valid JSON-LD for articles, products, FAQs, and more.', category: 'Developer', icon: Braces, color: 'blue' },
  { name: 'Meta Description Writer', description: 'Generate clear, clickable descriptions that fit the SERP.', category: 'SEO', icon: WandSparkles, color: 'orange', badge: 'AI' },
  { name: 'Image Compressor', description: 'Make images lighter and pages faster without losing quality.', category: 'Image', icon: Image, color: 'pink' },
  { name: 'llms.txt Generator', description: 'Help AI agents discover and understand your best content.', category: 'Developer', icon: Bot, color: 'teal', badge: 'New' },
  { name: 'Social Post Writer', description: 'Create platform-ready posts from a URL or a simple prompt.', category: 'Marketing', icon: MousePointerClick, color: 'yellow', badge: 'AI' },
  { name: 'Content Rewriter', description: 'Improve clarity, tone, and flow while preserving your meaning.', category: 'Writing', icon: Sparkles, color: 'purple' },
]

const articles = [
  { tag: 'AI SEARCH', title: 'How to make your website visible to AI agents', read: '8 min read', tone: 'indigo' },
  { tag: 'TECHNICAL SEO', title: 'The practical on-page SEO checklist for 2026', read: '12 min read', tone: 'green' },
  { tag: 'CONTENT', title: 'Build a content workflow that humans actually enjoy', read: '10 min read', tone: 'coral' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="HotTopBest home">
    <span className="logo-mark"><span /><span /><span /></span>
    <span>HotTop<span>Best</span></span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header">
    <div className="nav-wrap">
      <Logo />
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <a href="#tools">AI Tools</a>
        <a href="#checker">SEO Tools</a>
        <a href="#learn">Learn</a>
        <a href="#categories">Categories <ChevronDown size={15} /></a>
      </nav>
      <a className="nav-cta" href="#tools">Explore free tools <ArrowRight size={16} /></a>
    </div>
  </header>
}

function Hero() {
  return <section className="hero" id="top">
    <div className="orb orb-one" /><div className="orb orb-two" />
    <div className="hero-inner">
      <div className="eyebrow"><Sparkles size={15} /> AI + SEO, without the busywork</div>
      <h1>Smarter tools.<br/><em>Better growth.</em></h1>
      <p>Free, practical AI and SEO tools that help you create better content, fix your website, and grow with confidence.</p>
      <div className="hero-actions">
        <a className="btn primary" href="#tools">Explore all tools <ArrowRight size={18} /></a>
        <a className="btn text" href="#checker"><span className="play">▶</span> Run a free site check</a>
      </div>
      <div className="proof"><span className="avatars"><i>MK</i><i>JL</i><i>AR</i><i>+</i></span><span><b>12,000+ creators</b><br/>work smarter every week</span></div>
    </div>
    <div className="hero-visual" aria-hidden="true">
      <div className="dash-card">
        <div className="dash-top"><span><i/> Website health</span><span>•••</span></div>
        <div className="score-row"><div className="score-ring"><strong>92</strong><span>/100</span></div><div><small>YOUR SCORE</small><h3>Looking great!</h3><p>4 improvements found</p></div></div>
        <div className="metric"><span>SEO basics</span><i><b style={{width:'94%'}} /></i><strong>94%</strong></div>
        <div className="metric"><span>Performance</span><i><b style={{width:'82%'}} /></i><strong>82%</strong></div>
        <div className="metric"><span>AI readiness</span><i><b style={{width:'88%'}} /></i><strong>88%</strong></div>
      </div>
      <div className="float-card fc-one"><span><Zap size={18}/></span><div><b>12 issues fixed</b><small>This week</small></div></div>
      <div className="float-card fc-two"><span><Sparkles size={18}/></span><div><b>AI-ready</b><small>Content score</small></div></div>
    </div>
  </section>
}

function Checker() {
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  function submit(e) {
    e.preventDefault()
    if (!url.trim()) return setMessage('Enter your website URL to continue.')
    setMessage('Preview mode — the full scanner will be connected in the next phase.')
  }
  return <section className="checker-wrap" id="checker">
    <div className="checker-copy"><span className="section-kicker">FREE WEBSITE CHECKER</span><h2>See what’s holding<br/>your site back.</h2><p>Check essential SEO and AI-readiness signals, then get a prioritized list of fixes.</p></div>
    <form className="checker-form" onSubmit={submit}>
      <label htmlFor="site-url">Enter your website URL</label>
      <div className="input-row"><span>https://</span><input id="site-url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="yourwebsite.com"/><button>Check my site <ArrowRight size={17}/></button></div>
      <div className="checks"><span><Check/> No signup</span><span><Check/> Free report</span><span><Check/> Results in seconds</span></div>
      {message && <div className="form-message">{message}</div>}
    </form>
  </section>
}

function ToolCard({ tool }) {
  const Icon = tool.icon
  return <article className="tool-card">
    <div className={`tool-icon ${tool.color}`}><Icon size={24}/></div>
    {tool.badge && <span className={`badge ${tool.badge === 'New' ? 'new' : ''}`}>{tool.badge}</span>}
    <span className="tool-category">{tool.category}</span>
    <h3>{tool.name}</h3><p>{tool.description}</p>
    <button onClick={() => alert(`${tool.name} is included in the product roadmap.`)}>Try it free <ArrowRight size={16}/></button>
  </article>
}

function Tools() {
  const [category, setCategory] = useState('All tools')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => tools.filter(t => (category === 'All tools' || t.category === category) && `${t.name} ${t.description}`.toLowerCase().includes(query.toLowerCase())), [category, query])
  return <section className="tools-section" id="tools">
    <div className="section-head"><div><span className="section-kicker">TOOLBOX</span><h2>Everything you need<br/>to grow smarter.</h2></div><p>Fast, focused tools. No bloated dashboards.<br/>No complicated setup.</p></div>
    <div className="tool-controls" id="categories"><div className="tabs">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'active':''}>{c}</button>)}</div><label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search tools"/></label></div>
    <div className="tool-grid">{filtered.map(tool=><ToolCard key={tool.name} tool={tool}/>)}</div>
    {!filtered.length && <div className="empty">No tools match your search yet.</div>}
    <div className="all-tools"><button className="btn dark" onClick={()=>{setCategory('All tools');setQuery('')}}>View all free tools <ArrowRight size={18}/></button><span>40+ tools and growing</span></div>
  </section>
}

function Workflow() {
  const steps = [
    ['01', 'Check', 'Paste your URL and get a clear picture of what needs attention.'],
    ['02', 'Improve', 'Use focused AI tools to fix content and technical issues.'],
    ['03', 'Grow', 'Publish with confidence and keep your best work moving forward.'],
  ]
  return <section className="workflow"><div className="workflow-inner"><span className="section-kicker light">ONE SIMPLE WORKFLOW</span><h2>From “what’s wrong?”<br/>to “what’s next.”</h2><div className="steps">{steps.map(([n,t,d],i)=><div className="step" key={n}><span>{n}</span><div className="step-icon">{i===0?<Search/>:i===1?<WandSparkles/>:<BarChart3/>}</div><h3>{t}</h3><p>{d}</p>{i<2&&<ArrowRight className="step-arrow"/>}</div>)}</div></div></section>
}

function Learn() {
  return <section className="learn" id="learn"><div className="section-head"><div><span className="section-kicker">LEARN & GROW</span><h2>Clear advice.<br/>Real results.</h2></div><a href="#learn">Browse all guides <ArrowRight size={17}/></a></div><div className="article-grid">{articles.map((a,i)=><article key={a.title}><div className={`article-art ${a.tone}`}>{i===0?<Bot/>:i===1?<ShieldCheck/>:<Layers3/>}<span>{i===0?'AI':i===1?'92':'Aa'}</span></div><small>{a.tag}</small><h3>{a.title}</h3><p>{a.read} <ArrowRight size={15}/></p></article>)}</div></section>
}

function Newsletter() {
  const [done,setDone]=useState(false)
  return <section className="newsletter"><div><span className="section-kicker light">THE SMARTER GROWTH LETTER</span><h2>One useful idea,<br/>every Tuesday.</h2></div>{done?<div className="thanks"><Check/> You’re on the list. Welcome!</div>:<form onSubmit={e=>{e.preventDefault();setDone(true)}}><p>Join creators and marketers getting practical AI and SEO tips—no noise, no hype.</p><div><input type="email" required placeholder="you@email.com"/><button>Subscribe <ArrowRight size={17}/></button></div><small>Free forever. Unsubscribe anytime.</small></form>}</section>
}

function Footer() {
  return <footer><div className="footer-top"><div><Logo/><p>Practical AI and SEO tools<br/>for smarter, sustainable growth.</p></div><div><b>Tools</b><a href="#tools">AI tools</a><a href="#checker">SEO checker</a><a href="#tools">Content tools</a></div><div><b>Resources</b><a href="#learn">Guides</a><a href="#learn">Comparisons</a><a href="#learn">Newsletter</a></div><div><b>Company</b><a href="#top">About</a><a href="#top">Contact</a><a href="#top">Submit a tool</a></div></div><div className="footer-bottom"><span>© 2026 HotTopBest. Built for better work.</span><span><a href="#top">Privacy</a><a href="#top">Terms</a></span></div></footer>
}

function App(){return <><Header/><main><Hero/><Checker/><Tools/><Workflow/><Learn/><Newsletter/></main><Footer/></>}

createRoot(document.getElementById('root')).render(<App />)
