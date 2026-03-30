import React from 'react';
import { XCircle, Clock, CreditCard, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CancellationPolicy = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Cancellation Window",
            icon: <Clock className="w-6 h-6" />,
            content: "Orders can be cancelled within 12 hours of placement. Since our pieces are handcrafted with precision, we begin the selection and preparation process shortly after your order is confirmed."
        },
        {
            title: "Refund Process",
            icon: <CreditCard className="w-6 h-6" />,
            content: "Once a cancellation is approved, the refund will be initiated to your original payment method. Please allow 5-7 business days for the amount to reflect in your account."
        },
        {
            title: "Custom Orders",
            icon: <XCircle className="w-6 h-6" />,
            content: "Bespoke, engraved, or customized ornaments cannot be cancelled once production has commenced. These pieces are uniquely crafted to your specifications."
        },
        {
            title: "Damaged Items",
            icon: <RefreshCw className="w-6 h-6" />,
            content: "If you receive a damaged product, please contact us within 24 hours of delivery. We will facilitate a replacement or full refund including shipping costs."
        }
    ];

    return (
        <div className="bg-white min-h-screen py-8 md:py-20 selection:bg-[#D39A9F] selection:text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-black hover:text-[#D39A9F] transition-all group font-bold uppercase tracking-widest text-[10px] mb-8"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="text-center mb-12 md:mb-16">
                    <span className="text-[#D39A9F] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Terms of Service</span>
                    <h1 className="text-3xl md:text-5xl font-serif text-black mb-4 tracking-tight font-normal">
                        <span className="italic text-[#D39A9F]">Cancellation</span> & Refund Policy
                    </h1>
                    <div className="w-16 md:w-20 h-[1px] bg-[#EBCDD0] mx-auto mb-4"></div>
                    <p className="text-gray-400 text-xs md:text-sm font-serif italic max-w-lg mx-auto leading-relaxed">
                        At HG Enterprises, we strive to ensure total satisfaction. Please review our policies regarding order cancellations and financial returns.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#F3F4F6]">
                    <div className="flex items-center gap-4 mb-10 p-6 bg-red-50/50 rounded-2xl border border-red-100">
                        <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                        <p className="text-xs md:text-sm font-serif text-gray-600 italic">
                            "Transparency is at the heart of our craft. We aim to process all cancellation requests as fairly and swiftly as possible."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {sections.map((section, idx) => (
                            <div key={idx} className="p-4 md:p-6 rounded-2xl border border-[#F3F4F6] hover:shadow-md transition-all hover:border-[#EBCDD0] group bg-white">
                                <div className="text-black mb-3 bg-gray-50 w-fit p-2.5 rounded-xl group-hover:bg-[#EBCDD0] transition-colors">
                                    <div className="w-5 h-5">{section.icon}</div>
                                </div>
                                <h3 className="text-base md:text-lg font-serif italic text-black mb-1.5 tracking-tight group-hover:text-[#4A1015] transition-colors">{section.title}</h3>
                                <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed font-serif">{section.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 md:mt-16 border-t border-[#F3F4F6] pt-8 md:pt-12">
                        <h4 className="font-display text-black mb-4 text-lg md:text-xl">Important Notes</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D39A9F] mt-2 shrink-0"></div>
                                <p className="text-[11px] md:text-sm text-gray-500 font-serif leading-relaxed">
                                    Cancellations are not possible once the order has been dispatched. You may use our Returns portal in such cases.
                                </p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D39A9F] mt-2 shrink-0"></div>
                                <p className="text-[11px] md:text-sm text-gray-500 font-serif leading-relaxed">
                                    Shipping charges are non-refundable for cancellations requested after the 12-hour window.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancellationPolicy;
