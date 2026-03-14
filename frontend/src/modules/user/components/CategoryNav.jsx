import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoveRight, ArrowRight, Menu } from 'lucide-react';
import { useShop } from '../../../context/ShopContext';
import { categories } from '../assets/data';
import { motion, AnimatePresence } from 'framer-motion';

import navGiftWomen from '../assets/nav_gift_women.png';
import navGiftGirls from '../assets/nav_gift_girls.png';
import navGiftMens from '../assets/nav_gift_mens.png';
import navGiftCouple from '../assets/nav_gift_couple.png';
import navGiftKids from '../assets/nav_gift_kids.png';

import navOccasionBirthday from '../assets/nav_occasion_birthday.png';
import navOccasionAnniversary from '../assets/nav_occasion_anniversary.png';
import navOccasionWedding from '../assets/nav_occasion_wedding.png';
import navOccasionMothers from '../assets/nav_occasion_mothers.png';
import navOccasionValentine from '../assets/nav_occasion_valentine.png';

const CategoryNav = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const { toggleMenu } = useShop();

    // 1. Jewellery (Mega Menu)
    const jewelleryItem = {
        id: 'jewellery',
        name: 'Jewellery',
        path: '/category/jewellery',
        type: 'mega-menu',
        introTitle: "Exquisite Jewellery",
        introDesc: "Timeless designs crafted in pure gold and diamonds for every occasion.",
        subcategories: [
            { id: 'rings', name: "Rings", path: "rings", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=400" },
            { id: 'earrings', name: "Earrings", path: "earrings", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=400" },
            { id: 'necklaces', name: "Necklaces", path: "necklaces", image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=400" },
            { id: 'bracelets', name: "Bracelets", path: "bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" }
        ]
    };

    // 2. Machine (Mega Menu)
    const machineItem = {
        id: 'machine',
        name: 'Machine',
        path: '/category/machine',
        type: 'mega-menu',
        introTitle: "Machinery",
        introDesc: "Advanced industrial machinery for high-precision jewellery manufacturing.",
        subcategories: [
            { id: 'filling-table', name: "Filling table HY type", path: "filling-table", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" },
            { id: 'working-bench', name: "Gold Smith Working Bench", path: "working-bench", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" },
            { id: 'guardian', name: "Guardian", path: "guardian", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400" },
            { id: 'recycling', name: "IPA Recycling Machine", path: "recycling", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" },
            { id: 'j-detect', name: "J DETECT Pro", path: "j-detect", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400" },
            { id: 'setting-table', name: "Micro Setting Table Table JR Type", path: "setting-table", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" },
            { id: 'polishing-table', name: "Pre Polishing Table", path: "polishing-table", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" },
            { id: 'wax-printer', name: "Smart Wax Printer URC Series", path: "wax-printer", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400" },
            { id: 'workbench', name: "Stand Alone Workbench", path: "workbench", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" }
        ]
    };

    // 3. Tools (Mega Menu)
    const toolsItem = {
        id: 'tools',
        name: 'Tools',
        path: '/category/tools',
        type: 'mega-menu',
        introTitle: "Professional Tools",
        introDesc: "Quality tools for every artisan, from polishing to setting.",
        subcategories: [
            { id: 'bristles-brushes', name: "Bristles and brushes", path: "bristles-brushes", image: "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=400" },
            { id: 'connecting-lead', name: "Connecting lead", path: "connecting-lead", image: "https://images.unsplash.com/photo-1504148455328-43630f9d9804?auto=format&fit=crop&q=80&w=400" },
            { id: 'felt-wheels', name: "Felt wheels", path: "felt-wheels", image: "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=400" },
            { id: 'knife-edge-felt', name: "Knife-edge felt wheels", path: "knife-edge-felt", image: "https://images.unsplash.com/photo-1504148455328-43630f9d9804?auto=format&fit=crop&q=80&w=400" },
            { id: 'mandrals', name: "Mandrals", path: "mandrals", image: "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=400" },
            { id: 'metal-center-brushes', name: "Metal Center Wheel Brushes", path: "metal-center-brushes", image: "https://images.unsplash.com/photo-1504148455328-43630f9d9804?auto=format&fit=crop&q=80&w=400" },
            { id: 'micro-motor', name: "Micro Motor", path: "micro-motor", image: "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=400" },
            { id: 'skotch-brite-brushes', name: "Skotch Brite Brushes", path: "skotch-brite-brushes", image: "https://images.unsplash.com/photo-1504148455328-43630f9d9804?auto=format&fit=crop&q=80&w=400" },
            { id: 'wax-solder', name: "Wax solder", path: "wax-solder", image: "https://images.unsplash.com/photo-1530124560676-1e627e794358?auto=format&fit=crop&q=80&w=400" },
            { id: 'yellow-cloth-buff', name: "Yellow Cloth Buff", path: "polishing", image: "https://images.unsplash.com/photo-1504148455328-43630f9d9804?auto=format&fit=crop&q=80&w=400" }
        ]
    };

    // 4. Other Links
    const shopItem = { id: 'shop', name: 'Shop', path: '/shop', type: 'link' };
    const blogsItem = { id: 'blogs', name: 'Blogs', path: '/blogs', type: 'link' };
    const aboutUsItem = { id: 'about', name: 'About Us', path: '/about', type: 'link' };

    // Combine all
    const navItems = [
        jewelleryItem,
        machineItem,
        toolsItem,
        shopItem,
        blogsItem,
        aboutUsItem
    ];


    return (
        <div className="bg-[#FDF5F6] border-b border-[#EBCDD0] hidden md:block sticky top-[65px] z-40 shadow-sm font-sans">
            <div className="container mx-auto px-4">
                <ul className="flex justify-center items-center h-12 space-x-12 relative">
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className="h-full flex items-center"
                            onMouseEnter={() => setHoveredCategory(item.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <Link
                                to={item.path}
                                onClick={() => setHoveredCategory(null)}
                                className={`font-display text-sm tracking-[0.15em] font-semibold flex items-center gap-1 transition-all duration-300 relative py-2
                                    ${hoveredCategory === item.id ? 'text-[#D39A9F]' : 'text-black'}
                                `}
                            >
                                {item.name}
                                {/* Underline Effect */}
                                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#D39A9F] transform transition-transform duration-300 ${hoveredCategory === item.id ? 'scale-x-100' : 'scale-x-0'}`}></span>
                            </Link>

                            {/* MEGA MENU - Unified for all 3 types */}
                            <AnimatePresence>
                                {hoveredCategory === item.id && item.type === 'mega-menu' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 top-full w-full bg-white shadow-xl border-t border-[#EBCDD0] py-12 min-h-[400px] z-50"
                                    >
                                        <div className="container mx-auto px-8">
                                            <div className="grid grid-cols-5 gap-8">
                                                {/* Left Column: Intro */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="col-span-1 pr-6 border-r border-gray-100"
                                                >
                                                    <h3 className="font-display text-3xl text-black mb-4">{item.introTitle}</h3>
                                                    <p className="text-gray-500 font-serif italic mb-6 leading-relaxed">
                                                        {item.introDesc}
                                                    </p>
                                                    <Link to="/shop" onClick={() => setHoveredCategory(null)} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#D39A9F] hover:text-black transition-colors group">
                                                        View All Products <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </motion.div>

                                                {/* Right Grid: Subcategories */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                                                    className="col-span-4 grid grid-cols-5 gap-x-6 gap-y-10"
                                                >
                                                    {item.subcategories.map((subCat) => (
                                                        <div key={subCat.id} className="flex flex-col items-center text-center gap-3 group">
                                                            <Link to={item.id === 'shop-by-category' ? `/category/${subCat.path}` : `/shop?filter=${subCat.path}`} onClick={() => setHoveredCategory(null)}>
                                                                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-100 shadow-sm transition-shadow group-hover:shadow-md mx-auto">
                                                                    <img src={subCat.image} alt={subCat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                                </div>
                                                            </Link>
                                                            <div className="flex flex-col items-center">
                                                                <Link to={item.id === 'shop-by-category' ? `/category/${subCat.path}` : `/shop?filter=${subCat.path}`} onClick={() => setHoveredCategory(null)}>
                                                                    <h4 className="font-display font-bold text-black text-sm group-hover:text-[#D39A9F] transition-colors">{subCat.name}</h4>
                                                                </Link>
                                                                <Link to={item.id === 'shop-by-category' ? `/category/${subCat.path}` : `/shop?filter=${subCat.path}`} onClick={() => setHoveredCategory(null)} className="text-[10px] font-bold text-[#D39A9F] uppercase tracking-wider mt-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                                                                    View Collection
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryNav;
