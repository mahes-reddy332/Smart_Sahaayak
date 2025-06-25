import React, { useState } from 'react';
import { 
  Sparkles, TrendingUp, Shield, Zap, Star, Award, Users, Globe, 
  Package, ShoppingCart, Receipt, Bell, BarChart3, Crown, 
  CheckCircle, ArrowRight, Play, Download, Smartphone, 
  Target, DollarSign, Clock, Heart, Coffee, Lightbulb
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  language: 'en' | 'hi';
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, language }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Package,
      title: language === 'en' ? 'Smart Inventory' : 'स्मार्ट इन्वेंटरी',
      description: language === 'en' 
        ? 'Track stock levels, get low-stock alerts, and never run out of popular items'
        : 'स्टॉक लेवल ट्रैक करें, कम स्टॉक अलर्ट पाएं, और लोकप्रिय आइटम कभी खत्म न होने दें',
      colors: {
        gradient: 'from-emerald-500 to-teal-600',
        hoverBg: 'hover:from-emerald-50 hover:to-teal-50',
        hoverBorder: 'hover:border-emerald-300',
        titleHover: 'group-hover:text-emerald-700',
        descHover: 'group-hover:text-emerald-600',
        indicator: 'group-hover:bg-emerald-500'
      }
    },
    {
      icon: ShoppingCart,
      title: language === 'en' ? 'Quick Sales' : 'त्वरित बिक्री',
      description: language === 'en'
        ? 'Record sales in seconds, auto-calculate profits, and generate instant receipts'
        : 'सेकंडों में बिक्री रिकॉर्ड करें, ऑटो-कैलकुलेट प्रॉफिट, और तुरंत रसीद जेनरेट करें',
      colors: {
        gradient: 'from-violet-500 to-purple-600',
        hoverBg: 'hover:from-violet-50 hover:to-purple-50',
        hoverBorder: 'hover:border-violet-300',
        titleHover: 'group-hover:text-violet-700',
        descHover: 'group-hover:text-violet-600',
        indicator: 'group-hover:bg-violet-500'
      }
    },
    {
      icon: BarChart3,
      title: language === 'en' ? 'Business Analytics' : 'व्यापार विश्लेषण',
      description: language === 'en'
        ? 'Get insights on profit trends, top products, and smart suggestions to grow'
        : 'प्रॉफिट ट्रेंड, टॉप प्रोडक्ट्स, और बढ़ने के लिए स्मार्ट सुझाव पाएं',
      colors: {
        gradient: 'from-rose-500 to-pink-600',
        hoverBg: 'hover:from-rose-50 hover:to-pink-50',
        hoverBorder: 'hover:border-rose-300',
        titleHover: 'group-hover:text-rose-700',
        descHover: 'group-hover:text-rose-600',
        indicator: 'group-hover:bg-rose-500'
      }
    },
    {
      icon: Users,
      title: language === 'en' ? 'Contact Management' : 'संपर्क प्रबंधन',
      description: language === 'en'
        ? 'Manage suppliers and customers with WhatsApp integration for easy communication'
        : 'आसान संचार के लिए WhatsApp इंटीग्रेशन के साथ सप्लायर और कस्टमर मैनेज करें',
      colors: {
        gradient: 'from-amber-500 to-orange-600',
        hoverBg: 'hover:from-amber-50 hover:to-orange-50',
        hoverBorder: 'hover:border-amber-300',
        titleHover: 'group-hover:text-amber-700',
        descHover: 'group-hover:text-amber-600',
        indicator: 'group-hover:bg-amber-500'
      }
    }
  ];

  const testimonials = [
    {
      name: 'राजेश शर्मा • Rajesh Sharma',
      business: language === 'en' ? 'Grocery Store Owner, Delhi' : 'किराना दुकान मालिक, दिल्ली',
      quote: language === 'en' 
        ? '"My profit increased by 35% in just 2 months! The smart suggestions helped me optimize pricing."'
        : '"सिर्फ 2 महीने में मेरा मुनाफा 35% बढ़ गया! स्मार्ट सुझावों ने मुझे प्राइसिंग ऑप्टिमाइज़ करने में मदद की।"',
      rating: 5,
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'प्रिया गुप्ता • Priya Gupta',
      business: language === 'en' ? 'General Store Owner, Mumbai' : 'जनरल स्टोर मालिक, मुंबई',
      quote: language === 'en'
        ? '"Finally, a digital solution made for Indian shopkeepers! Easy to use and saves so much time."'
        : '"आखिरकार, भारतीय दुकानदारों के लिए बना डिजिटल समाधान! उपयोग में आसान और बहुत समय बचाता है।"',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'अमित पटेल • Amit Patel',
      business: language === 'en' ? 'Electronics Shop, Ahmedabad' : 'इलेक्ट्रॉनिक्स शॉप, अहमदाबाद',
      quote: language === 'en'
        ? '"The analytics dashboard shows me exactly which products are most profitable. Game changer!"'
        : '"एनालिटिक्स डैशबोर्ड मुझे दिखाता है कि कौन से प्रोडक्ट्स सबसे ज्यादा लाभदायक हैं। गेम चेंजर!"',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '10,000+', label: language === 'en' ? 'Happy Merchants' : 'खुश व्यापारी' },
    { number: '₹50L+', label: language === 'en' ? 'Revenue Tracked' : 'आय ट्रैक की गई' },
    { number: '35%', label: language === 'en' ? 'Avg Profit Increase' : 'औसत लाभ वृद्धि' },
    { number: '99.9%', label: language === 'en' ? 'Uptime' : 'अपटाइम' }
  ];

  const techStack = [
    { name: 'Bolt.new', description: 'AI-Powered Development', color: 'from-blue-500 to-purple-600' },
    { name: 'Supabase', description: 'Database & Auth', color: 'from-green-500 to-teal-600' },
    { name: 'RevenueCat', description: 'Subscription Management', color: 'from-orange-500 to-red-600' },
    { name: 'Netlify', description: 'Global Deployment', color: 'from-cyan-500 to-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-saffron via-orange-500 to-green-india">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32 animate-bounce-gentle"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-300 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm animate-pulse-glow">
                  <Sparkles className="h-10 w-10" />
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold">SmartSahaayak</h1>
                  <p className="text-xl text-orange-100 font-medium">
                    {language === 'en' ? 'Your Digital Business Partner' : 'आपका डिजिटल व्यापार साथी'}
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {language === 'en' 
                  ? 'Transform Your Local Business Into a Digital Powerhouse'
                  : 'अपने स्थानीय व्यापार को डिजिटल पावरहाउस में बदलें'
                }
              </h2>
              
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                {language === 'en'
                  ? 'Join 10,000+ Indian shopkeepers who increased their profits by 35% using our smart business management tools.'
                  : '10,000+ भारतीय दुकानदारों के साथ जुड़ें जिन्होंने हमारे स्मार्ट बिजनेस मैनेजमेंट टूल्स का उपयोग करके अपना मुनाफा 35% बढ़ाया।'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={onGetStarted}
                  className="bg-white text-saffron px-8 py-4 rounded-2xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <span>{language === 'en' ? 'Start Free Today' : 'आज मुफ्त शुरू करें'}</span>
                  <ArrowRight className="h-6 w-6" />
                </button>
                
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-saffron focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold">
                  <Play className="h-5 w-5" />
                  <span>{language === 'en' ? 'Watch Demo' : 'डेमो देखें'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 text-orange-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{language === 'en' ? 'Free Forever Plan' : 'हमेशा मुफ्त प्लान'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{language === 'en' ? 'No Credit Card' : 'कोई क्रेडिट कार्ड नहीं'}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-yellow-200 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <img 
                  src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Modern Indian Shop"
                  className="relative w-full h-96 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl font-bold">आपकी डिजिटल दुकान</p>
                  <p className="text-lg opacity-90">Your Digital Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-saffron mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SmartSahaayak Section - Enhanced with Attractive Colors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Why SmartSahaayak?' : 'SmartSahaayak क्यों?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Built specifically for Indian shopkeepers, by understanding real challenges faced by local businesses'
                : 'स्थानीय व्यापारों की वास्तविक चुनौतियों को समझकर, विशेष रूप से भारतीय दुकानदारों के लिए बनाया गया'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-2 shadow-lg ${
                  activeFeature === index 
                    ? 'bg-gradient-to-br from-saffron to-green-india text-white shadow-2xl border-transparent' 
                    : `bg-white ${feature.colors.hoverBg} hover:shadow-2xl border-gray-100 ${feature.colors.hoverBorder}`
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`p-4 rounded-2xl mb-6 transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-white bg-opacity-20 shadow-lg' 
                    : `bg-gradient-to-br ${feature.colors.gradient} text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110`
                }`}>
                  <feature.icon className={`h-8 w-8 transition-all duration-300 ${
                    activeFeature === index ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <h3 className={`text-xl font-bold mb-4 transition-all duration-300 ${
                  activeFeature === index ? 'text-white' : `text-gray-900 ${feature.colors.titleHover}`
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed transition-all duration-300 ${
                  activeFeature === index 
                    ? 'text-orange-100' 
                    : `text-gray-600 ${feature.colors.descHover}`
                }`}>
                  {feature.description}
                </p>
                
                {/* Enhanced hover indicator with feature-specific colors */}
                <div className={`mt-6 w-12 h-1 rounded-full transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-white bg-opacity-50' 
                    : `bg-transparent ${feature.colors.indicator}`
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'How SmartSahaayak Helps You Grow' : 'SmartSahaayak आपको कैसे बढ़ने में मदद करता है'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Increase Profits by 35%' : '35% तक मुनाफा बढ़ाएं'}
              </h3>
              <p className="text-gray-600 text-lg">
                {language === 'en'
                  ? 'Smart pricing suggestions and profit analysis help you optimize margins and boost earnings'
                  : 'स्मार्ट प्राइसिंग सुझाव और प्रॉफिट एनालिसिस आपको मार्जिन ऑप्टिमाइज़ करने और कमाई बढ़ाने में मदद करते हैं'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Save 5+ Hours Weekly' : 'साप्ताहिक 5+ घंटे बचाएं'}
              </h3>
              <p className="text-gray-600 text-lg">
                {language === 'en'
                  ? 'Automated inventory tracking, quick sales logging, and instant bill generation save precious time'
                  : 'ऑटोमेटेड इन्वेंटरी ट्रैकिंग, क्विक सेल्स लॉगिंग, और इंस्टेंट बिल जेनरेशन कीमती समय बचाते हैं'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Make Data-Driven Decisions' : 'डेटा-ड्रिवन निर्णय लें'}
              </h3>
              <p className="text-gray-600 text-lg">
                {language === 'en'
                  ? 'Detailed analytics and insights help you understand what sells best and when to restock'
                  : 'विस्तृत एनालिटिक्स और इनसाइट्स आपको समझने में मदद करते हैं कि क्या सबसे अच्छा बिकता है और कब रीस्टॉक करना है'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' ? 'Loved by 10,000+ Shopkeepers' : '10,000+ दुकानदारों का भरोसा'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? 'See how SmartSahaayak is transforming businesses across India'
                : 'देखें कि SmartSahaayak कैसे पूरे भारत में व्यापारों को बदल रहा है'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-lg mb-6 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? 'Built with Modern Technology' : 'आधुनिक तकनीक के साथ निर्मित'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Powered by industry-leading platforms for reliability, security, and scalability'
                : 'विश्वसनीयता, सुरक्षा और स्केलेबिलिटी के लिए उद्योग-अग्रणी प्लेटफॉर्म द्वारा संचालित'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${tech.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">{tech.name[0]}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-2xl">
              <Heart className="h-5 w-5 text-red-400" />
              <span className="text-lg">
                {language === 'en' ? 'Built with' : 'के साथ बनाया गया'} 
                <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:text-blue-300 mx-1">
                  Bolt.new
                </a>
                {language === 'en' ? 'AI Technology' : 'AI तकनीक'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-saffron via-orange-500 to-green-india">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' 
                ? 'Ready to Transform Your Business?'
                : 'अपने व्यापार को बदलने के लिए तैयार हैं?'
              }
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Join thousands of successful shopkeepers who are already growing with SmartSahaayak'
                : 'हजारों सफल दुकानदारों के साथ जुड़ें जो पहले से ही SmartSahaayak के साथ बढ़ रहे हैं'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={onGetStarted}
                className="bg-white text-saffron px-8 py-4 rounded-2xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-300 flex items-center space-x-3 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Sparkles className="h-6 w-6" />
                <span>{language === 'en' ? 'Start Free Today' : 'आज मुफ्त शुरू करें'}</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-orange-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>{language === 'en' ? 'Free Forever Plan Available' : 'हमेशा मुफ्त प्लान उपलब्ध'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>{language === 'en' ? 'Setup in 2 Minutes' : '2 मिनट में सेटअप'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>{language === 'en' ? '24/7 Support' : '24/7 सहायता'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-saffron to-green-india rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">SmartSahaayak</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                {language === 'en'
                  ? 'Empowering Indian shopkeepers with smart digital tools to grow their business and increase profits.'
                  : 'भारतीय दुकानदारों को अपने व्यापार को बढ़ाने और मुनाफा बढ़ाने के लिए स्मार्ट डिजिटल टूल्स के साथ सशक्त बनाना।'
                }
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="h-4 w-4 text-red-400" />
                <span>
                  {language === 'en' ? 'Made with love in India using' : 'भारत में प्यार से बनाया गया'}
                </span>
                <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Bolt.new
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {language === 'en' ? 'Product' : 'उत्पाद'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {language === 'en' ? 'Support' : 'सहायता'}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@smartsahaayak.com" className="hover:text-white transition-colors">Email Support</a></li>
                <li><a href="https://wa.me/919876543210" className="hover:text-white transition-colors">WhatsApp Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartSahaayak. {language === 'en' ? 'All rights reserved.' : 'सभी अधिकार सुरक्षित।'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;