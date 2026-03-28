import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../assets/data';

const CategoryShowcase = () => {
    const [activeTab, setActiveTab] = React.useState('jewellery');
    
    // Filter subcategories based on active tab
    const filteredSubcats = categories.find(cat => cat.id.toLowerCase() === activeTab.toLowerCase())?.subcategories || [];
    
    return (
        <section className="pt-12 pb-0 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                
                {/* Compact Category Tabs */}
                <div className="flex justify-center gap-4 md:gap-12 mb-10 border-b border-gray-100 pb-3 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id.toLowerCase())}
                            className={`font-serif text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-2 whitespace-nowrap px-4 ${
                                activeTab === cat.id.toLowerCase() ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {cat.name}
                            {activeTab === cat.id.toLowerCase() && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide px-2 md:px-0"
                    >
                        {filteredSubcats.map((sub, index) => {
                            return (
                                <div key={index} className="group flex-shrink-0 w-[80px] md:w-auto flex flex-col items-center">
                                    <Link to={`/shop?filter=${sub.name.toLowerCase()}`} className="block w-full">
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, delay: index * 0.05 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="relative aspect-square w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-sm transition-all duration-700 group-hover:shadow-lg group-hover:scale-[1.05] mx-auto">
                                                <img
                                                    src={sub.image}
                                                    alt={sub.name}
                                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            </div>
                                            <span className="mt-3 font-serif text-[8px] md:text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase text-center transition-all duration-500 group-hover:text-primary whitespace-nowrap">
                                                {sub.name}
                                            </span>
                                        </motion.div>
                                    </Link>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default CategoryShowcase;
