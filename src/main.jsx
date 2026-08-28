import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BarChart3, Bot, Braces, Check, ChevronDown, FileText,
  Image, Layers3, Menu, MousePointerClick, Search, ShieldCheck,
  Sparkles, WandSparkles, X, Zap, Copy, Download, Upload, RotateCcw
} from 'lucide-react'
import './styles.css'
import seoStrategyImg from './assets/articles/seo-strategy.png'
import aiVisibilityImg from './assets/articles/ai-visibility.png'
import seoToolkitImg from './assets/articles/seo-toolkit.png'
import backlinksImg from './assets/articles/backlinks.png'
import trafficImg from './assets/articles/website-traffic.png'
import competitorImg from './assets/articles/competitor-analysis.png'
import onPageImg from './assets/articles/on-page-seo.png'
import seoCoursesImg from './assets/articles/seo-courses.png'
import authorityImg from './assets/articles/domain-authority.png'
import contentWorkflowImg from './assets/articles/content-workflow.png'
import technicalSeoImg from './assets/articles/technical-seo.png'
import popularSprite from './assets/articles/sprite-popular.png'
import aiSearchSprite from './assets/articles/sprite-ai-search.png'
import seoFundamentalsSprite from './assets/articles/sprite-seo-fundamentals.png'
import contentMarketingSprite from './assets/articles/sprite-content-marketing.png'
import linkBuildingSprite from './assets/articles/sprite-link-building.png'
import marketingSprite from './assets/articles/sprite-marketing.png'

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
  { tag:'AI VISIBILITY', title:'How to Earn More Brand Mentions in AI Answers', excerpt:'A modern visibility strategy built on useful expertise, credible citations, and consistent entities.', read:'10 min read', image:technicalSeoImg, author:'Leila Morgan', sections:[['Own a clear subject','Brands become memorable when they repeatedly contribute useful information to a focused subject. Pick the conversations where your experience is genuinely distinctive.'],['Publish source material','Original research, practical tools, definitions, and expert examples give publishers and AI systems something concrete to reference.'],['Build distributed authority','Contribute to respected publications, communities, podcasts, and industry resources where your audience already learns.']]},
  { tag:'LINK BUILDING', title:'The New Rules of High-Quality Backlinks', excerpt:'Build authority through relevant editorial mentions instead of chasing arbitrary link scores.', read:'12 min read', image:backlinksImg, author:'Noah Williams', sections:[['Relevance before metrics','A mention inside a trusted, topically relevant article is more meaningful than a random link from a high-scoring domain. Evaluate the full editorial context.'],['Create reasons to cite','Data, useful tools, strong visual explanations, and first-hand expertise make outreach easier because the asset adds real value to the publisher’s page.'],['Protect long-term trust','Avoid automated placements, disguised sponsorships, and irrelevant exchanges. Sustainable authority compounds because real people choose to reference your work.']]},
  { tag:'GROWTH', title:'28 Practical Ways to Increase Website Traffic', excerpt:'A prioritized collection of acquisition ideas for search, partnerships, community, and retention.', read:'16 min read', image:trafficImg, author:'Sofia Patel', sections:[['Fix the path you already have','Improve pages that receive impressions but few clicks, update high-potential articles, and strengthen internal links before producing more content.'],['Add distribution to creation','Every substantial article needs a distribution plan: newsletter, community contribution, partner outreach, social derivatives, and direct follow-up with people quoted.'],['Turn visitors into an audience','Offer a genuinely useful reason to return. A focused newsletter, saved reports, and repeatable free tools make traffic more durable.']]},
  { tag:'COMPETITOR RESEARCH', title:'A Better AI + SEO Competitor Analysis', excerpt:'Find strategic gaps and audience needs without simply copying competitors’ keywords.', read:'15 min read', image:competitorImg, author:'Leila Morgan', sections:[['Compare customer journeys','Review how competitors address awareness, evaluation, and decision-stage questions. Missing steps often reveal better opportunities than missing keywords.'],['Inspect proof and differentiation','Look at examples, data, experts, tools, and product experience. Identify what would make your answer more useful and credible—not merely longer.'],['Choose where to be different','Use the research to make a deliberate choice about format, audience, point of view, or utility. The goal is a stronger alternative, not a replica.']]},
  { tag:'ON-PAGE SEO', title:'On-Page SEO: A Practical Optimization Guide', excerpt:'Improve page structure, relevance, usability, and search presentation without keyword stuffing.', read:'13 min read', image:onPageImg, author:'Sofia Patel', sections:[['Match the real intent','Study the decision behind the query and make the page format, depth, and examples fit that need.'],['Make structure obvious','Use one descriptive title, a clear H1, useful subheadings, short sections, and internal links that help readers continue.'],['Improve the search preview','Write accurate titles and descriptions that set the right expectation and give the right reader a reason to click.']]},
  { tag:'LEARNING', title:'9 SEO Courses Worth Your Time in 2026', excerpt:'A focused learning path covering foundations, technical skills, content, analytics, and AI search.', read:'9 min read', image:seoCoursesImg, author:'Maya Chen', sections:[['Learn in the right order','Start with crawling, indexing, intent, and page quality before moving into specialized tactics.'],['Practice on a real site','Every lesson should produce a visible change, documented hypothesis, or measurable experiment.'],['Build a reference system','Keep your notes, checklists, examples, and results in one place so the knowledge becomes reusable.']]},
  { tag:'AUTHORITY', title:'7 Sustainable Ways to Build Website Authority', excerpt:'Strengthen trust with expertise, original resources, editorial mentions, and consistent brand signals.', read:'12 min read', image:authorityImg, author:'Noah Williams', sections:[['Publish proof','Show real experience through original data, screenshots, examples, and transparent methodology.'],['Earn relevant recognition','Contribute genuinely useful ideas to the publications and communities your audience already trusts.'],['Stay consistent','Authority compounds when your expertise, people, positioning, and editorial standards remain clear over time.']]},
  { tag:'CONTENT', title:'Build a Content Workflow People Actually Enjoy', excerpt:'Create a calmer system for research, writing, editing, publishing, and distribution.', read:'10 min read', image:contentWorkflowImg, author:'Leila Morgan', sections:[['Define each handoff','Make ownership, inputs, outputs, and approval criteria clear at every stage.'],['Separate creation from review','Give writers room to draft, then review structure, accuracy, voice, and polish in focused passes.'],['Finish with distribution','Treat promotion and repurposing as part of publishing, not an optional task added at the end.']]},
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

const articleSlug = title => title.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const articleHref = title => `/articles/${articleSlug(title)}`
const toolSlug = name => articleSlug(name)
const toolHref = name => `/tools/${toolSlug(name)}`

function getArticleBySlug(slug) {
  const editorial = editorialArticles.find(item=>articleSlug(item.title)===slug)
  if (editorial) return editorial
  for (const [category,items] of Object.entries(articleLibrary)) {
    const found=items.find(([title])=>articleSlug(title)===slug)
    if(found){const [title,excerpt]=found;return {title,excerpt,tag:category.toUpperCase(),read:'10 min read',author:'HotTopBest Editorial',image:category==='AI Search'?aiVisibilityImg:category==='Link Building'?backlinksImg:category==='Content Marketing'?contentWorkflowImg:category==='SEO Fundamentals'?technicalSeoImg:seoStrategyImg,sections:[
      ['What this topic means',`${excerpt} The useful starting point is understanding how this idea affects real visitors, how discovery systems interpret the page, and what a strong implementation looks like in practice.`],
      ['Why it matters now','Search behavior is spreading across traditional results, AI answers, communities, video, and trusted publications. A good strategy connects these surfaces instead of optimizing each one in isolation.'],
      ['A practical step-by-step approach','Start with one clear outcome. Review what already exists, identify the biggest gap, make one focused improvement, and document the result before expanding the process.'],
      ['Common mistakes to avoid','Avoid copying competitors without context, optimizing for a score instead of a person, adding tools before defining the job, and publishing claims that readers cannot verify.'],
      ['How to measure progress','Combine leading indicators such as coverage, technical quality, engagement, and citations with outcomes such as qualified visits, signups, assisted conversions, and returning readers.']
    ]}}
  }
  return null
}

function Logo() {
  return <a className="logo" href="/" aria-label="HotTopBest home">
    <span className="logo-mark"><span /><span /><span /></span>
    <span>HotTop<span>Best</span></span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [articlesOpen, setArticlesOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [articleCategory, setArticleCategory] = useState('Popular')
  return <header className="header">
    <div className="nav-wrap">
      <Logo />
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <button className={articlesOpen ? 'nav-link active' : 'nav-link'} onClick={() => {setArticlesOpen(!articlesOpen);setCategoriesOpen(false)}} aria-expanded={articlesOpen} aria-controls="articles-menu">Articles <ChevronDown className={articlesOpen?'chevron-open':''} size={15} /></button>
        <a href="/ai-tools">AI Tools</a>
        <a href="/seo-tools">SEO Tools</a>
        <a href="/learn">Learn</a>
        <button className={categoriesOpen ? 'nav-link active' : 'nav-link'} onClick={() => {setCategoriesOpen(!categoriesOpen);setArticlesOpen(false)}} aria-expanded={categoriesOpen} aria-controls="categories-menu">Categories <ChevronDown className={categoriesOpen?'chevron-open':''} size={15} /></button>
      </nav>
      <a className="nav-cta" href="/seo-tools">Explore free tools <ArrowRight size={16} /></a>
    </div>
    {articlesOpen && <div className="mega-menu" id="articles-menu">
      <div className="mega-inner">
        <aside><div className="mega-title">Articles</div>{Object.keys(articleLibrary).map(name=><button key={name} className={articleCategory===name?'active':''} onMouseEnter={()=>setArticleCategory(name)} onClick={()=>setArticleCategory(name)}>{name}<ArrowRight size={15}/></button>)}</aside>
        <div className="mega-content"><div className="mega-content-head"><span>{articleCategory}</span><a href="/learn" onClick={()=>setArticlesOpen(false)}>View all articles <ArrowRight size={15}/></a></div><div className="mega-links">{articleLibrary[articleCategory].map(([title,desc])=><a href={articleHref(title)} onClick={()=>setArticlesOpen(false)} key={title}><b>{title}</b><span>{desc}</span></a>)}</div><div className="mega-promo"><span><b>Free growth tools:</b> Practical AI and SEO tools, all in one place.</span><a href="/seo-tools" onClick={()=>setArticlesOpen(false)}>View tools <ArrowRight size={15}/></a></div></div>
        <button className="mega-close" onClick={()=>setArticlesOpen(false)} aria-label="Close articles menu"><X size={20}/></button>
      </div>
    </div>}
    {categoriesOpen && <div className="category-menu" id="categories-menu"><div className="category-menu-inner"><div className="category-menu-head"><div><span>EXPLORE BY TOPIC</span><h2>Categories</h2></div><a href="/categories" onClick={()=>setCategoriesOpen(false)}>View all categories <ArrowRight size={15}/></a></div><div className="category-menu-grid">{[
      ['SEO','Audit and improve website visibility.',Search,'/seo-tools'],
      ['AI & Writing','Create clearer, more useful content.',Sparkles,'/ai-tools'],
      ['AI Search','Prepare content for answer engines.',Bot,articleHref('AI Search Optimization')],
      ['Content Marketing','Build a repeatable publishing system.',FileText,'/learn#visual-content-marketing'],
      ['Link Building','Earn relevant editorial mentions.',Layers3,'/learn#visual-link-building'],
      ['Developer','Generate schema and technical files.',Braces,toolHref('Schema Generator')]
    ].map(([name,description,Icon,href])=><a href={href} onClick={()=>setCategoriesOpen(false)} key={name}><span className="category-menu-icon"><Icon size={19}/></span><span><b>{name}</b><small>{description}</small></span><ArrowRight size={15}/></a>)}</div><button className="mega-close" onClick={()=>setCategoriesOpen(false)} aria-label="Close categories menu"><X size={20}/></button></div></div>}
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
        <a className="btn primary" href="/seo-tools">Explore all tools <ArrowRight size={18} /></a>
        <a className="btn text" href={toolHref('SEO Site Checker')}><span className="play">▶</span> Run a free site check</a>
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
    window.location.assign(`${toolHref('SEO Site Checker')}?url=${encodeURIComponent(url.trim())}`)
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
    <a className="tool-card-link" href={toolHref(tool.name)}>Try it free <ArrowRight size={16}/></a>
  </article>
}

const cleanText = text => text.trim().replace(/\s+/g,' ')
const titleCase = text => cleanText(text).replace(/\b\w/g, c=>c.toUpperCase())

function ToolModal({ tool, onClose }) {
  const [input,setInput] = useState('')
  const [extra,setExtra] = useState('')
  const [result,setResult] = useState('')
  const [copied,setCopied] = useState(false)
  const [imageInfo,setImageInfo] = useState(null)

  function run() {
    const value = cleanText(input)
    if (!value && tool.name !== 'Image Compressor') return setResult('Please add some information first.')
    if (tool.name === 'AI Article Outline') {
      const topic = titleCase(value)
      setResult(`# ${topic}\n\n## Introduction\n- Define the problem and who this guide helps\n- Explain the outcome readers can expect\n\n## 1. What Is ${topic}?\n- Clear definition\n- Why it matters now\n\n## 2. Before You Get Started\n- Requirements and useful context\n- Common misconceptions\n\n## 3. Step-by-Step Process\n### Step 1: Establish your goal\n### Step 2: Build the foundation\n### Step 3: Put the plan into action\n### Step 4: Review the result\n\n## 4. Common Mistakes to Avoid\n- Mistake one and how to prevent it\n- Mistake two and how to prevent it\n\n## 5. Practical Examples\n- Beginner example\n- Advanced example\n\n## Conclusion\n- Summarize the process\n- Give the reader one clear next action`)
    } else if (tool.name === 'Meta Description Writer') {
      const trimmed = value.slice(0,125).replace(/[.!?]?$/, '')
      setResult(`${trimmed}. Learn the key steps, practical tips, and examples you need to get started today.`.slice(0,160))
    } else if (tool.name === 'Schema Generator') {
      setResult(JSON.stringify({'@context':'https://schema.org','@type':extra||'Article','headline':titleCase(value),'description':`A practical guide to ${value.toLowerCase()}.`,'url':'https://example.com/'+value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),'dateModified':new Date().toISOString().slice(0,10),'author':{'@type':'Organization','name':'HotTopBest'}},null,2))
    } else if (tool.name === 'llms.txt Generator') {
      const site = extra || 'https://example.com'
      setResult(`# ${titleCase(value)}\n\n> ${titleCase(value)} provides practical AI and SEO resources for creators and growing teams.\n\n## Core resources\n- [Home](${site})\n- [Free tools](${site}/tools): Browser-based AI and SEO utilities\n- [Articles](${site}/articles): Practical growth guides\n- [About](${site}/about): Editorial standards and team\n\n## Usage\nPublic pages may be crawled for discovery and citation. Attribute factual claims to the original page URL.\n\n## Contact\n- [Contact](${site}/contact)`)
    } else if (tool.name === 'Social Post Writer') {
      setResult(`Most people overcomplicate ${value.toLowerCase()}.\n\nHere’s a simpler approach:\n\n1. Start with one clear outcome\n2. Remove steps that don’t change the result\n3. Measure what your audience actually does\n4. Improve one thing at a time\n\nThe best system is the one your team can repeat.\n\nWhat would you add?\n\n#Marketing #Growth #ContentStrategy`)
    } else if (tool.name === 'Content Rewriter') {
      const sentences = input.trim().split(/(?<=[.!?])\s+/).filter(Boolean)
      setResult(sentences.map(s=>s.replace(/\b(very|really|actually|basically|just)\b\s*/gi,'').replace(/in order to/gi,'to').replace(/due to the fact that/gi,'because')).join(' '))
    } else if (tool.name === 'SEO Site Checker') {
      const html = input
      const tests = [
        ['Title tag',/<title[^>]*>[^<]{10,65}<\/title>/i.test(html),'Add one descriptive title between 10 and 65 characters.'],
        ['Meta description',/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,170}["']/i.test(html)||/<meta[^>]+content=["'][^"']{50,170}["'][^>]+name=["']description["']/i.test(html),'Add a useful meta description.'],
        ['Single H1',(html.match(/<h1\b/gi)||[]).length===1,'Use exactly one clear H1.'],
        ['Canonical URL',/<link[^>]+rel=["']canonical["']/i.test(html),'Add a canonical link element.'],
        ['Image alt text',!/<img(?![^>]*\balt=)[^>]*>/i.test(html),'Add alt text to informative images.'],
        ['Language',/<html[^>]+lang=["'][a-z-]+["']/i.test(html),'Declare the page language on the html element.'],
        ['Mobile viewport',/<meta[^>]+name=["']viewport["']/i.test(html),'Add a responsive viewport meta tag.'],
        ['Open Graph',/<meta[^>]+property=["']og:title["']/i.test(html),'Add Open Graph metadata for sharing.']]
      const passed=tests.filter(t=>t[1]).length
      setResult(`SEO SCORE: ${Math.round(passed/tests.length*100)}/100\n\n${tests.map(([n,ok,fix])=>`${ok?'✓':'✕'} ${n}${ok?' — Passed':` — ${fix}`}`).join('\n')}`)
    }
  }

  async function compressImage(e) {
    const file=e.target.files?.[0]; if(!file)return
    const img=new window.Image(); const url=URL.createObjectURL(file)
    img.onload=()=>{const canvas=document.createElement('canvas');const max=1600;const scale=Math.min(1,max/Math.max(img.width,img.height));canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);canvas.toBlob(blob=>{const out=URL.createObjectURL(blob);setImageInfo({name:file.name.replace(/\.[^.]+$/,'.webp'),before:file.size,after:blob.size,url:out})},'image/webp',.78);URL.revokeObjectURL(url)};img.src=url
  }
  async function copyResult(){await navigator.clipboard.writeText(result);setCopied(true);setTimeout(()=>setCopied(false),1500)}
  const help = { 'SEO Site Checker':'Paste the HTML source of a page to check eight essential on-page signals.', 'AI Article Outline':'Enter the topic you want to turn into a structured article.', 'Schema Generator':'Enter an article or page title and choose the schema type.', 'Meta Description Writer':'Describe your page in one sentence.', 'Image Compressor':'Choose an image. It stays in your browser and is never uploaded.', 'llms.txt Generator':'Enter your brand name and website URL.', 'Social Post Writer':'Enter the idea, URL summary, or topic you want to share.', 'Content Rewriter':'Paste text to make it clearer and more concise.'}[tool.name]
  return <div className="tool-modal-backdrop" onClick={onClose}><section className="tool-modal" onClick={e=>e.stopPropagation()}><button className="tool-modal-close" onClick={onClose}><X/></button><div className={`tool-icon ${tool.color}`}>{React.createElement(tool.icon,{size:26})}</div><small>{tool.category} TOOL</small><h2>{tool.name}</h2><p>{help}</p>
    {tool.name==='Image Compressor'?<label className="image-drop"><Upload/><b>Select an image</b><span>PNG, JPG or WebP</span><input type="file" accept="image/*" onChange={compressImage}/></label>:<><textarea value={input} onChange={e=>setInput(e.target.value)} placeholder={tool.name==='SEO Site Checker'?'Paste your page HTML here…':'Type or paste your content here…'}/>{tool.name==='Schema Generator'&&<select value={extra} onChange={e=>setExtra(e.target.value)}><option>Article</option><option>Product</option><option>FAQPage</option><option>Organization</option></select>}{tool.name==='llms.txt Generator'&&<input className="extra-input" value={extra} onChange={e=>setExtra(e.target.value)} placeholder="https://yourwebsite.com"/>}<button className="run-tool" onClick={run}><Sparkles size={17}/> Generate result</button></>}
    {imageInfo&&<div className="image-result"><Check/><div><b>{Math.round((1-imageInfo.after/imageInfo.before)*100)}% smaller</b><span>{(imageInfo.before/1024).toFixed(0)} KB → {(imageInfo.after/1024).toFixed(0)} KB</span></div><a href={imageInfo.url} download={imageInfo.name}><Download/> Download</a></div>}
    {result&&<div className="tool-result"><div><b>Your result</b><button onClick={copyResult}>{copied?<Check/>:<Copy/>}{copied?'Copied':'Copy'}</button></div><pre>{result}</pre></div>}
  </section></div>
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
    <div className="all-tools"><a className="btn dark" href="/seo-tools">View all free tools <ArrowRight size={18}/></a><span>8 tools available now · more coming soon</span></div>
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
  const picks = editorialArticles.slice(5,11)
  return <section className="learn editorial" id="learn">
    <div className="editorial-label"><span className="section-kicker">FEATURED ARTICLES</span><a href="/learn">Browse the full library <ArrowRight size={16}/></a></div>
    <div className="featured-layout">
      <button className="featured-story" onClick={()=>window.location.assign(articleHref(featured.title))}><img src={featured.image} alt="Illustration of an SEO strategy workspace"/><span>{featured.tag}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><small>By {featured.author} · {featured.read}</small></button>
      <div className="highlight-list">{highlights.map(article=><button onClick={()=>window.location.assign(articleHref(article.title))} key={article.title}><img src={article.image} alt=""/><span><small>{article.tag}</small><b>{article.title}</b><em>{article.read}</em></span></button>)}</div>
    </div>
    <div className="editors-heading"><h2>Editor’s Picks</h2><p>Our most useful guides on AI visibility, content, search, and sustainable growth—hand-picked by the editors.</p></div>
    <div className="editors-grid">{picks.map((article,index)=><button onClick={()=>window.location.assign(articleHref(article.title))} key={`${article.title}-${index}`}><img src={article.image} alt=""/><span><small>{article.tag}</small><b>{article.title}</b><em>{article.read} <ArrowRight size={14}/></em></span></button>)}</div>
    {selected && <div className="reader-backdrop" onClick={()=>setSelected(null)}><article className="article-reader" onClick={e=>e.stopPropagation()}><button className="reader-close" onClick={()=>setSelected(null)} aria-label="Close article"><X/></button><img src={selected.image} alt=""/><div className="reader-body"><small>{selected.tag} · {selected.read}</small><h1>{selected.title}</h1><p className="reader-deck">{selected.excerpt}</p><div className="reader-author">Written by <b>{selected.author}</b> · Updated August 2026</div>{selected.sections.map(([heading,body],i)=><section key={heading}><span>0{i+1}</span><div><h2>{heading}</h2><p>{body}</p></div></section>)}<div className="reader-takeaway"><Sparkles/><div><b>The practical takeaway</b><p>Choose one idea from this guide, apply it to a real page this week, and record the result. Small, measured improvements compound into a durable growth system.</p></div></div></div></article></div>}
  </section>
}

function ArticlesHub() {
  const [category, setCategory] = useState('Popular')
  return <section className="articles-hub" id="articles">
    <div className="articles-intro"><div><span className="section-kicker">ARTICLES</span><h2>Ideas worth<br/>putting to work.</h2></div><p>Original, practical guides for building visibility across search, AI, and every channel that matters.</p></div>
    <div className="article-browser">
      <aside>{Object.keys(articleLibrary).map(name=><button className={category===name?'active':''} onClick={()=>setCategory(name)} key={name}>{name}<ArrowRight size={15}/></button>)}</aside>
      <div className="article-list"><div className="article-list-head"><span>{category}</span><small>{articleLibrary[category].length} GUIDES</small></div>{articleLibrary[category].map(([title,desc],index)=><a className="article-row-link" href={articleHref(title)} key={title}><div><span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowRight/></div></a>)}</div>
    </div>
  </section>
}

function Newsletter() {
  return <section className="newsletter"><div><span className="section-kicker light">THE SMARTER GROWTH LETTER</span><h2>One useful idea,<br/>every Tuesday.</h2></div><form onSubmit={e=>{e.preventDefault();window.location.assign('/newsletter')}}><p>Join creators and marketers getting practical AI and SEO tips—no noise, no hype.</p><div><input type="email" required placeholder="you@email.com"/><button>Subscribe <ArrowRight size={17}/></button></div><small>Free forever. Unsubscribe anytime.</small></form></section>
}

const seoToolGroups = [
  { title:'Technical SEO', description:'Audit the essentials that help search engines and AI systems access, understand, and present your pages.', names:['SEO Site Checker','Schema Generator','llms.txt Generator','Image Compressor'] },
  { title:'Content Optimization', description:'Plan clearer pages, improve search snippets, and turn rough drafts into useful content.', names:['AI Article Outline','Meta Description Writer','Content Rewriter'] },
  { title:'Promotion & Distribution', description:'Transform strong ideas into focused social posts that bring the right readers back to your site.', names:['Social Post Writer'] },
]

function SeoToolsPage() {
  const [activeTool,setActiveTool]=useState(null)
  const [query,setQuery]=useState('')
  const matching = name => name.toLowerCase().includes(query.toLowerCase())
  return <><Header/><main className="seo-page">
    <section className="seo-page-hero"><div className="seo-page-hero-inner"><span className="section-kicker light">FREE SEO & AI TOOLS</span><h1>Grow your website<br/><em>with less guesswork.</em></h1><p>Audit pages, improve content, generate technical files, and prepare your website for search and AI—all without an account.</p><div className="seo-hero-actions"><button onClick={()=>setActiveTool(tools[0])}>Run a free SEO check <ArrowRight/></button><a href="#all-seo-tools">Explore all tools</a></div><div className="seo-hero-proof"><span><Check/> Free to use</span><span><Check/> No signup</span><span><Check/> Files stay private</span></div></div><div className="seo-page-art"><div className="audit-window"><div className="audit-bar"><i/><i/><i/><span>yourwebsite.com</span></div><div className="audit-content"><div className="audit-score"><b>92</b><span>SEO score</span></div><div className="audit-lines"><i/><i/><i/><i/></div></div><div className="audit-success"><Check/><span><b>Great foundation</b><small>3 improvements found</small></span></div></div></div></section>
    <section className="seo-page-intro" id="all-seo-tools"><div><span className="section-kicker">TOOL DIRECTORY</span><h2>Free tools for every<br/>stage of growth.</h2></div><div><p>Use one tool for a quick task, or combine them into a repeatable workflow for your website.</p><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search all tools"/></label></div></section>
    <section className="seo-groups">{seoToolGroups.map(group=>{const groupTools=tools.filter(t=>group.names.includes(t.name)&&matching(t.name));if(!groupTools.length)return null;return <div className="seo-group" key={group.title}><aside><span>{String(seoToolGroups.indexOf(group)+1).padStart(2,'0')}</span><h2>{group.title}</h2><p>{group.description}</p></aside><div className="seo-group-grid">{groupTools.map(tool=><ToolCard key={tool.name} tool={tool} onOpen={setActiveTool}/>)}</div></div>})}</section>
    <section className="seo-how"><div><span className="section-kicker light">A SIMPLE WORKFLOW</span><h2>Check. Improve.<br/>Publish confidently.</h2></div><ol><li><span>01</span><div><b>Find the issue</b><p>Run a focused audit or identify the content task slowing you down.</p></div></li><li><span>02</span><div><b>Create the fix</b><p>Use the matching tool to generate, optimize, or validate your work.</p></div></li><li><span>03</span><div><b>Put it to work</b><p>Copy the result, download the file, and apply it to your website.</p></div></li></ol></section>
    <section className="seo-faq"><span className="section-kicker">COMMON QUESTIONS</span><h2>Free SEO tools, explained.</h2><div>{[['Are these tools really free?','Yes. Every tool on this page works without an account or payment.'],['Do you upload my images or content?','No. The current tools run directly in your browser. Image compression and text processing stay on your device.'],['Does the SEO score use paid backlink data?','No. The checker reviews on-page HTML signals only. It does not claim to provide backlink, traffic, or proprietary authority data.'],['Can I use the generated output commercially?','Yes. You can use and edit the generated outlines, metadata, schema, social posts, and technical files for your own projects.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    {activeTool&&<ToolModal tool={activeTool} onClose={()=>setActiveTool(null)}/>} 
  </main><Footer/></>
}

const learningPaths = [
  { label:'START HERE', title:'SEO Foundations', description:'Understand crawling, intent, page quality, and measurement before moving into advanced tactics.', lessons:8, icon:Search },
  { label:'MODERN SEARCH', title:'AI Visibility', description:'Prepare your brand and content for AI discovery, retrieval, citations, and recommendations.', lessons:7, icon:Bot },
  { label:'CREATE BETTER', title:'Content Systems', description:'Plan, produce, edit, distribute, and refresh useful content with a repeatable workflow.', lessons:9, icon:FileText },
]

const visualArticleImages=[seoStrategyImg,seoToolkitImg,aiVisibilityImg,technicalSeoImg,backlinksImg,trafficImg,competitorImg,onPageImg,seoCoursesImg,authorityImg,contentWorkflowImg]
const visualIcons=[Search,Bot,FileText,BarChart3,Braces,ShieldCheck,Layers3,WandSparkles,MousePointerClick,Zap]
const allLearnArticles=Object.entries(articleLibrary).flatMap(([category,items])=>items.map(([title,excerpt])=>({title,excerpt,category})))
const categorySprites={'Popular':popularSprite,'AI Search':aiSearchSprite,'SEO Fundamentals':seoFundamentalsSprite,'Content Marketing':contentMarketingSprite,'Link Building':linkBuildingSprite,'Marketing':marketingSprite}

function ArticleThumb({index,title,category,categoryIndex}){
  if(index<visualArticleImages.length)return <img src={visualArticleImages[index]} alt={`Illustration for ${title}`}/>
  const cell=categoryIndex%9,x=(cell%3)*50,row=Math.floor(cell/3),y=(category==='Popular'?[0,50,100]:[9,50,91])[row]
  return <div className="sprite-thumb" style={{backgroundImage:`url(${categorySprites[category]})`,backgroundPosition:`${x}% ${y}%`}} role="img" aria-label={`Editorial illustration for ${title}`}/>
}

function LearnPage() {
  const featuredVisual=allLearnArticles.slice(0,5)
  return <><Header/><main className="learn-page">
    <section className="learn-hero"><div><span className="section-kicker">HOTTOPBEST LEARNING CENTER</span><h1>Learn how to grow<br/>in search and AI.</h1><p>Clear, practical guides for creators, marketers, and small teams—organized so you always know what to learn next.</p><a href="#learning-paths">Choose a learning path <ArrowRight/></a></div><div className="learn-hero-stack"><span className="stack-card s-one"><Bot/><b>AI Search</b><small>7 practical guides</small></span><span className="stack-card s-two"><Search/><b>SEO Fundamentals</b><small>9 essential lessons</small></span><span className="stack-card s-three"><FileText/><b>Content Systems</b><small>Build a better workflow</small></span></div></section>
    <section className="learn-featured full-visual-library"><div className="learn-page-heading"><span className="section-kicker">EDITOR’S ESSENTIALS</span><h2>Start with our most useful guides.</h2><p>57 visual guides with current strategies, original explanations, and practical next steps—without the filler.</p></div><div className="visual-filter-row">{Object.keys(articleLibrary).map(category=><a href={`#visual-${articleSlug(category)}`} key={category}>{category}<span>{articleLibrary[category].length}</span></a>)}</div><div className="visual-feature-layout">{featuredVisual.map((article,index)=><button className={index===0?'lead':''} onClick={()=>window.location.assign(articleHref(article.title))} key={article.title}><ArticleThumb index={index} title={article.title} category={article.category} categoryIndex={index}/><span><small>{article.category}</small><b>{article.title}</b><p>{article.excerpt}</p><em>{8+(index%9)} min read <ArrowRight/></em></span></button>)}</div><div className="visual-category-list">{Object.entries(articleLibrary).map(([category,items])=>{const visibleItems=category==='Popular'?items.slice(5):items;const globalOffset=allLearnArticles.findIndex(a=>a.category===category)+(category==='Popular'?5:0);return <section id={`visual-${articleSlug(category)}`} key={category}><div className="visual-category-heading"><div><span>EXPLORE TOPIC</span><h3>{category}</h3></div><small>{visibleItems.length} guides</small></div><div className="visual-standard-grid">{visibleItems.map(([title,excerpt],localIndex)=><button onClick={()=>window.location.assign(articleHref(title))} key={title}><ArticleThumb index={globalOffset+localIndex} title={title} category={category} categoryIndex={localIndex+(category==='Popular'?5:0)}/><span><small>{category}</small><b>{title}</b><p>{excerpt}</p><em>{8+((globalOffset+localIndex)%9)} min read <ArrowRight/></em></span></button>)}</div></section>})}</div></section>
    <section className="learning-paths" id="learning-paths"><div className="learn-page-heading"><span className="section-kicker light">GUIDED LEARNING</span><h2>Pick a path. Build a skill.</h2><p>Follow a focused sequence instead of jumping between disconnected tactics.</p></div><div>{learningPaths.map((path,index)=>{const Icon=path.icon;return <article key={path.title}><span>0{index+1}</span><div className="path-icon"><Icon/></div><small>{path.label}</small><h3>{path.title}</h3><p>{path.description}</p><b>{path.lessons} lessons <ArrowRight/></b></article>})}</div></section>
    <section className="learn-newsletter"><div><span className="section-kicker light">LEARN SOMETHING USEFUL</span><h2>One practical growth lesson every Tuesday.</h2></div><form onSubmit={e=>e.preventDefault()}><input required type="email" placeholder="you@email.com"/><button>Join free <ArrowRight/></button></form></section>
  </main><Footer/></>
}

function ArticlePage({ article }) {
  const [copied,setCopied]=useState(false)
  if(!article)return <><Header/><main className="not-found"><span>404</span><h1>We couldn’t find that article.</h1><a href="/learn">Browse the learning center <ArrowRight/></a></main><Footer/></>
  const related=editorialArticles.filter(a=>a.title!==article.title).slice(0,3)
  const copyLink=async()=>{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),1500)}
  return <><Header/><main className="article-page">
    <section className="article-hero"><div className="article-breadcrumb"><a href="/learn">Learn</a><span>/</span><a href="/learn">{article.tag}</a></div><span className="section-kicker">{article.tag}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-byline"><span className="author-avatar">{article.author.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><div>Written by <b>{article.author}</b><small>Last updated August 28, 2026 · {article.read}</small></div></div></section>
    {article.image&&<div className="article-cover"><img src={article.image} alt={`Editorial illustration for ${article.title}`}/></div>}
    <div className="article-layout"><aside className="article-toc"><b>In this guide</b>{article.sections.map(([heading],i)=><a href={`#section-${i}`} key={heading}><span>0{i+1}</span>{heading}</a>)}<button onClick={copyLink}>{copied?<Check/>:<Copy/>}{copied?'Link copied':'Share this guide'}</button></aside><article className="article-content"><p className="article-opening">Good strategies reduce uncertainty. This guide turns <b>{article.title.toLowerCase()}</b> into a practical process you can apply to a real website, measure, and improve over time.</p><div className="article-callout"><Sparkles/><div><b>What you’ll get from this guide</b><p>A clear definition, an implementation workflow, common mistakes to avoid, and a simple way to measure progress.</p></div></div>{article.sections.map(([heading,body],i)=><section id={`section-${i}`} key={heading}><span className="content-number">0{i+1}</span><h2>{heading}</h2><p>{body}</p><p>{i%2===0?'The goal is not to complete a checklist for its own sake. Use each recommendation to make the page clearer, more credible, and easier for the right audience to act on.':'Keep the first version deliberately simple. A focused improvement with a recorded result teaches you more than a complicated system that nobody maintains.'}</p>{i===1&&<blockquote><b>Make it useful before making it bigger.</b><span>Strong visibility comes from clarity, evidence, and consistent execution—not content volume alone.</span></blockquote>}{i===2&&<ul><li>Choose one clear outcome and audience.</li><li>Review the current experience before adding anything new.</li><li>Document what changed and why.</li><li>Measure behavior and business impact together.</li></ul>}</section>)}<div className="article-tool-cta"><div><span>FREE TOOL</span><h3>Turn this guide into action.</h3><p>Use HotTopBest’s browser-based tools to audit, write, validate, and improve your next page.</p></div><a href="/seo-tools">Explore free tools <ArrowRight/></a></div><section><h2>Your next step</h2><p>Pick one important page and apply the first recommendation today. Record the baseline, make the improvement, and return after enough real visitors have experienced the change. That feedback loop is where useful strategy becomes sustainable growth.</p></section></article></div>
    <section className="article-related"><span className="section-kicker">KEEP LEARNING</span><h2>Related guides</h2><div>{related.map(item=><a href={articleHref(item.title)} key={item.title}><img src={item.image} alt=""/><small>{item.tag}</small><b>{item.title}</b><span>{item.read} <ArrowRight/></span></a>)}</div></section>
  </main><Footer/></>
}

function AiToolsPage() {
  const [activeTool,setActiveTool]=useState(null)
  const aiTools=tools.filter(t=>['AI Article Outline','Meta Description Writer','Social Post Writer','Content Rewriter'].includes(t.name))
  return <><Header/><main className="utility-page"><section className="utility-hero"><span className="section-kicker light">FREE AI TOOLS</span><h1>Create better work,<br/>one focused task at a time.</h1><p>Practical writing and marketing utilities that work in your browser—no complicated workspace, account, or setup.</p><a href="#content-tools">Explore AI tools <ArrowRight/></a></section><section className="utility-directory" id="content-tools"><div className="utility-heading"><span className="section-kicker">AI TOOLBOX</span><h2>Simple tools for clearer content.</h2><p>Choose a task, add your input, and get a useful starting point you can edit and make your own.</p></div><div className="tool-grid">{aiTools.map(tool=><ToolCard key={tool.name} tool={tool} onOpen={setActiveTool}/>)}</div></section><section className="utility-benefits"><div><ShieldCheck/><b>Private by default</b><p>Current text processing happens directly in your browser.</p></div><div><Zap/><b>Focused results</b><p>Each tool is designed around one clear content job.</p></div><div><WandSparkles/><b>Built to edit</b><p>Use every result as a starting point, then add your expertise.</p></div></section>{activeTool&&<ToolModal tool={activeTool} onClose={()=>setActiveTool(null)}/>}</main><Footer/></>
}

const comparisons=[
  ['SEO Site Checker vs Manual Audit','Speed, depth, and when each approach makes sense.','SEO'],
  ['AI Outlines vs Blank-Page Writing','Where structure helps—and where human judgment matters.','CONTENT'],
  ['Schema Generators Compared','What to check before publishing generated structured data.','TECHNICAL'],
  ['WebP vs PNG vs JPEG','Choose the right image format for quality and performance.','PERFORMANCE'],
  ['SEO Strategy vs SEO Tactics','Build a durable direction without ignoring quick wins.','STRATEGY'],
  ['AI Search vs Traditional Search','How discovery, citations, and user behavior are changing.','AI SEARCH']]

function ComparisonsPage(){return <><Header/><main className="comparison-page"><section className="simple-hero"><span className="section-kicker">SIDE-BY-SIDE GUIDES</span><h1>Make confident choices.</h1><p>Clear comparisons that explain tradeoffs, ideal use cases, and the questions worth asking before you choose.</p></section><section className="comparison-list">{comparisons.map(([title,desc,tag],i)=><article key={title}><span>0{i+1}</span><small>{tag}</small><h2>{title}</h2><p>{desc}</p><div><b>Best for</b><p>{i%2?'Teams that need a repeatable workflow and a clear quality standard.':'People choosing the fastest reliable approach for an important task.'}</p></div><a href="/learn">Read comparison <ArrowRight/></a></article>)}</section><section className="comparison-method"><div><span className="section-kicker light">OUR APPROACH</span><h2>Useful comparisons need context.</h2></div><ol><li><b>01</b><span><strong>Define the decision</strong>We start with the outcome, audience, and constraints.</span></li><li><b>02</b><span><strong>Compare real tradeoffs</strong>We cover strengths, limitations, cost, and effort.</span></li><li><b>03</b><span><strong>Recommend by use case</strong>There is rarely one best option for everyone.</span></li></ol></section></main><Footer/></>}

function NewsletterPage(){const[done,setDone]=useState(false);return <><Header/><main className="newsletter-page"><section><div className="newsletter-orbit"><Sparkles/><span>AI</span><span>SEO</span><span>GROWTH</span></div><div><span className="section-kicker">THE SMARTER GROWTH LETTER</span><h1>One useful idea.<br/>Every Tuesday.</h1><p>A concise weekly note about AI visibility, SEO, content systems, and the experiments worth paying attention to.</p>{done?<div className="signup-success"><Check/><span><b>You’re on the list.</b>Watch your inbox for the next issue.</span></div>:<form onSubmit={e=>{e.preventDefault();setDone(true)}}><input required type="email" placeholder="you@email.com"/><button>Subscribe free <ArrowRight/></button><small>No spam. Unsubscribe whenever you want.</small></form>}</div></section><div className="newsletter-includes"><b>Every issue includes</b><span>One practical strategy</span><span>One useful tool</span><span>One example worth studying</span><span>A five-minute action</span></div></main><Footer/></>}

function AboutPage(){return <><Header/><main className="about-page"><section className="simple-hero"><span className="section-kicker">ABOUT HOTTOPBEST</span><h1>Better tools.<br/>Clearer advice.</h1><p>HotTopBest helps creators, marketers, and growing teams improve their visibility without adding more complexity.</p></section><section className="about-story"><div><span className="section-kicker">WHY WE EXIST</span><h2>Growth advice should be useful before it is impressive.</h2></div><div><p>Search and AI are changing quickly, but most teams do not need another oversized platform or an endless stream of tactics. They need focused tools, trustworthy explanations, and a clear next step.</p><p>We build browser-based utilities and practical editorial resources around that idea. Every tool should complete a real job. Every article should help a reader make a better decision.</p></div></section><section className="about-values">{[['01','Practical','We prioritize work readers can apply to a real page today.'],['02','Transparent','We explain limitations, methodology, and commercial relationships.'],['03','Human','AI can accelerate the work; expertise and judgment make it valuable.'],['04','Independent','Recommendations are organized around reader fit, not hype.']].map(([n,t,d])=><article key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</section><section className="about-cta"><h2>Build something useful with us.</h2><p>Suggest a tool, share feedback, or tell us about a workflow that needs a simpler solution.</p><div><a href="/submit-tool">Submit a tool <ArrowRight/></a><a href="/contact">Contact us</a></div></section></main><Footer/></>}

function FormPage({type}){const[done,setDone]=useState(false);const submit=type==='submit';return <><Header/><main className="form-page"><section><span className="section-kicker">{submit?'TOOL DIRECTORY':'GET IN TOUCH'}</span><h1>{submit?'Submit a tool.':'How can we help?'}</h1><p>{submit?'Tell us about a useful AI, SEO, content, or developer tool. Every submission is reviewed before publication.':'Questions, corrections, partnerships, or product feedback—we read every message.'}</p></section>{done?<div className="form-confirm"><Check/><h2>Thanks—we received it.</h2><p>{submit?'Our editors will review the submission and follow up if we need more information.':'A member of the team will respond as soon as possible.'}</p><a href="/">Return home</a></div>:<form onSubmit={e=>{e.preventDefault();setDone(true)}}><div className="field-row"><label>Your name<input required name="name" placeholder="Jane Smith"/></label><label>Email address<input required type="email" name="email" placeholder="jane@company.com"/></label></div>{submit&&<><label>Tool name<input required placeholder="Your tool’s name"/></label><label>Website URL<input required type="url" placeholder="https://example.com"/></label><label>Category<select required><option value="">Choose a category</option><option>AI Writing</option><option>SEO</option><option>Image</option><option>Marketing</option><option>Developer</option></select></label></>} {!submit&&<label>Topic<select required><option>General question</option><option>Report a correction</option><option>Partnership</option><option>Product feedback</option></select></label>}<label>{submit?'What makes this tool useful?':'Message'}<textarea required placeholder={submit?'Describe the problem it solves, free plan, and ideal user.':'Tell us what you need help with…'}/></label><label className="consent"><input required type="checkbox"/> I confirm the information is accurate and agree to the privacy policy.</label><button>{submit?'Send submission':'Send message'} <ArrowRight/></button></form>}</main><Footer/></>}

const legalContent={privacy:{title:'Privacy Policy',updated:'August 28, 2026',intro:'This policy explains what information HotTopBest collects, why we use it, and the choices available to you.',sections:[['Information you provide','We receive information you submit through contact, newsletter, and tool-submission forms, such as your name, email address, website URL, and message.'],['Browser-based tools','The current image and text tools run in your browser. Content entered into these tools is not intentionally uploaded to our servers by the prototype.'],['Analytics and essential data','A production version may collect limited technical information such as device type, page visits, and error logs to maintain security and improve the service.'],['How information is used','We use submitted information to respond to requests, operate requested services, review tool submissions, prevent abuse, and improve HotTopBest.'],['Your choices','You may unsubscribe from emails at any time and request access, correction, or deletion of personal information by contacting us.']]},terms:{title:'Terms of Use',updated:'August 28, 2026',intro:'These terms describe the rules for using HotTopBest’s website, tools, and editorial resources.',sections:[['Using the service','You may use the site for lawful personal and commercial work. Do not interfere with the service, bypass limits, or use it to distribute harmful or unlawful material.'],['Tool outputs','Generated results are starting points, not professional, legal, financial, or technical guarantees. Review outputs for accuracy and suitability before publishing or relying on them.'],['Editorial content','Articles are provided for general education. Search platforms, AI systems, products, prices, and best practices change over time.'],['Intellectual property','The HotTopBest brand, interface, original illustrations, and editorial materials remain protected. Your submitted content remains yours.'],['Availability and changes','We may modify, suspend, or discontinue features and update these terms as the service develops.']]}}
function LegalPage({kind}){const data=legalContent[kind];return <><Header/><main className="legal-page"><header><span>LEGAL</span><h1>{data.title}</h1><p>{data.intro}</p><small>Last updated {data.updated}</small></header><article>{data.sections.map(([title,body],i)=><section key={title}><span>0{i+1}</span><div><h2>{title}</h2><p>{body}</p></div></section>)}<div className="legal-contact">Questions about this policy? <a href="/contact">Contact HotTopBest</a>.</div></article></main><Footer/></>}

const categoryDirectory = [
  {name:'SEO',description:'Audit pages, improve snippets, and build a technically sound website.',icon:Search,href:'/seo-tools'},
  {name:'AI & Writing',description:'Plan, rewrite, and distribute clearer content with focused AI tools.',icon:Sparkles,href:'/ai-tools'},
  {name:'AI Search',description:'Learn how answer engines discover, understand, and cite useful sources.',icon:Bot,href:`${articleHref('AI Search Optimization')}`},
  {name:'Content Marketing',description:'Build a repeatable system for research, creation, editing, and distribution.',icon:FileText,href:'/learn#visual-content-marketing'},
  {name:'Link Building',description:'Earn relevant editorial mentions through useful resources and outreach.',icon:Layers3,href:'/learn#visual-link-building'},
  {name:'Developer',description:'Generate structured data and files that help machines understand your site.',icon:Braces,href:toolHref('Schema Generator')},
]

function CategoriesPage(){return <><Header/><main className="categories-page"><section className="simple-hero"><span className="section-kicker">EXPLORE HOTTOPBEST</span><h1>Find the right resource<br/>for the job.</h1><p>Browse practical tools and complete guides by topic. Every category leads to working utilities, detailed articles, and a clear next step.</p></section><section className="category-directory">{categoryDirectory.map(({name,description,icon:Icon,href},index)=><a href={href} key={name}><span>0{index+1}</span><div className="category-directory-icon"><Icon/></div><h2>{name}</h2><p>{description}</p><b>Explore category <ArrowRight/></b></a>)}</section><section className="category-featured"><div><span className="section-kicker light">START WITH A TASK</span><h2>Not sure where to begin?</h2><p>Check a page for on-page issues, build a useful content outline, or choose a structured learning path.</p></div><div><a href={toolHref('SEO Site Checker')}><Search/><span><b>Check a website</b><small>Review eight essential on-page signals.</small></span><ArrowRight/></a><a href={toolHref('AI Article Outline')}><FileText/><span><b>Plan an article</b><small>Create a search-ready structure in seconds.</small></span><ArrowRight/></a><a href="/learn"><Bot/><span><b>Learn SEO & AI search</b><small>Browse 57 complete visual guides.</small></span><ArrowRight/></a></div></section></main><Footer/></>}

function ToolDetailPage({tool}){
  const [open,setOpen]=useState(false)
  if(!tool)return <><Header/><main className="not-found"><span>404</span><h1>We couldn’t find that tool.</h1><a href="/seo-tools">Browse all free tools <ArrowRight/></a></main><Footer/></>
  const Icon=tool.icon
  const related=tools.filter(item=>item.name!==tool.name).slice(0,3)
  const steps=tool.name==='Image Compressor'?['Choose an image from your device.','Compress it privately in your browser.','Download the optimized WebP file.']:['Add the page, topic, or text you want to improve.','Run the focused browser-based generator.','Review, copy, and adapt the result for your project.']
  return <><Header/><main className="tool-detail-page"><section className="tool-detail-hero"><div><a href="/seo-tools" className="tool-breadcrumb">Tools <span>/</span> {tool.category}</a><div className={`tool-icon ${tool.color}`}><Icon/></div><span className="section-kicker">FREE {tool.category.toUpperCase()} TOOL</span><h1>{tool.name}</h1><p>{tool.description} No account, payment, or proprietary data subscription required.</p><button onClick={()=>setOpen(true)}>Open the tool <ArrowRight/></button><div className="tool-detail-proof"><span><Check/> Free to use</span><span><Check/> No signup</span><span><ShieldCheck/> Browser-based</span></div></div><aside><div className="tool-preview-window"><div><i/><i/><i/><span>hottopbest.com</span></div><Icon/><b>{tool.name}</b><p>Ready when you are.</p><button onClick={()=>setOpen(true)}>Start now</button></div></aside></section><section className="tool-instructions"><div><span className="section-kicker">HOW IT WORKS</span><h2>Finish the task in<br/>three simple steps.</h2><p>This focused workspace is designed for one job, so you can move from input to a useful result without setting up a dashboard.</p></div><ol>{steps.map((step,index)=><li key={step}><span>0{index+1}</span><p>{step}</p></li>)}</ol></section><section className="tool-detail-notes"><article><ShieldCheck/><h3>Your work stays private</h3><p>The current tool processes its input in your browser. It does not require an account or upload content to a paid data provider.</p></article><article><WandSparkles/><h3>Built as a useful starting point</h3><p>Review generated output for accuracy, add your expertise, and adapt it to your audience before publishing.</p></article><article><Zap/><h3>Fast and focused</h3><p>Each tool solves one clearly defined task with a result you can copy, download, or apply immediately.</p></article></section><section className="related-tools"><span className="section-kicker">KEEP WORKING</span><h2>Related free tools</h2><div>{related.map(item=><a href={toolHref(item.name)} key={item.name}><div className={`tool-icon ${item.color}`}>{React.createElement(item.icon,{size:22})}</div><small>{item.category}</small><b>{item.name}</b><p>{item.description}</p><span>Open tool <ArrowRight/></span></a>)}</div></section>{open&&<ToolModal tool={tool} onClose={()=>setOpen(false)}/>}</main><Footer/></>
}

function Footer() {
  return <footer><div className="footer-top"><div><Logo/><p>Practical AI and SEO tools<br/>for smarter, sustainable growth.</p></div><div><b>Tools</b><a href="/ai-tools">AI tools</a><a href="/seo-tools">SEO checker</a><a href="/ai-tools#content-tools">Content tools</a></div><div><b>Resources</b><a href="/learn">Guides</a><a href="/comparisons">Comparisons</a><a href="/newsletter">Newsletter</a></div><div><b>Company</b><a href="/about">About</a><a href="/contact">Contact</a><a href="/submit-tool">Submit a tool</a></div></div><div className="footer-bottom"><span>© 2026 HotTopBest. Built for better work.</span><span><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span></div></footer>
}

function HomePage(){return <><Header/><main><Hero/><Checker/><Tools/><ArticlesHub/><Workflow/><Learn/><Newsletter/></main><Footer/></>}
function App(){const path=window.location.pathname.replace(/\/$/,'');if(path==='/seo-tools')return <SeoToolsPage/>;if(path==='/ai-tools')return <AiToolsPage/>;if(path==='/learn')return <LearnPage/>;if(path==='/categories')return <CategoriesPage/>;if(path==='/comparisons')return <ComparisonsPage/>;if(path==='/newsletter')return <NewsletterPage/>;if(path==='/about')return <AboutPage/>;if(path==='/contact')return <FormPage type="contact"/>;if(path==='/submit-tool')return <FormPage type="submit"/>;if(path==='/privacy')return <LegalPage kind="privacy"/>;if(path==='/terms')return <LegalPage kind="terms"/>;if(path.startsWith('/tools/'))return <ToolDetailPage tool={tools.find(item=>toolSlug(item.name)===path.split('/').pop())}/>;if(path.startsWith('/articles/'))return <ArticlePage article={getArticleBySlug(path.split('/').pop())}/>;return <HomePage/>}

createRoot(document.getElementById('root')).render(<App />)
