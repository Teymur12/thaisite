'use client'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../lib/features/languageSlice';
import { Menu, X, Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Instagram, MessageCircle, Clock, Globe } from 'lucide-react';

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

const ContactHero = () => {
  const language = useSelector((state) => state.language.current);

  const translations = {
    az: {
      title: 'Bizimlə Əlaqə',
      subtitle: 'Sizin fikir və təklifləriniz bizim üçün çox vacibdir. Hər hansı sualınız varsa, bizimlə əlaqə saxlayın.',
      quickContact: 'Sürətli Əlaqə'
    },
    ru: {
      title: 'Свяжитесь с нами',
      subtitle: 'Ваши мнения и предложения очень важны для нас. Если у Вас есть вопросы, свяжитесь с нами.',
      quickContact: 'Быстрая связь'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Your opinions and suggestions are very important to us. If you have any questions, contact us.',
      quickContact: 'Quick Contact'
    }
  };

  const t = translations[language];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dr39lzcwq/video/upload/v1763318178/taimasaj30_nhl395.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgb(30,30,30)-950/60" />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-[#C1B185] mb-6 animate-fadeInUp">{t.title}</h1>
        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">{t.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/994706770677" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all hover:scale-105">
            <MessageCircle size={20} />
            WhatsApp
          </a>
          <a href="https://www.instagram.com/thaitherapy.baku?igsh=Mml1ZHZieGU1ZXJv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-semibold transition-all hover:scale-105">
            <Instagram size={20} />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const language = useSelector((state) => state.language.current);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    az: {
      formTitle: 'Mesaj Göndərin',
      formSubtitle: 'Şikayət, təklif və ya suallarınızı bizə yazın',
      name: 'Adınız',
      email: 'Email ünvanınız',
      phone: 'Telefon nömrəniz',
      branch: 'Filial seçin',
      branches: ['Tarqoviy filialı', 'Yeni Həyat Plaza'],
      message: 'Mesajınız',
      send: 'Göndər',
      sending: 'Göndərilir...',
      success: 'Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.',
      error: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'
    },
    ru: {
      formTitle: 'Отправить сообщение',
      formSubtitle: 'Напишите нам свои жалобы, предложения или вопросы',
      name: 'Ваше имя',
      email: 'Ваш email',
      phone: 'Ваш телефон',
      branch: 'Выберите филиал',
      branches: ['Филиал на Торговой', 'Филиал Ени Хаят'],
      message: 'Ваше сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      success: 'Ваше сообщение успешно отправлено! Мы свяжемся с Вами в ближайшее время.',
      error: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.'
    },
    en: {
      formTitle: 'Send Message',
      formSubtitle: 'Write us your complaints, suggestions or questions',
      name: 'Your name',
      email: 'Your email',
      phone: 'Your phone',
      branch: 'Choose branch',
      branches: ['Tarqoviy branch', 'Yeni Heyat Branch'],
      message: 'Your message',
      send: 'Send',
      sending: 'Sending...',
      success: 'Your message has been sent successfully! We will contact you soon.',
      error: 'An error occurred. Please try again.'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_55be9xc', 
          template_id: 'template_swpgwms', 
          user_id: 'JnBu3mTPNPdG4BwUT', 
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone,
            branch: formData.branch,
            message: formData.message,
            to_email: '	thaitherapy.baku@gmail.com'
          }
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: t.success });
        setFormData({ name: '', email: '', phone: '', branch: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setStatus({ type: 'error', message: t.error });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4">{t.formTitle}</h2>
          <div className="w-20 h-1 bg-[#C1B185] mx-auto mb-6" />
          <p className="text-xl text-gray-600">{t.formSubtitle}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-950 font-semibold mb-2">{t.name} *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-800 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-emerald-950 font-semibold mb-2">{t.email} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-emerald-950 font-semibold mb-2">{t.phone} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-800 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-emerald-950 font-semibold mb-2">{t.branch} *</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-800 focus:outline-none transition-colors"
                >
                  <option value="">{t.branch}</option>
                  {t.branches.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-emerald-950 font-semibold mb-2">{t.message} *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-800 focus:outline-none transition-colors resize-none"
              />
            </div>

            {status.message && (
              <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  {t.sending}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t.send}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const BranchCards = () => {
  const language = useSelector((state) => state.language.current);

  const translations = {
    az: {
      title: 'Filiallarımız',
      subtitle: 'Sizə ən yaxın filialımızı seçin və bizimlə əlaqə saxlayın',
      hours: 'İş Saatları',
      whatsapp: 'WhatsApp',
      call: 'Zəng Et',
      address: 'Ünvan',
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
      subtitle: 'Выберите ближайший к Вам филиал и свяжитесь с нами',
      hours: 'Рабочие часы',
      whatsapp: 'WhatsApp',
      call: 'Позвонить',
      address: 'Адрес',
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
      subtitle: 'Choose the branch closest to you and contact us',
      hours: 'Working Hours',
      whatsapp: 'WhatsApp',
      call: 'Call',
      address: 'Address',
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
      image: '/image/tarqovu.jpg',
      phone: '+994706770677',
      email: 'thaitherapy.baku@gmail.com',
      hours: '11:00 - 21:00'
    },
    {
      image: '/image/yenihayat.jpg',
      phone: '+994707370677',
      email: 'thaitherapy.baku@gmail.com',
      hours: '11:00 - 21:00'
    }
  ];

 return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-[#C1B185] mx-auto mb-6" />
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {branches.map((branch, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${branch.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-[#C1B185]">{t.branches[index].name}</h3>
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
                  <Clock className="text-emerald-800 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-600 text-sm">{t.hours}</p>
                    <p className="text-emerald-800 font-bold">{branch.hours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-emerald-800 flex-shrink-0" size={24} />
                  <a href={`mailto:${branch.email}`} className="text-gray-700 font-medium hover:text-emerald-800 transition-colors">
                    {branch.email}
                  </a>
                </div>

                <div className="pt-4 flex gap-3">
                  <a
                    href={`https://wa.me/${branch.phone.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    {t.whatsapp}
                  </a>
                  <a
                    href={`tel:${branch.phone}`}
                    className="flex-1 px-4 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    {t.call}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  const language = useSelector((state) => state.language.current);

  const translations = {
    az: {
      title: 'Xəritədə Bizi Tapın',
      subtitle: 'Bizə gəlmək çox asandır'
    },
    ru: {
      title: 'Найдите нас на карте',
      subtitle: 'До нас очень легко добраться'
    },
    en: {
      title: 'Find Us on Map',
      subtitle: 'It is very easy to reach us'
    }
  };

  const t = translations[language];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4">{t.title}</h2>
          <div className="w-20 h-1 bg-[#C1B185] mx-auto mb-6" />
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-xl h-96">
            <iframe
              src="https://www.google.com/maps?q=40.3722919,49.8336809&hl=az&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl h-96">
            <iframe
              src="https://www.google.com/maps?q=40.37778,49.85294&hl=az&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
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

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
      `}</style>

      <Navigation />
      <ContactHero />
      <ContactForm />
      <BranchCards />
      <MapSection />
      <Footer />
    </div>
  );
}
