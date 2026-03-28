import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    // Curated high-end jewellery photography with multi-CDN redundancy for maximum reliability
    const galleryItems = [
        "https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=600"
    ];

    return (
        <div className="bg-[#fdf2f8] min-h-screen relative overflow-hidden flex flex-col items-center pb-0">

            {/* Gallery Wrapper with High-End Depth Background */}
            <div className="w-full relative py-20 lg:py-40 bg-gradient-to-b from-[#fdf2f8] via-[#eecad5] to-[#fdf2f8] overflow-hidden">

                {/* Subtle Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-[radial-gradient(circle_at_center,_rgba(238,202,213,0.4)_0%,_transparent_70%)] pointer-events-none z-0"></div>

                {/* Desktop Only: Scrutinized Floating Gallery */}
                <div className="hidden md:block absolute inset-0 z-0">
                    {galleryItems.map((src, index) => (
                        <motion.div
                            key={`desktop-${index}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -20, 0],
                            }}
                            transition={{
                                opacity: { duration: 1, delay: index * 0.1 },
                                scale: { duration: 1, delay: index * 0.1 },
                                y: {
                                    duration: 5 + index,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                }
                            }}
                            className={`absolute overflow-hidden shadow-2xl border-4 border-white rounded-[2.5rem] w-64 h-80`}
                            style={{
                                top: `${15 + (index * 12) % 65}%`,
                                left: index % 2 === 0 ? `${10 + (index * 4)}%` : 'auto',
                                right: index % 2 !== 0 ? `${10 + (index * 4)}%` : 'auto'
                            }}
                        >
                            <img src={src} alt="Gallery" className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View: High-End Masonry Cluster (Adjusted Offset) */}
                <div className="md:hidden w-full px-6 flex flex-col items-center relative z-10 -mt-12 pt-4">
                    {/* Top Mosaic */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-2">
                        {galleryItems.slice(0, 3).map((src, idx) => (
                            <motion.div
                                key={`m-top-${idx}`}
                                animate={{ y: [0, idx % 2 === 0 ? -12 : 12, 0] }}
                                transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
                                className={`aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white shadow-2xl ${idx === 1 ? 'mt-4 scale-105' : ''}`}
                            >
                                <img src={src} className="w-full h-full object-cover" alt="jewelry" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Central Focus (Title + Side Shards) */}
                    <div className="flex items-center justify-between w-full max-w-sm gap-2 mt-2 px-1">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[28%] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white shadow-2xl"
                        >
                            <img src={galleryItems[3]} className="w-full h-full object-cover" alt="jewelry" />
                        </motion.div>

                        <h1 className="flex-1 font-serif italic text-5xl text-[#4a1d1d]/90 tracking-tighter text-center py-6 leading-none select-none drop-shadow-sm">
                            Our Story
                        </h1>

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[28%] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white shadow-2xl"
                        >
                            <img src={galleryItems[4]} className="w-full h-full object-cover" alt="jewelry" />
                        </motion.div>
                    </div>

                    {/* Bottom Mosaic */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-4 mb-4">
                        {galleryItems.slice(5, 8).map((src, idx) => (
                            <motion.div
                                key={`m-bot-${idx}`}
                                animate={{ y: [0, idx % 2 === 0 ? 12 : -12, 0] }}
                                transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                                className={`aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white shadow-2xl ${idx === 1 ? '-mt-4 scale-105' : 'mt-2'}`}
                            >
                                <img src={src} className="w-full h-full object-cover" alt="jewelry" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Desktop Typography */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:flex relative z-10 flex-col items-center text-center mt-20"
                >
                    <h1 className="font-serif italic text-6xl md:text-[10rem] text-[#4a1d1d]/90 tracking-tighter mix-blend-multiply select-none drop-shadow-md">
                        Our Story
                    </h1>
                </motion.div>
            </div>

            {/* Heritage Card - Fully Restored */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-[95%] md:max-w-xl px-4 relative z-20 mb-12"
            >
                <div className="bg-[#f0dae4]/40 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 border border-white/40 shadow-2xl relative overflow-hidden text-center">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#4a1d1d] mb-6 italic tracking-tight leading-none">
                        The Heritage
                    </h2>
                    <p className="text-base md:text-xl font-serif text-[#4a1d1d]/70 leading-relaxed italic pt-6 border-t border-[#4a1d1d]/10">
                        "At HG Enterprises, we believe that true luxury lies in the pure essence of craftsmanship. Our journey is a tribute to the timeless beauty of silver."
                    </p>
                </div>
            </motion.div>

            {/* Our Philosophy Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-[90%] md:max-w-2xl px-6 mb-12 flex flex-col items-center"
            >
                <h2 className="text-3xl md:text-5xl font-serif text-[#4a1d1d] mb-8 italic tracking-tight text-center">
                    Our Philosophy
                </h2>
                <div className="h-[1px] w-24 bg-[#4a1d1d]/10 mb-8"></div>
                <p className="text-lg md:text-2xl font-serif text-[#4a1d1d]/70 leading-relaxed italic text-center px-4">
                    "My work is inspired by the belief that true luxury lies in moments that are quiet, meaningful, and deeply personal—the gentle glow of a sunlit morning or the first touch of a pure metal on skin."
                </p>
            </motion.div>

            {/* Our Approach Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-[90%] md:max-w-2xl px-6 mb-4 flex flex-col items-center"
            >
                <h2 className="text-3xl md:text-5xl font-serif text-[#4a1d1d] mb-8 italic tracking-tight text-center">
                    Our Approach
                </h2>
                <div className="h-[1px] w-24 bg-[#4a1d1d]/10 mb-8"></div>
                <p className="text-lg md:text-2xl font-serif text-[#4a1d1d]/70 leading-relaxed italic text-center px-4">
                    "We marry traditional Indian metallurgy with modern aesthetic sensibilities. Each piece is a testament to the hands that forged it, ensuring that no two ornaments ever share the exact same soul."
                </p>
            </motion.div>
        </div>
    );
};

export default AboutUs;
