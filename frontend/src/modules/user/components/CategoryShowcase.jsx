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
                <div className="flex justify-center gap-6 md:gap-12 mb-10 border-b border-gray-100 pb-3">
                    {['Jewellery', 'Machine', 'Tools'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`font-serif text-[10px] md:text-sm tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${
                                activeTab === tab.toLowerCase() ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {tab}
                            {activeTab === tab.toLowerCase() && (
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
                        className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 md:gap-x-8 gap-y-6 md:gap-y-12"
                    >
                        {filteredSubcats.map((sub, index) => {
                            const isFromLeft = index % 2 === 0;
                            
                            return (
                                <div key={index} className="group flex flex-col items-center">
                                    <Link to={`/shop?filter=${sub.name.toLowerCase()}`} className="block w-full">
                                        <motion.div 
                                            initial={{ 
                                                opacity: 0, 
                                                y: 20,
                                                scale: 0.9
                                            }}
                                            animate={{ 
                                                opacity: 1, 
                                                y: 0,
                                                scale: 1
                                            }}
                                            transition={{ 
                                                duration: 1,
                                                ease: [0.16, 1, 0.3, 1],
                                                delay: index * 0.05
                                            }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="relative aspect-square w-full max-w-[80px] md:max-w-[155px] bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-[0_5px_15px_-4px_rgba(0,0,0,0.06)] transition-all duration-1000 group-hover:shadow-xl group-hover:scale-[1.03] mx-auto">
                                                <img
                                                    src={sub.image}
                                                    alt={sub.name}
                                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                                />
                                            </div>
                                            <span className="mt-2 md:mt-5 font-serif text-[7px] md:text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase text-center transition-all duration-500 group-hover:text-primary">
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
