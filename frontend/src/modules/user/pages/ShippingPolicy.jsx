import React, { useEffect } from 'react';
import { Truck, MapPin, Package, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShippingPolicy = () => {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const details = [
        {
            title: "Pan India Delivery",
            icon: <Truck className="w-6 h-6" />,
            content: "We provide safe, express delivery across all India-based pincodes through our premium delivery partners including Bluedart and Delhivery."
        },
        {
            title: "Shipping Timelines",
            icon: <Package className="w-6 h-6" />,
            content: "Standard orders are processed within 24-48 hours. Delivery takes 3-5 business days for Metro cities and 5-7 business days for others."
        },
        {
            title: "Real-time Tracking",
            icon: <MapPin className="w-6 h-6" />,
            content: "Once dispatched, you will receive a tracking link via SMS and Email to monitor your handcrafted pieces in real-time."
        },
        {
            title: "Secure Packaging",
            icon: <ShieldCheck className="w-6 h-6" />,
            content: "Every HG piece is packed in tamper-evident, premium hard-shell boxes to ensure it reaches you in pristine condition."
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
                    <span className="text-[#D39A9F] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Service Commitment</span>
                    <h1 className="text-3xl md:text-5xl font-display text-black mb-6 tracking-tight">Shipping & Delivery</h1>
                    <p className="text-gray-400 text-[11px] md:text-sm italic font-serif max-w-lg mx-auto leading-relaxed">
                        Precision crafted, carefully delivered. Learn about our logistics network and delivery commitment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {details.map((item, i) => (
                        <div key={i} className="p-4 md:p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-all hover:shadow-md group">
                            <div className="text-black mb-3 bg-white w-fit p-2.5 rounded-xl group-hover:bg-[#EBCDD0] transition-colors border border-gray-100 shadow-sm">
                                <div className="w-5 h-5">{item.icon}</div>
                            </div>
                            <h3 className="font-serif italic text-base md:text-lg text-black mb-1.5 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-[10px] md:text-xs text-gray-400 font-serif leading-relaxed italic">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
