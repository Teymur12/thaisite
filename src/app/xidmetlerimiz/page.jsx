'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../lib/features/languageSlice';
import { ArrowLeft, Clock, DollarSign, Menu, X, MapPin, Phone, Instagram, Mail } from 'lucide-react';

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

  const languages = [{ code: 'az', name: 'Azərbaycanca' }, { code: 'ru', name: 'Русский' }, { code: 'en', name: 'English' }];
  const navItems = translations[language].nav;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#002F1E] backdrop-blur-lg shadow-lg' : 'bg-emerald-950/95'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <ThaiLogoImg className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover pointer-events-none select-none" draggable="false" />
            <div className="text-base sm:text-xl md:text-2xl font-[var(--font-cormorant)] text-[#C1B185] tracking-wider select-none">THAI HEALTH THERAPY</div>
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

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#C1B185] p-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-3 space-y-2 pb-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setIsOpen(false)} className="block text-[#C1B185] text-sm hover:text-amber-300 transition-colors py-1.5">{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-amber-400/30">
              <div className="flex gap-2 justify-center flex-wrap">
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => { handleLanguageChange(lang.code); setIsOpen(false); }} className={`px-2.5 py-1 rounded-full transition-all text-xs ${language === lang.code ? 'bg-amber-400 text-emerald-950 font-bold' : 'bg-amber-400/20 text-[#C1B185] hover:bg-amber-400/30'}`}>
                    {lang.code.toUpperCase()}
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

const ServicesPage = () => {
  const language = useSelector((state) => state.language.current);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    console.log(serviceId);
    
    if (serviceId) {
      setSelectedService(parseInt(serviceId));
    }
  }, []);
  
  const translations = {
    az: {
      title: 'Xidmətlərimiz',
      subtitle: 'Sizin üçün ən uyğun masaj növünü seçin',
      back: 'Geri',
      pricing: 'Qiymətlər',
      minute: 'dəqiqə',
      bookNow: 'Rezervasiya Et',
      viewDetails: 'Ətraflı Bax',
      services: {
        1: {
          name: 'Aroma Relax',
          short: 'Aromatik yağlarla rahatlaşdırıcı və sakitləşdirici masaj',
          long: 'Aroma Relax masajı, təbii aromatik yağların rahatlıq verici təsiri ilə bədən və ruhun tam harmoniyasını təmin edir. Bu masaj növü, gündəlik stressdən uzaqlaşmaq, əzələ gərginliyini azaltmaq və dərin relaksasiyaya qərq olmaq istəyənlər üçün idealdır. Xüsusi seçilmiş efir yağları ilə həyata keçirilən yumşaq hərəkətlər, bədəni sakitləşdirir və əhval-ruhiyyəni yüksəldir.'
        },
        2: {
          name: 'Thai Relax',
          short: 'Ənənəvi Thai texnikası ilə rahatlaşdırıcı masaj',
          long: 'Thai Relax masajı, Tailandın ənənəvi masaj texnikalarının daha yumşaq və rahatlaşdırıcı formasıdır. Bu masaj, akupressur nöqtələrinə təsir, yumşaq dartılma hərəkətləri və bədənin enerji xətləri boyunca işləməyi birləşdirir. Thai Relax, fiziki gərginliyi azaldır, çevikliyi artırır və ümumi sağlamlıq hissini gücləndirir.'
        },
        3: {
          name: 'Deep Tissue',
          short: 'Dərin toxuma masajı ilə xroniki gərginliyin aradan qaldırılması',
          long: 'Deep Tissue masajı, əzələlərin dərin təbəqələrinə təsir edən intensiv bir masaj texnikasıdır. Bu metod, xroniki əzələ gərginliyi, spazmlar və ağrıları aradan qaldırmaq üçün güclü təzyiq tətbiq edir. İdmançılar, fiziki iş görənlər və xroniki ağrılardan əziyyət çəkənlər üçün xüsusilə faydalıdır.'
        },
        4: {
          name: 'Aroma Deep',
          short: 'Aromaterapiya və dərin toxuma masajının birləşməsi',
          long: 'Aroma Deep, aromatik yağların müalicəvi xüsusiyyətlərini dərin toxuma masajı ilə birləşdirən güclü bir terapiyadır. Bu masaj növü, həm əzələlərin dərin təbəqələrinə təsir edir, həm də aromaterapiyanın emosional və psixoloji faydalarını təmin edir.'
        },
        5: {
          name: 'Skrab ilə Masaj',
          short: 'Dəri təmizləyici skrab ilə masaj kombinasiyası',
          long: 'Skrab ilə masaj, təbii dəri təmizləyici skrab ilə başlayır və sonra rahatlaşdırıcı masaj ilə davam edir. Skrab proseduru ölü dəri hüceyrələrini təmizləyir, dərini yeniləyir və parlaq görünüş verir. Bu prosedur, dərinin toxunuşunu yaxşılaşdırır və bədənə təravət hissi verir.'
        },
        6: {
          name: 'Ayaq Masajı',
          short: 'Ayaq refleksologiyası və sağlamlıq masajı',
          long: 'Ayaq masajı, qədim refleksologiya prinsiplərinə əsaslanan xüsusi bir terapiyadır. Ayaq tabanında yerləşən refleks nöqtələrə təzyiq tətbiq edərək bütün bədənə müsbət təsir göstərir. Bu masaj, qan dövranını yaxşılaşdırır, orqanların funksiyasını dəstəkləyir və yorğunluğu aradan qaldırır.'
        },
        7: {
          name: 'Thai Bitki Torbaları',
          short: 'Qızdırılmış bitki torbaları ilə ənənəvi Thai müalicəsi',
          long: 'Thai Bitki Torbaları masajı, tibbi bitkilərlə doldurulmuş və qızdırılmış xüsusi torbalardan istifadə edən qədim Thai müalicə metodudur. Zəncəfil, limon otu və digər bitkilərin təbii aromatları dəriyə nüfuz edir. Bu terapiya, əzələ ağrılarını azaldır və iltihab proseslərini yatırır.'
        },
        8: {
          name: 'Baş və Çiyin Masajı',
          short: 'Yuxarı bədən nahiyəsində gərginliyin aradan qaldırılması',
          long: 'Baş və Çiyin masajı, baş, boyun və çiyin nahiyəsində toplanan gərginliyi aradan qaldırmaq üçün nəzərdə tutulmuş məqsədyönlü masajdır. Uzun müddət kompüter qarşısında işləyənlər üçün ideal seçimdir. Masaj, baş ağrısını azaldır və yuxu keyfiyyətini yaxşılaşdırır.'
        },
        9: {
          name: 'Üz Masajı',
          short: 'Üz dərisinin cavanlaşdırılması və qidalandırılması',
          long: 'Üz masajı, üz dərisinin gözəlliyi və sağlamlığı üçün xüsusi hazırlanmış bir prosedurdur. Yumşaq masaj hərəkətləri, üz əzələlərini tonizə edir, qan dövranını artırır və dərini cavanlaşdırır. Bu masaj, qırışıqları azaldır və üzə təravət görünüş verir.'
        },
        10: {
          name: 'Kokos Yağı ilə Baş Masajı',
          short: 'Təbii kokos yağı ilə baş dərisinin qidalandırılması',
          long: 'Kokos yağı ilə baş masajı, təbii kokos yağının qidalandırıcı xüsusiyyətlərindən istifadə edən xüsusi bir terapiyadır. Bu masaj, baş dərisini sağlamlaşdırır, saç kökünü gücləndirir və saç tökülməsinin qarşısını alır.'
        },
        11: {
          name: 'Yuxarı Bədən Masajı',
          short: 'Kürək, çiyin və boyun nahiyəsinin masajı',
          long: 'Yuxarı bədən masajı, kürək, çiyin, boyun və qol nahiyələrinə fokuslanmış məqsədyönlü bir terapiyadır. Ofis işçiləri və kompüter istifadəçiləri üçün ideal seçimdir. Masaj, postural problemləri yaxşılaşdırır və əzələ spazmlarını aradan qaldırır.'
        },
        12: {
          name: '4 Əllə Aroma Yağ Masajı',
          short: 'Dörd əllə sinxron aromatik yağ masajı',
          long: '4 Əllə Aroma Yağ Masajı, iki terapevtin sinxron şəkildə həyata keçirdiyi unikal və lüks bir terapiya təcrübəsidir. Bu masaj növü, adi masajdan iki dəfə intensiv təsir yaradır və bədəni tam relaksasiyaya qərq edir.'
        },
        13: {
          name: 'Hot Stone Masajı',
          short: 'Qızdırılmış bazalt daşları ilə dərin müalicə',
          long: 'Hot Stone masajı, qızdırılmış bazalt daşlarından istifadə edən xüsusi bir terapiya texnikasıdır. Daşlar bədənin müəyyən nöqtələrinə yerləşdirilir. İsti, əzələlərə dərin nüfuz edərək gərginliyi azaldır və qan dövranını stimullaşdırır.'
        },
        14: {
          name: 'Anti-Selülit Masajı',
          short: 'Selülitin görünüşünü azaldan xüsusi masaj',
          long: 'Anti-Selülit masajı, dərialtı piy toxumasını parçalayan və selülitin görünüşünü azaldan intensiv bir terapiyadır. Bu masaj, xüsusi texnikalar və güclü təzyiq ilə həyata keçirilir. Qan və limfa dövranını artırır və dərinin toxunuşunu yaxşılaşdırır.'
        }
      }
    },
    ru: {
      title: 'Наши услуги',
      subtitle: 'Выберите подходящий вид массажа',
      back: 'Назад',
      pricing: 'Цены',
      minute: 'минут',
      bookNow: 'Забронировать',
      viewDetails: 'Подробнее',
      services: {
        1: {
          name: 'Aroma Relax',
          short: 'Расслабляющий массаж с ароматическими маслами',
          long: 'Массаж Aroma Relax обеспечивает полную гармонию тела и духа благодаря расслабляющему действию натуральных ароматических масел. Этот вид массажа идеален для тех, кто хочет избавиться от ежедневного стресса и погрузиться в глубокую релаксацию.'
        },
        2: {
          name: 'Thai Relax',
          short: 'Расслабляющий массаж традиционной тайской техникой',
          long: 'Thai Relax - это более мягкая форма традиционных тайских массажных техник. Этот массаж сочетает воздействие на акупрессурные точки и мягкие растягивающие движения. Thai Relax снижает физическое напряжение и увеличивает гибкость.'
        },
        3: {
          name: 'Deep Tissue',
          short: 'Массаж глубоких тканей для устранения напряжения',
          long: 'Массаж Deep Tissue - это интенсивная техника, воздействующая на глубокие слои мышц. Этот метод применяет сильное давление для устранения хронического мышечного напряжения и болей. Особенно полезен для спортсменов.'
        },
        4: {
          name: 'Aroma Deep',
          short: 'Сочетание ароматерапии и массажа глубоких тканей',
          long: 'Aroma Deep - это мощная терапия, сочетающая лечебные свойства ароматических масел с массажем глубоких тканей. Идеальный выбор для борьбы с хроническим напряжением и стрессом.'
        },
        5: {
          name: 'Массаж со скрабом',
          short: 'Комбинация очищающего скраба и массажа',
          long: 'Массаж со скрабом начинается с натурального скраба кожи, затем продолжается расслабляющим массажем. Процедура очищает мертвые клетки кожи и придает ей сияющий вид.'
        },
        6: {
          name: 'Массаж ног',
          short: 'Рефлексология ног и оздоровительный массаж',
          long: 'Массаж ног - это специальная терапия, основанная на древних принципах рефлексологии. Воздействуя на рефлекторные точки стопы, оказывает положительное влияние на все тело.'
        },
        7: {
          name: 'Тайские травяные мешочки',
          short: 'Традиционное лечение нагретыми травяными мешочками',
          long: 'Массаж с тайскими травяными мешочками - это древний лечебный метод, использующий специальные мешочки с лечебными травами. Эта терапия уменьшает мышечные боли и снимает воспаление.'
        },
        8: {
          name: 'Массаж головы и плеч',
          short: 'Устранение напряжения в верхней части тела',
          long: 'Массаж головы и плеч предназначен для устранения напряжения в области головы, шеи и плеч. Идеальный выбор для тех, кто долго работает за компьютером. Массаж уменьшает головные боли и улучшает сон.'
        },
        9: {
          name: 'Массаж лица',
          short: 'Омоложение и питание кожи лица',
          long: 'Массаж лица - это специальная процедура для красоты и здоровья кожи. Мягкие массажные движения тонизируют мышцы лица и омолаживают кожу. Этот массаж уменьшает морщины и придает лицу свежий вид.'
        },
        10: {
          name: 'Массаж головы с кокосовым маслом',
          short: 'Питание кожи головы натуральным кокосовым маслом',
          long: 'Массаж головы с кокосовым маслом использует питательные свойства натурального кокосового масла. Этот массаж оздоравливает кожу головы, укрепляет корни волос и предотвращает выпадение.'
        },
        11: {
          name: 'Массаж верхней части тела',
          short: 'Массаж области спины, плеч и шеи',
          long: 'Массаж верхней части тела - это целенаправленная терапия, сфокусированная на области спины, плеч и шеи. Идеальный выбор для офисных работников. Массаж улучшает осанку и устраняет спазмы.'
        },
        12: {
          name: 'Массаж 4 руками с аромамаслами',
          short: 'Синхронный массаж четырьмя руками',
          long: 'Массаж 4 руками - это уникальный опыт, выполняемый двумя терапевтами синхронно. Этот вид массажа создает более интенсивное воздействие и погружает тело в полную релаксацию.'
        },
        13: {
          name: 'Массаж горячими камнями',
          short: 'Глубокое лечение с нагретыми базальтовыми камнями',
          long: 'Массаж горячими камнями использует нагретые базальтовые камни. Тепло глубоко проникает в мышцы, снимая напряжение и стимулируя кровообращение. Массаж облегчает хронические боли.'
        },
        14: {
          name: 'Антицеллюлитный массаж',
          short: 'Специальный массаж против целлюлита',
          long: 'Антицеллюлитный массаж - это интенсивная терапия, уменьшающая проявление целлюлита. Массаж выполняется специальными техниками и сильным давлением. Усиливает кровообращение и улучшает текстуру кожи.'
        }
      }
    },
    en: {
      title: 'Our Services',
      subtitle: 'Choose the most suitable massage type for you',
      back: 'Back',
      pricing: 'Pricing',
      minute: 'minutes',
      bookNow: 'Book Now',
      viewDetails: 'View Details',
      services: {
        1: {
          name: 'Aroma Relax',
          short: 'Relaxing massage with aromatic oils',
          long: 'Aroma Relax massage provides complete harmony of body and spirit through the soothing effect of natural aromatic oils. This type of massage is ideal for those who want to escape daily stress and immerse themselves in deep relaxation.'
        },
        2: {
          name: 'Thai Relax',
          short: 'Relaxing massage with traditional Thai technique',
          long: 'Thai Relax is a softer form of traditional Thai massage techniques. This massage combines acupressure point work and gentle stretching movements. Thai Relax reduces physical tension and increases flexibility.'
        },
        3: {
          name: 'Deep Tissue',
          short: 'Deep tissue massage to eliminate chronic tension',
          long: 'Deep Tissue massage is an intensive technique that affects deep muscle layers. This method applies strong pressure to eliminate chronic muscle tension and pain. Particularly beneficial for athletes and physical workers.'
        },
        4: {
          name: 'Aroma Deep',
          short: 'Combination of aromatherapy and deep tissue massage',
          long: 'Aroma Deep is a powerful therapy combining healing properties of aromatic oils with deep tissue massage. An ideal choice for combating chronic tension and stress.'
        },
        5: {
          name: 'Massage with Scrub',
          short: 'Combination of skin cleansing scrub and massage',
          long: 'Massage with Scrub starts with a natural skin cleansing scrub and continues with relaxing massage. The procedure cleanses dead skin cells and gives skin a radiant appearance.'
        },
        6: {
          name: 'Foot Massage',
          short: 'Foot reflexology and wellness massage',
          long: 'Foot massage is a special therapy based on ancient reflexology principles. By applying pressure to reflex points on the foot, it has a positive effect on the entire body.'
        },
        7: {
          name: 'Thai Herbal Bags',
          short: 'Traditional Thai treatment with heated herbal bags',
          long: 'Thai Herbal Bags massage is an ancient healing method using special bags filled with medicinal herbs. This therapy reduces muscle pain and relieves inflammatory processes.'
        },
        8: {
          name: 'Head & Shoulders Massage',
          short: 'Tension relief in the upper body area',
          long: 'Head and Shoulders massage is designed to eliminate tension in the head, neck, and shoulder area. Ideal for those who work at computers. The massage reduces headaches and improves sleep.'
        },
        9: {
          name: 'Facial Massage',
          short: 'Rejuvenation and nourishment of facial skin',
          long: 'Facial massage is a specially designed procedure for facial skin beauty and health. Gentle movements tone facial muscles and rejuvenate skin. This massage reduces wrinkles and gives face a fresh look.'
        },
        10: {
          name: 'Head Massage with Coconut Oil',
          short: 'Scalp nourishment with natural coconut oil',
          long: 'Head massage with coconut oil uses nourishing properties of natural coconut oil. This massage improves scalp health, strengthens hair roots, and prevents hair loss.'
        },
        11: {
          name: 'Upper Body Massage',
          short: 'Massage of back, shoulder, and neck area',
          long: 'Upper Body massage is a targeted therapy focused on back, shoulder, and neck areas. Ideal for office workers. The massage improves posture and eliminates muscle spasms.'
        },
        12: {
          name: '4 Hands Aroma Oil Massage',
          short: 'Synchronous four-hand massage with oils',
          long: '4 Hands Aroma Oil Massage is a unique experience performed by two therapists synchronously. This type of massage creates more intensive effect and immerses body in complete relaxation.'
        },
        13: {
          name: 'Hot Stone Massage',
          short: 'Deep treatment with heated basalt stones',
          long: 'Hot Stone massage uses heated basalt stones. Heat penetrates deep into muscles, relieving tension and stimulating blood circulation. The massage alleviates chronic pain.'
        },
        14: {
          name: 'Anti-Cellulite Massage',
          short: 'Special massage reducing cellulite appearance',
          long: 'Anti-Cellulite massage is intensive therapy that reduces cellulite appearance. The massage is performed with special techniques and strong pressure. It increases blood circulation and improves skin texture.'
        }
      }
    }
  };

  const t = translations[language];

  const services = [
    {
      id: 1,
      image: '/image/DSC08704.jpg',
      pricing: [
        { duration: 60, price: 49 },
        { duration: 90, price: 67 },
        { duration: 120, price: 90 }
      ]
    },
    {
      id: 2,
      image: '/image/DSC01325.jpg',
      pricing: [
        { duration: 60, price: 49 },
        { duration: 90, price: 67 },
        { duration: 120, price: 90 }
      ]
    },
    {
      id: 3,
      image: '/image/deeptissue.jpeg',
      pricing: [
        { duration: 60, price: 49 },
        { duration: 90, price: 70 },
        { duration: 120, price: 95 }
      ]
    },
    {
      id: 4,
      image: '/image/aromadeep.jpeg',
      pricing: [
        { duration: 60, price: 49 },
        { duration: 90, price: 70 },
        { duration: 120, price: 95 }
      ]
    },
    {
      id: 5,
      image: '/image/scrubmassage.jpeg',
      pricing: [
        { duration: 60, price: 65 },
        { duration: 120, price: 130 }
      ]
    },
    {
      id: 6,
      image: '/image/DSC08711.jpg',
      pricing: [
        { duration: 30, price: 25 },
        { duration: 60, price: 50 }
      ]
    },
    {
      id: 7,
      image: '/image/DSC04585.jpg',
      pricing: [
        { duration: 90, price: 70 },
        { duration: 120, price: 140 }
      ]
    },
    {
      id: 8,
      image: '/image/DSC08741.jpg',
      pricing: [
        { duration: 45, price: 50 }
      ]
    },
    {
      id: 9,
      image: '/image/material.00_00_19_15.Still001.jpg',
      pricing: [
        { duration: 30, price: 30 },
        { duration: 60, price: 50 }
      ]
    },
    {
      id: 10,
      image: '/image/DSC08766.jpg',
      pricing: [
        { duration: 60, price: 60 }
      ]
    },
    {
      id: 11,
      image: '/image/DSC08732.jpg',
      pricing: [
        { duration: 60, price: 50 }
      ]
    },
    {
      id: 12,
      image: '/image/7.jpg',
      pricing: [
        { duration: 60, price: 90 },
        { duration: 90, price: 134 },
        { duration: 120, price: 180 }
      ]
    },
    {
      id: 13,
      image: '/image/DSC00727.jpg',
      pricing: [
        { duration: 90, price: 70 },
        { duration: 120, price: 95 }
      ]
    },
    {
      id: 14,
      image: '/image/IMG_9357.jpg',
      pricing: [
        { duration: 60, price: 69 }
      ]
    }
  ];

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    const serviceData = t.services[selectedService];
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="bg-emerald-950 text-white py-6 px-6 pt-28">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedService(null)}
              className="flex items-center gap-2 hover:text-[#C1B185] transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold cursor-pointer">{t.back}</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div 
              className="h-96 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-6">
                {serviceData.name}
              </h1>
              
              <div className="w-20 h-1 bg-[#C1B185] mb-8" />
              
              <p className="text-xl text-gray-700 leading-relaxed mb-12">
                {serviceData.long}
              </p>

              <button
                onClick={() => window.open('https://wa.me/994707370677', '_blank')}
                className="w-full px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-lg transition-all hover:scale-105"
              >
                {t.bookNow}
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-emerald-950 text-white py-16 px-6 relative overflow-hidden pt-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C1B185] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#C1B185]">
            {t.title}
          </h1>
          <div className="w-20 h-1 bg-[#C1B185] mx-auto mt-2 mb-6"></div>
          <p className="text-xl text-gray-200">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const serviceData = t.services[service.id];
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div 
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{t.viewDetails}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-emerald-950 mb-3 group-hover:text-amber-600 transition-colors">
                    {serviceData.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-2">
                    {serviceData.short}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
