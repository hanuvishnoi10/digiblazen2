import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeroProps {
  onExploreProducts: () => void;
  onLearnMore: () => void;
}

export default function Hero({
  onExploreProducts,
  onLearnMore,
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden glow-radial-bg">
      
      {/* Visual background rings for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-neon/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-glow-highlight/10 rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Sparkle badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#0F3F36]/50 border border-primary-neon/30 text-xs font-medium tracking-wide text-glow-highlight mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-glow-highlight animate-pulse shrink-0" />
          <span className="font-mono uppercase text-[10px]">Your Digital Launchpad</span>
        </motion.div>

        {/* Catchy headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          Everything You Need to <br className="hidden sm:inline" />
          <span className="text-gradient font-extrabold text-shadow-xl">Create, Learn & Grow</span>
        </motion.h1>

        {/* Short, elegant kicker */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Access the world's leading AI tools and digital subscriptions at competitive prices with fast activation and support.
        </motion.p>

        {/* Beautiful CTA triggers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={onExploreProducts}
            className="glow-btn px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4 text-slate-950 font-bold" />
          </button>
          
          <button
            onClick={onLearnMore}
            className="px-6 py-3 rounded-xl bg-[#0F3F36]/30 hover:bg-[#0F3F36]/60 border border-primary-neon/20 hover:border-primary-neon/60 text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
          >
            Learn More
          </button>
        </motion.div>

        {/* Creator highlights badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 border-t border-primary-neon/10 pt-8 max-w-3xl mx-auto grid grid-cols-3 gap-4"
        >
          <div>
            <span className="block text-2xl font-bold font-display text-primary-neon">2,400+</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-1">Satisifed Sales</span>
          </div>
          <div className="border-x border-primary-neon/10">
            <span className="block text-2xl font-bold font-display text-primary-neon">100%</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-1">Instant Delivery</span>
          </div>
          <div>
            <span className="block text-2xl font-bold font-display text-primary-neon">4.9/5</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium block mt-1">Average Review</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
