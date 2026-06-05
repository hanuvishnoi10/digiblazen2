import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { Trash, X, ArrowRight, ShieldCheck, Mail, User, CreditCard, Sparkles, Receipt, Download } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onShowToast: (msg: string, type: "success" | "info") => void;
  onRefreshAllData: () => void;
  formatPrice: (priceInUsd: number, priceInr?: number) => string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onShowToast,
  onRefreshAllData,
  formatPrice,
}: CartDrawerProps) {
  const [paymentOption, setPaymentOption] = useState("Credit Card Proxy");
  const [checkingOut, setCheckingOut] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState<any | null>(null);

  const totalPrice = cartItems.reduce((acc, match) => acc + match.price, 0);
  const totalPriceInr = cartItems.reduce((acc, match) => acc + (match.priceInr || Math.round(match.price * 83)), 0);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      onShowToast("Your cart is empty. Add a product first!", "info");
      return;
    }

    setCheckingOut(true);
    try {
      const orderId = `order-${Math.floor(100 + Math.random() * 900)}`;
      const publishedOrder = {
        id: orderId,
        customerName: "Hanu (WhatsApp Customer)",
        customerEmail: "whatsapp@digitalblazen.com",
        paymentMethod: "WhatsApp Secure Checkout",
        totalPrice,
        totalPriceInr,
        date: new Date().toISOString(),
        status: 'completed' as const,
        items: cartItems.map(item => ({
          productId: item.id,
          productTitle: item.title,
          price: item.price,
          priceInr: item.priceInr || Math.round(item.price * 83)
        }))
      };

      // 1. Save order to localStorage
      const storedOrders = localStorage.getItem("digitalblazen_orders");
      let activeOrders = storedOrders ? JSON.parse(storedOrders) : [];
      activeOrders.push(publishedOrder);
      localStorage.setItem("digitalblazen_orders", JSON.stringify(activeOrders));

      // 2. Increment salesCount of purchased products in local products array
      const storedProducts = localStorage.getItem("digitalblazen_products");
      if (storedProducts) {
        try {
          let activeProducts: Product[] = JSON.parse(storedProducts);
          cartItems.forEach(cartItem => {
            const matchedProd = activeProducts.find(p => p.id === cartItem.id);
            if (matchedProd) {
              matchedProd.salesCount = (matchedProd.salesCount || 0) + 1;
            }
          });
          localStorage.setItem("digitalblazen_products", JSON.stringify(activeProducts));
        } catch (je) {
          console.error(je);
        }
      }

      // 3. Format WhatsApp messaging with cart details
      const productLines = cartItems.map((item, idx) => `${idx + 1}. *${item.title}* - ${formatPrice(item.price, item.priceInr)}`).join("\n");
      const whatsappText = `Hello Blazen! I'd like to purchase the following digital products from your site:\n\n${productLines}\n\n*Total Due:* ${formatPrice(totalPrice, totalPriceInr)}\n\nPlease proceed with my delivery setup. Thank you!`;
      const whatsappUrl = `https://wa.me/919625201893?text=${encodeURIComponent(whatsappText)}`;

      // 4. Redirect immediately
      window.open(whatsappUrl, "_blank");

      setReceiptOrder(publishedOrder);
      onShowToast("Order completed! Redirecting to WhatsApp secure checkout...", "success");
      onClearCart();
      onRefreshAllData();
    } catch (err) {
      console.error(err);
      onShowToast("Failed to process checkout. Please try again.", "info");
    } finally {
      setCheckingOut(false);
    }
  };

  const handleCloseReceiptAndReset = () => {
    setReceiptOrder(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Dimmed backdrop background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020706]"
          />

          {/* Right Drawer slider container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md bg-[#061411] border-l border-primary-neon/20 h-full flex flex-col justify-between shadow-2xl relative z-10"
          >
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-primary-neon/15 flex justify-between items-center bg-[#071915]">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-primary-neon animate-pulse" />
                <h3 className="font-display font-bold text-lg text-white">Your Cart Assets</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-800/10 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* IF RECEIPT SCREEN SUCCESS IS active - OVERRIDES normal cart list */}
            {receiptOrder ? (
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="text-center space-y-3 pt-4">
                  <div className="w-12 h-12 rounded-full bg-primary-neon/10 border border-primary-neon/30 flex items-center justify-center text-primary-neon mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base">Purchase processing!</h4>
                  <p className="text-[11px] text-slate-400 font-sans max-w-xs mx-auto">
                    Thank you. We've routed and finalized your access key pipelines instantly. Detailed delivery logs were dispatched to your whatsapp number
                  </p>
                </div>

                {/* Receipt Card Details Box styled */}
                <div className="p-4 rounded-xl bg-slate-950 border border-primary-neon/10 space-y-3 font-mono text-[10px]">
                  <div className="flex justify-between items-center border-b border-primary-neon/5 pb-2">
                    <span className="text-slate-500">Receipt ID:</span>
                    <span className="text-primary-neon font-bold">#{receiptOrder.id}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-slate-500 block">Deliverable Assets:</span>
                    {receiptOrder.items.map((it: any, itIdx: number) => (
                      <div key={itIdx} className="flex justify-between items-center pl-2 text-white font-sans text-xs">
                        <span>• {it.productTitle}</span>
                        <span className="font-mono text-[10px] text-glow-highlight">{formatPrice(it.price, it.priceInr)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-primary-neon/5 pt-2 flex justify-between items-center text-xs font-sans text-slate-400">
                    <span>Total Charged:</span>
                    <span className="font-mono font-bold text-white">{formatPrice(receiptOrder.totalPrice, receiptOrder.totalPriceInr)}</span>
                  </div>
                </div>

                {/* Mock download anchors */}
                <div className="p-5 bg-[#0F3F36]/20 border border-primary-neon/20 rounded-xl space-y-3">
                  <span className="text-[9px] font-mono uppercase text-glow-highlight flex items-center gap-1 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Direct Access Key Delivery
                  </span>
                  
                  {receiptOrder.items.map((it: any, idx: number) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={(e) => { e.preventDefault(); onShowToast(`Started product delivery setup for: ${it.productTitle}`, "success"); }}
                      className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-primary-neon/10 hover:border-primary-neon text-xs text-white transition hover:text-primary-neon"
                    >
                      <span className="truncate max-w-[200px]">{it.productTitle}</span>
                      <span className="flex items-center text-[10px] text-primary-neon font-bold"><Download className="w-3 h-3 mr-0.5" /> Get Asset</span>
                    </a>
                  ))}
                </div>

                <button
                  onClick={handleCloseReceiptAndReset}
                  className="w-full py-3 rounded-xl bg-primary-neon text-slate-950 text-xs font-semibold uppercase tracking-wider cursor-pointer font-sans block text-center"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              // NORMAL CART DRILL DOWN
              <>
                {/* Scrollable Products List area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <p className="text-xs text-slate-500 font-mono">Your checkout basket is empty.</p>
                      <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                        Navigate to our active product lists to explore responsive web boilerplates, life workspaces, and design assets.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-slate-950/70 border border-primary-neon/10 flex items-center justify-between gap-3 hover:border-primary-neon/30 transition duration-200"
                        >
                          <div className="flex items-center space-x-3 truncate">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 object-cover rounded-lg shrink-0"
                            />
                            <div className="truncate">
                              <span className="block text-xs font-semibold text-white truncate max-w-[170px]">{item.title}</span>
                              <span className="text-[10px] text-primary-neon font-mono font-semibold">{formatPrice(item.price, item.priceInr)}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              onRemoveFromCart(item.id);
                              onShowToast(`Removed "${item.title}" from cart`, "info");
                            }}
                            className="p-1.5 rounded-lg bg-red-950/20 hover:bg-red-950 text-red-400 hover:text-white transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      {/* Clear catalog button */}
                      <button
                        onClick={() => { onClearCart(); onShowToast("Shopping cart cleared.", "info"); }}
                        className="text-[10px] text-slate-500 hover:text-primary-neon font-mono tracking-wide underline cursor-pointer inline-block"
                      >
                        Reset Cart Empty
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotals & Information Secure Checkout Area */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-primary-neon/15 bg-[#071915] space-y-5">
                    
                    {/* SubTotals pricing lists */}
                    <div className="space-y-2 border-b border-primary-neon/5 pb-4">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-sans">
                        <span>Digital Deliverables sum:</span>
                        <span className="font-mono">{formatPrice(totalPrice, totalPriceInr)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-slate-400 font-sans">
                        <span>Checkout Taxes:</span>
                        <span className="font-mono">$0 / ₹0</span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-bold text-white mt-2">
                        <span>Total Due:</span>
                        <span className="font-mono text-primary-neon text-lg">{formatPrice(totalPrice, totalPriceInr)}</span>
                      </div>
                    </div>

                    {/* Customer Information inputs for delivery */}
                    <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed text-center">
                        Instant secure order keys delivery is configured and coordinated directly via WhatsApp.
                      </p>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={checkingOut}
                          className="glow-btn w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <ShieldCheck className="w-4 h-4 text-slate-950 font-bold" />
                          <span>{checkingOut ? "Connecting to WhatsApp..." : "Simulate Secure Checkout"}</span>
                        </button>
                      </div>
                    </form>

                  </div>
                )}
              </>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
