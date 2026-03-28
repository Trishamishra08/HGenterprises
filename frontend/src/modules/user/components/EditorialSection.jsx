import React from 'react';
import { motion } from 'framer-motion';

// Import all premium local editorial assets
import feature1 from '../../../assets/editorial/clean_feature1.png';
import feature2 from '../../../assets/editorial/clean_feature2.png';
import detail1 from '../../../assets/editorial/detail1.png';
import detail2 from '../../../assets/editorial/detail2.png';
import item3 from '../../../assets/editorial/clean_item3.png';
import item4 from '../../../assets/editorial/item4.png';
import item5 from '../../../assets/editorial/item5.png';
import item6 from '../../../assets/editorial/item6.png';
import item7 from '../../../assets/editorial/item7.png';
import item8 from '../../../assets/editorial/item8.png';
import item9 from '../../../assets/editorial/item9.png';
import item10 from '../../../assets/editorial/item10.png';
import item11 from '../../../assets/editorial/item11.png';
import item12 from '../../../assets/editorial/item12.png';

// Premium editorial-style imagery sets
const block1Images = [feature1, item3, item4, item5, item6, detail1, item7];
const block2Images = [feature2, item8, item9, item10, item11, detail2, item12];

const EditorialSection = () => {
    return (
        <section className="pt-12 md:pt-20 pb-16 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-primary font-serif tracking-[0.2em] font-normal italic text-[10px] md:text-sm mb-1 block">
                        Our Vision
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-normal text-dark tracking-tight">
                        Editorial
                    </h2>
                    <div className="h-[1px] w-12 bg-primary mx-auto opacity-30 mt-3"></div>
                </div>
                
                {/* --- Block 1: Bluestone Grid Pattern (Mobile: 3cols) --- */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 mb-2 md:mb-16">
                    
                    {/* Big Feature (2x2 on Mobile) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg min-h-[280px] md:min-h-0 md:h-full shadow-sm"
                    >
                        <img 
                            src={block1Images[0]} 
                            alt="Editorial" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-fit">
                            <button className="bg-white text-dark px-4 py-1.5 rounded-sm text-[8px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                                Shop Now
                            </button>
                        </div>
                    </motion.div>

                    {/* Small Details (Stacked Right) */}
                    <div className="col-span-1 row-span-1 relative rounded-lg overflow-hidden h-[138px] md:h-auto">
                        <img src={block1Images[1]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 row-span-1 relative rounded-lg overflow-hidden h-[138px] md:h-auto">
                        <img src={block1Images[2]} alt="Detail" className="w-full h-full object-cover" />
                    </div>

                    {/* Full Row (3 columns) */}
                    <div className="col-span-1 h-[130px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block1Images[3]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 h-[130px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block1Images[4]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 h-[130px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block1Images[5]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* --- Block 2: Continued Pattern (Mobile: 3cols) --- */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 mt-2">
                    {/* Pattern continues mirroring original Bluestone look */}
                    <div className="col-span-1 h-[130px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block2Images[1]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 h-[130px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block2Images[2]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 h-[130px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block2Images[3]} alt="Detail" className="w-full h-full object-cover" />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg min-h-[280px] md:min-h-0 md:h-full shadow-sm"
                    >
                        <img 
                            src={block2Images[0]} 
                            alt="Editorial" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-fit">
                            <button className="bg-white text-dark px-4 py-1.5 rounded-sm text-[8px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                                Shop Now
                            </button>
                        </div>
                    </motion.div>

                    <div className="col-span-1 h-[138px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block2Images[4]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 h-[138px] md:min-h-0 md:h-auto rounded-lg overflow-hidden">
                        <img src={block2Images[5]} alt="Detail" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialSection;
