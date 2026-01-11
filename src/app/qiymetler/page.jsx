'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../lib/features/languageSlice';
import { Clock, Menu, X, MapPin, Phone, Instagram, Mail } from 'lucide-react';

const ThaiLogoImg = ({ className = '' }) => (
  <img src="/image/fonsuz.png" alt="Thai Logo" className={className} />
);

const Navigation = () => {
  const language = useSelector((state) => state.language.current);
  const isHydrated = useSelector((state) => state.language.isHydrated);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang));
    setShowLangMenu(false);
  };

  const translations = {
    az: { nav: [{ label: 'Ana Səhifə', href: '/' }, { label: 'Xidmətlər', href: '/xidmetlerimiz' }, { label: 'Qiymətlər', href: '/qiymetler' }, { label: 'Filiallar', href: '/filiallar' }, { label: 'Əlaqə', href: '/contact' }] },
    ru: { nav: [{ label: 'Главная', href: '/' }, { label: 'Услуги', href: '/xidmetlerimiz' }, { label: 'Цены', href: '/qiymetler' }, { label: 'Филиалы', href: '/filiallar' }, { label: 'Контакты', href: '/contact' }] },
    en: { nav: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/xidmetlerimiz' }, { label: 'Prices', href: '/qiymetler' }, { label: 'Branches', href: '/filiallar' }, { label: 'Contact', href: '/contact' }] }
  };

  const languages = [{ code: 'az', name: 'Azərbaycanca' }, { code: 'ru', name: 'Русский' }, { code: 'en', name: 'English' }];
  const navItems = translations[language].nav;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#002F1E] backdrop-blur-lg shadow-lg' : 'bg-emerald-950/95'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ThaiLogoImg className="w-12 h-12 rounded-full object-cover pointer-events-none select-none" draggable="false" />
            <div className="text-2xl font-[var(--font-cormorant)] text-[#C1B185] tracking-wider select-none">THAI HEALTH THERAPY</div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[#C1B185] text-lg hover:text-amber-300 transition-colors relative group">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative">
              <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center gap-2 px-4 py-2 bg-amber-400/20 hover:bg-amber-400/30 rounded-full text-[#C1B185] transition-all border border-amber-400/30">
                <span className="text-sm font-semibold">{language.toUpperCase()}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-[rgb(30,30,30)] backdrop-blur-lg rounded-xl shadow-2xl border border-amber-400/30 overflow-hidden min-w-[180px]">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-amber-400/20 transition-colors ${language === lang.code ? 'bg-amber-400/10' : ''}`}>
                      <span className="text-[#C1B185] font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#C1B185] p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setIsOpen(false)} className="block text-[#C1B185] text-lg hover:text-amber-300 transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-amber-400/30">
              <div className="flex gap-3 justify-center">
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => { handleLanguageChange(lang.code); setIsOpen(false); }} className={`px-4 py-2 rounded-full transition-all ${language === lang.code ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-amber-400/20 text-[#C1B185] hover:bg-amber-400/30'}`}>
                    <span className="text-sm">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => {
  const language = useSelector((state) => state.language.current);

  const t = {
    az: {
      about: 'Ənənəvi Thai masaj təcrübəsi ilə bədən və ruhun harmoniyası. Peşəkar komandamız sizin sağlamlığınız və rahatlığınız üçün işləyir.',
      contact: 'Əlaqə',
      rights: 'Bütün hüquqlar qorunur.',
      branches: [
        { name: 'Tarqovı filialı', address: 'Lev Tolstoy 131, CUM yaxınlığı' },
        { name: 'Yeni Həyat filialı', address: 'Yeni Həyat Plaza' }
      ]
    },
    ru: {
      about: 'Гармония тела и души через традиционную практику тайского массажа. Наша профессиональная команда работает для вашего здоровья и комфорта.',
      contact: 'Контакты',
      rights: 'Все права защищены.',
      branches: [
        { name: 'Филиал на Торговой', address: 'Лев Толстой 131, Рядом с ЦУМом' },
        { name: 'Филиал Ени Хаят', address: 'Ени Хаят' }
      ]
    },
    en: {
      about: 'Harmony of body and soul through traditional Thai massage practice. Our professional team works for your health and comfort.',
      contact: 'Contact',
      rights: 'All rights reserved.',
      branches: [
        { name: 'Tarqoviy branch', address: 'Lev Tolstoy 131, Near CUM' },
        { name: 'Yeni Heyat Branch', address: 'Yeni Hayat Plaza' }
      ]
    }
  }[language];

  const branches = [
    { phone: '+994 70 677 06 77' },
    { phone: '+994 70 737 06 77' }
  ];

  return (
    <footer id="contact" className="bg-emerald-950 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ThaiLogoImg className="w-12 h-12 rounded-full object-cover pointer-events-none select-none" draggable="false" />
              <h3 className="text-2xl font-[var(--font-cormorant)] text-[#C1B185] select-none">THAI HEALTH THERAPY</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">{t.about}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#C1B185] mb-6">{t.contact}</h4>
            <div className="space-y-6">
              {t.branches.map((branch, index) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-semibold text-[#C1B185]">{branch.name}</h5>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#C1B185] mt-1 flex-shrink-0" />
                    <span className="text-gray-400">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-[#C1B185] flex-shrink-0" />
                    <a href={`tel:${branches[index].phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-amber-400 transition-colors">{branches[index].phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#C1B185] mb-6">Social Media</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/thaitherapy.baku?igsh=Mml1ZHZieGU1ZXJv" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C1B185] hover:text-emerald-950 transition-all hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href="mailto:thaitherapy.baku@gmail.com" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C1B185] hover:text-emerald-950 transition-all hover:scale-110">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-400/30 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Thai Health Therapy. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const PricingPage = () => {
  const language = useSelector((state) => state.language.current);
  /* Removed branch selection state and logic */

  const translations = {
    az: {
      title: 'Qiymətlərimiz',
      subtitle: 'Hər masaj üçün ətraflı qiymət',
      minute: 'dəq',
      bookNow: 'İndi Rezervasiya Et',
      services: {
        'Aroma Relax': 'Aroma Relax',
        'Thai Relax': 'Thai Relax',
        'Deep Tissue': 'Dərin Toxuma Masajı',
        'Aroma Deep': 'Aroma Deep',
        'With Scrub': 'Skrab ilə',
        'Head & Shoulders': 'Baş və Çiyin',
        'Thai Herbal Bags': 'Thai Bitki Torbalar',
        'Leg Massage': 'Ayaq Masajı',
        'Foot Massage': 'Ayaq Masajı',
        'Foot Massage for Health': 'Sağlamlıq üçün Ayaq Masajı',
        'Face Massage': 'Üz Masajı',
        'Facial Massage': 'Üz Masajı',
        'Head Massage with Coconut Oil': 'Kokos Yağı ilə Baş Masajı',
        'Upper Body Massage': 'Yuxarı Bədən Masajı',
        '4 Hands Massage': '4 Əl ilə Masaj',
        '4 Hands Aroma Oil Massage': '4 Əl ilə Aroma Yağ Masajı',
        'Hot Stone Massage': 'İsti Daş Masajı',
        'Anti-cellulite Massage': 'Anti-selülit Masajı'
      }
    },
    ru: {
      title: 'Наши цены',
      subtitle: 'Подробные цены на каждый массаж',
      minute: 'мин',
      bookNow: 'Забронировать сейчас',
      services: {
        'Aroma Relax': 'Арома Релакс',
        'Thai Relax': 'Тайский Релакс',
        'Deep Tissue': 'Массаж глубоких тканей',
        'Aroma Deep': 'Глубокий ароматический',
        'With Scrub': 'Со скрабом',
        'Head & Shoulders': 'Голова и плечи',
        'Thai Herbal Bags': 'Тайские травяные мешочки',
        'Leg Massage': 'Массаж ног',
        'Foot Massage': 'Массаж стоп',
        'Foot Massage for Health': 'Массаж стоп для здоровья',
        'Face Massage': 'Массаж лица',
        'Facial Massage': 'Массаж лица',
        'Head Massage with Coconut Oil': 'Массаж головы с кокосовым маслом',
        'Upper Body Massage': 'Массаж верхней части тела',
        '4 Hands Massage': 'Массаж в 4 руки',
        '4 Hands Aroma Oil Massage': 'Массаж в 4 руки с аромамаслом',
        'Hot Stone Massage': 'Массаж горячими камнями',
        'Anti-cellulite Massage': 'Антицеллюлитный массаж'
      }
    },
    en: {
      title: 'Our Pricing',
      subtitle: 'Detailed prices for each massage',
      minute: 'min',
      bookNow: 'Book Now',
      services: {
        'Aroma Relax': 'Aroma Relax',
        'Thai Relax': 'Thai Relax',
        'Deep Tissue': 'Deep Tissue Massage',
        'Aroma Deep': 'Aroma Deep',
        'With Scrub': 'With Scrub',
        'Head & Shoulders': 'Head & Shoulders',
        'Thai Herbal Bags': 'Thai Herbal Bags',
        'Leg Massage': 'Leg Massage',
        'Foot Massage': 'Foot Massage',
        'Foot Massage for Health': 'Foot Massage for Health',
        'Face Massage': 'Face Massage',
        'Facial Massage': 'Facial Massage',
        'Head Massage with Coconut Oil': 'Head Massage with Coconut Oil',
        'Upper Body Massage': 'Upper Body Massage',
        '4 Hands Massage': '4 Hands Massage',
        '4 Hands Aroma Oil Massage': '4 Hands Aroma Oil Massage',
        'Hot Stone Massage': 'Hot Stone Massage',
        'Anti-cellulite Massage': 'Anti-cellulite Massage'
      }
    }
  };

  const t = translations[language];

  const services = [
    { id: 1, name: 'Aroma Relax', pricing: [{ duration: 60, price: 49 }, { duration: 90, price: 67 }, { duration: 120, price: 90 }] },
    { id: 2, name: 'Thai Relax', pricing: [{ duration: 60, price: 49 }, { duration: 90, price: 67 }, { duration: 120, price: 90 }] },
    { id: 3, name: 'Deep Tissue', pricing: [{ duration: 60, price: 49 }, { duration: 90, price: 70 }, { duration: 120, price: 95 }] },
    { id: 4, name: 'Aroma Deep', pricing: [{ duration: 60, price: 49 }, { duration: 90, price: 70 }, { duration: 120, price: 95 }] },
    { id: 5, name: 'With Scrub', pricing: [{ duration: 60, price: 65 }, { duration: 120, price: 130 }] },
    { id: 6, name: 'Head & Shoulders', pricing: [{ duration: 45, price: 50 }] },
    { id: 7, name: 'Thai Herbal Bags', pricing: [{ duration: 90, price: 70 }, { duration: 120, price: 140 }] },
    { id: 8, name: 'Leg Massage', pricing: [{ duration: 30, price: 25 }, { duration: 60, price: 50 }] },
    { id: 9, name: 'Foot Massage for Health', pricing: [{ duration: 45, price: 50 }] },
    { id: 10, name: 'Facial Massage', pricing: [{ duration: 30, price: 30 }, { duration: 60, price: 50 }] },
    { id: 11, name: 'Head Massage with Coconut Oil', pricing: [{ duration: 60, price: 60 }] },
    { id: 12, name: 'Upper Body Massage', pricing: [{ duration: 60, price: 50 }] },
    { id: 13, name: '4 Hands Aroma Oil Massage', pricing: [{ duration: 60, price: 90 }, { duration: 90, price: 134 }, { duration: 120, price: 180 }] },
    { id: 14, name: 'Hot Stone Massage', pricing: [{ duration: 90, price: 70 }, { duration: 120, price: 95 }] },
    { id: 15, name: 'Anti-cellulite Massage', pricing: [{ duration: 45, price: 75 }] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-gradient-to-r from-[#002F1E] to-emerald-800 text-white py-16 px-6 relative overflow-hidden mt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C1B185]/10 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1B185] mb-4 animate-fade-in">{t.title}</h1>
          <div className="w-20 h-1 bg-[#C1B185] mx-auto mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="space-y-3 md:space-y-8">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white rounded-xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-[#C1B185] animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="p-3 md:p-8">
                <h2 className="text-base md:text-3xl font-bold text-[#002F1E] text-center mb-2 md:mb-8">{t.services[service.name]}</h2>
                <div className={`grid gap-3 sm:gap-4 md:gap-6 ${service.pricing.length === 1 ? 'grid-cols-1 max-w-[180px] sm:max-w-xs md:max-w-md mx-auto' : service.pricing.length === 2 ? 'grid-cols-2 max-w-sm sm:max-w-lg md:max-w-3xl mx-auto' : 'grid-cols-3 max-w-full sm:max-w-2xl md:max-w-[650px] mx-auto'}`}>
                  {service.pricing.map((price, idx) => (
                    <div key={idx} className="bg-white rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-gray-200 hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 text-center">
                        <div className="mb-2 md:mb-4 pb-2 md:pb-4 border-b border-gray-100">
                          <div className="flex items-center justify-center gap-1 mb-1 md:mb-2">
                            <Clock className="text-emerald-700 group-hover:text-amber-400 transition-colors w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          </div>
                          <span className="text-sm sm:text-lg md:text-2xl font-bold text-[#002F1E]">{price.duration} {t.minute}</span>
                        </div>
                        <div className="pt-1 md:pt-2">
                          <div className="text-xl sm:text-3xl md:text-5xl font-bold text-[#C1B185] group-hover:scale-110 transition-transform">{price.price}</div>
                          <span className="text-gray-600 font-semibold text-xs sm:text-sm md:text-lg">AZN</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => { window.open('https://wa.me/994706770677', '_blank'); }} className="px-12 py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg">{t.bookNow}</button>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; opacity: 0; }
      `}</style>
    </div >
  );
};

export default PricingPage;
