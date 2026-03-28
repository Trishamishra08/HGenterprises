import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, isWishlistPage = false }) => {
    const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useShop();
    const [flying, setFlying] = useState(false);
    const [flyingType, setFlyingType] = useState('cart');

    const isWishlisted = wishlist.some(item => item.id === product.id);

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
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Compact Badges */}
                {product.isNew && (
                    <span className="absolute top-2.5 left-2.5 bg-[#8B4356] text-white text-[6.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full z-20">
                        NEW
                    </span>
                )}

                {/* Rating Overlay */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/70 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-1 z-20 border border-white/50">
                    <span className="text-[8px] font-black text-black leading-none">{product.rating || 4.5}</span>
                    <Star className="w-2.5 h-2.5 fill-black" />
                </div>

                {/* Heart Button Overlay */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-2.5 right-2.5 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/70 backdrop-blur-md border border-white/50 hover:bg-white active:scale-90 ${isWishlisted ? 'text-[#8B4356]' : 'text-zinc-200'}`}
                >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#8B4356]' : ''}`} />
                </button>
            </Link>

            {/* Compact Info Section */}
            <div className="pt-3.5 px-1.5 flex flex-col gap-1.5 text-center">
                <h3 className="font-display font-black text-[10px] md:text-[11px] lg:text-[12px] uppercase text-black tracking-widest line-clamp-1 leading-none">
                    {product.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2">
                    <span className="text-[#8B4356] font-black text-[12px] md:text-[13px] leading-none">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-zinc-300 line-through text-[8px] font-bold uppercase italic leading-none">₹{product.originalPrice.toLocaleString()}</span>
                    )}
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
