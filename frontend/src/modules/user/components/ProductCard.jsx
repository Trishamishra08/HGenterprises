import React, { useState } from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, isWishlistPage = false }) => {
    const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useShop();
    const [flying, setFlying] = useState(false);
    const [flyingType, setFlyingType] = useState('cart');
    const [timeLeft, setTimeLeft] = useState({ min: 59, sec: 59 });

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
                if (prev.min > 0) return { min: prev.min - 1, sec: 59 };
                return { min: 59, sec: 59 }; // Reset or stop
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const isWishlisted = wishlist.some(item => item.id === product.id);
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFlyingType('cart');
        setFlying(true);
        addToCart(product);
        setTimeout(() => setFlying(false), 800);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isWishlisted) {
            setFlyingType('heart');
            setFlying(true);
            addToWishlist(product);
            setTimeout(() => setFlying(false), 800);
        } else {
            removeFromWishlist(product.id);
        }
    };

    return (
        <div className="group relative w-full flex flex-col transition-all duration-300">
            <style>
                {`
                    @keyframes flyToCart {
                        0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; border-radius: 20px; }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.4); }
                        100% { top: 30px; left: 92%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-radius: 50%; }
                    }
                    @keyframes flyToHeart {
                        0% { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1); opacity: 1; border-radius: 20px; }
                        50% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.4); }
                        100% { top: 30px; left: 88%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; border-radius: 50%; }
                    }
                    .animate-fly-cart { animation: flyToCart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                    .animate-fly-heart { animation: flyToHeart 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                `}
            </style>

            {flying && (
                <img
                    src={product.image}
                    alt=""
                    className={`fixed z-[9999] w-32 h-32 object-cover shadow-2xl pointer-events-none border-2 border-white ${flyingType === 'cart' ? 'animate-fly-cart' : 'animate-fly-heart'}`}
                    style={{ left: '50%', top: '50%' }}
                />
            )}

            <Link to={`/product/${product.id}`} className="block relative w-full aspect-square bg-white rounded-[1.2rem] lg:rounded-[2rem] overflow-hidden border border-[#F5E6E8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all group-hover:shadow-[0_15px_40px_rgba(139,67,86,0.08)] group-hover:-translate-y-1">
                <img
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Compact Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
                    {product.isNew && (
                        <span className="bg-black text-white text-[6px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full inline-block">
                            NEW
                        </span>
                    )}
                    {hasDiscount && (
                        <div className="flex flex-col gap-1">
                            <span className="bg-[#8B4356] text-white text-[6px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full inline-block shadow-lg animate-pulse">
                                SALE
                            </span>
                            <div className="bg-gold/90 backdrop-blur-sm text-black text-[6px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-full inline-block shadow-sm flex items-center gap-1">
                                <span>{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>
                                <span className="opacity-40">|</span>
                                <span className="text-[5px] tabular-nums">{String(timeLeft.min).padStart(2, '0')}:{String(timeLeft.sec).padStart(2, '0')}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Rating Overlay */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/70 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-1 z-20 border border-white/50">
                    <span className="text-[8px] font-black text-black leading-none">{product.rating || 4.5}</span>
                    <Star className="w-2.5 h-2.5 fill-black" />
                </div>

                {/* Heart Button Overlay */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white shadow-md border border-zinc-100 hover:bg-[#FDF5F6] active:scale-90 ${isWishlisted ? 'text-[#8B4356]' : 'text-[#8B4356]/80'}`}
                >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8B4356]' : ''}`} strokeWidth={2} />
                </button>
            </Link>

            <div className="pt-2 px-1 flex flex-col gap-1 text-center">
                <h3 className="font-display font-black text-[9px] md:text-[10px] uppercase text-black tracking-[0.1em] line-clamp-1 leading-none">
                    {product.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 mb-0.5">
                    {product.weight && (
                        <span className="text-[7.5px] md:text-[8px] font-black uppercase text-[#8B4356]/60 tracking-widest leading-none bg-[#FDF5F6] px-1.5 py-0.5 rounded-md border border-[#8B4356]/5">
                            {product.weight}
                        </span>
                    )}
                    <div className="flex items-center gap-1.5 leading-none">
                        <span className="text-[#8B4356] font-black text-[11px] md:text-[12px] leading-none tracking-tighter">₹{(product?.price || 0).toLocaleString()}</span>
                        {hasDiscount && (
                            <span className="text-zinc-300 line-through text-[7px] font-bold uppercase italic leading-none">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full h-8 bg-zinc-50 border border-zinc-100 rounded-full text-[8px] font-black uppercase tracking-[.25em] text-[#8B4356] hover:bg-[#8B4356] hover:text-white hover:border-[#8B4356] transition-all flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-3 h-3" /> Seek Piece
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
