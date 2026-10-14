import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Users,
  Award,
  Heart,
  TrendingUp,
  Shield,
  Building2,
  Globe,
  CheckCircle2,
  Star,
  Quote,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Rocket,
  Leaf,
  Handshake,
  Lightbulb,
  Trophy,
  ArrowRight,
  Sparkles,
  Zap,
  LineChart,
  Lock,
  Headphones,
  FileCheck,
  IndianRupee,
  Home,
} from 'lucide-react';

const About = () => {
  // ---------- DATA ----------
  const stats = [
    { value: '10,000+', label: 'Properties Listed', icon: Building2 },
    { value: '50,000+', label: 'Happy Customers', icon: Users },
    { value: '500+', label: 'Trusted Agents', icon: Award },
    { value: '25+', label: 'Cities Covered', icon: MapPin },
    { value: '₹5,000 Cr+', label: 'Property Value Sold', icon: IndianRupee },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      desc: 'Every listing is verified, every price is honest, and every deal is documented end-to-end.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      desc: 'From the first search to the final handshake, your satisfaction guides every decision.',
    },
    {
      icon: Target,
      title: 'Excellence',
      desc: 'We obsess over details — from pixel-perfect listings to seamless paperwork and handover.',
    },
    {
      icon: Users,
      title: 'Community',
      desc: 'Building stronger neighbourhoods by connecting the right people with the right homes.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      desc: 'AI-driven recommendations, smart search, and virtual tours make finding a home effortless.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      desc: 'We promote eco-friendly, energy-efficient homes and green building practices.',
    },
    {
      icon: Handshake,
      title: 'Integrity',
      desc: 'No hidden charges, no fake listings, no shortcuts. Just fair, ethical real estate.',
    },
    {
      icon: Zap,
      title: 'Speed',
      desc: 'Fast responses, quick site visits, and same-week closures when you are ready to move.',
    },
  ];

  const milestones = [
    { year: '2020', title: 'The Beginning', desc: 'EstateHub launched in Mumbai with 200 listings and 5 agents.' },
    { year: '2021', title: 'First 1,000 Customers', desc: 'Crossed 1,000 happy families and expanded to Pune & Bangalore.' },
    { year: '2022', title: 'Pan-India Expansion', desc: 'Now live in 15 cities with 3,000+ properties and dedicated support.' },
    { year: '2023', title: '₹1,000 Cr Milestone', desc: 'Properties worth over ₹1,000 crore transacted on the platform.' },
    { year: '2024', title: 'AI-Powered Search', desc: 'Launched smart recommendations, virtual tours, and instant site-visit booking.' },
    { year: '2025', title: '25+ Cities & Growing', desc: 'Serving 50,000+ customers with 500+ verified partner agents.' },
  ];

  const team = [
    {
      name: 'Arun Khanna',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'Former IIT-B alum with 15 years in real estate and fintech. Founded EstateHub to make home-buying human again.',
    },
    {
      name: 'Neha Agarwal',
      role: 'Co-Founder & COO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Operations leader with experience scaling startups from 0 to 1M+ users. Handles everything from agents to audits.',
    },
    {
      name: 'Rahul Deshpande',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Ex-Google engineer. Leads our AI, platform, and data teams to build the smartest real estate product in India.',
    },
    {
      name: 'Isha Verma',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Customer champion with a decade of experience in premium hospitality and concierge services.',
    },
    {
      name: 'Vivek Menon',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Builds relationships with builders, banks, and legal firms to make every transaction smooth.',
    },
    {
      name: 'Tanvi Rao',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Storyteller and growth marketer who has scaled brands from regional to national recognition.',
    },
  ];

  const awards = [
    { year: '2024', title: 'Best PropTech Platform', org: 'India Real Estate Awards' },
    { year: '2023', title: 'Fastest Growing Startup', org: 'Economic Times Startup Summit' },
    { year: '2023', title: 'Most Trusted Brand', org: 'Consumer Voice Awards' },
    { year: '2022', title: 'Best Customer Experience', org: 'National Customer Care Awards' },
    { year: '2022', title: 'Top 10 PropTechs', org: 'Forbes India' },
    { year: '2021', title: 'Emerging Startup of the Year', org: 'YourStory Awards' },
  ];

  const press = [
    { logo: 'Forbes', quote: 'EstateHub is redefining how India buys its homes.' },
    { logo: 'Economic Times', quote: 'A tech-first approach to an age-old industry.' },
    { logo: 'YourStory', quote: 'One of the most customer-obsessed platforms in Indian real estate.' },
    { logo: 'Mint', quote: 'Their data-driven listings are setting new standards for transparency.' },
  ];

  const offices = [
    { city: 'Mumbai (HQ)', address: 'Level 5, Business Park, Bandra West, Mumbai 400050', phone: '+91 98765 43210' },
    { city: 'Bangalore', address: 'Tower B, Tech Park, Koramangala, Bangalore 560095', phone: '+91 87654 32109' },
    { city: 'Delhi NCR', address: 'Cyber Hub, DLF Phase 2, Gurgaon 122002', phone: '+91 76543 21098' },
    { city: 'Pune', address: 'Baner Business Bay, Baner, Pune 411045', phone: '+91 65432 10987' },
    { city: 'Hyderabad', address: 'Hitech City, Madhapur, Hyderabad 500081', phone: '+91 54321 09876' },
    { city: 'Kochi', address: 'Infopark Phase 1, Kakkanad, Kochi 682042', phone: '+91 43210 98765' },
  ];

  const whyUs = [
    { icon: FileCheck, title: 'Verified Listings Only', desc: 'Every property is physically or digitally verified before going live. No fake listings, ever.' },
    { icon: Lock, title: 'Secure Transactions', desc: 'Bank-grade encryption, escrow support, and legal assistance for every deal.' },
    { icon: Headphones, title: '24/7 Support', desc: 'Real humans available across chat, call, and email — mornings, nights, weekends.' },
    { icon: LineChart, title: 'Market Intelligence', desc: 'Live price trends, neighbourhood insights, and investment analysis for smarter decisions.' },
    { icon: IndianRupee, title: 'Zero Hidden Fees', desc: 'Transparent pricing. What you see is exactly what you pay. No surprises.' },
    { icon: Home, title: 'End-to-End Handover', desc: 'From site visit to key handover — we handle paperwork, registration, and everything in-between.' },
  ];

  const partners = [
    'HDFC Bank', 'ICICI Bank', 'SBI Home Loans', 'Axis Bank', 'Bajaj Finserv',
    'LIC Housing', 'Kotak Mahindra', 'Piramal Finance', 'Godrej Properties',
    'Lodha Group', 'DLF', 'Prestige Group', 'Brigade', 'Sobha Developers',
  ];

  const testimonials = [
    {
      name: 'Ananya Verma',
      role: 'Home Buyer, Mumbai',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      rating: 5,
      text: 'EstateHub made my home buying journey incredibly smooth. The team was professional, responsive, and helped me find my dream home within my budget.',
    },
    {
      name: 'Vikram Singh',
      role: 'Property Investor, Delhi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 5,
      text: 'As an investor, I have used many platforms but EstateHub stands out. Their market insights and property analysis are second to none.',
    },
    {
      name: 'Meera Reddy',
      role: 'Tenant, Bangalore',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      rating: 5,
      text: 'Found my perfect rental apartment within a week! The filter options made it super easy to find exactly what I was looking for.',
    },
  ];

  // ---------- HELPERS ----------
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  // ---------- RENDER ----------
  return (
    <div className="bg-white overflow-hidden">

      {/* ==================== HERO ==================== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20"
          >
            <Sparkles size={16} className="text-accent-300" />
            <span>Trusted since 2020 • Serving 25+ cities across India</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
          >
            About <span className="text-primary-300">EstateHub</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto"
          >
            India's most trusted real estate marketplace — connecting buyers, sellers,
            and agents with honesty, speed, and technology.
          </motion.p>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center text-white"
              >
                <s.icon size={26} className="mx-auto mb-3 text-primary-200" />
                <p className="text-2xl md:text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-xs md:text-sm text-primary-100">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OUR STORY ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
              alt="Our Story"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary-600 font-semibold mb-2">OUR STORY</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transforming Real Estate in India — One Home at a Time
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              EstateHub was born in 2020 out of frustration. Our founder spent six
              months hunting for an apartment in Mumbai, dealing with fake listings,
              ghost brokers, and hidden charges. He knew there had to be a better way.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We started with a simple idea: <strong>what if every listing was real,
              every price was honest, and every agent was accountable?</strong> That
              question became our company.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Five years later, we're India's most trusted real estate marketplace,
              helping over 50,000 families across 25+ cities.
            </p>

            <div className="space-y-3">
              {[
                'Verified listings from verified owners and agents',
                'Live price intelligence and neighbourhood insights',
                'Legal, loan, and registration support under one roof',
                'AI-powered search that learns what you love',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-5">
                <Target className="text-white" size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To make finding, buying, renting, and selling property in India as
                simple as booking a cab — transparent, fast, and completely
                trustworthy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl flex items-center justify-center mb-5">
                <Rocket className="text-white" size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A future where every Indian — regardless of budget or city — has
                access to a fair, transparent, and efficient real estate experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-primary-600 font-semibold mb-2">WHY ESTATEHUB</p>
            <h2 className="section-title mb-4">Built for the Modern Home-Seeker</h2>
            <p className="text-gray-600">
              Every feature, every process, every decision is designed to remove
              friction from your property journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary-100 transition-all"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={22} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">OUR VALUES</p>
            <h2 className="section-title">What Drives Us Every Day</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={26} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">OUR JOURNEY</p>
            <h2 className="section-title">Milestones That Shaped Us</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 md:gap-6"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-primary-200 mt-2" />
                  )}
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex-1 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-primary-600 font-semibold mb-2">LEADERSHIP</p>
            <h2 className="section-title mb-4">Meet the People Behind EstateHub</h2>
            <p className="text-gray-600">
              A team of dreamers, engineers, and real-estate experts obsessed with
              making home-buying better for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AWARDS ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">RECOGNITION</p>
            <h2 className="section-title">Awards & Achievements</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{a.year}</p>
                    <h3 className="font-bold text-gray-900 mb-1">{a.title}</h3>
                    <p className="text-sm text-gray-600">{a.org}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRESS ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">PRESS</p>
            <h2 className="section-title">What the Media Says</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {press.map((p, i) => (
              <motion.div
                key={p.logo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8"
              >
                <Quote size={28} className="text-primary-200 mb-4" />
                <p className="text-lg text-gray-800 italic mb-4">"{p.quote}"</p>
                <p className="font-bold text-primary-600">{p.logo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">TRUSTED PARTNERS</p>
            <h2 className="section-title">We Work With the Best</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl p-4 flex items-center justify-center text-center min-h-[80px] border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <span className="text-sm font-semibold text-gray-700">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">TESTIMONIALS</p>
            <h2 className="section-title">Voices of Our Customers</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OFFICES ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-primary-600 font-semibold mb-2">OUR PRESENCE</p>
            <h2 className="section-title">Find Us Across India</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{office.city}</h3>
                    <p className="text-sm text-gray-600 mt-1">{office.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-100">
                  <Phone size={14} className="text-primary-600" />
                  {office.phone}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CAREERS CTA ==================== */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-3xl p-8 md:p-16 text-white text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Briefcase size={14} /> We're Hiring
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Build the Future of Real Estate?
            </h3>
            <p className="text-primary-100 mb-6 leading-relaxed max-w-2xl mx-auto">
              We're always looking for passionate engineers, designers, marketers,
              and real-estate experts to join our mission.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact">
                <button className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
                  View Open Roles <ArrowRight size={18} />
                </button>
              </Link>
              <a
                href="mailto:careers@estatehub.com"
                className="border-2 border-white/70 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Mail size={16} /> careers@estatehub.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-16 md:py-24">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join 50,000+ families who found their perfect property on EstateHub.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/properties">
                <button className="btn-primary flex items-center gap-2">
                  Browse Properties <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/submit-property">
                <button className="btn-outline flex items-center gap-2">
                  Post Your Property <Home size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;