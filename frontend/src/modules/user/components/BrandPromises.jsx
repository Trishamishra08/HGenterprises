import React from 'react';
import { motion } from 'framer-motion';
import { Gem, ShieldCheck, Truck, Headset } from 'lucide-react'; 

const BrandPromises = () => {
    const promises = [
        {
            id: 1,
            icon: Gem,
            title: "Premium Quality",
            desc: "Certified Jewellery & Tools"
        },
        {
            id: 2,
            icon: ShieldCheck,
            title: "Durability & Precision",
            desc: "High-Performance Machines"
        },
        {
            id: 3,
            icon: Truck,
            title: "Worldwide Shipping",
            desc: "Secure & Trackable Delivery"
        },
        {
            id: 4,
            icon: Headset,
            title: "Expert Support",
            desc: "Dedicated Technical Team"
        }
    ];

    return (
        <section className="pt-8 pb-8 md:pt-16 md:pb-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-2 md:px-4">

                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                    <span className="text-[#C9A24D] text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase mb-2 block">Our Commitments</span>
                    <h2 className="font-serif text-2xl md:text-5xl text-[#4A1015] font-normal uppercase tracking-[0.05em]">Why Choose Us</h2>
                </div>

                <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 md:gap-12 lg:gap-8 pt-4 md:pt-10">
                    {promises.map((item, index) => (
                        <div
                            key={item.id}
                            className="relative group flex flex-col items-center"
                        >
                            {/* Diamond Box - Compact for Mobile */}
                            <div className="w-16 h-16 md:w-52 md:h-52 bg-[#4A1015] rotate-45 rounded-md md:rounded-[2rem] flex items-center justify-center shadow-md md:shadow-[0_20px_40px_rgba(74,16,21,0.25)] relative z-10 border md:border-4 border-white cursor-pointer transition-colors duration-300 hover:bg-[#5C242B]">
                                {/* Content (Rotated back) */}
                                <div className="-rotate-45 flex flex-col items-center justify-center text-white p-1 md:p-4 text-center">
                                    <item.icon strokeWidth={1} className="w-4 h-4 md:w-10 md:h-10 mb-0.5 md:mb-3 text-[#EBCDD0]" />
                                    <h3 className="font-serif text-[6px] md:text-[15px] font-normal text-white mb-0 leading-tight uppercase tracking-tighter md:tracking-wider">
                                        {item.title.split(' ')[0]}
                                    </h3>
                                </div>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-48 md:h-48 bg-[#4A1015]/10 blur-xl md:blur-3xl rounded-full -z-10 group-hover:bg-[#4A1015]/20 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandPromises;
