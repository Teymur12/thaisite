'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../lib/features/languageSlice';
import { Menu, X, ChevronLeft, ChevronRight, Leaf, Sparkles, Users, Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

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
    ru: { nav: [{ label: 'Главная', href: '/' },  { label: 'Услуги', href: '/xidmetlerimiz' }, { label: 'Цены', href: '/qiymetler' }, { label: 'Филиалы', href: '/filiallar' }, { label: 'Контакты', href: '/contact' }] },
    en: { nav: [{ label: 'Home', href: '/' },  { label: 'Services', href: '/xidmetlerimiz' }, { label: 'Prices', href: '/qiymetler' }, { label: 'Branches', href: '/filiallar' }, { label: 'Contact', href: '/contact' }] }
  };

  const languages = [{ code: 'az', name: 'Azərbaycanca' ,flag: '🇦🇿' }, { code: 'ru', name: 'Русский', flag: '🇷🇺' }, { code: 'en', name: 'English', flag: '🇬🇧' }];
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

const CarouselSection = () => {
  const language = useSelector((state) => state.language.current);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const translations = {
    az: {
      title: 'Xidmətlərimiz',
      slides: [
        { id: 1, title: 'Aroma Relax', description: 'Aromatik yağlarla rahatlaşdırıcı və sakitləşdirici masaj. Gündəlik stressdən uzaqlaşın və dərin relaksasiyaya qərq olun.', image: '/image/DSC08704.jpg' },
        { id: 2, title: 'Thai Relax', description: 'Ənənəvi Thai texnikası ilə rahatlaşdırıcı masaj. Akupressur nöqtələrinə təsir və çevikliyin artırılması.', image: '/image/DSC01325.jpg' },
        { id: 3, title: 'Deep Tissue', description: 'Dərin toxuma masajı ilə xroniki gərginliyin aradan qaldırılması. İdmançılar və fiziki işləyənlər üçün ideal.', image: '/image/deeptissue.jpeg' },
        { id: 4, title: 'Aroma Deep', description: 'Aromaterapiya və dərin toxuma masajının birləşməsi. Güclü və effektiv müalicə təcrübəsi.', image: '/image/aromadeep.jpeg' },
        { id: null, title: 'Digər Xidmətlərimiz', description: 'Hot Stone, Thai Bitki Torbaları, Anti-Selülit, Ayaq Masajı və daha çox xidmətlərimizi kəşf edin.', image: '/image/DSC08765.jpg' }
      ]
    },
    ru: {
      title: 'Наши услуги',
      slides: [
        { id: 1, title: 'Aroma Relax', description: 'Расслабляющий массаж с ароматическими маслами. Избавьтесь от стресса и погрузитесь в глубокую релаксацию.', image: '/image/DSC08704.jpg' },
        { id: 2, title: 'Thai Relax', description: 'Расслабляющий массаж традиционной тайской техникой. Воздействие на акупрессурные точки и увеличение гибкости.', image: '/image/DSC01325.jpg' },
        { id: 3, title: 'Deep Tissue', description: 'Массаж глубоких тканей для устранения хронического напряжения. Идеален для спортсменов и физических работников.', image: '/image/deeptissue.jpeg' },
        { id: 4, title: 'Aroma Deep', description: 'Сочетание ароматерапии и массажа глубоких тканей. Мощная и эффективная лечебная терапия.', image: '/image/aromadeep.jpeg' },
        { id: null, title: 'Другие наши услуги', description: 'Откройте для себя Hot Stone, Тайские травяные мешочки, Антицеллюлитный, Массаж стоп и многое другое.', image: '/image/DSC08765.jpg' }
      ]
    },
    en: {
      title: 'Our Services',
      slides: [
        { id: 1, title: 'Aroma Relax', description: 'Relaxing massage with aromatic oils. Escape daily stress and immerse in deep relaxation.', image: '/image/DSC08704.jpg' },
        { id: 2, title: 'Thai Relax', description: 'Relaxing massage with traditional Thai technique. Acupressure point work and increased flexibility.', image: '/image/DSC01325.jpg' },
        { id: 3, title: 'Deep Tissue', description: 'Deep tissue massage to eliminate chronic tension. Ideal for athletes and physical workers.', image: '/image/deeptissue.jpeg' },
        { id: 4, title: 'Aroma Deep', description: 'Combination of aromatherapy and deep tissue massage. Powerful and effective therapeutic experience.', image: '/image/aromadeep.jpeg' },
        { id: null, title: 'Other Services', description: 'Discover Hot Stone, Thai Herbal Bags, Anti-Cellulite, Foot Massage and many more services.', image: '/image/DSC08765.jpg' }
      ]
    }
  };

  const t = translations[language];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % t.slides.length), 5000);
    return () => clearInterval(interval);
  }, [t.slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % t.slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + t.slides.length) % t.slides.length);

  const handleSlideClick = (slide) => {
    if (slide.id) {
      window.location.href = `/xidmetlerimiz?service=${slide.id}`;
    } else {
      window.location.href = '/xidmetlerimiz';
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 px-6 bg-gray-50">
      <h2 className={`text-4xl md:text-5xl font-bold text-emerald-950 text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {t.title}
        <div className="w-20 h-1 bg-[#C1B185] mx-auto mt-4" />
      </h2>
      <div className="max-w-6xl mx-auto relative">
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          {t.slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => handleSlideClick(slide)}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/50 to-emerald-950/30" />
              <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                <h3 className="text-3xl md:text-4xl font-bold text-[#C1B185] mb-4">{slide.title}</h3>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">{slide.description}</p>
              </div>
            </div>
          ))}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 bg-emerald-950/80 hover:bg-emerald-950 text-[#C1B185] w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10">
            <ChevronLeft size={28} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 bg-emerald-950/80 hover:bg-emerald-950 text-[#C1B185] w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10">
            <ChevronRight size={28} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {t.slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-[#C1B185] w-8 border-2 border-white' : 'bg-amber-400/50'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  const language = useSelector((state) => state.language.current);
  
  const t = {
    az: { subtitle: 'Bədən və ruhun harmoniyası. Ənənəvi Thai masaj təcrübəsi ilə özünüzü yeniləyin.' },
    ru: { subtitle: 'Гармония тела и души. Обновите себя с традиционной практикой тайского массажа.' },
    en: { subtitle: 'Harmony of body and soul. Renew yourself with traditional Thai massage practice.' }
  }[language];

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dr39lzcwq/video/upload/v1763318178/taimasaj30_nhl395.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgb(30,30,30)-950/60]" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)', animation: 'pulse 8s ease-in-out infinite' }} />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="animate-fadeInScale">
          <ThaiLogoImg className="w-60 h-52 mx-auto mb-8" />
        </div>
        <h1 className="text-5xl md:text-7xl font-[var(--font-cormorant)] text-[#C1B185] mb-6 animate-fadeInUp shadow-text">THAI HEALTH THERAPY</h1>
        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>{t.subtitle}</p>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const language = useSelector((state) => state.language.current);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = {
    az: { title: 'Bizimlə Tanış Olun', desc1: '3 ildən artıq təcrübə ilə sizə ən yaxşı Thai masaj xidmətlərini təqdim edirik. Hər bir müştərimiz bizim üçün xüsusidir və onların rahatlığı prioritetimizdir.', desc2: 'Peşəkar komandamız, müasir avadanlıqlarımız və rahat mühitimizlə sizə unudulmaz təcrübə yaşatmağa hazırıq.', stats: ['İllik Təcrübə', 'Məmnun Müştəri', 'Peşəkar Terapevt'] },
    ru: { title: 'Познакомьтесь с нами', desc1: 'С более чем 3-летним опытом мы предлагаем Вам лучшие услуги тайского массажа. Каждый наш клиент особенный для нас, и их комфорт является нашим приоритетом.', desc2: 'Наша профессиональная команда, современное оборудование и комфортная обстановка готовы подарить Вам незабываемые впечатления.', stats: ['Лет опыта', 'Довольных клиентов', 'Профессиональных терапевтов'] },
    en: { title: 'Get to Know Us', desc1: 'With over 3 years of experience, we offer you the best Thai massage services. Each of our clients is special to us and their comfort is our priority.', desc2: 'Our professional team, modern equipment and comfortable environment are ready to give you an unforgettable experience.', stats: ['Years of Experience', 'Happy Clients', 'Professional Therapists'] }
  }[language];

  const stats = [{ number: '3+', label: t.stats[0] }, { number: '5000+', label: t.stats[1] }, { number: '10+', label: t.stats[2] }];

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dr39lzcwq/video/upload/v1763318728/WhatsApp_Video_2025-11-16_at_22.44.48_795a2332_agbfgn.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgb(30,30,30)-950/60]" />
      <div className={`relative z-10 max-w-5xl text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-[#C1B185] mb-8">{t.title}</h2>
        <p className="text-xl text-gray-200 leading-relaxed mb-6">{t.desc1}</p>
        <p className="text-xl text-gray-200 leading-relaxed mb-12">{t.desc2}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400 hover:transform hover:-translate-y-2 transition-all duration-300" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="text-5xl font-bold text-[#C1B185] mb-2">{stat.number}</div>
              <div className="text-lg text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoSection = () => {
  const language = useSelector((state) => state.language.current);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const translations = {
    az: {
      cards: [
        { title: 'Ənənəvi Təcrübə', description: 'Əsrlərdən gələn Thai masaj ənənələrini müasir rahatlıq standartları ilə birləşdiririk.' },
        { title: 'Peşəkar Komanda', description: 'Yüksək ixtisaslı və təcrübəli terapevtlərimiz sizin sağlamlığınız üçün işləyir.' },
        { title: 'Premium Keyfiyyət', description: 'Ən yaxşı təbii məhsullar və müasir avadanlıqlarla sizə xidmət göstəririk.' }
      ]
    },
    ru: {
      cards: [
        { title: 'Традиционный опыт', description: 'Мы объединяем многовековые традиции тайского массажа с современными стандартами комфорта.' },
        { title: 'Профессиональная команда', description: 'Наши высококвалифицированные и опытные терапевты работают для вашего здоровья.' },
        { title: 'Премиальное качество', description: 'Обслуживаем Вас лучшими натуральными продуктами и современным оборудованием.' }
      ]
    },
    en: {
      cards: [
        { title: 'Traditional Experience', description: 'We combine centuries-old Thai massage traditions with modern comfort standards.' },
        { title: 'Professional Team', description: 'Our highly qualified and experienced therapists work for your health.' },
        { title: 'Premium Quality', description: 'We serve you with the best natural products and modern equipment.' }
      ]
    }
  };

  const t = translations[language];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleCards(prev => [...new Set([...prev, index])]);
        }
      });
    }, { threshold: 0.2 });
    const cardElements = sectionRef.current?.querySelectorAll('.info-card');
    cardElements?.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const icons = [<Leaf size={56} />, <Users size={56} />, <Sparkles size={56} />];

  return (
    <section ref={sectionRef} className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.cards.map((card, index) => (
          <div key={index} data-index={index} className={`info-card bg-white p-10 rounded-2xl shadow-lg text-center transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${index * 0.2}s` }}>
            <div className="text-emerald-800 mb-6 inline-block animate-float">{icons[index]}</div>
            <h3 className="text-2xl font-bold text-emerald-950 mb-4">{card.title}</h3>
            <p className="text-lg text-gray-600 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const BranchesSection = () => {
  const language = useSelector((state) => state.language.current);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const translations = {
    az: {
      title: 'Filiallarımız',
      subtitle: 'Sizə ən yaxın filialımızı seçin',
      hours: 'İş Saatları',
      whatsapp: 'WhatsApp ilə Yazın',
      branches: [
        {
          name: 'Tarqovıy filialı',
          address: 'Lev Tolstoy 131, CUM yaxınlığı, Bakı şəhəri, Azərbaycan'
        },
        {
          name: 'Yeni Həyat Plaza filialı',
          address: 'Yeni Həyat Plaza, Bakı şəhəri, Səbail r-nu, Zərifə Əliyeva küç., 55'
        }
      ]
    },
    ru: {
      title: 'Наши филиалы',
      subtitle: 'Выберите ближайший к Вам филиал',
      hours: 'Рабочие часы',
      whatsapp: 'Написать в WhatsApp',
      branches: [
        {
          name: 'Филиал на Торговой',
          address: 'Лев Толстой 131, рядом с ЦУМ, г. Баку, Азербайджан'
        },
        {
          name: 'Филиал Ени Хаят',
          address: 'Yeni Həyat Plaza, г. Баку, Сабаильский р-н, ул. Зарифы Алиевой, 55'
        }
      ]
    },
    en: {
      title: 'Our Branches',
      subtitle: 'Choose the branch closest to you',
      hours: 'Working Hours',
      whatsapp: 'Write on WhatsApp',
      branches: [
        {
          name: 'Tarqovi Branch',
          address: 'Lev Tolstoy 131, near CUM, Baku, Azerbaijan'
        },
        {
          name: 'Yeni Heyat Plaza Branch',
          address: 'Yeni Həyat Plaza, Baku city, Sabail district, Zarifa Aliyeva str., 55'
        }
      ]
    }
  };

  const t = translations[language];

  const branches = [
    {
      image: '/image/DSC00727.jpg',
      phone: '+994706770677',
      email: 'thaitherapy.baku@gmail.com',
      hours: '11:00 - 21:00'
    },
    {
      image: '/image/IMG_9356.jpg',
      phone: '+994707370677',
      email: 'thaitherapy.baku@gmail.com',
      hours: '11:00 - 21:00'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="branches" ref={sectionRef} className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-bold text-emerald-950 text-center mb-4 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {t.title}
          <div className="w-20 h-1 bg-[#C1B185] mx-auto mt-4" />
        </h2>
        <p className={`text-xl text-gray-600 text-center mb-16 transition-all duration-800 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {t.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {branches.map((branch, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 0.3}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${branch.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-[#C1B185]">
                    {t.branches[index].name}
                  </h3>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-emerald-800 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-gray-700 font-medium">{t.branches[index].address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-emerald-800 flex-shrink-0" size={24} />
                  <a 
                    href={`tel:${branch.phone}`}
                    className="text-gray-700 font-medium hover:text-emerald-800 transition-colors"
                  >
                    {branch.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-emerald-800 flex-shrink-0" size={24} />
                  <a 
                    href={`mailto:${branch.email}`}
                    className="text-gray-700 font-medium hover:text-emerald-800 transition-colors"
                  >
                    {branch.email}
                  </a>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm mb-2">{t.hours}</p>
                  <p className="text-emerald-800 font-bold text-lg">{branch.hours}</p>
                </div>

                <button
                  onClick={() => window.open(`https://wa.me/${branch.phone.replace(/\s/g, '')}`, '_blank')}
                  className="w-full mt-6 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  {t.whatsapp}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const language = useSelector((state) => state.language.current);
  const [showModal, setShowModal] = useState(false);

  const t = {
    az: { 
      title: 'Özünüzü Yaxşı Hiss Etmək Vaxtıdır', 
      subtitle: 'Bu gün bizə qoşulun və fərqi hiss edin', 
      button: 'WhatsApp', 
      modalTitle: 'Filial Seçin', 
      close: 'Bağla',
      branches: [
        { name: 'Tarqovıy filialı', address: 'CUM yaxınlığı' },
        { name: 'Yeni Həyat', address: 'Yeni Həyat yaşayış kompleksi' }
      ]
    },
    ru: { 
      title: 'Время чувствовать себя хорошо', 
      subtitle: 'Присоединяйтесь к нам сегодня и почувствуйте разницу', 
      button: 'WhatsApp', 
      modalTitle: 'Выберите филиал', 
      close: 'Закрыть',
      branches: [
        { name: 'Филиал на Торговой', address: 'Рядом с ЦУМ' },
        { name: 'Ени Хаят', address: 'Ени Хаят' }
      ]
    },
    en: { 
      title: 'Time to Feel Good', 
      subtitle: 'Join us today and feel the difference', 
      button: 'WhatsApp', 
      modalTitle: 'Choose Branch', 
      close: 'Close',
      branches: [
        { name: 'Tarqovi Branch', address: 'Near CUM Shopping Center' },
        { name: 'Yeni Hayat', address: 'Yeni Hayat Plaza' }
      ]
    }
  }[language];

  const branchesWithPhone = [
    { phone: '+994706770677' },
    { phone: '+994707370677' }
  ];

  const handleWhatsAppClick = (phone) => {
    window.open(`https://wa.me/${phone}`, '_blank');
    setShowModal(false);
  };

  return (
    <>
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-950 to-emerald-900 text-center">
        <h2 className="text-4xl font-bold text-[#C1B185] mb-6">{t.title}</h2>
        <p className="text-xl text-gray-200 mb-8">{t.subtitle}</p>
        <button onClick={() => setShowModal(true)} className="inline-block px-12 py-4 bg-[#C1B185] text-emerald-950 rounded-full text-xl font-bold cursor-pointer hover:bg-amber-400 transition-all">{t.button}</button>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-emerald-950 rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#C1B185]">{t.modalTitle}</h3>
            </div>
            <div className="space-y-3">
              {t.branches.map((branch, index) => (
                <button key={index} onClick={() => handleWhatsAppClick(branchesWithPhone[index].phone)} className="w-full bg-white/10 border border-amber-400/30 rounded-xl p-4 hover:bg-white/20 transition-all">
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-[#C1B185] mb-1">{branch.name}</h4>
                    <p className="text-sm text-gray-300">{branch.address}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 w-full cursor-pointer py-2 text-[#C1B185] hover:text-amber-300">{t.close}</button>
          </div>
        </div>
      )}
    </>
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

export default function ThaiHealthTherapy() {
  
  return (
    <div className="bg-gray-50">
      <style jsx global>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInScale { animation: fadeInScale 1s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .shadow-text { text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); }
      `}</style>

      <Navigation />
      <HeroSection />
      <AboutSection />
      <CarouselSection />
      <InfoSection />
      <BranchesSection />
      <CTASection />
      <Footer />
    </div>
  );
}