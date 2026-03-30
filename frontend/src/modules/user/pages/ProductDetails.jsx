import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/data';
import { useShop } from '../../../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { 
    Heart, ShoppingBag, Star, Share2, Plus, Minus, Truck, 
    ShieldCheck, Smile, Gift, ChevronDown, SlidersHorizontal, 
    X, Camera, Check, ArrowLeft, ChevronRight, Info, 
    Clock, RefreshCw, Award, Zap, Search, UserCircle, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, wishlist, addToWishlist, removeFromWishlist, showNotification } = useShop();
    const product = products.find(p => p.id === id);
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    // Gallery State
    const [selectedImgIdx, setSelectedImgIdx] = useState(0);
    const productImages = product?.images && product.images.length > 0 
        ? product.images 
        : [product?.image, product?.image, product?.image];
    
    // UI states
    const [showSuccessSheet, setShowSuccessSheet] = useState(false);
    const [openSection, setOpenSection] = useState('about');
    const isWishlisted = wishlist.some(item => item.id === product?.id);
    const originalPrice = product?.originalPrice || product?.price || 0;
    const currentPrice = product?.price || 0;
    const discount = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF5F6] p-10 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Product Not Found</h2>
            <Link to="/shop" className="bg-[#8B4356] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg">Back to Shop</Link>
        </div>
    );

    const handleAddToCart = () => {
        addToCart(product);
        setShowSuccessSheet(true);
    };

    const handleBuyNow = () => {
        // Direct buy flow: navigate to checkout with this product only
        navigate('/checkout', { state: { directBuy: true, product: product } });
    };

    const handleWishlist = () => {
        if (isWishlisted) removeFromWishlist(product.id);
        else addToWishlist(product);
    };

    const handleApplyCoupon = (code) => {
        setAppliedCoupon(code);
        showNotification(`${code} applied successfully!`);
    };

    return (
        <div className="min-h-screen bg-[#FDF5F6] font-body text-[#1A1A1A] pb-12 selection:bg-[#8B4356] selection:text-white overflow-x-hidden">
            {/* 1. Header Navigation - Compact branded header */}
            <header className="sticky top-[48px] z-[90] bg-white border-b border-[#F5E6E8] flex items-center justify-between px-4 py-3 lg:hidden">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-5 h-5 text-black" /></button>
                    <div className="flex flex-col">
                        <span className="text-[12px] font-serif font-black tracking-tighter uppercase text-[#8B4356] leading-none">HG</span>
                        <span className="text-[5px] font-bold tracking-[.4em] uppercase text-zinc-400">ENTERPRISES</span>
                    </div>
                </div>
                <div className="flex items-center gap-3.5 text-zinc-800">
                    <Link to="/shop" className="p-1"><Search className="w-4.5 h-4.5 text-black" strokeWidth={1.5} /></Link>
                    <Link to="/wishlist" className="p-1"><Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-[#8B4356] text-[#8B4356]' : 'text-black'}`} strokeWidth={1.5} /></Link>
                    <Link to="/profile" className="p-1"><UserCircle className="w-4.5 h-4.5 text-black" strokeWidth={1.5} /></Link>
                    <Link to="/shop" className="p-1"><SlidersHorizontal className="w-4.5 h-4.5 rotate-90 text-black" strokeWidth={1.5} /></Link>
                </div>
            </header>

            {/* Desktop Navigation Breadcrumbs - Compact */}
            <div className="hidden lg:flex container mx-auto px-6 lg:px-12 py-3 items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-zinc-300">
                <Link to="/" className="hover:text-[#8B4356]">Home</Link>
                <ChevronRight className="w-2.5 h-2.5" />
                <Link to="/shop" className="hover:text-[#8B4356]">Shop</Link>
                <ChevronRight className="w-2.5 h-2.5" />
                <span className="text-[#8B4356] font-black">{product.name}</span>
            </div>

            <main className="container mx-auto px-0 lg:px-12 pt-12 lg:pt-0">
                <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-10">
                    
                    {/* 2. Left Column: Image Gallery - Compacted Spacing */}
                    <div className="relative lg:col-span-5">
                        <div className="px-4 lg:px-0">
                            <div className="aspect-[4/4.5] lg:aspect-[4/4] bg-white rounded-[1.2rem] lg:rounded-[2rem] overflow-hidden shadow-sm relative group border border-[#F5E6E8]/30 max-h-[450px] mx-auto">
                                <motion.img 
                                    key={selectedImgIdx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    src={productImages[selectedImgIdx]} 
                                    className="w-full h-full object-cover" 
                                />
                                <button onClick={handleWishlist} className="absolute top-4 right-4 w-10 h-10 bg-white border border-[#F5E6E8]/50 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all z-10">
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#8B4356] text-[#8B4356]' : 'text-zinc-400'}`} strokeWidth={2.5} />
                                </button>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#8B4356] text-white text-[6.5px] font-black uppercase tracking-[.3em] px-2.5 py-1 rounded-full">New Arrival</span>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Selector - Tighter Spacing */}
                        <div className="flex justify-center gap-3 py-3 px-4">
                            {['FRONT', 'SIDE', 'DETAIL'].map((label, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedImgIdx(idx % productImages.length)}
                                    className="flex flex-col items-center gap-1.5"
                                >
                                    <div className={`w-11 h-11 rounded-lg overflow-hidden border transition-all p-0.5 ${selectedImgIdx === (idx % productImages.length) ? 'border-[#8B4356] scale-105' : 'border-white'}`}>
                                        <img src={productImages[idx % productImages.length]} className="w-full h-full object-cover rounded-md" />
                                    </div>
                                    <span className={`text-[6px] font-black uppercase tracking-widest transition-colors ${selectedImgIdx === (idx % productImages.length) ? 'text-[#8B4356]' : 'text-zinc-300'}`}>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Right Column: Product Detail Info - Compact Spacing */}
                    <div className="px-5 lg:px-0 lg:pt-0 lg:col-span-7 space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5">
                                <Zap className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                                <span className="text-[8.5px] font-black uppercase font-serif italic tracking-[.4em] text-[#8B4356]/60">Premium Selection</span>
                            </div>
                            <h1 className="text-[22px] md:text-2xl lg:text-2xl font-display font-black leading-tight text-black tracking-tight uppercase">{product.name}</h1>
                            
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-white border border-[#F5E6E8] px-2 py-1 rounded-full shadow-sm">
                                    <span className="text-[10px] font-black text-black leading-none">{product.rating || 4.5}</span>
                                    <Star className="w-2.5 h-2.5 fill-[#FFD700] text-[#FFD700]" />
                                </div>
                                <span className="text-[9px] font-bold text-zinc-350 tracking-wide uppercase">{product.reviews || '880'} reviews</span>
                                <div className="h-3 w-[1px] bg-zinc-100"></div>
                                <span className="text-[9px] font-bold text-[#8B4356] tracking-wide uppercase">5K+ Monthly Seekers</span>
                                {product.weight && (
                                    <>
                                        <div className="h-3 w-[1px] bg-zinc-100"></div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[8px] font-black uppercase text-[#8B4356]/40 tracking-widest">Weight:</span>
                                            <span className="text-[9px] font-bold text-black tracking-wide uppercase">{product.weight}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Pricing Section - Ultra Compact */}
                        <div className="bg-white p-3 lg:p-3 rounded-[1rem] border border-[#F5E6E8] relative overflow-hidden shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#8B4356]/5 text-[#8B4356] px-2 py-1 rounded-md border border-[#8B4356]/10">
                                    <span className="text-[12px] font-black">{discount > 0 ? `-${discount}%` : 'LIVE'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[22px] lg:text-[24px] font-display font-black text-black tracking-tighter leading-none">₹{currentPrice.toLocaleString()}</span>
                                        {appliedCoupon && (
                                            <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1 animate-in zoom-in-95 duration-300">
                                                <Check className="w-2.5 h-2.5" />
                                                <span className="text-[8px] font-bold uppercase tracking-wider">{appliedCoupon} Applied</span>
                                            </div>
                                        )}
                                    </div>
                                    {originalPrice > currentPrice && (
                                        <span className="text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest leading-none line-through mt-0.5">M.R.P.: ₹{originalPrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                            <p className="text-[6.5px] font-black uppercase tracking-[.2em] text-[#8B4356] opacity-40 mt-1">Inclusive of all taxes</p>
                        </div>

                        {/* Offers Section - Compact Card Stying */}
                        <div>
                            <h4 className="text-[9px] font-black uppercase tracking-[.4em] text-zinc-300 mb-4 flex items-center gap-3">Available Offers <div className="h-[1px] flex-grow bg-zinc-100/30"></div></h4>
                            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                                {[
                                    { tag: "COUPON", title: "HG25", desc: "Flat 25% Off on first order..." },
                                    { tag: "COUPON", title: "WELCOME20", desc: "Flat ₹200 Off on orders..." }
                                ].map((offer, oIdx) => (
                                    <div key={oIdx} className="shrink-0 w-[140px] bg-white p-2.5 rounded-lg border border-[#F5E6E8] shadow-sm relative group">
                                         <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#FDF5F6] rounded-bl-md text-[4.5px] font-black text-[#8B4356]">{offer.tag}</div>
                                         <h5 className="text-[10px] font-bold text-black mb-0.5 tracking-widest">{offer.title}</h5>
                                         <p className="text-[7.5px] text-zinc-400 mb-1">{offer.desc}</p>
                                         <button 
                                            onClick={() => handleApplyCoupon(offer.title)}
                                            className={`text-[6.5px] font-black uppercase tracking-widest border-b ${appliedCoupon === offer.title ? 'text-emerald-500 border-emerald-500' : 'text-[#8B4356] border-[#8B4356]/30'}`}
                                         >
                                            {appliedCoupon === offer.title ? 'Applied' : 'Apply'}
                                         </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Badges - Smaller Icons */}
                        <div className="grid grid-cols-4 gap-1.5 bg-white/40 p-3 rounded-2xl border border-[#F5E6E8]">
                            {[
                                { icon: Award, label: "Genuine" },
                                { icon: Clock, label: "Fast" },
                                { icon: RefreshCw, label: "Return" },
                                { icon: ShieldCheck, label: "Verify" }
                            ].map((badge, bIdx) => (
                                <div key={bIdx} className="flex flex-col items-center text-center gap-1.5 p-1">
                                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center border border-[#F5E6E8] shadow-sm">
                                        <badge.icon className="w-3.5 h-3.5 text-[#8B4356]/70" />
                                    </div>
                                    <span className="text-[6.5px] font-black uppercase tracking-widest text-[#8B4356]/60">{badge.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* About Section - Compact */}
                        <div>
                            <h4 className="text-[9px] font-black uppercase tracking-[.4em] text-zinc-800 mb-4 flex items-center gap-3">Seeker's Guide <div className="h-[1px] flex-grow bg-zinc-100/30"></div></h4>
                            <ul className="space-y-2.5 px-2">
                                {[
                                    "Non Oily Matte Look: Evens out complexion.",
                                    "Blends Effortlessly: For all skin types.",
                                    "Weightless Stay: HD coverage 12h+.",
                                    "Pure & Organic: Crafted with botanical heritage."
                                ].map((point, pIdx) => (
                                    <li key={pIdx} className="flex gap-3 text-[9.5px] leading-relaxed text-zinc-500 font-medium">
                                        <div className="shrink-0 w-1 h-1 rounded-full bg-[#8B4356] mt-1.5 opacity-40"></div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stock & Delivery - Ultra Compact Card with Desktop Actions */}
                        <div className="bg-white p-3 lg:p-4 rounded-[1rem] border border-[#F5E6E8] shadow-sm space-y-3">
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9.5px] font-black text-emerald-600 uppercase tracking-widest">In Stock Now</span>
                                </div>
                                <span className="text-[12px] font-black text-black tracking-tighter">₹{currentPrice.toLocaleString()}</span>
                            </div>
                            
                            <div className="hidden lg:grid grid-cols-2 gap-2">
                                <button 
                                    onClick={handleAddToCart}
                                    className="bg-[#FFD700] text-black h-10 rounded-xl font-black uppercase tracking-[.2em] text-[9px] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all hover:bg-[#F9A825]"
                                >
                                    <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2.5} /> Add to Bag
                                </button>
                                <button 
                                    onClick={handleBuyNow}
                                    className="bg-[#8B4356] text-white h-10 rounded-xl font-black uppercase tracking-[.2em] text-[9px] transition-all hover:bg-[#7a394b] active:scale-95 shadow-sm"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="pt-2 border-t border-zinc-50">
                                <p className="text-[8px] font-semibold text-zinc-400 leading-snug tracking-wide uppercase px-1">FREE Delivery by <span className="text-[#8B4356]">Sunday</span>. Order in <span className="text-black font-black">2 hrs 56 mins</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section - Compact Gallery */}
                <div className="mt-16 px-4 lg:px-0 pb-20">
                    <h3 className="text-[10px] font-black uppercase tracking-[.6em] text-zinc-300 mb-8 flex items-center gap-3 px-1">Curated Seek <div className="h-[1px] flex-grow bg-zinc-100/20"></div></h3>
                    <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide px-1">
                        {products.filter(p => p.id !== product.id).slice(0, 6).map(rel => (
                            <div key={rel.id} className="shrink-0 w-[160px] md:w-[240px]">
                                <ProductCard product={rel} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Floating Action Bar - Ultra Compact rounded buttons */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 h-16 bg-white/95 backdrop-blur-xl border border-[#F5E6E8] p-2.5 z-[110] flex gap-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-full items-center">
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#FFD700] text-black h-full rounded-full font-black uppercase tracking-[.2em] text-[9.5px] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                </button>
                <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#F9A825] text-white h-full rounded-full font-black uppercase tracking-[.2em] text-[9.5px] transition-all hover:bg-[#e68a00] active:scale-95 shadow-sm"
                >
                    Buy Now
                </button>
            </div>
            {/* Mobile Success Sheet - Immersive Swipe Up */}
            <AnimatePresence>
                {showSuccessSheet && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccessSheet(false)}
                            className="fixed inset-0 bg-black/60 z-[140] backdrop-blur-[4px]"
                        />

                        {/* Swipe Up Sheet */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-[150] bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] pb-[calc(1rem+env(safe-area-inset-bottom))] p-6 lg:hidden"
                        >
                            {/* Drag Indicator */}
                            <div className="w-12 h-1.5 bg-zinc-100 rounded-full mx-auto mb-6"></div>

                            {/* Success Context */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-20 h-20 bg-[#FDF5F6] rounded-2xl overflow-hidden border border-[#F5E6E8]/50 p-1">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center p-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-[12px] font-black text-emerald-600 uppercase tracking-widest">Added to Bag</span>
                                    </div>
                                    <span className="font-display font-black text-black text-lg tracking-tighter leading-none">{product.name}</span>
                                    <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">{product.subCategory}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => navigate('/cart')}
                                    className="w-full bg-[#8B4356] text-white h-14 rounded-2xl font-black uppercase tracking-[.25em] text-[10px] shadow-xl active:scale-95 transition-all"
                                >
                                    View My Bag
                                </button>
                                <button 
                                    onClick={() => setShowSuccessSheet(false)}
                                    className="w-full bg-white text-zinc-400 h-14 rounded-2xl font-black uppercase tracking-[.25em] text-[10px] border border-zinc-100 hover:bg-zinc-50 active:scale-95 transition-all"
                                >
                                    Continue Shopping
                                </button>
                                
                                <div className="flex items-center justify-between px-2 mt-4 pt-4 border-t border-zinc-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Bag Subtotal</span>
                                        <span className="text-xl font-display font-black text-black tracking-tighter">₹{product.price.toLocaleString()}</span>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/checkout')}
                                        className="bg-[#FFD700] text-black h-12 px-8 rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg active:scale-95 transition-all"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetails;
