'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../lib/features/languageSlice';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Menu, X, MessageCircle, Instagram } from 'lucide-react';

const ThaiLogoImg = ({ className = '' }) => (
  <img src="/image/fonsuz.png" alt="Thai Logo" className={className} />
);

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
    ru: { nav: [{ label: 'Главная', href: '/' },  { label: 'Услуги', href: '/xidmetlerimiz' }, { label: 'Цены', href: '/qiymetler' }, { label: 'Филиалы', href: '/filiallar' }, { label: 'Контакты', href: '/contact' }] },
    en: { nav: [{ label: 'Home', href: '/' },  { label: 'Services', href: '/xidmetlerimiz' }, { label: 'Prices', href: '/qiymetler' }, { label: 'Branches', href: '/filiallar' }, { label: 'Contact', href: '/contact' }] }
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

const BranchesPage = () => {
  const language = useSelector((state) => state.language.current);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const translations = {
    az: {
      title: 'Filiallarımız',
      subtitle: 'Sizə ən yaxın filialımızı seçin və rahatlıq təcrübəsi yaşayın',
      back: 'Geri',
      viewDetails: 'Ətraflı Bax',
      address: 'Ünvan',
      phone: 'Telefon',
      email: 'Email',
      workingHours: 'İş Saatları',
      weekdays: 'Bazar ertəsi - Cümə',
      weekend: 'Şənbə - Bazar',
      contactWhatsApp: 'WhatsApp ilə Əlaqə',
      viewOnMap: 'Xəritədə Bax',
      branches: [
        {
          id: 1,
          name: 'Tarqovıy filialı',
          address: 'Lev Tolstoy 131, CUM yaxınlığı, Nizami rayonu, Bakı, Azərbaycan',
          description: 'Şəhərin mərkəzində yerləşən filialımız rahat nəqliyyat əlaqələri və müasir avadanlıqları ilə sizə xidmət göstərməyə hazırdır. Geniş və rahat otaqlarımızda rahatlıq və sülh tapacaqsınız.'
        },
        {
          id: 2,
          name: 'Yeni Həyat',
          address: 'Yeni Həyat Plaza, Bakı şəhəri, Səbail r-nu, Zərifə Əliyeva küç., 55',
          description: 'Səbail rayonundakı filialımız müasir dizayn və rahat mühiti ilə fərqlənir. Peşəkar komandamız sizə ən yaxşı xidməti təqdim etməyə hazırdır.'
        }
      ]
    },
    ru: {
      title: 'Наши Филиалы',
      subtitle: 'Выберите ближайший к Вам филиал и насладитесь комфортом',
      back: 'Назад',
      viewDetails: 'Подробнее',
      address: 'Адрес',
      phone: 'Телефон',
      email: 'Электронная почта',
      workingHours: 'Часы работы',
      weekdays: 'Понедельник - Пятница',
      weekend: 'Суббота - Воскресенье',
      contactWhatsApp: 'Связаться через WhatsApp',
      viewOnMap: 'Посмотреть на карте',
      branches: [
        {
          id: 1,
          name: 'Филиал на Торговой',
          address: 'Лев Толстой 131, рядом с ЦУМ, г. Баку, Азербайджан',
          description: 'Наш филиал в центре города готов обслужить Вас с удобным транспортным сообщением и современным оборудованием. В наших просторных и комфортных комнатах Вы найдете покой и умиротворение.'
        },
        {
          id: 2,
          name: 'Ени Хаят филиал',
          address: 'Yeni Həyat Plaza, г. Баку, Сабаильский р-н, ул. Зарифы Алиевой, 55',
          description: 'Наш филиал в Сабаильский районе отличается современным дизайном и комфортной атмосферой. Наша профессиональная команда готова предоставить Вам лучший сервис.'
        }
      ]
    },
    en: {
      title: 'Our Branches',
      subtitle: 'Choose the nearest branch and experience comfort',
      back: 'Back',
      viewDetails: 'View Details',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      workingHours: 'Working Hours',
      weekdays: 'Monday - Friday',
      weekend: 'Saturday - Sunday',
      contactWhatsApp: 'Contact via WhatsApp',
      viewOnMap: 'View on Map',
      branches: [
        {
          id: 1,
          name: 'Tarqoviy branch',
          address: 'Lev Tolstoy 131, Near CUM, Nizami district, Baku, Azerbaijan',
          description: 'Our branch in the city center is ready to serve you with convenient transport connections and modern equipment. In our spacious and comfortable rooms you will find peace and tranquility.'
        },
        {
          id: 2,
          name: 'Yeni Hayat branch',
          address: 'Yeni Hayat Plaza, Baku city, Sabail district, Zarifa Aliyeva str., 55',
          description: 'Our branch in Sabail district stands out with its modern design and comfortable environment. Our professional team is ready to provide you with the best service.'
        }
      ]
    }
  };

  const branches = [
    {
      id: 1,
      image: '/image/tarqovu.jpg',
      phone: '+994706770677',
      email: 'thaitherapy.baku@gmail.com',
      mapEmbed: 'https://www.google.com/maps?q=40.3722919,49.8336809&hl=az&z=17&output=embed',
      workingHours: {
        weekdays: '11:00 - 21:00',
        weekend: '11:00 - 21:00'
      }
    },
    {
      id: 2,
      image: '/image/yenihayat.jpg',
      phone: '+994707370677',
      email: 'thaitherapy.baku@gmail.com',
      mapEmbed: 'https://www.google.com/maps?q=40.37778,49.85294&hl=az&z=17&output=embed',
      workingHours: {
        weekdays: '11:00 - 21:00',
        weekend: '11:00 - 21:00'
      }
    }
  ];

  const t = translations[language];

  if (selectedBranch) {
    const branch = branches.find(b => b.id === selectedBranch);
    const branchInfo = t.branches.find(b => b.id === selectedBranch);
    
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Navigation />

        <div className="bg-emerald-950 text-white py-4 md:py-6 px-4 md:px-6 z-10">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <button
              onClick={() => setSelectedBranch(null)}
              className="flex items-center gap-2 hover:text-[#C1B185] transition-colors"
            >
              <ArrowLeft size={20} className="md:w-6 md:h-6" />
              <span className="text-base md:text-lg font-semibold cursor-pointer">{t.back}</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
           <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-xl">

  {/* Background Fill (blur + darken), covers fully */}
  <div
    className="absolute inset-0 bg-center bg-cover blur-sm scale-110 brightness-50"
    style={{ backgroundImage: `url(${branch.image})` }}
  ></div>

  {/* Actual Image (zoom-out, no crop) */}
  <img
    src={branch.image}
    alt={branchInfo.name}
    className="relative z-10 w-full h-full object-contain object-center"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent z-20"></div>

  {/* Title Text */}
  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-30 max-w-[90%]">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1B185] mb-2 break-words">
      {branchInfo.name}
    </h1>
  </div>

</div>

            
            <div className="p-4 md:p-8 lg:p-12">
              <p className="text-sm md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 md:mb-12">
                {branchInfo.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-4">
                    <div className="p-2 md:p-3 bg-emerald-800 rounded-full flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-lg font-bold text-emerald-950 mb-2">{t.address}</h3>
                      <p className="text-sm md:text-base text-gray-700 break-words">{branchInfo.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-emerald-800 rounded-full flex-shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-lg font-bold text-emerald-950 mb-2">{t.phone}</h3>
                      <a 
                        href={`tel:${branch.phone}`}
                        className="text-sm md:text-base text-gray-700 hover:text-emerald-800 transition-colors break-all"
                      >
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-emerald-800 rounded-full flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-lg font-bold text-emerald-950 mb-2">{t.email}</h3>
                      <a 
                        href={`mailto:${branch.email}`}
                        className="text-sm md:text-base text-gray-700 hover:text-emerald-800 transition-colors break-all"
                      >
                        {branch.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-emerald-800 rounded-full flex-shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-lg font-bold text-emerald-950 mb-3">{t.workingHours}</h3>
                      <div className="space-y-2 text-sm md:text-base">
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-700">{t.weekdays}:</span>
                          <span className="text-emerald-800 font-semibold">{branch.workingHours.weekdays}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-700">{t.weekend}:</span>
                          <span className="text-emerald-800 font-semibold">{branch.workingHours.weekend}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open(`https://wa.me/${branch.phone}`, '_blank')}
                className="w-full mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-base md:text-lg transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <MessageCircle size={20} className="md:w-6 md:h-6" />
                {t.contactWhatsApp}
              </button>

              <div className="mt-6 md:mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-emerald-950 mb-3 md:mb-4">{t.viewOnMap}</h3>
                <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg h-64 md:h-96">
                  <iframe
                    src={branch.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navigation />

      <div className="bg-emerald-950 text-white py-12 md:py-16 px-4 md:px-6 relative overflow-hidden mt-[-11px]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C1B185] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className={`max-w-6xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1B185] mb-3 md:mb-4">
            {t.title}
          </h1>
          <div className="w-16 md:w-20 h-1 bg-[#C1B185] mx-auto mb-4 md:mb-6 animate-pulse"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-200">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {branches.map((branch, index) => {
            const branchInfo = t.branches[index];
            return (
            <div
              key={branch.id}
              onClick={() => setSelectedBranch(branch.id)}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div 
                className="h-48 md:h-64 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${branch.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent transition-all duration-500 group-hover:from-emerald-950/90"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 transition-all duration-500 group-hover:bottom-6 md:group-hover:bottom-8 group-hover:left-6 md:group-hover:left-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C1B185]">
                    {branchInfo.name}
                  </h2>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold transform scale-75 group-hover:scale-100 transition-transform duration-500">{t.viewDetails}</span>
                </div>
              </div>
              
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <div className="flex items-start gap-2 md:gap-3 transform transition-all duration-300 group-hover:translate-x-2">
                  <MapPin className="text-emerald-800 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" size={18} />
                  <p className="text-sm md:text-base text-gray-700">{branchInfo.address}</p>
                </div>

                <div className="flex items-center gap-2 md:gap-3 transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '50ms' }}>
                  <Phone className="text-emerald-800 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" size={18} />
                  <span className="text-sm md:text-base text-gray-700">{branch.phone}</span>
                </div>

                <div className="pt-3 md:pt-4 border-t border-gray-200 transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '100ms' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-emerald-800 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" size={18} />
                    <span className="text-sm md:text-base text-gray-600 font-semibold">{t.workingHours}</span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 space-y-1 ml-6 md:ml-7">
                    <p>{t.weekdays}: <span className="text-[#C1B185] font-semibold">{branch.workingHours.weekdays}</span></p>
                    <p>{t.weekend}: <span className="text-[#C1B185] font-semibold">{branch.workingHours.weekend}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BranchesPage;
