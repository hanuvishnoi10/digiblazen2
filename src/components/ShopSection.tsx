import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { Star, ArrowRight, X, Sparkles, Check, CheckCircle2, ShoppingCart } from "lucide-react";

const renderDescriptionWithLinks = (text: string) => {
  if (!text) return "";
  // Match standard web links (http, https, or starting with www)
  const urlRegex = /((?:https?:\/\/|www\.)[a-zA-Z0-9.\-_#?&=/~]+)/gi;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const href = part.toLowerCase().startsWith("www.") ? `https://${part}` : part;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-neon underline font-bold hover:text-[#00ffd0] transition inline-block relative z-10"
          onClick={(e) => e.stopPropagation()} // Stop modal or click bubbling
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

interface ShopSectionProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onShowToast: (msg: string, type: "success" | "info") => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  formatPrice: (priceInUsd: number, priceInr?: number) => string;
  selectedCurrency: string;
  onSelectProduct: (product: Product) => void;
}

export default function ShopSection({
  products,
  searchQuery,
  onAddToCart,
  onShowToast,
  selectedCategory,
  setSelectedCategory,
  formatPrice,
  selectedCurrency,
  onSelectProduct,
}: ShopSectionProps) {
  // Filter products based on search box input & category and sort out of stock to the bottom
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category check
    const matchesCategory =
      selectedCategory === "all" ||
      (() => {
        const productCat = (p.category || "").toLowerCase();
        const selCat = selectedCategory.toLowerCase();
        if (productCat === selCat) return true;
        
        // Helper to strip non-alphanumeric characters, spaces, and trailing 's' plural signs
        const normalize = (str: string) => {
          return str
            .replace(/s\b/gi, "") // remove trailing s for simple singular mapping
            .replace(/[^a-z0-9]/gi, "") // remove spaces/special chars
            .toLowerCase();
        };

        const normSel = normalize(selCat);
        if (normalize(productCat) === normSel) return true;

        const categories = productCat.split(/\s*(?:,|\/|&)\s*/);
        return categories.some(cat => {
          const normCat = normalize(cat);
          if (normCat === normSel) return true;
          // Map music or voice generation tools to the active audio tab
          if (normSel === "audio" && (normCat === "music" || p.title.toLowerCase().includes("elevenlabs"))) return true;
          // Map video related categories to videos tab
          if (normSel === "video" && normCat.includes("video")) return true;
          // Map AI tools under ai chat bot
          if (normSel === "aichatbot" && (normCat.includes("ai") || normCat.includes("chatbot") || normCat.includes("art"))) return true;
          // Map Website Builder, No-Code, and Design to coding tab
          if (normSel === "coding" && (normCat.includes("code") || normCat.includes("design") || normCat.includes("web") || normCat.includes("nocode") || normCat.includes("builder"))) return true;
          return false;
        });
      })();

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const aStock = a.outOfStock ? 1 : 0;
    const bStock = b.outOfStock ? 1 : 0;
    return aStock - bStock;
  });

  const handleProductCardClick = (product: Product) => {
    onSelectProduct(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Avoid triggering details modal overlay
    e.preventDefault(); // Prevent navigations from anchor wrapper card clicks
    onAddToCart(product);
    onShowToast(`Added "${product.title}" to cart!`, "success");
  };

  // Define UI displayed categories
  const categoriesList = [
    { id: "all", label: "All Items" },
    { id: "ai chat bot", label: "AI Chat Bot" },
    { id: "videos", label: "Videos" },
    { id: "audio", label: "Audio" },
    { id: "coding", label: "Coding" }
  ];

  return (
    <section id="shop-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      
      {/* Dynamic Category Pill Filters Selector */}
      <div className="mb-10 flex flex-wrap gap-2.5 justify-center sm:justify-start">
        {categoriesList.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-primary-neon text-slate-950 font-bold border-transparent shadow-[0_0_15px_rgba(0,230,168,0.25)]"
                  : "bg-[#0F3F36]/10 border-primary-neon/15 text-slate-300 hover:bg-[#0F3F36]/30 hover:border-primary-neon/50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Informational count header */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
          Found {filteredProducts.length} Premium resource{filteredProducts.length === 1 ? "" : "s"}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-[#0F3F36]/10 rounded-2xl border border-primary-neon/15 max-w-lg mx-auto">
          <p className="text-sm text-slate-400">No products found matching your active criteria.</p>
          <p className="text-xs text-slate-500 mt-2 font-mono">Try adjusting your search query or categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p, idx) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => handleProductCardClick(p)}
              className="custom-glow-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group h-full hover:border-[#00ffd0]/40 transition-colors"
            >
              
              {/* Product Thumbnail Wrapper */}
              <div className="h-36 overflow-hidden relative bg-[#061411]/81">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Out Of Stock Status Banner overlay */}
                {p.outOfStock && (
                  <div className="absolute top-4 left-4 bg-red-950/90 border border-red-500/35 backdrop-blur rounded px-2.5 py-1 text-[10px] text-red-300 flex items-center space-x-1 font-bold uppercase tracking-wider shadow-lg z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>Out of Stock</span>
                  </div>
                )}

                {/* Rating overlay badge */}
                <div className="absolute bottom-4 right-4 bg-[#061411]/90 backdrop-blur rounded-lg px-2 py-0.5 text-xs text-primary-neon flex items-center space-x-1 font-semibold">
                  <Star className="w-3 h-3 text-primary-neon fill-primary-neon" />
                  <span>{p.rating.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Product Info Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-primary-neon transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-sans mt-2.5 leading-relaxed line-clamp-3 select-text">
                    {renderDescriptionWithLinks(p.description)}
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 space-y-1.5 text-[11px] text-slate-500">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-1.5">
                        <Check className="w-3 h-3 text-primary-neon shrink-0 mt-0.5" />
                        <span className="leading-snug select-text">{renderDescriptionWithLinks(feat)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Primary trigger row */}
                <div className="border-t border-primary-neon/10 mt-6 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                      Validity: {p.validity || "Lifetime Access"}
                    </span>
                    <p className="text-2xl font-bold text-white font-display">
                      {formatPrice(p.price, p.priceInr)}
                    </p>
                  </div>

                  {p.outOfStock ? (
                    <button
                      disabled
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className="px-3 py-2 rounded-xl bg-red-950/40 text-red-400 border border-red-900/20 text-xs font-mono font-bold uppercase tracking-tight cursor-not-allowed select-none"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCartClick(e, p)}
                      className="p-3.5 rounded-xl bg-[#0F3F36] hover:bg-[#00E6A8] text-primary-neon hover:text-slate-950 border border-primary-neon/40 hover:border-transparent transition-all cursor-pointer shadow-[0_0_10px_rgba(0,230,168,0.1)] hover:shadow-[0_0_15px_rgba(0,230,168,0.35)]"
                      title="Add to shopping cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </motion.div>
          ))}
        </div>
      )}

    </section>
  );
}
