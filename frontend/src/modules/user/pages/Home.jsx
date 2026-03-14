
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, ShoppingBag, ChevronDown, MoveRight, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { banners, categories, products } from '../assets/data';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryShowcase from '../components/CategoryShowcase';
import PriceRangeShowcase from '../components/PriceRangeShowcase';
import PerfectGift from '../components/PerfectGift';
import NewLaunchSection from '../components/NewLaunchSection';
import LatestDrop from '../components/LatestDrop';
import MostGifted from '../components/MostGifted';
import EditorialSection from '../components/EditorialSection';


import StyleItYourWay from '../components/StyleItYourWay';
import AllProducts from '../components/AllProducts';
import BrandPromises from '../components/BrandPromises';
import FAQSection from '../components/FAQSection';
import ChitChatSection from '../components/ChitChatSection';

import heroSlide1 from '../assets/hero_slide_1.png';
import heroSlide2 from '../assets/hero_slide_2.png';
import heroSlide3 from '../assets/hero_slide_3.png';
import spotlightMain from '../assets/spotlight_silver_main.png';
import spotlightHover from '../assets/spotlight_silver_hover.png';

import trendingHeritage from '../assets/trending_heritage.png';
import trendingModern from '../assets/trending_modern.png';

// Product Images
import prodEarringsMain from '../assets/prod_earrings_main.png';
import prodEarringsHover from '../assets/prod_earrings_hover.png';
import prodRingMain from '../assets/prod_ring_main.png';
import prodRingHover from '../assets/cat_rings.png';
import prodChainMain from '../assets/cat_pendant.png'; // Reusing as it fits

const Home = () => {
    const featuredProducts = products.slice(0, 3);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [activeFaq, setActiveFaq] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);

    const trendingSlides = [
        {
            id: 1,
            subtitle: "Heritage Collection",
            title: "Timeless",
            titleItalic: "Elegance",
            desc: "No longer search for \"authentic silver jewelry\". You've found it.",
            image: trendingHeritage
        },
        {
            id: 2,
            subtitle: "Modern Statement",
            title: "Empowering",
            titleItalic: "Style",
            desc: "From bold statements to subtle whispers, find pieces that celebrate you.",
            image: trendingModern
        }
    ];

    const heroSlides = [
        {
            video: "/videos/pinterest-banner.mp4",
            badge: "Bespoke Luxury",
            title: "Emerald & Diamond",
            description: "A masterpiece of nature, refined by human artistry.",
            btnText: "Explore More",
            link: "/category/jewellery"
        }
    ];

    // Slide timer - Only relevant if multiple slides exist
    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="bg-white font-body text-black relative selection:bg-primary selection:text-white">


            {/* Hero Section - Video Banners like Bluestone */}
            <section className="relative overflow-hidden bg-white">
                <div className="relative h-[55vh] md:h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {/* Video Background - key forces re-mount on slide change */}
                            {heroSlides[currentSlide].video ? (
                                <video
                                    key={`video-${currentSlide}`}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    poster={heroSlides[currentSlide].image}
                                    className="absolute inset-0 w-full h-full object-cover"
                                >
                                    <source src={heroSlides[currentSlide].video} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={heroSlides[currentSlide].image}
                                    alt={heroSlides[currentSlide].title}
                                    className="absolute inset-0 w-full h-full object-cover transform scale-100 animate-slow-zoom"
                                />
                            )}
                            {/* Perfectly Centered Overlay */}
                            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                <div className="container mx-auto px-4">
                                    <div className="flex flex-col items-center justify-center text-white text-center transform -translate-y-2">
                                        
                                        {/* Premium Compact Typography */}
                                        <div className="relative flex flex-col items-center">
                                            <motion.h1
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="text-3xl md:text-5xl font-serif tracking-[0.3em] uppercase leading-tight"
                                            >
                                                <span className="block font-light drop-shadow-2xl text-[#FDF5F6]">Harshad Gauri</span>
                                            </motion.h1>
                                            
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className="italic font-light text-[#F7E7CE] lowercase text-2xl md:text-4xl font-serif tracking-tighter"
                                            >
                                                enterprises
                                            </motion.p>
                                            
                                            {/* Minimalist Centered Divider - Extra Thin */}
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '30px' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-[0.5px] bg-white/40 mt-4 mb-4"
                                            />

                                            {/* Elegant CTA - Close to main text */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.8, delay: 0.8 }}
                                            >
                                                <Link to={heroSlides[currentSlide].link} className="group flex flex-col items-center">
                                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/70 group-hover:text-white transition-all">
                                                        Explore Selection
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>


                    {/* Pagination Dots - Larger on mobile for better visibility */}
                    {/* Pagination Dots - Only show if multiple slides */}
                    {heroSlides.length > 1 && (
                        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-2 md:h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-12 md:w-10 bg-white' : 'w-2 md:w-1.5 bg-white/50 md:bg-white/40 active:bg-white/70 md:hover:bg-white/60'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}


                </div>
            </section>

            {/* CATEGORY SHOWCASE - Replaces Mobile Stories */}
            <CategoryShowcase />

            {/* PRICE RANGE SHOWCASE - Luxury Within Reach */}
            <PriceRangeShowcase />

            {/* NEW LAUNCH / LIMITED EDITION SECTION */}
            <NewLaunchSection />

            {/* PERFECT GIFT SECTION */}
            <PerfectGift />

            {/* LATEST DROP SECTION */}
            <LatestDrop />

            {/* MOST GIFTED ITEMS */}
            <MostGifted />

            {/* EDITORIAL SECTION */}
            <EditorialSection />



            {/* STYLE IT YOUR WAY SECTION */}
            <StyleItYourWay />


            {/* ALL PRODUCTS SECTION */}
            <AllProducts />

            {/* BRAND PROMISES SECTION (Why Choose Us) */}
            <BrandPromises />

            {/* CHIT CHAT SECTION */}
            <ChitChatSection />

            {/* FAQ SECTION */}
            <FAQSection />

        </div>
    );
};

export default Home;
