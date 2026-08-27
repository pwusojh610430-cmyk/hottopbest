import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BarChart3, Bot, Braces, Check, ChevronDown, FileText,
  Image, Layers3, Menu, MousePointerClick, Search, ShieldCheck,
  Sparkles, WandSparkles, X, Zap
} from 'lucide-react'
import './styles.css'
import seoStrategyImg from './assets/articles/seo-strategy.png'
import aiVisibilityImg from './assets/articles/ai-visibility.png'
import seoToolkitImg from './assets/articles/seo-toolkit.png'
import backlinksImg from './assets/articles/backlinks.png'
import trafficImg from './assets/articles/website-traffic.png'
import competitorImg from './assets/articles/competitor-analysis.png'

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

const editorialArticles = [
  { tag:'SEO STRATEGY', title:'How to Build an Effective SEO Strategy in 2026', excerpt:'A focused plan for earning traffic, trust, and visibility across Google, AI search, YouTube, and communities.', read:'14 min read', image:seoStrategyImg, author:'Maya Chen', featured:true,
    sections:[['Start with the outcome','A useful SEO strategy begins with the business result you want—not a list of keywords. Define the audience, the decision you want to influence, and the evidence that will show progress.'],['Build a topic system','Group customer questions into a small number of themes. Create one dependable resource for each core theme, then support it with narrower guides that answer specific follow-up questions.'],['Measure useful progress','Track qualified visits, assisted conversions, branded discovery, citations, and returning readers. Rankings are a signal, but sustainable growth comes from helping the right people make a decision.']]},
  { tag:'TOOLS', title:'12 Free SEO Tools We Use Every Week', excerpt:'A lean toolkit for auditing pages, improving content, and keeping technical problems under control.', read:'11 min read', image:seoToolkitImg, author:'Noah Williams', sections:[['Choose tools around jobs','A long tool list creates more work. Start with the recurring jobs your team actually has: checking pages, validating structured data, compressing images, and planning content.'],['Create a simple stack','Use one primary tool for each job and document when to use it. A consistent workflow produces more reliable decisions than switching dashboards every week.'],['Review the stack quarterly','Remove tools that duplicate another product or no longer change decisions. Keep the workflow light enough that everyone can follow it.']]},
  { tag:'AI SEARCH', title:'Generative Engine Optimization: A Practical Guide', excerpt:'Make your content easier for answer engines to understand, retrieve, and cite accurately.', read:'13 min read', image:aiVisibilityImg, author:'Maya Chen', sections:[['Write for retrieval','Use descriptive headings, concise definitions, direct answers, and clear relationships between entities. This helps readers and machines understand the page quickly.'],['Make evidence visible','Support important claims with original experience, named sources, dates, and transparent methodology. Citation-worthy content is specific and easy to verify.'],['Strengthen your brand entity','Keep your organization name, expertise, people, and topical focus consistent across your website and trusted third-party profiles.']]},
  { tag:'AI VISIBILITY', title:'How to Earn More Brand Mentions in AI Answers', excerpt:'A modern visibility strategy built on useful expertise, credible citations, and consistent entities.', read:'10 min read', image:aiVisibilityImg, author:'Leila Morgan', sections:[['Own a clear subject','Brands become memorable when they repeatedly contribute useful information to a focused subject. Pick the conversations where your experience is genuinely distinctive.'],['Publish source material','Original research, practical tools, definitions, and expert examples give publishers and AI systems something concrete to reference.'],['Build distributed authority','Contribute to respected publications, communities, podcasts, and industry resources where your audience already learns.']]},
  { tag:'LINK BUILDING', title:'The New Rules of High-Quality Backlinks', excerpt:'Build authority through relevant editorial mentions instead of chasing arbitrary link scores.', read:'12 min read', image:backlinksImg, author:'Noah Williams', sections:[['Relevance before metrics','A mention inside a trusted, topically relevant article is more meaningful than a random link from a high-scoring domain. Evaluate the full editorial context.'],['Create reasons to cite','Data, useful tools, strong visual explanations, and first-hand expertise make outreach easier because the asset adds real value to the publisher’s page.'],['Protect long-term trust','Avoid automated placements, disguised sponsorships, and irrelevant exchanges. Sustainable authority compounds because real people choose to reference your work.']]},
  { tag:'GROWTH', title:'28 Practical Ways to Increase Website Traffic', excerpt:'A prioritized collection of acquisition ideas for search, partnerships, community, and retention.', read:'16 min read', image:trafficImg, author:'Sofia Patel', sections:[['Fix the path you already have','Improve pages that receive impressions but few clicks, update high-potential articles, and strengthen internal links before producing more content.'],['Add distribution to creation','Every substantial article needs a distribution plan: newsletter, community contribution, partner outreach, social derivatives, and direct follow-up with people quoted.'],['Turn visitors into an audience','Offer a genuinely useful reason to return. A focused newsletter, saved reports, and repeatable free tools make traffic more durable.']]},
  { tag:'COMPETITOR RESEARCH', title:'A Better AI + SEO Competitor Analysis', excerpt:'Find strategic gaps and audience needs without simply copying competitors’ keywords.', read:'15 min read', image:competitorImg, author:'Leila Morgan', sections:[['Compare customer journeys','Review how competitors address awareness, evaluation, and decision-stage questions. Missing steps often reveal better opportunities than missing keywords.'],['Inspect proof and differentiation','Look at examples, data, experts, tools, and product experience. Identify what would make your answer more useful and credible—not merely longer.'],['Choose where to be different','Use the research to make a deliberate choice about format, audience, point of view, or utility. The goal is a stronger alternative, not a replica.']]},
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
  const [selected, setSelected] = useState(null)
  const featured = editorialArticles[0]
  const highlights = editorialArticles.slice(1,5)
  const picks = [editorialArticles[4], editorialArticles[5], editorialArticles[1], editorialArticles[6], editorialArticles[2], editorialArticles[3]]
  return <section className="learn editorial" id="learn">
    <div className="editorial-label"><span className="section-kicker">FEATURED ARTICLES</span><a href="#articles">Browse the full library <ArrowRight size={16}/></a></div>
    <div className="featured-layout">
      <button className="featured-story" onClick={()=>setSelected(featured)}><img src={featured.image} alt="Illustration of an SEO strategy workspace"/><span>{featured.tag}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><small>By {featured.author} · {featured.read}</small></button>
      <div className="highlight-list">{highlights.map(article=><button onClick={()=>setSelected(article)} key={article.title}><img src={article.image} alt=""/><span><small>{article.tag}</small><b>{article.title}</b><em>{article.read}</em></span></button>)}</div>
    </div>
    <div className="editors-heading"><h2>Editor’s Picks</h2><p>Our most useful guides on AI visibility, content, search, and sustainable growth—hand-picked by the editors.</p></div>
    <div className="editors-grid">{picks.map((article,index)=><button onClick={()=>setSelected(article)} key={`${article.title}-${index}`}><img src={article.image} alt=""/><span><small>{article.tag}</small><b>{article.title}</b><em>{article.read} <ArrowRight size={14}/></em></span></button>)}</div>
    {selected && <div className="reader-backdrop" onClick={()=>setSelected(null)}><article className="article-reader" onClick={e=>e.stopPropagation()}><button className="reader-close" onClick={()=>setSelected(null)} aria-label="Close article"><X/></button><img src={selected.image} alt=""/><div className="reader-body"><small>{selected.tag} · {selected.read}</small><h1>{selected.title}</h1><p className="reader-deck">{selected.excerpt}</p><div className="reader-author">Written by <b>{selected.author}</b> · Updated August 2026</div>{selected.sections.map(([heading,body],i)=><section key={heading}><span>0{i+1}</span><div><h2>{heading}</h2><p>{body}</p></div></section>)}<div className="reader-takeaway"><Sparkles/><div><b>The practical takeaway</b><p>Choose one idea from this guide, apply it to a real page this week, and record the result. Small, measured improvements compound into a durable growth system.</p></div></div></div></article></div>}
  </section>
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
