import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  Globe, 
  Users, 
  Briefcase, 
  GraduationCap, 
  AlertTriangle, 
  Lightbulb, 
  Compass, 
  Bot, 
  Cpu, 
  Code, 
  Laptop, 
  DollarSign, 
  Target, 
  School, 
  FileText, 
  Printer, 
  Search, 
  Filter, 
  Check, 
  XCircle, 
  Info, 
  ShieldAlert, 
  ChevronRight, 
  TrendingUp, 
  Award, 
  BarChart3, 
  Share2, 
  Menu, 
  X,
  FileCheck2,
  Calendar,
  Zap,
  LayoutGrid
} from 'lucide-react';

export function CyberSquareDashboard({ org, onBack }) {
  // Navigation State
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search & Filter State for Programmes
  const [programmeSearch, setProgrammeSearch] = useState('');
  const [programmeCategory, setProgrammeCategory] = useState('All');

  // Source Filter State
  const [sourceCategory, setSourceCategory] = useState('All');

  // Expanded cards state
  const [expandedPillar, setExpandedPillar] = useState(null);

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  // Scroll to section smoothly
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 11 Verified Programmes Data
  const programmesList = useMemo(() => [
    {
      id: 'csq-p-01',
      name: 'K-12 AI, Coding & Computer Science Curriculum',
      category: 'AI',
      target: 'Classes 1–12 (CBSE / Cambridge / ICSE)',
      delivery: 'Offline (In-Campus Lab + Textbooks)',
      duration: 'Academic Year (40 Weeks / 80 Hours)',
      hardware: 'Browser Cloud IDE + School PC Lab',
      fee: 'Estimated ₹1,500 – ₹2,500 / Student / Year',
      status: 'Published Evidence',
      description: 'Comprehensive NEP 2020 mapped curriculum integrating graded physical textbooks, weekly timetabled lessons, and browser cloud coding.',
      topics: ['Scratch & Block Coding', 'Python Syntax', 'HTML/CSS Web Design', 'JavaScript', 'SQL Basics', 'AI/ML Foundations']
    },
    {
      id: 'csq-p-02',
      name: 'Cyber Square AI Cloud Labs & Automated Assessment Engine',
      category: 'Coding',
      target: 'Classes 3–12',
      delivery: 'Cloud Sandbox / Browser Lab',
      duration: 'Academic Year (36 Weeks / 72 Hours)',
      hardware: 'Zero-Installation Web Browser',
      fee: 'Bundled with Annual School LMS',
      status: 'Published Evidence',
      description: 'Zero-installation web-based coding sandbox enabling multi-language programming with automated code scoring, real-time lab exams, and cloud portfolios.',
      topics: ['Python Sandbox', 'JS Runtime', 'Automated Code Scoring', 'Online Lab Exam Proctoring', 'Student Homework Review']
    },
    {
      id: 'csq-p-03',
      name: 'Modular Hands-On Robotics & IoT Prototyping Suite',
      category: 'Robotics',
      target: 'Classes 6–10',
      delivery: 'Hands-on Workshop / School Lab',
      duration: 'Term-Based (24 Weeks / 48 Hours)',
      hardware: 'Micro:bit Kits, Sensor Modules & Chassis',
      fee: 'Hardware Kit Tier (~₹3,500 / Student)',
      status: 'Published Evidence',
      description: 'Experiential hardware prototyping program covering physical computing, sensors, automation, smart blind sticks, line-following robotics, and IoT home devices.',
      topics: ['Micro:bit Architecture', 'Sensors & Actuators', 'Line Follower Cars', 'Smart Blind Stick Tech', 'IoT Home Automation']
    },
    {
      id: 'csq-p-04',
      name: 'Smart AI Teacher Tools & CPD Certification Suite',
      category: 'Teacher Training',
      target: 'School Educators & CS Faculty',
      delivery: 'Hybrid (Faculty Workshop + SaaS Tools)',
      duration: '40 Hours (8 Weeks Intensive)',
      hardware: 'Smart AI Teacher SaaS Suite',
      fee: 'Bundled with Annual School Partnership',
      status: 'Published Evidence',
      description: 'Specialized teacher enablement platform using Generative AI to automatically generate lesson plans, question papers, interactive quizzes, and rubrics, paired with UK CPD certification.',
      topics: ['AI Lesson Plan Generation', 'Automated Exam & Quiz Builder', 'CS Pedagogy', 'NEP 2020 AI Subject Integration']
    },
    {
      id: 'csq-p-05',
      name: 'Little Coder Early Childhood Computational Track',
      category: 'Coding',
      target: 'Kindergarten to Class 2 (Ages 5–7)',
      delivery: 'In-Campus Classroom + Visual Interactive Blocks',
      duration: 'Academic Year (30 Weeks / 60 Hours)',
      hardware: 'Tablet / PC Visual Interface',
      fee: 'Included in Primary School Book Bundle',
      status: 'Published Evidence',
      description: 'Foundational logic building, directional orientation, algorithmic sequencing, and pattern recognition without syntax barriers.',
      topics: ['Scratch Jr', 'Algorithmic Puzzles', 'Visual Storytelling', 'Block Logic Navigation', 'Creativity Lab']
    },
    {
      id: 'csq-p-06',
      name: 'Junior Python Developer & Logic Architect',
      category: 'Python',
      target: 'Classes 4–7',
      delivery: 'Hybrid (Textbook + Cloud IDE)',
      duration: '3 to 6 Months (24 Weeks / 48 Hours)',
      hardware: 'Browser Cloud IDE',
      fee: 'Annual School Subscription',
      status: 'Published Evidence',
      description: 'Transition course moving young coders from visual blocks into real text-based Python syntax, loops, conditionals, functions, and turtle graphics.',
      topics: ['Python Syntax', 'Loops & Conditionals', 'Data Types & Lists', 'Turtle Graphics', 'Text Games']
    },
    {
      id: 'csq-p-07',
      name: 'Senior Python & Machine Learning Specialization',
      category: 'AI',
      target: 'Classes 8–10',
      delivery: 'In-Campus Lab + Cloud Assessment',
      duration: 'Academic Year (36 Weeks / 72 Hours)',
      hardware: 'Browser Cloud Sandbox (Python 3.x)',
      fee: 'Annual School Subscription',
      status: 'Published Evidence',
      description: 'Advanced Python concepts, data structures, introductory machine learning models, image classification using PictoBlox, and computational data analysis.',
      topics: ['Object-Oriented Python', 'PictoBlox ML Models', 'Computer Vision Basics', 'Data Analysis with Pandas', 'Capstone Projects']
    },
    {
      id: 'csq-p-08',
      name: 'Micro:bit Assistive Tech & Physical Computing',
      category: 'Hardware',
      target: 'Classes 6–9',
      delivery: 'School Lab Workshop',
      duration: 'Term-Based (16 Weeks / 32 Hours)',
      hardware: 'BBC Micro:bit Board + Expansion Shield',
      fee: 'Hardware Kit Bundled',
      status: 'Published Evidence',
      description: 'Practical physical computing curriculum teaching students how to program sensors, LED matrices, accelerometers, and radio communication.',
      topics: ['Micro:bit Architecture', 'Block to Python Transpiler', 'Accelerometer & Compass', 'Assistive Tech Prototyping']
    },
    {
      id: 'csq-p-09',
      name: 'Web Development & Database Foundations (HTML/CSS/JS/SQL)',
      category: 'Digital Learning',
      target: 'Classes 7–12',
      delivery: 'Browser Cloud Sandbox',
      duration: 'Semester Course (20 Weeks / 40 Hours)',
      hardware: 'Browser Web Lab',
      fee: 'Included in Standard Lab Package',
      status: 'Published Evidence',
      description: 'Full-track modern web foundational curriculum covering responsive design, CSS layouts, interactive JavaScript DOM manipulation, and SQL relational tables.',
      topics: ['HTML5 Semantic Tags', 'CSS3 Flexbox & Grid', 'JavaScript DOM Logic', 'Relational Database SQL', 'Personal Web Portfolios']
    },
    {
      id: 'csq-p-10',
      name: 'Global Digital Fest & Student Hackathon Incubation',
      category: 'Digital Learning',
      target: 'Classes 3–12 (Global School Network)',
      delivery: 'Virtual Festival & In-School Finales',
      duration: 'Annual Cycle (3 Months Prep & Finale)',
      hardware: 'Online Project Submission Portal',
      fee: 'Free for Partner School Enrollees',
      status: 'Published Evidence',
      description: 'International technology showcase where students submit original coding and AI projects, competing for global awards, innovator badges, and showcase honors.',
      topics: ['Project Ideation', 'Independent Development', 'Technical Presentation', 'Peer Review', 'Global Recognition']
    },
    {
      id: 'csq-p-11',
      name: 'Cyber Square Kids Direct B2C Live Online Classes',
      category: 'Coding',
      target: 'Ages 6–16 (Individual Global Learners)',
      delivery: 'Live Online 1:4 Small Batches',
      duration: 'Monthly / Quarterly Subscription',
      hardware: 'Home PC / Laptop + Webcam',
      fee: 'Estimated ₹1,000 – ₹2,500 / Month (Custom)',
      status: 'Estimated Commercial Information',
      description: 'Direct-to-consumer online coding academy offering instructor-led live interactive coding sessions for NRI and global students outside the school partner network.',
      topics: ['1:4 Live Mentoring', 'Individual Paced Coding', 'Robotics Kit Delivery', 'Parent Progress Dashboard']
    }
  ], []);

  // Filtered programmes
  const filteredProgrammes = useMemo(() => {
    return programmesList.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(programmeSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(programmeSearch.toLowerCase()) ||
        p.topics.some(t => t.toLowerCase().includes(programmeSearch.toLowerCase()));
      
      const matchesCategory = 
        programmeCategory === 'All' || 
        p.category === programmeCategory ||
        (programmeCategory === 'Coding' && (p.category === 'Coding' || p.category === 'Python')) ||
        (programmeCategory === 'Hardware' && (p.category === 'Hardware' || p.category === 'Robotics'));

      return matchesSearch && matchesCategory;
    });
  }, [programmesList, programmeSearch, programmeCategory]);

  // 7 Verified Institutions Data
  const verifiedInstitutions = useMemo(() => [
    {
      id: 'inst-01',
      name: 'CAFIT (Calicut Forum for IT)',
      category: 'Ecosystem & Regional Industry Association',
      location: 'HiLITE Business Park, Kozhikode, Kerala',
      scope: 'CAFIT Square HiLITE Business Park corporate operations, regional technology talent initiatives, and IT industry consortium alignment.',
      status: 'Verified Active (Industry Base)',
      badgeType: 'industry'
    },
    {
      id: 'inst-02',
      name: 'Sharjah Publishing City Free Zone (SPCFZ)',
      category: 'Regional Headquarters & Publishing Free Zone',
      location: 'Sharjah, United Arab Emirates (UAE)',
      scope: 'Middle East educational publishing distribution, UAE trade licensing, Gulf regional school support, and GCC international curriculum supply.',
      status: 'Verified Active (Official Free Zone Entity)',
      badgeType: 'international'
    },
    {
      id: 'inst-03',
      name: 'UK CPD Certification Service',
      category: 'Teacher Professional Accreditation Body',
      location: 'United Kingdom',
      scope: 'International teacher professional development accreditation, continuous professional development points, and UK-recognized educator badges.',
      status: 'Verified Active (Accreditation Body)',
      badgeType: 'accreditation'
    },
    {
      id: 'inst-04',
      name: 'Cambridge Curriculum Partner Schools',
      category: 'Curricular Academic Partner Schools',
      location: 'UAE, India & International Campuses',
      scope: 'Cambridge Primary & Lower Secondary Computing curriculum alignment, textbook adoptions, and browser lab practicals.',
      status: 'Verified Active (Curricular School Network)',
      badgeType: 'school'
    },
    {
      id: 'inst-05',
      name: 'CBSE Curriculum Partner Schools',
      category: 'National Board Academic Partner Schools',
      location: 'Kerala & Pan-India',
      scope: 'NEP 2020 AI subject curriculum implementation, mandatory textbook prescribing, and computer science lab exam integration.',
      status: 'Verified Active (Curricular School Network)',
      badgeType: 'school'
    },
    {
      id: 'inst-06',
      name: 'ICSE Curriculum Partner Schools',
      category: 'Council Board Academic Partner Schools',
      location: 'India',
      scope: 'Computer Applications & Robotics elective syllabus support, hands-on physical computing kits, and annual institutional contracts.',
      status: 'Verified Active (Curricular School Network)',
      badgeType: 'school'
    },
    {
      id: 'inst-07',
      name: 'HiLITE Business Park IT Hub',
      category: 'Physical Corporate Facility & R&D Center',
      location: 'Tower 1, Thondayad Bypass, Kozhikode 673014',
      scope: 'Central software development headquarters, AI lab engineering team, customer success, and educational publishing operations.',
      status: 'Verified Active (Corporate Registered Base)',
      badgeType: 'hq'
    }
  ], []);

  // Sources Data with Strict Categorization
  const sourcesList = useMemo(() => [
    {
      id: 'src-01',
      title: 'Cyber Square Official Portal - Coding & AI for Schools',
      url: 'https://cybersquare.org/',
      type: 'Published Evidence',
      category: 'Company-Reported Data',
      notes: 'Official primary portal documenting 1,000+ school adoptions, 200,000+ students, AI Cloud Labs, K-12 textbooks, and international reach across India, UAE, UK, and Canada.',
      relevance: 'Primary Scale Metrics, Curriculum Architecture, Brand Mission'
    },
    {
      id: 'src-02',
      title: 'Cyber Square Smart AI Teacher Tools Suite',
      url: 'https://cybersquare.org/ai-teacher-tools',
      type: 'Published Evidence',
      category: 'Published Evidence',
      notes: 'Direct documentation of Generative AI-powered lesson plan generation, automated exam creation, and grading tools for school faculty.',
      relevance: 'Teacher Enablement, Platform Moat, Workload Automation'
    },
    {
      id: 'src-03',
      title: 'Cyber Square Cloud Lab Interactive Web IDE',
      url: 'https://cybersquare.org/cloud-lab',
      type: 'Published Evidence',
      category: 'Published Evidence',
      notes: 'Live zero-installation browser-based cloud lab runtime supporting Python, JavaScript, HTML, Scratch, and SQL with automated scoring.',
      relevance: 'Delivery Infrastructure, Technology Stack, Lab Exam Capabilities'
    },
    {
      id: 'src-04',
      title: 'Cyber Square Professional & Institutional Portal',
      url: 'https://cybersquare.pro/',
      type: 'Published Evidence',
      category: 'Published Evidence',
      notes: 'Verification of HiLITE Business Park Kozhikode headquarters, CAFIT Square presence, and corporate registered entity details.',
      relevance: 'Corporate Base, Legal Entity, Regional Industry Alignment'
    },
    {
      id: 'src-05',
      title: 'Institutional Pricing & Commercial License Model',
      url: 'https://cybersquare.org/',
      type: 'Estimated Commercial Information',
      category: 'Estimated Commercial Information',
      notes: 'Institutional research estimate of ~₹1,500 to ₹4,000/student/year bundled with physical textbooks and hardware tiers. Not a published public tariff sheet.',
      relevance: 'Pricing & Commercial Structure, Budgetary Benchmarks'
    },
    {
      id: 'src-06',
      title: 'MYST International Strategic Gap & Radar Analysis',
      url: 'Internal Strategic Research',
      type: 'Strategic Interpretation',
      category: 'Strategic Interpretation',
      notes: 'Evidence-based analytical assessment identifying Cyber Square lack of Autonomous AI Agents, higher secondary career portfolios, and custom innovation studios.',
      relevance: 'MYST Opportunities, Threat Mitigation, Head-to-Head Differentiation'
    }
  ], []);

  const filteredSources = useMemo(() => {
    if (sourceCategory === 'All') return sourcesList;
    return sourcesList.filter(s => s.category === sourceCategory);
  }, [sourcesList, sourceCategory]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">

      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE BAR                                                      */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#0f172a] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger (Mobile) + Competitor Title Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700"
              title="Return to Competitor Hub Directory"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </button>

            <div className="h-5 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs border border-blue-400/40">
                CS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-white tracking-tight leading-none">
                    Cyber Square
                  </h1>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Direct Competitor
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Published Evidence
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>Kozhikode, Kerala</span>
                  <span>•</span>
                  <a 
                    href="https://cybersquare.org/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium hover:underline"
                  >
                    <span>cybersquare.org</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Last Updated + Export + Research Badge */}
          <div className="flex items-center gap-2.5">
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Report Updated: <strong className="text-slate-200">2026-03-24</strong></span>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors shadow-2xs cursor-pointer"
              title="Print / Export PDF Dossier"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export Report</span>
            </button>

            <div className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800/80 text-[11px] text-blue-300 font-semibold font-mono hidden md:block">
              MYST Intelligence
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BODY LAYOUT: SIDEBAR + MAIN CONTENT WORKSPACE                          */}
      {/* ========================================================================= */}
      <div className="max-w-[1600px] w-full mx-auto flex flex-1">

        {/* ----------------------------------------------------------------------- */}
        {/* A. LEFT SIDEBAR: CLEAN RESEARCH HIERARCHY                              */}
        {/* ----------------------------------------------------------------------- */}
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          />
        )}

        <aside className={`
          fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 overflow-y-auto space-y-6">
            
            {/* Sidebar Branding Header */}
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                  Project Client
                </span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>MYST International</span>
                </span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Sections */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-2 px-2">
                Intelligence Sections
              </span>
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
                  { id: 'organisation', label: 'Organisation Overview', icon: Building2 },
                  { id: 'verticals', label: 'Business Verticals', icon: LayoutGrid },
                  { id: 'programmes', label: 'Programmes & Services', icon: Layers },
                  { id: 'partnerships', label: 'Institutional Partnerships', icon: School },
                  { id: 'sectors', label: 'Sector Relationships', icon: Briefcase },
                  { id: 'geography', label: 'Geographic Coverage', icon: Globe },
                  { id: 'pricing', label: 'Pricing & Durations', icon: DollarSign },
                  { id: 'strategy', label: 'Competitive Strategy & Radar', icon: Target, highlight: true },
                  { id: 'sources', label: 'Sources & Verification', icon: FileCheck2 },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-blue-800 border-l-3 border-l-blue-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-700' : (item.highlight ? 'text-blue-600' : 'text-slate-400')}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Competitor Quick Spec Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">
                Target Profile
              </span>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Founded:</span>
                <strong className="text-slate-800">2014</strong>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Founder:</span>
                <strong className="text-slate-800">N.P. Haris</strong>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Legal Name:</span>
                <strong className="text-slate-800 truncate max-w-[120px]" title="Cyber Square AI and Robotics Private Limited">
                  Cyber Square Pvt Ltd
                </strong>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">HQ City:</span>
                <strong className="text-slate-800">Kozhikode (Calicut)</strong>
              </div>
            </div>

          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 text-[11px] text-slate-500 bg-slate-50/50">
            <div className="font-semibold text-slate-700">Competitor Intelligence Hub</div>
            <div className="text-[10px]">Strictly Confidential • MYST International</div>
          </div>
        </aside>

        {/* ----------------------------------------------------------------------- */}
        {/* B. MAIN CONTENT AREA: 10 STRUCTURED SECTIONS                           */}
        {/* ----------------------------------------------------------------------- */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-10">

          {/* ===================================================================== */}
          {/* 1. DASHBOARD OVERVIEW & EXECUTIVE METRICS                             */}
          {/* ===================================================================== */}
          <section id="overview" className="space-y-6 scroll-mt-20">
            
            {/* Competitor Profile Hero Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0f172a] text-blue-400 font-black text-xl flex items-center justify-center shrink-0 border border-slate-800 shadow-sm">
                    CSQ
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cyber Square</h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Direct Competitor
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Published Evidence
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 mb-1">
                      K-12 EdTech, AI & Robotics Curriculum Provider
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-700" />
                        <span>Kozhikode, Kerala</span>
                      </span>
                      <span>•</span>
                      <a 
                        href="https://cybersquare.org/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>cybersquare.org</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <span>•</span>
                      <span className="italic text-slate-400">"From Users to Creators"</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0 self-start">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Classification</span>
                    <strong className="text-slate-800">Primary K-12 Rival</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Market Focus</span>
                    <strong className="text-slate-800">Schools B2B Licensing</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Key Metric Cards Grid (Existing Report Values) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {/* Card 1: 200,000+ Students Impacted */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-blue-700 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Students</span>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">200,000+</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">Students Impacted</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100 flex items-center gap-1">
                    <Info className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                    <span>Reported by Company</span>
                  </div>
                </div>
              </div>

              {/* Card 2: 1,000+ Partner Schools */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-700 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Campuses</span>
                  <School className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">1,000+</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">Partner Schools</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100 flex items-center gap-1">
                    <Info className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                    <span>Reported by Company</span>
                  </div>
                </div>
              </div>

              {/* Card 3: 3,500+ Teachers Enabled */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-amber-700 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Teachers</span>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">3,500+</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">Teachers Enabled</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100 flex items-center gap-1">
                    <Info className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                    <span>Reported by Company</span>
                  </div>
                </div>
              </div>

              {/* Card 4: 4 Reported Global Markets */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-blue-700 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Markets</span>
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">4</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">Global Markets</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100 truncate" title="India, UAE, UK, Canada">
                    India, UAE, UK, Canada
                  </div>
                </div>
              </div>

              {/* Card 5: 11 Active Tracks */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-indigo-700 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Tracks</span>
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">11</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">Active Tracks</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100">
                    K-12 Curricular & Labs
                  </div>
                </div>
              </div>

              {/* Card 6: 7 Verified Institutions */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-700 mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Partners</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">7</div>
                  <div className="text-[11px] font-bold text-slate-700 mt-0.5">Verified Institutions</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100">
                    CAFIT, SPCFZ, UK CPD...
                  </div>
                </div>
              </div>
            </div>

            {/* Competitor Snapshot Information Cards */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-700" />
                  <span>Competitor Snapshot</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Research Baseline</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Headquarters</span>
                  <strong className="text-slate-900 block text-xs">HiLITE Business Park, Kozhikode, Kerala</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Tower 1, CAFIT Square</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Primary Target Audience</span>
                  <strong className="text-slate-900 block text-xs">K-12 School Management & CS Teachers</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">CBSE, Cambridge, ICSE, MOE (Classes 1–12)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Operating Model</span>
                  <strong className="text-slate-900 block text-xs">B2B Annual Curriculum Licensing</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Bundled Textbooks + Cloud LMS + Kit Supply</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Curriculum Framework</span>
                  <strong className="text-slate-900 block text-xs">NEP 2020 & International Standards</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Graded Textbooks + UK CPD Accreditation</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Delivery Infrastructure</span>
                  <strong className="text-slate-900 block text-xs">Zero-Install Browser Cloud Labs</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Multi-language Web IDE + Automated Code Scoring</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Geographic Footprint</span>
                  <strong className="text-slate-900 block text-xs">India, UAE, UK, Canada</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Dual hubs: Kozhikode HQ & Sharjah Free Zone</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 lg:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-0.5">Market Positioning</span>
                  <strong className="text-slate-900 block text-xs">User-to-Creator Turnkey K-12 AI & Coding Platform</strong>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Pre-packaged curriculum adoption with low technical friction for non-specialist teachers</span>
                </div>
              </div>
            </div>

            {/* Business Model Overview Flow Diagram */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-700" />
                  <span>Business Model Overview (Institutional Pipeline)</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Value Chain Flow</span>
              </div>

              {/* Visual Flow Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-xs">
                {/* Node 1 */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between text-center relative group">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center font-bold mx-auto mb-2">
                    1
                  </div>
                  <strong className="text-slate-900 text-xs block mb-1">School Institutions</strong>
                  <span className="text-[11px] text-slate-500">Private CBSE, ICSE, Cambridge & UAE Schools</span>
                </div>

                {/* Node 2 */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between text-center relative group">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center font-bold mx-auto mb-2">
                    2
                  </div>
                  <strong className="text-slate-900 text-xs block mb-1">Annual Curriculum Licensing</strong>
                  <span className="text-[11px] text-slate-500">Per-student annual fee integrated into school composite fees</span>
                </div>

                {/* Node 3 */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between text-center relative group">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center font-bold mx-auto mb-2">
                    3
                  </div>
                  <strong className="text-slate-900 text-xs block mb-1">Textbooks + Cloud Labs + AI Tools</strong>
                  <span className="text-[11px] text-slate-500">Physical book distribution, zero-install IDE, and teacher generators</span>
                </div>

                {/* Node 4 */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between text-center relative group">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 font-mono text-xs flex items-center justify-center font-bold mx-auto mb-2">
                    4
                  </div>
                  <strong className="text-slate-900 text-xs block mb-1">Teacher Training + Assessment + Robotics</strong>
                  <span className="text-[11px] text-slate-500">UK CPD masterclasses, automated lab exams, and Micro:bit kits</span>
                </div>

                {/* Node 5 */}
                <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 flex flex-col justify-between text-center relative group">
                  <div className="w-7 h-7 rounded-lg bg-blue-700 text-white font-mono text-xs flex items-center justify-center font-bold mx-auto mb-2">
                    5
                  </div>
                  <strong className="text-blue-950 text-xs block mb-1">Institutional Education Services</strong>
                  <span className="text-[11px] text-blue-700">Turnkey computer science department operation & annual lock-in</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Strategic Lock-in:</strong> Once a school adopts physical textbooks and embeds the AI assessment platform into grading, switching costs become high for academic leadership.
                </span>
              </div>
            </div>

          </section>

          {/* ===================================================================== */}
          {/* 2. ORGANISATION OVERVIEW (ORGANISATION INTELLIGENCE)                  */}
          {/* ===================================================================== */}
          <section id="organisation" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-700" />
                <span>Organisation Overview & Intelligence</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Structural company profile, institutional capacity, and operational architecture.
              </p>
            </div>

            {/* Compact Organisation Intelligence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              
              {/* Card 1: Company Scale */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold uppercase font-mono text-[10px]">
                  <BarChart3 className="w-4 h-4" />
                  <span>Company Scale</span>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Reported Students:</span>
                    <strong className="text-slate-900 font-mono">200,000+</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Partner Schools:</span>
                    <strong className="text-slate-900 font-mono">1,000+</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-500">Trained Teachers:</span>
                    <strong className="text-slate-900 font-mono">3,500+</strong>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-slate-500">Operational Inception:</span>
                    <strong className="text-slate-900 font-mono">2014 (12+ Years)</strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Business Model */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 font-bold uppercase font-mono text-[10px]">
                  <Briefcase className="w-4 h-4" />
                  <span>Business Model</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>B2B Annual School Curriculum Licensing</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Physical Textbook & Cloud LMS Bundling</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Modular Hardware Robotics Kit Supply</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Direct B2C Online Classes (Cyber Square Kids)</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Curriculum Architecture */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold uppercase font-mono text-[10px]">
                  <Award className="w-4 h-4" />
                  <span>Curriculum Architecture</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>NEP 2020 Mandated Coding Standards</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>CBSE, ICSE, Cambridge, UAE MOE Mapped</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Progression: Scratch Jr → Python → ML</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>UK CPD Teacher Certification Mapping</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Technology Infrastructure */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold uppercase font-mono text-[10px]">
                  <Laptop className="w-4 h-4" />
                  <span>Technology Infrastructure</span>
                </div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-purple-600 shrink-0" />
                    <span>Zero-Installation Browser Cloud Lab</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-purple-600 shrink-0" />
                    <span>Automated Code Scoring & Lab Exam Engine</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-purple-600 shrink-0" />
                    <span>Smart AI Teacher Tools (Quiz/Lesson Plans)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-purple-600 shrink-0" />
                    <span>Micro:bit & Hardware Sensor Interfacing</span>
                  </li>
                </ul>
              </div>

              {/* Card 5: Geographic Presence */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 lg:col-span-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold uppercase font-mono text-[10px]">
                  <Globe className="w-4 h-4" />
                  <span>Geographic Presence & Infrastructure</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                    <strong className="text-slate-900 block">Primary India HQ:</strong>
                    <span className="text-slate-600">HiLITE Business Park, Tower 1, CAFIT Square, Kozhikode, Kerala 673014</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                    <strong className="text-slate-900 block">UAE Regional Headquarters:</strong>
                    <span className="text-slate-600">Sharjah Publishing City Free Zone (SPCFZ), Sharjah, UAE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Expandable Overview Detail Drawer */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <button
                onClick={() => setExpandedPillar(expandedPillar === 'detailed-summary' ? null : 'detailed-summary')}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-800 hover:text-blue-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>View Full Executive Overview Documentation</span>
                </span>
                <span className="text-blue-600 text-xs font-semibold">
                  {expandedPillar === 'detailed-summary' ? 'Collapse −' : 'Expand +'}
                </span>
              </button>

              {expandedPillar === 'detailed-summary' && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p>
                    Kozhikode-headquartered global EdTech platform founded by N.P. Haris in 2014 with operations in India, the UAE, the UK, and Canada. Operates under the mission "From Users to Creators", partnering with over 1,000 schools and reaching 200,000+ students.
                  </p>
                  <p>
                    Cyber Square provides comprehensive K-12 AI, coding, and robotics curricula mapped to NEP 2020, CBSE, ICSE, Cambridge, and UAE MOE frameworks. Offerings integrate physical textbooks, zero-installation browser-based AI Cloud Labs, automated coding assessment engines, Smart AI Teacher Tools for lesson and exam generation, hands-on IoT/Robotics kits, and UK-recognized teacher certifications.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 3. BUSINESS VERTICALS                                                */}
          {/* ===================================================================== */}
          <section id="verticals" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-700" />
                <span>Business Verticals</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Market segment distribution with primary weighting on reported institutional school operations.
              </p>
            </div>

            {/* 3 Verticals Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Vertical 1: Schools (Primary Focus - 85%) */}
              <div className="bg-white rounded-xl border-2 border-blue-600 p-5 shadow-xs flex flex-col justify-between space-y-4 relative">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-600 text-white font-mono">
                    Core Business (85%)
                  </span>
                </div>

                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <School className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">1. Schools Vertical</h3>
                  <div className="text-xs text-blue-700 font-semibold mt-0.5">K-12 Institutional Curriculum Integration</div>
                  
                  <div className="space-y-2 mt-3 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Target Customers</span>
                      <strong className="text-slate-800">Private CBSE, ICSE, Cambridge & UAE Schools (Grades 1–12)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Services Offered</span>
                      <span>Graded Textbooks, Browser Cloud Labs, Smart AI Teacher Toolkits, Micro:bit Kits, Exams</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Operating Model</span>
                      <span>Annual composite seat license bundled into student fees (~₹1,500–₹4,000/yr)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-900 bg-blue-50/50 p-2 rounded-lg">
                  Direct competitive clash with MYST school technology offerings.
                </div>
              </div>

              {/* Vertical 2: Corporate & Industry */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">2. Corporate & Industry</h3>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Ecosystem & Regional Industry Base</div>
                  
                  <div className="space-y-2 mt-3 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Target Customers</span>
                      <strong className="text-slate-800">Regional IT Ecosystem & CAFIT Members</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Services Offered</span>
                      <span>CAFIT Square tech events, talent engagement, regional IT initiatives</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Operating Model</span>
                      <span>Industry consortium alignment; no direct corporate enterprise software revenue</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                  Secondary presence; not an enterprise B2B dev consultancy.
                </div>
              </div>

              {/* Vertical 3: Other Partnerships */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">3. Other Partnerships</h3>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">Accreditation Bodies & Free Zones</div>
                  
                  <div className="space-y-2 mt-3 text-xs text-slate-600">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Target Customers</span>
                      <strong className="text-slate-800">UK CPD Accreditation & Free Zone Authorities</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Services Offered</span>
                      <span>Teacher continuous development certification, international textbook logistics</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Operating Model</span>
                      <span>Certification licensing & overseas distribution infrastructure</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                  Validates curriculum quality for international school principals.
                </div>
              </div>

            </div>

            {/* Delivery Architecture Visual Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                Delivery Architecture Spectrum
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">01. B2B School Licensing</span>
                  <strong className="text-slate-800 text-[11px]">Annual Seat Contracts</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">02. Textbook Bundling</span>
                  <strong className="text-slate-800 text-[11px]">Physical K-12 Books</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">03. Browser Coding Labs</span>
                  <strong className="text-slate-800 text-[11px]">Zero-Install IDE</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">04. Teacher Capacity</span>
                  <strong className="text-slate-800 text-[11px]">UK CPD Toolkits</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">05. Robotics Hardware</span>
                  <strong className="text-slate-800 text-[11px]">Modular Sensor Kits</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70">
                  <span className="text-[9px] font-bold text-blue-700 uppercase block mb-1">06. Direct-to-Student</span>
                  <strong className="text-slate-800 text-[11px]">Cyber Square Kids</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 4. PROGRAMMES AND SERVICES CATALOGUE                                  */}
          {/* ===================================================================== */}
          <section id="programmes" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-700" />
                  <span>Programmes & Services Catalogue (11 Active Tracks)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete catalogue of verified curricular tracks, labs, and enablement programmes.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 self-start sm:self-auto">
                Showing {filteredProgrammes.length} of 11 Tracks
              </span>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search programmes by name, topic (e.g. Python, Micro:bit, ML)..."
                  value={programmeSearch}
                  onChange={(e) => setProgrammeSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800"
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1 overflow-x-auto text-xs">
                {['All', 'AI', 'Python', 'Coding', 'Robotics', 'Teacher Training', 'Hardware', 'Digital Learning'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProgrammeCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      programmeCategory === cat
                        ? 'bg-blue-700 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Programmes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredProgrammes.map(prog => (
                <div key={prog.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-blue-50 text-blue-800 border border-blue-200 font-mono">
                        {prog.category}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {prog.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{prog.name}</h4>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{prog.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <span className="text-slate-400 uppercase font-mono block text-[9px]">Target</span>
                        <strong className="text-slate-800 truncate block">{prog.target}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase font-mono block text-[9px]">Duration</span>
                        <strong className="text-slate-800 truncate block">{prog.duration}</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {prog.topics.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-50 text-slate-600 border border-slate-200 text-[9px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Technology Stack */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-700" />
                  <span>Visual Technology Stack</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">Categorized Toolkits</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                {/* Programming */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Programming</span>
                  <div className="flex flex-wrap gap-1">
                    {['Python', 'JavaScript', 'Scratch', 'Scratch Jr', 'SQL'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI & Machine Learning */}
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-blue-800 uppercase font-mono block">AI & Machine Learning</span>
                  <div className="flex flex-wrap gap-1">
                    {['Artificial Intelligence', 'Machine Learning', 'PictoBlox'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-blue-200 text-blue-900 font-semibold text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Robotics & IoT */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono block">Robotics & IoT</span>
                  <div className="flex flex-wrap gap-1">
                    {['Robotics', 'IoT', 'Micro:bit'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-900 font-semibold text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Web Development */}
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-indigo-800 uppercase font-mono block">Web Development</span>
                  <div className="flex flex-wrap gap-1">
                    {['HTML/CSS', 'Web Development'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-indigo-200 text-indigo-900 font-semibold text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Educational Platforms */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Educational Platforms</span>
                  <div className="flex flex-wrap gap-1">
                    {['MIT App Inventor'].map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Programme Duration Visualisation Comparison */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                Programme Duration Comparison Spectrum
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Academic Year</span>
                  </div>
                  <strong className="text-slate-900 block text-xs">9 to 12 Months</strong>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">K-12 Full Timetable Textbooks & Cloud Labs (Classes 1–12)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-indigo-700 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Term Modules</span>
                  </div>
                  <strong className="text-slate-900 block text-xs">3 to 6 Months</strong>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Junior Python Developer & Modular Robotics (Classes 4–9)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Teacher Enablement</span>
                  </div>
                  <strong className="text-slate-900 block text-xs">40 Hours / 8 Weeks</strong>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Smart AI Teacher Tools & UK CPD Certification Suite</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Short Sprints</span>
                  </div>
                  <strong className="text-slate-900 block text-xs">1 to 3 Days</strong>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">Vacation Camps, Hands-on Fests, and Student Hackathons</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 5. INSTITUTIONAL PARTNERSHIPS                                        */}
          {/* ===================================================================== */}
          <section id="partnerships" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <School className="w-5 h-5 text-blue-700" />
                <span>Institutional Partnerships (7 Verified Entities • 1,000+ Reported Schools)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Breakdown of verified industry, regional, curricular, and accreditation partners.
              </p>
            </div>

            {/* Verified Partnerships Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {verifiedInstitutions.map(inst => (
                <div key={inst.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        {inst.category}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{inst.name}</h4>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{inst.location}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{inst.scope}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {inst.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Institutional Distinctive Callout */}
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <strong className="block">Institutional Distinction Note:</strong>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                The 1,000+ school figure represents aggregate company-reported curriculum licensing adoptions across India and the GCC. The 7 entities catalogued above represent independently documented institutional, governmental, free zone, and industry association relationships.
              </p>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 6. SECTOR RELATIONSHIPS                                              */}
          {/* ===================================================================== */}
          <section id="sectors" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-700" />
                <span>Sector Relationships & Operational Telemetry</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Audited sector reach across Schools, Corporate, Executive, and UAE operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Schools Sector */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>K-12 Schools Sector</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Published Evidence
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <div><strong>Reported Activity:</strong> Core business operation with 1,000+ school adoptions across India and the Middle East.</div>
                  <div><strong>Target Audience:</strong> Private CBSE, ICSE, Cambridge school management, principals, and computer science teachers.</div>
                  <div><strong>Services:</strong> Curricular textbooks, zero-install Cloud Labs, AI teacher tools, Micro:bit kits, annual lab exams.</div>
                </div>
              </div>

              {/* Card 2: Corporate & Enterprise Sector */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                    <Building2 className="w-4 h-4 text-slate-700" />
                    <span>Corporate & Enterprise Sector</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Strategic Interpretation
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <div><strong>Reported Activity:</strong> Regional industry participation through CAFIT Square at HiLITE Business Park; no dedicated corporate B2B enterprise software contracts.</div>
                  <div><strong>Target Audience:</strong> Regional IT ecosystem and technology recruiters.</div>
                  <div><strong>Services:</strong> Hackathon sponsorships, regional talent showcases, digital festival judging panels.</div>
                </div>
              </div>

              {/* Card 3: Executive Programmes */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                    <Award className="w-4 h-4 text-indigo-700" />
                    <span>Executive & Teacher CPD Programmes</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Published Evidence
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <div><strong>Reported Activity:</strong> Dedicated teacher capacity building; does not conduct corporate C-suite leadership bootcamps.</div>
                  <div><strong>Target Audience:</strong> School principals, computer science department heads, K-12 educators.</div>
                  <div><strong>Services:</strong> Smart AI Teacher Tools masterclasses, UK CPD certified workshops, NEP 2020 AI adoption frameworks.</div>
                </div>
              </div>

              {/* Card 4: UAE Operations */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                    <Globe className="w-4 h-4 text-blue-700" />
                    <span>United Arab Emirates (UAE) Operations</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Published Evidence
                  </span>
                </div>
                <div className="text-xs space-y-1 text-slate-600">
                  <div><strong>Reported Activity:</strong> Operational subsidiary registered at Sharjah Publishing City Free Zone (SPCFZ) with strong Gulf Indian school adoption.</div>
                  <div><strong>Target Audience:</strong> UAE Indian and international private schools in Dubai, Sharjah, Abu Dhabi.</div>
                  <div><strong>Services:</strong> Cambridge and MOE aligned textbook distribution, browser cloud lab licensing, regional coordinator support.</div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 7. GEOGRAPHIC COVERAGE                                               */}
          {/* ===================================================================== */}
          <section id="geography" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-700" />
                <span>Geographic Coverage & Headquarters Base</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Documented domestic base and international deployment footprint.
              </p>
            </div>

            {/* Headquarters Highlight Banner */}
            <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase font-mono block">Primary Global Headquarters</span>
                  <h3 className="font-bold text-slate-900 text-sm">Kozhikode (Calicut), Kerala, India</h3>
                  <div className="text-xs text-slate-600">HiLITE Business Park, Tower 1, CAFIT Square, Thondayad Bypass, Kozhikode 673014</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-mono text-xs font-semibold self-start md:self-auto">
                Headquarters Base
              </div>
            </div>

            {/* 4 Reported International Markets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              
              {/* India */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs">🇮🇳 India (Core Hub)</strong>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-800">Primary HQ</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Statewide Kerala school base with expanding private CBSE/ICSE partner schools in South India.
                </p>
              </div>

              {/* UAE */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs">🇦🇪 United Arab Emirates</strong>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800">Regional HQ</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Sharjah Publishing City Free Zone office, serving Gulf Indian and international schools in Dubai and Sharjah.
                </p>
              </div>

              {/* United Kingdom */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs">🇬🇧 United Kingdom</strong>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-700">Accreditation</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  UK CPD certification services alignment, international curriculum delivery, and digital festival participation.
                </p>
              </div>

              {/* Canada */}
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-xs">🇨🇦 Canada</strong>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-100 text-slate-700">Distribution</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Reported overseas student enrollment via online digital curriculum platforms.
                </p>
              </div>

            </div>
          </section>

          {/* ===================================================================== */}
          {/* 8. PRICING AND DURATION (COMMERCIAL INTELLIGENCE)                     */}
          {/* ===================================================================== */}
          <section id="pricing" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-700" />
                <span>Commercial Intelligence: Pricing & Durations</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Estimated institutional licensing models and duration breakdown.
              </p>
            </div>

            {/* Pricing Overview Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  <span>Pricing Overview</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                  Estimated Institutional Pricing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Estimated Annual Seat Cost</span>
                  <div className="text-xl font-black text-slate-900 font-mono">₹1,500 – ₹4,000</div>
                  <span className="text-[10px] text-slate-500 mt-1 block">per student / year (bundled into school fee)</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Bundled Deliverables</span>
                  <ul className="text-[11px] text-slate-700 space-y-0.5">
                    <li>• Graded NEP 2020 textbooks</li>
                    <li>• Cloud LMS & Browser IDE access</li>
                    <li>• Smart AI Teacher Tool licenses</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Hardware & Add-on Tiers</span>
                  <ul className="text-[11px] text-slate-700 space-y-0.5">
                    <li>• Optional Micro:bit robotics kit (~₹3,500)</li>
                    <li>• Free UK CPD teacher training bundle</li>
                    <li>• B2C live online classes (~₹1,000–₹2,500/mo)</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/70 text-[11px] text-amber-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Data Integrity Note:</strong> Cyber Square does not publish standard public rate sheets. Pricing values above reflect estimated institutional contract averages from regional school adoptions.
                </span>
              </div>
            </div>

            {/* Duration Comparison */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                Academic & Training Durations
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Bootcamps</span>
                  <strong className="text-slate-900 text-xs">1–3 Days</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Term Modules</span>
                  <strong className="text-slate-900 text-xs">3–6 Months</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Academic Curricula</span>
                  <strong className="text-slate-900 text-xs">9–12 Months</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">Teacher CPD</span>
                  <strong className="text-slate-900 text-xs">40 Hours</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 9. COMPETITIVE STRATEGY DASHBOARD (THE MOST IMPORTANT SECTION)       */}
          {/* ===================================================================== */}
          <section id="strategy" className="space-y-6 scroll-mt-20">
            <div className="border-b-2 border-blue-600 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-700" />
                  <span>Competitive Intelligence & MYST Strategic Radar</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-level strategic confrontation, market vulnerability analysis, and differentiation pillars.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-700 text-white font-mono self-start sm:self-auto">
                MYST Strategic Advantage
              </span>
            </div>

            {/* Strategic Archetype Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase font-mono">
                    Rival Stance
                  </span>
                  <h3 className="text-lg font-bold text-white">Cyber Square</h3>
                </div>
                <div className="text-xs text-blue-300 font-semibold mb-2">
                  Direct Competitor • K-12 AI & Coding Education
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Turnkey K-12 AI textbook publisher and browser coding lab ecosystem. Highly optimized for mass CBSE/Cambridge school adoptions and non-specialist teacher enablement, but lacks production software engineering depth.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-mono">
                    MYST Positioning
                  </span>
                  <h3 className="text-lg font-bold text-white">MYST International</h3>
                </div>
                <div className="text-xs text-emerald-300 font-semibold mb-2">
                  Advanced AI, Autonomous Agents & Project-Based Engineering
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deep-tech software engineering curricula: Autonomous multi-agent architectures, real cloud deployments, and verified GitHub portfolios that build elite university credentials.
                </p>
              </div>
            </div>

            {/* A. Competitor Strengths (6 Visual Cards) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Competitor Strengths & Market Moats</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <strong className="text-slate-900 block text-xs">1. Institutional Relationships</strong>
                  <div className="text-[10px] text-blue-700 font-mono">Strategic Importance: High</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    1,000+ school network across India and GCC creates high brand familiarity and word-of-mouth trust among school principals.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <strong className="text-slate-900 block text-xs">2. Physical Textbook Adoption</strong>
                  <div className="text-[10px] text-blue-700 font-mono">Strategic Importance: High</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Prescribed curriculum textbooks lock schools into year-long commitments, making mid-term vendor replacement difficult.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <strong className="text-slate-900 block text-xs">3. Cloud Coding Infrastructure</strong>
                  <div className="text-[10px] text-blue-700 font-mono">Strategic Importance: High</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Zero-installation browser IDE reduces friction for school computer labs with outdated or restricted hardware.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <strong className="text-slate-900 block text-xs">4. Smart AI Teacher Tools</strong>
                  <div className="text-[10px] text-blue-700 font-mono">Strategic Importance: Medium</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Automated lesson plan generation and exam paper builders reduce teacher workload, creating faculty loyalty.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <strong className="text-slate-900 block text-xs">5. International School Network</strong>
                  <div className="text-[10px] text-blue-700 font-mono">Strategic Importance: High</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Established presence across UAE NRI and Cambridge schools through Sharjah Free Zone operations.
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <strong className="text-slate-900 block text-xs">6. Bundled Educational Services</strong>
                  <div className="text-[10px] text-blue-700 font-mono">Strategic Importance: Medium</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    One-stop integration covering textbooks, digital LMS, robotics kits, and teacher CPD certifications.
                  </p>
                </div>
              </div>
            </div>

            {/* B. Competitor Weaknesses & Market Gaps (3 Opportunity Cards for MYST) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>Competitor Weaknesses & MYST Strategic Opportunities</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  3 Primary Attack Plays
                </span>
              </div>

              <div className="space-y-3.5">
                
                {/* Opportunity 1 */}
                <div className="bg-white rounded-xl border-l-4 border-l-emerald-600 border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span>1. Autonomous AI Agents & Enterprise Software Deficit</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 font-mono">
                      Impact Assessment: High (Product Gap)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <strong className="text-slate-700 block mb-1">Competitor Vulnerability:</strong>
                      <p className="text-slate-600">
                        Cyber Square's curriculum focuses primarily on visual block coding (Scratch), basic Python syntax, and simple PictoBlox machine learning. They lack real production-grade Autonomous AI Agents, multi-agent frameworks, LLM system design, and live cloud deployment.
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
                      <strong className="text-emerald-900 block mb-1">MYST Differentiation Play:</strong>
                      <p className="text-emerald-800">
                        Introduce comprehensive Autonomous AI Agents, Claude/Gemini API integrations, modern React/Node.js web architectures, and verified GitHub credentials that showcase genuine production engineering capability.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                    <span>Business Relevance: Attracts top-tier CBSE/Cambridge schools looking for real AI</span>
                    <span>Source: Cyber Square Official Curriculum Documentation</span>
                  </div>
                </div>

                {/* Opportunity 2 */}
                <div className="bg-white rounded-xl border-l-4 border-l-emerald-600 border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span>2. Higher Secondary (Classes 11 & 12) & Career Transition Disconnect</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 font-mono">
                      Impact Assessment: High (Age Group Gap)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <strong className="text-slate-700 block mb-1">Competitor Vulnerability:</strong>
                      <p className="text-slate-600">
                        Cyber Square's core market terminates at primary and middle school syntax. They have no structured engineering finishing program for Grade 11-12 students who need competitive university tech portfolios.
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
                      <strong className="text-emerald-900 block mb-1">MYST Differentiation Play:</strong>
                      <p className="text-emerald-800">
                        Deliver high school deep-tech AI engineering fellowships that build demonstrable software portfolios, aiding students in admissions to premier Indian and global engineering colleges.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                    <span>Business Relevance: High-ticket student willingness to pay for college admissions edge</span>
                    <span>Source: Cyber Square School Grade Distribution Audits</span>
                  </div>
                </div>

                {/* Opportunity 3 */}
                <div className="bg-white rounded-xl border-l-4 border-l-emerald-600 border border-slate-200 p-4 shadow-2xs space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span>3. Custom Innovation Studios vs Rigid Mandatory Textbook Bundles</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 font-mono">
                      Impact Assessment: Medium (Delivery Model Gap)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <strong className="text-slate-700 block mb-1">Competitor Vulnerability:</strong>
                      <p className="text-slate-600">
                        Requires whole-school textbook purchasing and rigid term timetables. Progressive schools frequently resist heavy textbook fees and generic mass curricula.
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
                      <strong className="text-emerald-900 block mb-1">MYST Differentiation Play:</strong>
                      <p className="text-emerald-800">
                        Offer agile project-based innovation studios, weekend hackathons, and modular add-on tracks with zero mandatory textbook overhead.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                    <span>Business Relevance: Rapid entry into premium schools without textbook replacement hurdles</span>
                    <span>Source: Private CBSE & Cambridge School Feedback</span>
                  </div>
                </div>

              </div>
            </div>

            {/* C. Competitive Comparison Matrix (8 Pillars) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>Head-to-Head Competitive Comparison (8 Strategic Pillars)</span>
              </h3>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-[11px] font-bold">
                      <th className="py-2.5 px-3 w-1/4">Strategic Pillar</th>
                      <th className="py-2.5 px-3 w-3/8 text-slate-800">Cyber Square</th>
                      <th className="py-2.5 px-3 w-3/8 text-blue-900 bg-blue-50/80">MYST International</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11px]">
                    {[
                      {
                        pillar: '1. Core Services',
                        cs: 'K-12 textbook publishing + browser coding lab + basic robotics + AI teacher tools.',
                        myst: 'Comprehensive Autonomous AI Agents, GenAI engineering, and accredited institutional curricula.'
                      },
                      {
                        pillar: '2. Technology Stack',
                        cs: 'Scratch, block coding, basic Python syntax, PictoBlox, Micro:bit, HTML/CSS.',
                        myst: 'Autonomous AI Agents, PyTorch, modern web architectures, and production cloud sandboxes.'
                      },
                      {
                        pillar: '3. Target Customers',
                        cs: 'Mass K-12 school textbook adoptions (Kindergarten to Grade 10).',
                        myst: 'Premium private CBSE/ICSE schools, engineering colleges, and career transitioners.'
                      },
                      {
                        pillar: '4. Delivery Model',
                        cs: 'Annual textbook bundle + cloud lab + automated lab exams.',
                        myst: 'Year-long accredited add-ons, continuous project portfolios, and verified GitHub credentials.'
                      },
                      {
                        pillar: '5. Unique Selling Proposition (USP)',
                        cs: 'Turnkey school computer science textbook & teacher workload reduction suite.',
                        myst: 'Cutting-edge artificial intelligence, verified real-world code output, and elite corporate readiness.'
                      },
                      {
                        pillar: '6. Project-Based Learning',
                        cs: 'Standardized curricular textbook exercises and annual digital festival submissions.',
                        myst: 'Open-ended production software studios, autonomous agents, and real open-source repos.'
                      },
                      {
                        pillar: '7. Advanced AI Education',
                        cs: 'Pre-trained vision blocks (PictoBlox) and rule-based logic; terminates at introductory ML.',
                        myst: 'Prompt engineering, multi-agent LLM systems, neural nets, and AI API orchestration.'
                      },
                      {
                        pillar: '8. Institutional Positioning',
                        cs: 'Comprehensive textbook vendor replacing traditional computer science books.',
                        myst: 'Specialized deep-tech partner introducing next-generation technology tracks.'
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'}>
                        <td className="py-2.5 px-3 font-bold text-slate-900 border-r border-slate-100">
                          {row.pillar}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 border-r border-slate-100 leading-relaxed">
                          {row.cs}
                        </td>
                        <td className="py-2.5 px-3 text-blue-950 font-semibold bg-blue-50/30 leading-relaxed">
                          {row.myst}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* D. Threats & Competitor Moats (Severity Assessment Cards) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Threats & Competitor Moat Assessments</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                
                {/* Threat 1 */}
                <div className="p-4 bg-white rounded-xl border border-rose-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-xs">1. Physical Textbook Adoption</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-100 text-rose-900 font-mono">
                      Severity: High
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Category: Commercial Moat</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>Competitor Advantage:</strong> School boards adopt books for the full academic cycle, creating high switching costs once book lists are published.
                  </div>
                  <div className="p-2 bg-rose-50/60 rounded-lg border border-rose-100 text-[10px] text-rose-900">
                    <strong>Implication for MYST:</strong> Difficult to displace mid-year. Position MYST as an advanced engineering studio add-on rather than book replacement.
                  </div>
                </div>

                {/* Threat 2 */}
                <div className="p-4 bg-white rounded-xl border border-rose-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-xs">2. Gulf NRI School Network</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-100 text-rose-900 font-mono">
                      Severity: High
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Category: Regional Moat</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>Competitor Advantage:</strong> Deep brand recognition and established contracts across Indian diaspora school groups in Dubai, Sharjah, and Abu Dhabi.
                  </div>
                  <div className="p-2 bg-rose-50/60 rounded-lg border border-rose-100 text-[10px] text-rose-900">
                    <strong>Implication for MYST:</strong> Expansion into UAE schools requires competing with Cyber Square's existing relationship network.
                  </div>
                </div>

                {/* Threat 3 */}
                <div className="p-4 bg-white rounded-xl border border-rose-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-xs">3. Smart AI Teacher Tools</strong>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-100 text-amber-900 font-mono">
                      Severity: Medium
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Category: Platform Moat</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>Competitor Advantage:</strong> Automated lesson plans and exam builders save teachers hours weekly, making principals reluctant to switch.
                  </div>
                  <div className="p-2 bg-amber-50/60 rounded-lg border border-amber-100 text-[10px] text-amber-900">
                    <strong>Implication for MYST:</strong> MYST must provide automated grading and teacher portal assistance so teachers are not burdened.
                  </div>
                </div>

              </div>
            </div>

            {/* E. Strategic Opportunity Radar Matrix */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">
                Strategic Opportunity Radar (Market Impact vs Feasibility)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[9px] font-bold uppercase text-emerald-900 font-mono">Priority Attack Vector #1</span>
                  <strong className="text-slate-900 block text-xs">Autonomous AI Agents Curriculum</strong>
                  <span className="text-[11px] text-emerald-800 block">High Impact • Immediate Feasibility</span>
                  <p className="text-[10px] text-slate-600 pt-1">
                    Directly answers demand from forward-looking schools seeking beyond-Scratch AI education.
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[9px] font-bold uppercase text-emerald-900 font-mono">Priority Attack Vector #2</span>
                  <strong className="text-slate-900 block text-xs">High School Admissions Portfolios</strong>
                  <span className="text-[11px] text-emerald-800 block">High Impact • High Willingness to Pay</span>
                  <p className="text-[10px] text-slate-600 pt-1">
                    Targets Class 11-12 students omitted by Cyber Square's primary/middle school textbook focus.
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[9px] font-bold uppercase text-emerald-900 font-mono">Priority Attack Vector #3</span>
                  <strong className="text-slate-900 block text-xs">Non-Textbook Innovation Studios</strong>
                  <span className="text-[11px] text-emerald-800 block">Medium Impact • Zero Switching Friction</span>
                  <p className="text-[10px] text-slate-600 pt-1">
                    Enables schools to adopt MYST labs without canceling their existing textbook printing contracts.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* ===================================================================== */}
          {/* 10. SOURCES AND VERIFICATION DOSSIER                                  */}
          {/* ===================================================================== */}
          <section id="sources" className="space-y-4 scroll-mt-20">
            <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-blue-700" />
                  <span>Sources & Verification Dossier</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distinguishing company-reported data, published evidence, and analytical interpretations.
                </p>
              </div>

              {/* Source Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1 text-xs">
                {['All', 'Published Evidence', 'Company-Reported Data', 'Estimated Commercial Information', 'Strategic Interpretation'].map(c => (
                  <button
                    key={c}
                    onClick={() => setSourceCategory(c)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                      sourceCategory === c
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Official Primary Source Banner */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Primary Official Website</span>
                  <a 
                    href="https://cybersquare.org/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-bold text-slate-900 hover:text-blue-700 text-sm inline-flex items-center gap-1 hover:underline"
                  >
                    <span>https://cybersquare.org/</span>
                    <ExternalLink className="w-3 h-3 text-blue-600" />
                  </a>
                  <span className="text-[11px] text-slate-500 block">Official institutional portal for schools, cloud labs, and teacher enablement.</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto font-mono">
                Primary Source
              </span>
            </div>

            {/* Categorized Sources Grid */}
            <div className="space-y-2.5">
              {filteredSources.map(src => {
                const isPublished = src.category === 'Published Evidence';
                const isReported = src.category === 'Company-Reported Data';
                const isEstimate = src.category === 'Estimated Commercial Information';
                const isStrategic = src.category === 'Strategic Interpretation';

                return (
                  <div key={src.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 text-xs">{src.title}</strong>
                        {src.url.startsWith('http') && (
                          <a 
                            href={src.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{src.notes}</p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Supports: <span className="text-slate-700 font-medium">{src.relevance}</span>
                      </div>
                    </div>

                    <div className="shrink-0 self-start">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${
                        isPublished ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        isReported ? 'bg-blue-50 text-blue-800 border-blue-200' :
                        isEstimate ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        isStrategic ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {src.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary Notice */}
            <div className="p-4 bg-slate-100/70 rounded-xl border border-slate-200 text-center text-xs text-slate-500 space-y-1">
              <div>Competitor Intelligence Dossier prepared for <strong>MYST International</strong>.</div>
              <div className="text-[11px]">
                Preserves all original findings, institutional metrics, and verified portal evidence.
              </div>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}

