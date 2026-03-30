import React, { useEffect } from 'react';
import { RefreshCw, ShieldCheck, Mail, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReturnsPolicy = () => {
    const navigate = useNavigate();

    const policies = [
        {
            title: "7-Day Window",
            icon: <RefreshCw className="w-5 h-5 text-[#4A1015]" />,
            content: "We offer a seven-day return window for all standard products from the date of delivery. The item must be in its original, unworn condition."
        },
        {
            title: "Quality Inspection",
            icon: <ShieldCheck className="w-5 h-5 text-[#4A1015]" />,
            content: "All returns are subject to a rigorous quality inspection by our master jewellers to ensure authenticity and original state before refunding."
        },
        {
            title: "Full Refund",
            icon: <ShoppingBag className="w-5 h-5 text-[#4A1015]" />,
            content: "Once approved, a full refund of the product value will be credited to your original payment method within 7-10 business days."
        },
        {
            title: "Assisted Returns",
            icon: <Mail className="w-5 h-5 text-[#4A1015]" />,
            content: "To initiate a return, simply email concierge@hgjewels.com with your order number. We'll arrange a secure doorstep pickup for you."
        }
    ];

    return (
        <div className="bg-white min-h-screen py-8 md:py-20 selection:bg-[#4A1015] selection:text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                 <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-black hover:text-[#4A1015] transition-all group font-bold uppercase tracking-widest text-[10px] mb-8 md:mb-12">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="text-center mb-12">
                    <span className="text-[#4A1015] text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] mb-4 block">Our Promise</span>
                    <h1 className="text-3xl md:text-5xl font-serif text-black mb-4 tracking-tight font-normal">Easy <span className="italic text-[#4A1015]">Returns</span></h1>
                    <p className="text-gray-400 text-xs md:text-base italic font-serif max-w-3xl mx-auto leading-relaxed">
                        Total peace of mind is part of the HG experience. If a piece isn't perfect, our return process is designed to be as effortless as your purchase.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] p-6 md:p-12 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {policies.map((p, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 h-fit shrink-0">
                                    {p.icon}
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-black mb-2 tracking-tight">{p.title}</h3>
                                    <p className="text-[11px] md:text-xs text-gray-400 font-serif leading-relaxed italic">{p.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-[#FDF5F6] rounded-2xl border-l-4 border-l-[#4A1015]">
                        <h4 className="font-display text-sm text-[#4A1015] font-bold uppercase tracking-widest mb-3">Exceptions</h4>
                        <p className="text-[11px] md:text-xs text-black/60 font-serif italic mb-2 leading-relaxed">Please note: Customised jewellery, engraved pieces, and items marked 'Final Sale' are ineligible for returns.</p>
                        <p className="text-[11px] md:text-xs text-black/60 font-serif italic leading-relaxed">International orders are currently eligible for returns only in case of transit damage.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPolicy;
