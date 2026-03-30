import React from 'react';
import { Wind, Droplets, Sun, Shield, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CareGuidePage = () => {
    const navigate = useNavigate();

    const tips = [
        {
            title: "Store Separately",
            icon: <Shield className="w-5 h-5 text-[#D39A9F]" />,
            content: "Store your ornaments in independent pouches or boxes. Contact between hardware can cause micro-scratches on polished surfaces."
        },
        {
            title: "Avoid Moisture",
            icon: <Droplets className="w-5 h-5 text-[#D39A9F]" />,
            content: "Remove jewellery before bathing, swimming, or intense workouts. Chlorine and salt water accelerate tarnishing in silver and gold-plating."
        },
        {
            title: "Apply Product First",
            icon: <Sparkles className="w-5 h-5 text-[#D39A9F]" />,
            content: "Apply perfumes, lotions, and sprays before putting on your jewellery. Chemicals in these products can dull the brilliance of stones and enamel."
        },
        {
            title: "Gentle Cleaning",
            icon: <Wind className="w-5 h-5 text-[#D39A9F]" />,
            content: "Use a specialized silver-polishing cloth for a quick buff. For deep cleans, use mild soap and lukewarm water, ensuring it's dried immediately."
        }
    ];

    return (
        <div className="bg-white min-h-screen py-8 md:py-20 selection:bg-[#D39A9F] selection:text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                 <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-black hover:text-[#D39A9F] transition-all group font-bold uppercase tracking-widest text-[10px] mb-8">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="text-center mb-12">
                    <span className="text-[#D39A9F] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Heirloom Maintenance</span>
                    <h1 className="text-3xl md:text-5xl font-display text-black mb-6 tracking-tight">Jewellery Care Guide</h1>
                    <p className="text-gray-400 text-[11px] md:text-sm italic font-serif max-w-lg mx-auto leading-relaxed">
                        Handcrafted brilliance requires gentle care. Follow our curated guidelines to ensure your HG pieces retain their lustre for generations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {tips.map((tip, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-all hover:shadow-md group">
                            <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-gray-100 group-hover:border-[#EBCDD0]">
                                {tip.icon}
                            </div>
                            <h3 className="font-display text-lg text-black mb-2">{tip.title}</h3>
                            <p className="text-[11px] md:text-xs text-gray-400 font-serif leading-relaxed italic">{tip.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareGuidePage;
