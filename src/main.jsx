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

const articleLibrary = {
  'Popular': [
    ['AI Search Strategy', 'A practical framework for earning mentions across AI answers.'],
    ['Build an AI-Ready Brand', 'Make your expertise easier for search systems to understand and trust.'],
    ['Generative Engine Optimization', 'Grow visibility where AI-generated answers shape decisions.'],
    ['What Is SEO?', 'A plain-English introduction to modern search optimization.'],
    ['17 Fast SEO Improvements', 'High-impact fixes you can make without rebuilding your website.'],
    ['The Complete SEO Checklist', 'A repeatable process covering content, technical health, and trust.'],
    ['SEO Strategy From Scratch', 'Turn business goals into a focused, measurable search roadmap.'],
    ['Competitor Research That Helps', 'Find useful gaps without blindly copying another website.'],
    ['E-E-A-T in the AI Era', 'Show real experience, expertise, authority, and trust on every page.'],
    ['Internal Linking Made Simple', 'Build clearer paths for visitors, crawlers, and AI agents.'],
    ['Technical SEO Essentials', 'The technical foundations every healthy website needs.'],
    ['On-Page SEO Blueprint', 'Optimize intent, structure, usability, and conversions together.'],
  ],
  'AI Search': [
    ['AI Search Optimization', 'How answer engines discover, interpret, and cite useful sources.'],
    ['AI Visibility Audit', 'Measure whether your brand is ready to appear in generated answers.'],
    ['Create a Useful llms.txt', 'Guide AI agents toward your most important public resources.'],
    ['Entity SEO for Brands', 'Build a consistent machine-readable identity across the web.'],
    ['Content AI Can Cite', 'Structure evidence, definitions, and examples for reliable extraction.'],
    ['AI Crawler Readiness', 'Check access rules, rendering, structured data, and page clarity.'],
    ['Prompt-Led Audience Research', 'Use real customer questions to plan stronger content.'],
    ['AI Overviews Explained', 'Understand how generated search experiences change organic discovery.'],
    ['Human-First AI Content', 'Use automation without publishing generic or untrustworthy work.'],
  ],
  'SEO Fundamentals': [
    ['How Search Engines Work', 'Crawling, indexing, ranking, and retrieval in one clear guide.'],
    ['Search Intent', 'Identify what people really need before you create a page.'],
    ['Keyword Research Basics', 'Find focused topics without relying on expensive datasets.'],
    ['SEO-Friendly Website Design', 'Plan navigation, templates, and page hierarchy for discovery.'],
    ['Title Tags and Descriptions', 'Write snippets that are accurate, helpful, and click-worthy.'],
    ['SEO-Friendly URLs', 'Create short, descriptive addresses that age well.'],
    ['Core Web Vitals', 'Improve loading, responsiveness, and visual stability.'],
    ['Canonical Tags', 'Prevent duplicate-page confusion with correct canonical signals.'],
    ['Robots and Sitemaps', 'Help crawlers reach the right pages efficiently.'],
  ],
  'Content Marketing': [
    ['Content Strategy', 'Connect audience needs, business value, and a realistic publishing plan.'],
    ['Write a Useful Blog Post', 'A start-to-finish workflow for research, drafting, and editing.'],
    ['Build a Content Calendar', 'Plan consistent output without sacrificing quality.'],
    ['Refresh Old Content', 'Decide what to update, merge, redirect, or remove.'],
    ['Original Research', 'Turn first-party insights into content people want to reference.'],
    ['Content Distribution', 'Give every article a practical promotion plan.'],
    ['Repurpose Without Repeating', 'Adapt one strong idea for multiple useful formats.'],
    ['Writing for Readability', 'Make complex ideas easier to scan and understand.'],
    ['Content Brief Template', 'Align writers, editors, search intent, and business goals.'],
  ],
  'Link Building': [
    ['Link Building Fundamentals', 'Earn relevant editorial mentions that build lasting authority.'],
    ['What Makes a Good Backlink?', 'Evaluate relevance, credibility, context, and placement.'],
    ['Digital PR for Small Teams', 'Create pitchable stories without a large communications budget.'],
    ['Resource Page Outreach', 'Find useful collections and propose genuinely helpful additions.'],
    ['Broken Link Building', 'Replace outdated references with stronger, current resources.'],
    ['Linkable Assets', 'Design research, tools, and guides that naturally earn citations.'],
    ['Outreach Emails That Respect Time', 'Write concise pitches with a clear reason to care.'],
    ['Unlinked Brand Mentions', 'Turn existing recognition into stronger references and relationships.'],
    ['Backlink Quality Audit', 'Review your link profile without relying on one vanity score.'],
  ],
  'Marketing': [
    ['Digital Marketing Basics', 'Choose channels that match your audience and business model.'],
    ['Conversion-Focused Landing Pages', 'Move from attention to action with clear page structure.'],
    ['Email List Growth', 'Build a useful newsletter people are happy to receive.'],
    ['SaaS Content Marketing', 'Create content for complex, research-heavy buying journeys.'],
    ['Marketing Analytics', 'Measure useful outcomes instead of collecting vanity metrics.'],
    ['Customer Research', 'Turn interviews and support conversations into better positioning.'],
    ['Social Content Systems', 'Build a repeatable workflow for useful short-form content.'],
    ['Product-Led SEO', 'Use templates, tools, and data to create valuable landing pages.'],
    ['Brand Positioning', 'Explain who you help, what changes, and why your approach is different.'],
  ]
}

function Logo() {
  return <a className="logo" href="#top" aria-label="HotTopBest home">
    <span className="logo-mark"><span /><span /><span /></span>
    <span>HotTop<span>Best</span></span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [articlesOpen, setArticlesOpen] = useState(false)
  const [articleCategory, setArticleCategory] = useState('Popular')
  return <header className="header">
    <div className="nav-wrap">
      <Logo />
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <button className={articlesOpen ? 'nav-link active' : 'nav-link'} onClick={() => setArticlesOpen(!articlesOpen)}>Articles <ChevronDown size={15} /></button>
        <a href="#tools">AI Tools</a>
        <a href="#checker">SEO Tools</a>
        <a href="#learn">Learn</a>
        <a href="#categories">Categories <ChevronDown size={15} /></a>
      </nav>
      <a className="nav-cta" href="#tools">Explore free tools <ArrowRight size={16} /></a>
    </div>
    {articlesOpen && <div className="mega-menu">
      <div className="mega-inner">
        <aside><div className="mega-title">Articles</div>{Object.keys(articleLibrary).map(name=><button key={name} className={articleCategory===name?'active':''} onMouseEnter={()=>setArticleCategory(name)} onClick={()=>setArticleCategory(name)}>{name}<ArrowRight size={15}/></button>)}</aside>
        <div className="mega-content"><div className="mega-content-head"><span>{articleCategory}</span><a href="#articles" onClick={()=>setArticlesOpen(false)}>View all articles <ArrowRight size={15}/></a></div><div className="mega-links">{articleLibrary[articleCategory].map(([title,desc])=><a href="#articles" onClick={()=>setArticlesOpen(false)} key={title}><b>{title}</b><span>{desc}</span></a>)}</div><div className="mega-promo"><span><b>Free growth tools:</b> Practical AI and SEO tools, all in one place.</span><a href="#tools" onClick={()=>setArticlesOpen(false)}>View tools <ArrowRight size={15}/></a></div></div>
        <button className="mega-close" onClick={()=>setArticlesOpen(false)} aria-label="Close articles menu"><X size={20}/></button>
      </div>
    </div>}
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

function ArticlesHub() {
  const [category, setCategory] = useState('Popular')
  const [expanded, setExpanded] = useState(null)
  return <section className="articles-hub" id="articles">
    <div className="articles-intro"><div><span className="section-kicker">ARTICLES</span><h2>Ideas worth<br/>putting to work.</h2></div><p>Original, practical guides for building visibility across search, AI, and every channel that matters.</p></div>
    <div className="article-browser">
      <aside>{Object.keys(articleLibrary).map(name=><button className={category===name?'active':''} onClick={()=>{setCategory(name);setExpanded(null)}} key={name}>{name}<ArrowRight size={15}/></button>)}</aside>
      <div className="article-list"><div className="article-list-head"><span>{category}</span><small>{articleLibrary[category].length} GUIDES</small></div>{articleLibrary[category].map(([title,desc],index)=><article className={expanded===index?'expanded':''} key={title} onClick={()=>setExpanded(expanded===index?null:index)}><div><span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowRight/></div>{expanded===index&&<section className="article-preview"><p><b>What you’ll learn:</b> This guide gives you a clear process you can apply immediately, with practical checks, examples, and decisions for each stage.</p><ul><li>Understand the core idea without unnecessary jargon.</li><li>Follow a focused step-by-step workflow.</li><li>Avoid the mistakes that waste the most time.</li></ul><button>Full guide coming soon <Sparkles size={15}/></button></section>}</article>)}</div>
    </div>
  </section>
}

function Newsletter() {
  const [done,setDone]=useState(false)
  return <section className="newsletter"><div><span className="section-kicker light">THE SMARTER GROWTH LETTER</span><h2>One useful idea,<br/>every Tuesday.</h2></div>{done?<div className="thanks"><Check/> You’re on the list. Welcome!</div>:<form onSubmit={e=>{e.preventDefault();setDone(true)}}><p>Join creators and marketers getting practical AI and SEO tips—no noise, no hype.</p><div><input type="email" required placeholder="you@email.com"/><button>Subscribe <ArrowRight size={17}/></button></div><small>Free forever. Unsubscribe anytime.</small></form>}</section>
}

function Footer() {
  return <footer><div className="footer-top"><div><Logo/><p>Practical AI and SEO tools<br/>for smarter, sustainable growth.</p></div><div><b>Tools</b><a href="#tools">AI tools</a><a href="#checker">SEO checker</a><a href="#tools">Content tools</a></div><div><b>Resources</b><a href="#learn">Guides</a><a href="#learn">Comparisons</a><a href="#learn">Newsletter</a></div><div><b>Company</b><a href="#top">About</a><a href="#top">Contact</a><a href="#top">Submit a tool</a></div></div><div className="footer-bottom"><span>© 2026 HotTopBest. Built for better work.</span><span><a href="#top">Privacy</a><a href="#top">Terms</a></span></div></footer>
}

function App(){return <><Header/><main><Hero/><Checker/><Tools/><ArticlesHub/><Workflow/><Learn/><Newsletter/></main><Footer/></>}

createRoot(document.getElementById('root')).render(<App />)
