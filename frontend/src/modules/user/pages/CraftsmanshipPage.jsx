import React from 'react';
import { Hammer, Sparkles, Shield, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CraftsmanshipPage = () => {
    const navigate = useNavigate();

    const steps = [
        {
            title: "Traditional Forging",
            icon: <Hammer className="w-6 h-6 text-[#4A1015]" />,
            content: "We use ancient techniques handed down through generations, ensuring each piece is as unique as the artisan who crafted it."
        },
        {
            title: "Ethical Sourcing",
            icon: <Heart className="w-6 h-6 text-[#4A1015]" />,
            content: "Every diamond and gemstone in our collection is conflict-free and sourced with respect for both nature and the people behind it."
        },
        {
            title: "Precision Detailing",
            icon: <Sparkles className="w-6 h-6 text-[#4A1015]" />,
            content: "A single HG ornament can take up to 200 hours of manual labour, from initial wax carving to final hand-polishing."
        },
        {
            title: "Certified Quality",
            icon: <Shield className="w-6 h-6 text-[#4A1015]" />,
            content: "We provide Hallmarked gold and IGI/GIA certified diamonds, because transparency is the bedrock of our craft."
        }
    ];

    return (
        <div className="bg-white min-h-screen py-8 md:py-20 selection:bg-[#4A1015] selection:text-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl">
                 <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-black hover:text-[#4A1015] transition-all group font-bold uppercase tracking-widest text-[10px] mb-8 md:mb-12">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="text-center mb-16 md:mb-24">
                    <span className="text-[#4A1015] text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] mb-4 block">Handcrafted Excellence</span>
                    <h1 className="text-4xl md:text-7xl font-display text-black mb-6 tracking-tight">Our Craft & Heritage</h1>
                    <p className="text-gray-400 text-xs md:text-lg italic font-serif max-w-3xl mx-auto leading-relaxed">
                        In an era of mass consumption, we choose the path of slow, meaningful creation. HG Enterprises is more than a jewellery house—it is a custodian of traditional Indian artistry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 md:mb-32">
                    <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl group">
                         <img src="/assets/craft_process.jpg" alt="Crafting Process" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]" 
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=2000"; }} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-10 left-10 text-white">
                             <h4 className="font-serif italic text-2xl">The Artist's Touch</h4>
                             <p className="text-gray-300 text-sm mt-1">Manual forging ensures heirloom quality.</p>
                         </div>
                    </div>
                    <div className="space-y-6 md:space-y-10 px-4 md:px-0">
                        {steps.map((step, i) => (
                             <div key={i} className="flex gap-6 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FDF5F6] rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-[#4A1015] transition-all duration-500 shrink-0">
                                    <div className="group-hover:text-white transition-colors">
                                        {step.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display text-lg md:text-xl text-black mb-2 tracking-tight">{step.title}</h3>
                                    <p className="text-[11px] md:text-sm text-gray-500 font-serif leading-relaxed italic">{step.content}</p>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>

                <div className="text-center py-20 border-t border-gray-100">
                    <h3 className="font-display text-2xl md:text-4xl text-black mb-8 italic">"A jewellery piece should not just be worn, it should be witnessed."</h3>
                    <div className="w-16 h-0.5 bg-[#4A1015] mx-auto"></div>
                </div>
            </div>
        </div>
    );
};

export default CraftsmanshipPage;
