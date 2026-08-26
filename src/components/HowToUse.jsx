import React from 'react';
import { 
  UploadCloud, Wand2, Download, 
  FileText, Sliders, CheckCircle, 
  Languages, Brain, Sparkles,
  Type, Link, Share2, 
  Mic, Volume2, Search, Tags,
  ShieldCheck, Gauge
} from 'lucide-react';

const HowToUse = ({ toolName }) => {
  // Har tool ka apna alag data aur icons
  const toolsData = {
    transcriber: {
      badge: "WORKFLOW",
      title: "How it works",
      subtitle: "Three steps. Absolute quality. Lightning speed.",
      steps: [
        { icon: UploadCloud, step: "STEP 1", title: "Upload your file", desc: "Drop an MP3, WAV, or MP4 file. Any standard audio/video format works perfectly." },
        { icon: Wand2, step: "STEP 2", title: "Auto-magic processing", desc: "Our powerful backend engine processes the speech accurately without crashing your browser." },
        { icon: Download, step: "STEP 3", title: "Download text", desc: "Get a crystal-clear, formatted text transcript instantly without missing a word." }
      ]
    },
    summarizer: {
      badge: "WORKFLOW",
      title: "Summarize in seconds",
      subtitle: "Paste your text, choose the length, and get the key points.",
      steps: [
        { icon: FileText, step: "STEP 1", title: "Paste your text", desc: "Drop in your long article, press release, or court document into the editor." },
        { icon: Sliders, step: "STEP 2", title: "Set your preferences", desc: "Select whether you need a short, medium, or detailed summary format." },
        { icon: CheckCircle, step: "STEP 3", title: "Get the gist", desc: "Instantly receive a clean, journalist-grade summary ready for your story." }
      ]
    },
    translator: {
      badge: "WORKFLOW",
      title: "Translate with precision",
      subtitle: "Journalist-grade translation that preserves the original context.",
      steps: [
        { icon: Languages, step: "STEP 1", title: "Enter source text", desc: "Paste your English or Urdu content directly into the translation box." },
        { icon: Brain, step: "STEP 2", title: "Contextual analysis", desc: "Our advanced model understands journalistic nuances, idioms, and local phrasing." },
        { icon: Sparkles, step: "STEP 3", title: "Publish-ready output", desc: "Get a highly accurate, native-sounding translation instantly." }
      ]
    },
    headlines: {
      badge: "WORKFLOW",
      title: "Craft the perfect hook",
      subtitle: "Generate engaging, click-worthy headlines for your articles.",
      steps: [
        { icon: FileText, step: "STEP 1", title: "Provide context", desc: "Paste your drafted article or the core topic of your breaking news." },
        { icon: Brain, step: "STEP 2", title: "AI Brainstorming", desc: "Our engine analyzes the text to generate 5 distinct, high-impact headline styles." },
        { icon: Type, step: "STEP 3", title: "Pick and refine", desc: "Choose the best hook to capture your readers' attention and boost SEO." }
      ]
    },
    social: {
      badge: "WORKFLOW",
      title: "Cross-platform posts",
      subtitle: "Turn one article into tailored posts for every network.",
      steps: [
        { icon: Link, step: "STEP 1", title: "Input your story", desc: "Paste the text or link of the article you want to share with your audience." },
        { icon: Sparkles, step: "STEP 2", title: "Platform optimization", desc: "AI automatically formats the tone and length for LinkedIn, X, IG, and TikTok." },
        { icon: Share2, step: "STEP 3", title: "Ready to publish", desc: "Copy the generated posts, complete with engaging emojis and relevant hashtags." }
      ]
    },
    tts: {
      badge: "WORKFLOW",
      title: "Script to newscast",
      subtitle: "Give your written stories a professional, broadcast-ready voice.",
      steps: [
        { icon: FileText, step: "STEP 1", title: "Enter your script", desc: "Type or paste the news script or article you want to vocalize." },
        { icon: Mic, step: "STEP 2", title: "Audio processing", desc: "Our engine converts the text using natural-sounding, newscaster-style voice models." },
        { icon: Volume2, step: "STEP 3", title: "Download audio", desc: "Get a high-quality MP3 audio file instantly, ready for podcast or video overlay." }
      ]
    },
    seo: {
      badge: "WORKFLOW",
      title: "Optimize for search",
      subtitle: "Automatically pull keywords and metadata from your content.",
      steps: [
        { icon: FileText, step: "STEP 1", title: "Input article", desc: "Paste the full text of your completed story into the extractor." },
        { icon: Search, step: "STEP 2", title: "Deep scanning", desc: "The AI identifies core entities, high-ranking keywords, and overall topics." },
        { icon: Tags, step: "STEP 3", title: "Grab metadata", desc: "Instantly get precise keywords, tags, and a ready-to-use meta description." }
      ]
    }
  };

  // Agar ghalat naam diya jaye toh default 'transcriber' utha le
  const data = toolsData[toolName] || toolsData.transcriber;

  return (
    <div className="relative w-full py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      
      {/* Background Grid Pattern (Visible in both Light & Dark modes) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        
        {/* ========================================= */}
        {/* SECTION 1: HOW IT WORKS (3 STEPS)         */}
        {/* ========================================= */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="bg-green-100 dark:bg-[#003311] text-green-700 dark:text-[#00ff66] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            {data.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-500 dark:text-[#888888]">
            {data.subtitle}
          </p>
        </div>

        {/* 3 Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            return (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 md:p-10 transition-colors duration-300 relative overflow-hidden group hover:border-green-500/30"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-transparent flex items-center justify-center mb-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-gray-700 dark:text-white" />
                </div>
                
                {/* Text Content */}
                <div className="text-sm font-bold text-green-600 dark:text-[#00ff66] tracking-wider uppercase mb-3">
                  {stepItem.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                  {stepItem.title}
                </h3>
                <p className="text-gray-600 dark:text-[#888888] leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            );
          })}
        </div>


        {/* ========================================= */}
        {/* SECTION 2: BUILT FOR CREATORS / NEWSROOMS */}
        {/* ========================================= */}
        <div className="mt-32">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="bg-green-100 dark:bg-[#003311] text-green-700 dark:text-[#00ff66] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              WHY REPORTER TOOLKIT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Built for Modern Newsrooms
            </h2>
          </div>

          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Large Card */}
            <div className="lg:col-span-7 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-[32px] p-10 md:p-14 relative overflow-hidden flex flex-col justify-center transition-colors duration-300">
              {/* Subtle Glowing background flare (matching the image) */}
              <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-green-500/10 dark:bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

              {/* Glowing Shield Icon */}
              <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-[#00ffa615] text-green-600 dark:text-[#00ffa6] border border-green-200 dark:border-[#00ffa630] shadow-[0_0_30px_rgba(34,197,94,0.2)] flex items-center justify-center mb-8 relative z-10">
                <ShieldCheck className="w-8 h-8" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4 relative z-10">
                Enterprise-Grade Stability
              </h3>
              <p className="text-lg text-gray-600 dark:text-[#888888] leading-relaxed max-w-lg relative z-10">
                No more browser crashes or memory limits. Our robust backend handles heavy audio files, long transcripts, and massive text generations effortlessly.
              </p>
            </div>

            {/* Right Side Stacked Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Top Right Card */}
              <div className="flex-1 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 md:p-10 transition-colors duration-300 relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-[#a855f715] text-purple-600 dark:text-[#c084fc] border border-purple-200 dark:border-[#a855f730] flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                  Completely Free
                </h3>
                <p className="text-gray-600 dark:text-[#888888] leading-relaxed">
                  No sneaky paywalls, no hidden limits. 100% free for journalists. Ever.
                </p>
              </div>

              {/* Bottom Right Card */}
              <div className="flex-1 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 md:p-10 transition-colors duration-300 relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-[#10b98115] text-emerald-600 dark:text-[#34d399] border border-emerald-200 dark:border-[#10b98130] flex items-center justify-center mb-6">
                  <Gauge className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                  Absolute Accuracy
                </h3>
                <p className="text-gray-600 dark:text-[#888888] leading-relaxed">
                  Smart AI processing preserves the original context, tone, and factual accuracy perfectly without hallucination.
                </p>
              </div>

            </div>

          </div>
        </div>
        {/* ========================================= */}

      </div>
    </div>
  );
};

export default HowToUse;