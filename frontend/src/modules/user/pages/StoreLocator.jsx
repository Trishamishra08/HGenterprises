import React, { useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StoreLocator = () => {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const stores = [
        {
            name: "HG Flagship - Mumbai",
            address: "Gulberg Chawl, Akurli Road, Kandivali East, Mumbai, 400101",
            phone: "+91 877 900 7979",
            hours: "10:30 AM - 9:00 PM (Daily)",
            type: "Flagship Boutique"
        },
        {
            name: "HG Boutique - Delhi",
            address: "Sands Ornaments, South Extension II, Ring Road, New Delhi, 110049",
            phone: "+91 877 900 7980",
            hours: "11:00 AM - 8:30 PM (Mon-Sat)",
            type: "Experience Center"
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
                    <span className="text-[#4A1015] text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] mb-4 block">Store Locations</span>
                    <h1 className="text-4xl md:text-6xl font-display text-black mb-6 tracking-tight">Visit Our Boutiques</h1>
                    <p className="text-gray-400 text-xs md:text-base italic font-serif max-w-lg mx-auto leading-relaxed">
                        Experience our handcrafted brilliance in person. Our boutiques provide a personalized luxury experience beyond just browsing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stores.map((store, i) => (
                        <div key={i} className="p-8 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white transition-all shadow-sm hover:shadow-xl group cursor-pointer border-b-4 border-b-transparent hover:border-b-[#4A1015]">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-[#4A1015]/20 group-hover:bg-[#4A1015] group-hover:text-white transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4A1015] bg-white px-3 py-1 rounded-full border border-gray-100">{store.type}</span>
                            </div>
                            <h3 className="font-display text-xl text-black mb-4">{store.name}</h3>
                            <div className="space-y-3 mb-8">
                                <p className="text-[11px] md:text-xs text-gray-500 font-serif leading-relaxed italic flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {store.address}
                                </p>
                                <p className="text-[11px] md:text-xs text-gray-400 font-serif italic flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5" />
                                    {store.phone}
                                </p>
                                <p className="text-[11px] md:text-xs text-gray-400 font-serif italic flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5" />
                                    {store.hours}
                                </p>
                            </div>
                            <button className="w-full py-4 border border-black/10 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white">
                                <Navigation className="w-3.5 h-3.5" />
                                Get Directions
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoreLocator;
