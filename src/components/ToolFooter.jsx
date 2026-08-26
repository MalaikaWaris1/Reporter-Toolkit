import React, { useState, useEffect } from 'react';

const ToolFooter = () => {
  // Tools data with unique premium gradients to match the Google style blur backgrounds
  const tools = [
    { 
      name: "Summarization Engine", 
      desc: "Paste a press release, court document, or transcript to get a clean, journalist-grade summary instantly.",
      gradient: "from-[#1e3a5f] via-[#524438] to-[#0f172a]"
    },
    { 
      name: "Wire Translator", 
      desc: "Translate content accurately in multiple languages. Built specifically for high-stakes reporting.",
      gradient: "from-[#2d3748] via-[#4a5568] to-[#1a202c]"
    },
    { 
      name: "TTS Studio", 
      desc: "Convert your written scripts into natural-sounding, broadcast-ready speech.",
      gradient: "from-[#3f2b96] via-[#112240] to-[#0a192f]"
    },
    { 
      name: "Interview Transcriber", 
      desc: "Turn your raw audio and video recordings into highly accurate, formatted text.",
      gradient: "from-[#5f2c82] via-[#4a00e0] to-[#000000]"
    },
    { 
      name: "Headline Generator", 
      desc: "Generate catchy, SEO-friendly headlines that drive engagement and clicks.",
      gradient: "from-[#11998e] via-[#38ef7d] to-[#000000]"
    },
    { 
      name: "Social Media Maker", 
      desc: "Create ready-to-post social media content tailored for X, LinkedIn, and Instagram.",
      gradient: "from-[#b92b27] via-[#1565C0] to-[#000000]"
    },
    { 
      name: "SEO Extractor", 
      desc: "Automatically extract key SEO terms, meta descriptions, and tags from any article.",
      gradient: "from-[#373B44] via-[#4286f4] to-[#000000]"
    },
  ];

  // ------------------------------------------------------------------------
  // IMAGE SLIDESHOW LOGIC
  // ------------------------------------------------------------------------
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
  const cinematicImages = [
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=800&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % cinematicImages.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [cinematicImages.length]);

  return (
    <div className="w-full max-w-[100vw] pb-8 overflow-hidden box-border">

      {/* 1. Scrolling Models/Tools Section */}
      <div className="bg-[#0b0b0b] text-white pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-24 md:pb-32 mt-8 sm:mt-12 md:mt-20 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] max-w-[1600px] w-[80%] sm:w-[90%] md:w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
          <h2 className="text-2xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-3 sm:mb-4 md:mb-6">
            Our Models
          </h2>
          <p className="text-xs sm:text-lg md:text-2xl text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed">
            Reporter Toolkit collaborates with creatives at every stage, from idea to execution—all using advanced generative models.
          </p>
        </div>

        {/* Horizontal Scrollable Container */}
        <div 
          className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 snap-x snap-mandatory px-2 sm:px-8 md:px-12 pb-6 md:pb-12 items-center w-full" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {tools.map((tool, index) => (
            <div 
              key={index} 
              className={`relative flex-shrink-0 w-[75vw] sm:w-[70vw] md:w-[65vw] max-w-[1100px] h-[420px] sm:h-[480px] md:h-[650px] snap-center rounded-[20px] sm:rounded-[24px] md:rounded-[48px] flex flex-col items-center justify-center p-5 sm:p-8 md:p-12 overflow-hidden bg-gradient-to-br ${tool.gradient}`}
            >
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center w-full">
                <h3 className="text-xl sm:text-4xl md:text-7xl font-medium mb-3 sm:mb-4 md:mb-6 tracking-tight drop-shadow-lg leading-tight px-2">
                  {tool.name}
                </h3>
                <p className="text-[11px] sm:text-base md:text-2xl text-white/80 leading-relaxed mb-6 sm:mb-8 md:mb-12 max-w-2xl drop-shadow-md px-2">
                  {tool.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
                  <button className="bg-white text-black px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full text-xs sm:text-base md:text-lg font-medium hover:scale-105 transition-transform duration-300 w-full sm:w-auto shadow-md">
                    Try in Toolkit
                  </button>
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full text-xs sm:text-base md:text-lg font-medium hover:bg-white/20 transition-colors duration-300 w-full sm:w-auto">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.5 Cinematic Feature Section */}
      <div className="relative bg-gradient-to-br from-[#1c1106] via-[#0a0500] to-[#000000] w-[80%] sm:w-[90%] md:w-full max-w-[1600px] mx-auto rounded-[24px] sm:rounded-[32px] md:rounded-[40px] mt-6 md:mt-8 mb-12 sm:mb-16 md:mb-24 py-10 sm:py-16 md:py-32 overflow-hidden">
        
        {/* Main Grid Wrapper */}
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-12 items-center relative px-4 sm:px-10 lg:px-12">

          {/* Left Column: Typographic List */}
          <div className="lg:col-span-4 flex flex-col justify-center relative z-10 text-center lg:text-left">
            <div className="text-[#666666] text-lg sm:text-2xl md:text-3xl font-medium tracking-tight mb-2 sm:mb-4 md:mb-6">
              Transcriber
            </div>
            <div className="text-[#888888] text-[9px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold mb-1 sm:mb-2">
              Old New Rare
            </div>
            <div className="text-white text-3xl sm:text-5xl lg:text-[5.5rem] font-bold leading-[1.1] sm:leading-[0.9] tracking-tighter mb-4 sm:mb-6 md:mb-8">
              Headline<br/>Generator
            </div>
            <div className="text-[#444444] text-xl sm:text-3xl md:text-4xl font-medium tracking-tight">
              SEO Extractor
            </div>
          </div>

          {/* Center Column: Floating Image Container */}
          <div className="lg:col-span-4 relative z-20 flex justify-center my-4 sm:my-8 lg:my-0">
            <div className="w-full max-w-[240px] sm:max-w-[340px] lg:w-[120%] lg:max-w-none h-[240px] sm:h-[280px] md:h-[320px] bg-black rounded-[20px] sm:rounded-[24px] md:rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-white/5 transform lg:-rotate-3 hover:rotate-0 transition-transform duration-700 ease-out relative overflow-hidden flex items-center justify-center">
              
              {cinematicImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Slide ${index}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentImgIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-tr from-[#9a3800]/60 via-[#2a0e00]/40 to-[#050505]/80 pointer-events-none"></div>
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-[#ff7300] rounded-full blur-[35px] sm:blur-[50px] md:blur-[60px] opacity-60 relative z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* Right Column: Title, Text & Link */}
          <div className="lg:col-span-4 relative z-10 lg:pl-12 text-center lg:text-left">
            <div className="absolute -top-40 right-0 w-[240px] h-[160px] bg-gradient-to-bl from-white/10 to-transparent rounded-[24px] border border-white/5 -rotate-6 backdrop-blur-sm hidden lg:block"></div>

            <h2 className="text-white text-2xl sm:text-4xl md:text-[4.5rem] font-bold leading-[1.15] md:leading-[0.9] tracking-tight mb-3 sm:mb-6 md:mb-8 relative z-10 drop-shadow-lg">
              Capture The<br/>Reader
            </h2>
            <p className="text-[#cccccc] text-xs sm:text-base md:text-lg leading-relaxed mb-5 sm:mb-8 md:mb-8 w-full max-w-[95%] sm:max-w-sm mx-auto lg:mx-0 relative z-10 font-medium">
              Deep in a fast-paced newsroom lives an unassuming workflow between raw wire copy and an AI model that breaks through the noise every publishing cycle.
            </p>
            <a href="#" className="text-white font-bold underline underline-offset-8 decoration-2 hover:text-[#999999] transition-colors relative z-10 text-xs sm:text-base md:text-lg inline-block">
              Try Tool
            </a>
          </div>

        </div>
      </div>

      {/* 2. Free to Use Banner */}
      <div className="max-w-[1400px] w-[80%] sm:w-[90%] md:w-full mx-auto mt-10 sm:mt-16 md:mt-24 mb-8 sm:mb-12 md:mb-16 px-0 sm:px-6">
        <div className="bg-gradient-to-br from-[#ea580c] to-[#dc2626] rounded-[20px] sm:rounded-[24px] px-5 py-6 sm:px-8 sm:py-10 md:px-16 md:py-12 flex flex-col md:flex-row gap-4 md:gap-16 items-center shadow-xl text-center md:text-left">

          {/* Left Side: Bold Heading */}
          <div className="w-full md:w-4/12">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Completely free to use
            </h2>
          </div>

          {/* Right Side: Description */}
          <div className="w-full md:w-8/12">
            <p className="text-white/95 text-xs sm:text-base md:text-lg leading-relaxed font-medium">
              Experience the full power of Reporter Toolkit without any restrictions. All our AI-driven tools are <strong className="text-white">100% free to use</strong> for your newsroom workflows. Generate unlimited summaries, accurate wire translations, and SEO-friendly headlines—no API limits, no daily caps.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ToolFooter;