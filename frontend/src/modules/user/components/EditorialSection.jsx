import React from 'react';
import { motion } from 'framer-motion';

// Using premium editorial-style imagery from Unsplash for that exact magazine look
const block1Images = [
    "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200", // Block 1: Large Left (Necklace)
    "https://images.unsplash.com/photo-1573408302185-9127feed2233?auto=format&fit=crop&q=80&w=800", 
    "https://images.unsplash.com/photo-1601121141461-9d66474fb1cd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1620916566398-39f1143af7bf?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800"  
];

const block2Images = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200", // Block 2: Large Right (Cat Focus)
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1487309078313-fe80c3e155c0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515255384510-33045958564a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1509941943102-10c232535736?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1533228891704-fbefee212e62?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=800"
];

const EditorialSection = () => {
    return (
        <section className="py-8 md:py-16 bg-white overflow-hidden space-y-12 md:space-y-24">
            <div className="container mx-auto px-2 md:px-4">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl md:text-4xl text-dark tracking-tight">
                        Editorial
                    </h2>
                </div>

                {/* --- Block 1: Big Left, Small Right --- */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 h-auto md:h-[650px] mb-12 md:mb-20">
                    
                    {/* Big Feature (ELLE) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl md:rounded-2xl h-[400px] md:h-full"
                    >
                        <img 
                            src={block1Images[0]} 
                            alt="Editorial Feature" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                            <span className="text-white font-serif text-4xl md:text-7xl font-bold tracking-tighter opacity-90 drop-shadow-lg">ELLE</span>
                        </div>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <button className="bg-white text-dark px-6 py-2 rounded-sm text-xs md:text-sm font-serif uppercase tracking-widest shadow-xl">Shop Now</button>
                        </div>
                    </motion.div>

                    {/* Clustered Columns (3 Columns) */}
                    {[1, 2, 3].map((col) => (
                        <div key={col} className="flex flex-col gap-2 md:gap-3 h-full col-span-1">
                            {[0, 1].map((row) => {
                                const index = (col - 1) * 2 + row + 1;
                                return (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="flex-1 relative group overflow-hidden rounded-xl h-[150px] md:h-auto"
                                    >
                                        <img 
                                            src={block1Images[index]} 
                                            alt={`Editorial ${index}`} 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000"
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* --- Block 2: Small Left, Big Right (Mirrored) --- */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 h-auto md:h-[650px]">
                    
                    {/* Clustered Columns (3 Columns on Left) */}
                    {[1, 2, 3].map((col) => (
                        <div key={col} className="flex flex-col gap-2 md:gap-3 h-full col-span-1 order-2 md:order-1">
                            {[0, 1].map((row) => {
                                const index = (col - 1) * 2 + row + 1;
                                return (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="flex-1 relative group overflow-hidden rounded-xl h-[150px] md:h-auto"
                                    >
                                        <img 
                                            src={block2Images[index]} 
                                            alt={`Editorial ${index}`} 
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000"
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}

                    {/* Big Feature (ELLE with Cat focus) on Right */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl md:rounded-2xl h-[400px] md:h-full order-1 md:order-2"
                    >
                        <img 
                            src={block2Images[0]} 
                            alt="Editorial Feature" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0"></div>
                        
                        {/* ELLE Branding */}
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                            <span className="text-white font-serif text-4xl md:text-7xl font-bold tracking-tighter opacity-90 drop-shadow-lg">ELLE</span>
                        </div>

                        {/* Shop Now Button */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-center">
                            <button className="bg-white text-dark px-6 py-2 rounded-sm text-xs md:text-sm font-serif uppercase tracking-widest shadow-xl">Shop Now</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EditorialSection;
