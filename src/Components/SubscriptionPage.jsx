import React, { useState } from 'react';
import {
    Home, ShoppingBag, Users, User, Search, Heart,
    ShoppingCart, Check, Zap, Crown, Shield, Plus, Minus
} from 'lucide-react';

const SubscriptionPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const plans = [
        {
            name: "Essential",
            price: "$9.99",
            period: "/month",
            features: ["Monthly games", "Online multiplayer", "Exclusive discounts", "Exclusive content", "Cloud storage", "Share Play"],
            color: "bg-zinc-900",
            border: "border border-white/10",
            buttonStyle: "border-white/20 border hover:bg-white hover:text-black",
            icon: <Shield className="w-8 h-8 text-blue-500" />
        },
        {
            name: "Extra",
            price: "$14.99",
            period: "/month",
            features: ["All Essential features", "Game Catalogue", "Ubisoft+ Classics"],
            color: "bg-blue-600",
            textColor: "text-white",
            buttonStyle: "bg-black text-white hover:bg-zinc-800",
            icon: <Zap className="w-8 h-8 text-white" />,
            popular: true
        },
        {
            name: "Deluxe",
            price: "$17.99",
            period: "/month",
            features: ["All Extra features", "Classics Catalogue", "Game trials"],
            color: "bg-black",
            border: "border-2 border-blue-600",
            buttonStyle: "bg-blue-600 text-white hover:bg-blue-500",
            icon: <Crown className="w-8 h-8 text-blue-400" />
        }
    ];

    const benefits = [
        {
            title: "Access hundreds of great games",
            desc: "Enjoy new games every month, dive into a library of hundreds of games in the Game Catalogue, and play select titles before you buy.",
            btnText: "See all games",
            img: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/2028edeaf4c0b60142550a3d6e024b6009853ceb9f51591e.jpg" // Spider-Man 2
        },
        {
            title: "Jump online and join a world of play",
            desc: "Grab your friends and join the fun with online multiplayer access, included with all PlayStation Plus memberships.",
            btnText: "Explore multiplayer",
            img: "https://helios-i.mashable.com/imagery/articles/00iMVz5oU69RK9UEoPsZTMW/hero-image.fill.size_1248x702.v1623390188.jpg" // Ghost of Tsushima
        },
        {
            title: "Get exclusive discounts and more",
            desc: "Get access to special Store discounts on select games and add-ons, and exclusive content packs for free-to-play titles.",
            btnText: "Find exclusive content",
            img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg?t=1750909504" // God of War Ragnarok
        }
    ];

    const faqs = [
        { q: "Do I need PlayStation Plus to play all online games?", a: "Most paid games require a subscription for online play. Free-to-play titles generally do not." },
        { q: "Are PlayStation Plus games mine to keep?", a: "They remain in your library as long as you have an active membership." },
        { q: "What discounts will I get as a member?", a: "Exclusive member-only discounts and extra savings during seasonal sales." },
        { q: "How can I downgrade my membership?", a: "You can manage or change your subscription level via your account settings." }
    ];

    return (
        <div className="flex h-screen w-full bg-[#050505] text-white font-sans overflow-hidden select-none">

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative bg-[#0a0a0a]">

                {/* HERO SECTION */}
                <section className="relative w-full min-h-[85vh] flex items-center bg-[#0d0d0d] overflow-hidden">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-full h-[12%] bg-blue-600/80 -skew-y-1 translate-y-8 z-10 backdrop-blur-sm" />

                    <div className="max-w-7xl mx-auto w-full px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-20">
                        <div className="space-y-8">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <span className="text-white text-[14px] font-bold">+</span>
                                </div>
                                <span className="font-bold text-sm tracking-[0.1em] text-blue-400 uppercase">PlayStation Plus</span>
                            </div>
                            <h1 className="text-6xl font-black leading-[1] tracking-tighter italic uppercase">
                                New worlds <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">are waiting</span>
                            </h1>
                            <p className="text-zinc-400 max-w-md text-sm leading-relaxed font-medium">
                                Experience a universe of possibilities with three membership tiers. Access legendary catalogues, trial the latest hits, and dominate online.
                            </p>
                            <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all hover:scale-105 shadow-2xl shadow-blue-500/20">
                                Join now
                            </button>
                        </div>

                        {/* Image Collage with Real Game Assets */}
                        <div className="relative grid grid-cols-3 gap-3 opacity-80 scale-110 rotate-[-4deg]">
                            <div className="space-y-3 mt-14">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_hVx8ldFKCWCRn3fwc34yswNTOhRMmWytLQ&s" className="rounded-xl border border-white/10 shadow-2xl" alt="Horizion" />
                                <img src="https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/DwVjpbKOsFOyPdNzmSTSWuxG.png" className="rounded-xl border border-white/10 shadow-2xl" alt="Ratchet" />
                            </div>
                            <div className="space-y-3">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgK020HdJlnxesOkODk-1vJc7aVnM0aBd6Eg&s" className="rounded-xl border border-blue-500/20 shadow-2xl h-72 object-cover" alt="Cyberpunk" />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjyzUATvlKxaDXeOyapXERPnBQ7lDFYWQEg&s" className="rounded-xl border border-white/10 shadow-2xl" alt="Deathloop" />
                            </div>
                            <div className="space-y-3 mt-20">
                                <img src="https://assets-prd.ignimgs.com/2021/06/12/elden-ring-button-03-1623460560664.jpg" className="rounded-xl border border-white/10 shadow-2xl" alt="Elden Ring" />
                                <img src="https://image.api.playstation.com/vulcan/ap/rnd/202511/0707/9e4e76f597c62f2591b312164ba164e04d2e96a016ec3208.jpg" className="rounded-xl border border-blue-500/10 shadow-2xl" alt="Gran Turismo" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFITS SECTION */}
                <section className="bg-black py-32 px-12 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Core Member Benefits</p>
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-20">
                            Fuel Your <span className="text-blue-600">Play</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {benefits.map((b, idx) => (
                                <div key={idx} className="flex flex-col text-left group cursor-pointer bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                                    <div className="overflow-hidden rounded-xl mb-8 aspect-[16/9]">
                                        <img src={b.img} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                                    </div>
                                    <h3 className="text-white font-black text-lg mb-4 uppercase italic leading-tight group-hover:text-blue-400 transition-colors">{b.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium">{b.desc}</p>
                                    <button className="mt-auto w-full bg-blue-600/10 text-blue-400 border border-blue-600/20 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {b.btnText}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMPARE PLANS */}
                <div className="bg-[#050505] py-32 px-12">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-black uppercase italic text-center mb-20 tracking-tighter">Choose Your Plan</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {plans.map((p, i) => (
                                <div key={i} className={`rounded-3xl p-10 flex flex-col transition-all duration-500 hover:translate-y-[-10px] ${p.color} ${p.textColor || 'text-white'} ${p.border || 'border border-white/5'}`}>
                                    <div className="mb-8">{p.icon}</div>
                                    <h3 className="text-3xl font-black uppercase italic mb-2">{p.name}</h3>
                                    <div className="flex items-baseline mb-8">
                                        <span className="text-5xl font-bold">{p.price}</span>
                                        <span className="ml-1 text-zinc-500 text-sm">{p.period}</span>
                                    </div>
                                    <div className="flex-grow space-y-5 mb-12">
                                        {p.features.map((f, fi) => (
                                            <div key={fi} className="flex items-center text-sm font-semibold opacity-80"><Check className="w-5 h-5 mr-4 shrink-0 text-blue-500" />{f}</div>
                                        ))}
                                    </div>
                                    <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl ${p.buttonStyle}`}>Join {p.name}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ SECTION */}
                <section className="bg-[#0a0a0a] py-32 px-12 border-t border-white/5">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 text-center italic">The Intelligence Hub</h2>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-zinc-900/30 rounded-2xl border border-white/5 overflow-hidden">
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left text-white font-bold text-sm hover:bg-zinc-800/50 transition-colors">
                                        {faq.q}
                                        {openFaq === i ? <Minus size={18} className="text-blue-500" /> : <Plus size={18} className="text-blue-500" />}
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-60 opacity-100 p-6 pt-0' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                                        <p className="text-zinc-500 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }` }} />
        </div>
    );
};

export default SubscriptionPage;
