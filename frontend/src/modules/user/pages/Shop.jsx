import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories as initialCategories } from '../data/data';
import { 
    Filter, ChevronDown, ArrowUpDown, ArrowLeft, Plus, Minus, 
    UserCircle, ChevronRight, Search, X, SlidersHorizontal, Check, 
    Home, Heart, RotateCcw, Diamond, Settings, Hammer, Image as ImageLucide 
} from 'lucide-react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category: urlCategory } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const filterParam = searchParams.get('filter');
    
    // States
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Jewellery');
    const [openCategory, setOpenCategory] = useState('Jewellery'); 
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedMetal, setSelectedMetal] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');
    const [priceRange, setPriceRange] = useState(500000); // Max price slider
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Sync with URL params & Normalize Category
    useEffect(() => {
        const queryParam = urlCategory || filterParam;
        if (queryParam) {
            try {
                const normalizedParam = decodeURIComponent(queryParam).toLowerCase();
                
                // Try to find if it matches a category
                const catMatch = initialCategories.find(c => (c.name?.toLowerCase() === normalizedParam) || (c.id?.toLowerCase() === normalizedParam));
                if (catMatch) {
                    setSelectedCategory(catMatch.name || 'Jewellery');
                    setOpenCategory(catMatch.name || 'Jewellery');
                    setSelectedSubCategory(null);
                    return;
                }

                // Try to find if it matches a subcategory
                const subMatch = initialCategories.flatMap(c => c.subcategories || []).find(s => 
                    s.name?.toLowerCase() === normalizedParam || 
                    (s.path && s.path.toLowerCase() === normalizedParam.replace(' ', '-'))
                );
                if (subMatch) {
                    const parent = initialCategories.find(c => (c.subcategories || []).some(s => s.name === subMatch.name));
                    setSelectedCategory(parent?.name || 'Jewellery');
                    setOpenCategory(parent?.name || 'Jewellery');
                    setSelectedSubCategory(subMatch.name);
                }
            } catch (err) {
                console.error("Discovery Sync Error:", err);
            }
        }
    }, [urlCategory, filterParam]);

    // Removal of all automatic scroll logic as requested by user
    // User wants to stay in the same place at all times during selection

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // URL Parameter Filters (from Offers Page)
        const showOnlyOffers = searchParams.get('offers') === 'true';
        const tagFilter = searchParams.get('tag');

        if (showOnlyOffers) {
            result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
        }

        if (tagFilter) {
            result = result.filter(p => 
                (p.category && p.category.toLowerCase().includes(tagFilter.toLowerCase())) ||
                (p.subCategory && p.subCategory.toLowerCase().includes(tagFilter.toLowerCase())) ||
                (p.name && p.name.toLowerCase().includes(tagFilter.toLowerCase()))
            );
        }

        if (selectedCategory && selectedCategory !== 'All') {
            result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
            if (selectedSubCategory) {
                result = result.filter(p => 
                    (p.subCategory && p.subCategory.toLowerCase() === selectedSubCategory.toLowerCase()) || 
                    (p.name && p.name.toLowerCase().includes(selectedSubCategory.toLowerCase()))
                );
            }
        }
        if (selectedType !== 'All') result = result.filter(p => p.type?.toLowerCase() === selectedType.toLowerCase());
        if (selectedGender !== 'All') result = result.filter(p => p.gender?.toLowerCase() === selectedGender.toLowerCase());
        if (selectedMetal !== 'All') result = result.filter(p => p.metal?.toLowerCase() === selectedMetal.toLowerCase());
        
        // Price Filter
        result = result.filter(p => p.price <= priceRange);

        if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
        else if (sortBy === 'Best Selling') result.sort((a, b) => b.rating - a.rating);
        else if (sortBy === 'Newest') result.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);

        return result;
    }, [selectedCategory, selectedSubCategory, selectedType, selectedGender, selectedMetal, priceRange, sortBy, location.search]);

    const pageTitle = useMemo(() => {
        return selectedSubCategory || selectedCategory || 'Categories Master';
    }, [selectedCategory, selectedSubCategory]);

    const handleCategoryToggle = (name) => {
        setOpenCategory(name);
        setSelectedCategory(name);
        setSelectedSubCategory(null);
        setSelectedType('All');
        setSelectedMetal('All');
    };

    const SidebarContent = () => {
        const currentCatData = initialCategories.find(c => c.name === openCategory);
        
        return (
            <div className="flex flex-col h-full bg-white font-body overflow-hidden relative">
                {/* Fixed Header */}
                <div className="p-3.5 bg-[#0a0a0a] text-white shrink-0 border-b border-white/5 z-[70] shadow-sm">
                    <div className="flex items-center gap-3">
                        <UserCircle className="w-8 h-8 text-[#8B4356]" />
                        <span className="text-[12px] font-bold tracking-[0.25em] font-serif italic text-white/90">Curated Categories</span>
                    </div>
                </div>

                {/* Scrollable Middle Container */}
                <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-6 space-y-7 pb-10">
                    <div>
                         <h4 className="text-[9.5px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-3.5 ml-1">Archive Hub</h4>
                         <div className="flex flex-col gap-1.5">
                             {initialCategories.map(cat => (
                                 <button key={cat.id} onClick={() => handleCategoryToggle(cat.name)} className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between group ${openCategory === cat.name ? 'border-[#8B4356] bg-[#FDF5F6]/30 text-[#8B4356]' : 'border-zinc-50 text-zinc-800 hover:border-zinc-100 hover:bg-zinc-50'}`}>
                                     <span className="text-[12px] font-serif uppercase tracking-widest">{cat.name}</span>
                                     <ChevronRight className={`w-3 h-3 transition-transform ${openCategory === cat.name ? 'rotate-90 text-[#8B4356]' : 'text-zinc-300 group-hover:translate-x-1'}`} />
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div>
                         <h4 className="text-[9.5px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-4 flex items-center gap-3">Discovery Map <div className="h-[1px] flex-grow bg-zinc-50"></div></h4>
                         <div className="grid grid-cols-2 gap-4">
                             {currentCatData?.subcategories.map(sub => (
                                 <button key={sub.name} onClick={() => setSelectedSubCategory(sub.name === selectedSubCategory ? null : sub.name)} className={`relative group p-3 rounded-2xl border transition-all text-center flex flex-col items-center gap-2.5 ${selectedSubCategory === sub.name ? 'border-[#8B4356] bg-white shadow-[0_10px_30px_rgba(139,67,86,0.08)] scale-[1.02]' : 'border-zinc-50 bg-[#fafafa] hover:border-zinc-200'}`}>
                                     <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-transform bg-zinc-100 flex items-center justify-center ${selectedSubCategory === sub.name ? 'border-[#8B4356]' : 'border-transparent group-hover:scale-105'}`}>
                                         {sub.image && (
                                             <img src={sub.image} className="w-full h-full object-cover" crossOrigin="anonymous" loading="lazy" onError={(e) => { e.target.style.display = 'none'; if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }} />
                                         )}
                                         <div className="hidden items-center justify-center w-full h-full text-zinc-300"><ImageLucide className="w-5 h-5" /></div>
                                     </div>
                                     <span className={`text-[11px] font-serif uppercase tracking-widest leading-tight transition-colors ${selectedSubCategory === sub.name ? 'text-[#8B4356] font-bold' : 'text-zinc-800'}`}>{sub.name}</span>
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div className="space-y-8">
                         {/* DYNAMIC MATERIAL SECTION based on Category */}
                         {currentCatData?.materials && (
                            <div>
                                <h4 className="text-[9.5px] font-bold uppercase tracking-[0.5em] text-[#8B4356] mb-4 flex items-center gap-3">
                                    {currentCatData.materialLabel || "By Material"} 
                                    <div className="h-[1px] flex-grow bg-[#FDF5F6]"></div>
                                </h4>
                                <div className="grid grid-cols-2 gap-2 px-1">
                                    {currentCatData.materials.map(m => (
                                        <button key={m} onClick={() => setSelectedMetal(m === selectedMetal ? 'All' : m)} className={`py-3 rounded-xl border text-[11.5px] font-serif uppercase tracking-widest transition-all ${selectedMetal === m ? 'border-[#8B4356] bg-[#8B4356] text-white shadow-md font-bold' : 'border-zinc-100 text-zinc-800 border-zinc-200 hover:border-zinc-300'}`}>{m}</button>
                                    ))}
                                </div>
                            </div>
                         )}

                        {/* PRICE SLIDER */}
                        <div>
                             <h4 className="text-[9.5px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-6 flex items-center gap-3">Price Explorer <div className="h-[1px] flex-grow bg-zinc-50"></div></h4>
                             <div className="px-2 space-y-4">
                                <div className="flex justify-between items-end mb-2">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Min: ₹0</p>
                                    <p className="text-[13px] font-bold text-[#8B4356] font-display italic">₹{priceRange.toLocaleString()}</p>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="500000" 
                                    step="5000" 
                                    value={priceRange} 
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-[3px] bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#8B4356] transition-all hover:accent-[#7a394b]"
                                />
                                <div className="flex justify-between mt-1">
                                    <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">Start</span>
                                    <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">5 Lakh +</span>
                                </div>
                             </div>
                        </div>

                        {currentCatData?.popularTypes && (
                            <div>
                                <h4 className="text-[9.5px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-4 flex items-center gap-3">Popular Options <div className="h-[1px] flex-grow bg-zinc-50"></div></h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-1">
                                    {currentCatData.popularTypes.map(type => (
                                        <button key={type} onClick={() => setSelectedType(type === selectedType ? 'All' : type)} className={`text-left text-[11.5px] uppercase font-serif tracking-widest transition-all ${selectedType === type ? 'text-[#8B4356] translate-x-1 font-bold' : 'text-zinc-800 hover:text-black hover:translate-x-1'}`}>{type}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="lg:hidden p-4 border-t border-zinc-50 bg-white/95 backdrop-blur-md pb-6 shrink-0 z-[70] shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
                    <button onClick={() => setIsFilterOpen(false)} className="w-full bg-[#8B4356] text-white py-4.5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl active:scale-95 hover:bg-[#7a394b] transition-all">Apply Discovery</button>
                </div>
            </div>
        );
    };

    const CategoryMegaGrid = () => {
        const currentCatData = initialCategories.find(c => c.name === openCategory);
        
        return (
            <div className="hidden lg:grid grid-cols-4 gap-6 bg-white border border-zinc-100 p-6 rounded-[2rem] mb-8 shadow-[0_15px_50px_rgba(0,0,0,0.015)] relative z-40">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FDF5F6]/40 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/2"></div>
                <div>
                    <h5 className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#8B4356] mb-5 flex items-center gap-3">
                        {currentCatData?.materialLabel || "By Material"} 
                        <div className="h-[1px] flex-grow bg-[#FDF5F6]"></div>
                    </h5>
                    <div className="space-y-2">
                        {currentCatData?.materials?.map(m => (
                            <button key={m} onClick={() => setSelectedMetal(m === selectedMetal ? 'All' : m)} className={`block w-full text-left text-[13.5px] font-serif uppercase tracking-widest transition-all hover:text-black px-4 py-2 rounded-xl border ${selectedMetal === m ? 'border-[#8B4356] bg-[#FDF5F6]/30 text-[#8B4356] font-bold' : 'border-transparent text-zinc-800 hover:bg-zinc-50'}`}>{m} Selection</button>
                        ))}
                    </div>
                </div>
                <div>
                    <h5 className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#8B4356] mb-5 flex items-center gap-3">Top Styles <div className="h-[1px] flex-grow bg-[#FDF5F6]"></div></h5>
                    <div className="grid grid-cols-1 gap-y-2.5">
                        {currentCatData?.popularTypes?.map(t => (
                            <button key={t} onClick={() => setSelectedType(t === selectedType ? 'All' : t)} className={`text-left text-[13.5px] font-serif uppercase tracking-widest hover:text-[#8B4356] transition-all hover:translate-x-1 ${selectedType === t ? 'text-[#8B4356] translate-x-1 font-bold' : 'text-zinc-800'}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className="border-x border-zinc-50 px-10">
                    <h5 className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#8B4356] mb-5 flex items-center gap-3">Budget Discovery <div className="h-[1px] flex-grow bg-[#FDF5F6]"></div></h5>
                    <div className="space-y-6 pt-2">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[12px] font-serif italic text-black font-bold">Max ₹{priceRange.toLocaleString()}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="500000" 
                            step="5000" 
                            value={priceRange} 
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-[#8B4356]"
                        />
                        <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-widest text-zinc-300">
                            <span>Min</span>
                            <span>5 Lakh+</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#8B4356] mb-5 flex items-center gap-3">All Categories <div className="h-[1px] flex-grow bg-[#FDF5F6]"></div></h5>
                    <div className="space-y-3.5">
                        {initialCategories.map(m => (
                            <div key={m.id} onClick={() => handleCategoryToggle(m.name)} className="group/item cursor-pointer flex items-center justify-between border-b border-zinc-50 pb-2.5 transition-colors hover:border-[#8B4356]/20">
                                <p className={`text-[11.5px] font-bold uppercase tracking-widest hover:text-[#8B4356] transition-all ${openCategory === m.name ? 'text-[#8B4356] translate-x-1' : 'text-black group-hover/item:translate-x-1'}`}>{m.name}</p>
                                <ChevronRight className={`w-3.5 h-3.5 transition-all ${openCategory === m.name ? 'text-[#8B4356] translate-x-1' : 'text-zinc-200 group-hover/item:text-black group-hover/item:translate-x-1'}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white font-body selection:bg-[#8B4356] selection:text-white pb-32 md:pb-10 overflow-hidden">
            <div className="flex max-w-[1700px] mx-auto min-h-screen">
                <aside className="hidden lg:block w-[280px] shrink-0 border-r border-zinc-100 sticky top-[55px] h-[calc(100vh-55px)] z-20 overflow-hidden bg-white shadow-sm"><SidebarContent /></aside>
                <main className="flex-grow min-w-0 bg-[#fdf2f8]/5">
                    <div className="p-4 md:p-8 lg:px-16 lg:pt-0 lg:pb-6">
                        <div className="mb-2 lg:mb-2">
                             <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.5em] font-bold text-zinc-300 mb-2 px-1">
                                <Link to="/" className="hover:text-[#8B4356] transition-colors">Home</Link>
                                <span className="opacity-20">/</span>
                                <span className="text-zinc-400">Categories</span>
                                {selectedCategory !== 'All' && (
                                    <React.Fragment>
                                        <span className="opacity-20">/</span>
                                        <span className="text-[#8B4356]/60 tracking-[0.2em]">{selectedCategory}</span>
                                    </React.Fragment>
                                )}
                                {selectedSubCategory && (
                                    <React.Fragment>
                                        <span className="opacity-20">/</span>
                                        <span className="text-[#8B4356] tracking-[0.25em] font-black">{selectedSubCategory}</span>
                                    </React.Fragment>
                                )}
                            </div>
                            
                            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 border-b border-zinc-100 pb-3 relative px-1">
                                <div className="flex items-start justify-between w-full relative">
                                    <div className="flex flex-col gap-2">
                                        <motion.h1 key={pageTitle} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-4xl md:text-6xl lg:text-5xl font-display font-medium text-black tracking-tighter lowercase italic leading-none">{pageTitle}</motion.h1>
                                        <div className="flex items-center gap-4">
                                            <div className="h-[1px] w-12 bg-[#8B4356]/20"></div>
                                            <p className="text-[9px] md:text-[9.5px] font-bold uppercase tracking-[0.5em] text-[#8B4356]/30 leading-none">{filteredProducts.length} Piece Discovery</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 flex items-center gap-3">
                                        <button 
                                            onClick={() => setIsFilterOpen(true)}
                                            className="lg:hidden w-11 h-11 rounded-2xl border border-zinc-100 flex items-center justify-center bg-white text-[#8B4356] shadow-sm active:scale-95 transition-all"
                                        >
                                            <SlidersHorizontal className="w-4.5 h-4.5" strokeWidth={1} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CategoryMegaGrid />

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-14 gap-y-12 md:gap-y-24 pb-40">
                                {filteredProducts.map((product, idx) => (
                                    <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: "easeOut" }}><ProductCard product={product} /></motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-40 text-center bg-white rounded-[4rem] border border-zinc-50 mx-2 shadow-sm"><div className="w-24 h-24 bg-[#FDF5F6]/50 rounded-full flex items-center justify-center mb-8"><Search className="w-10 h-10 text-[#8B4356]/30" /></div><h3 className="text-3xl font-serif font-bold text-black mb-5">Choice Not Found</h3><p className="text-zinc-400 font-serif italic mb-10 max-w-sm mx-auto text-base">We couldn't match your discovery parameters.</p><button onClick={() => { setSelectedCategory('Jewellery'); setSelectedSubCategory(null); setSelectedType('All'); setSelectedGender('All'); setSelectedMetal('All'); setPriceRange(500000); setSortBy('Newest'); }} className="bg-[#8B4356] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl transition-all">Reset All</button></div>
                        )}
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[210] backdrop-blur-2xl" onClick={() => setIsFilterOpen(false)} />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 45, stiffness: 600 }} className="fixed top-0 right-0 h-full w-[80%] max-w-[360px] bg-white z-[220] shadow-[0_0_120px_rgba(0,0,0,0.7)] overflow-hidden"><SidebarContent /><div className="absolute top-6 right-6 z-[70]"><button onClick={() => setIsFilterOpen(false)} className="w-11 h-11 bg-zinc-50 border border-zinc-100 hover:bg-[#8B4356] hover:text-white rounded-full flex items-center justify-center transition-all shadow-lg group"><X className="w-4.5 h-4.5 group-hover:rotate-90 transition-transform" /></button></div></motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Shop;
