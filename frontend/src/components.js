import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Background Image Component for Rest of Site
const SiteBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Your Actual Background Image */}
      <img 
        src="https://i.ibb.co/5X70pxf7/Untitled-design-2-685408a4cb7d9-png.png"
        alt="Your Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        onError={(e) => {
          console.log("Image failed to load, trying alternative URL");
          // Try alternative URL structure if main fails
          e.target.src = "https://i.ibb.co/nqWGd85/background.png";
        }}
      />
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/15" />
    </div>
  );
};
// Email Capture Modal Component
const EmailCaptureModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', { name, email, message });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#1a1a1a]/90 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isSubmitted ? (
            <>
              <h3 className="text-2xl font-normal text-white mb-2">Let's work together</h3>
              <p className="text-white/70 text-sm mb-8">Tell me about your project and I'll get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#00BFFF] focus:outline-none transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#00BFFF] focus:outline-none transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    placeholder="Tell me about your project"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-[#00BFFF] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-white/20 text-white px-6 py-3 rounded-lg hover:border-white/40 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#00BFFF] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#00BFFF]/90 transition-colors"
                    data-cursor="hover"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl text-white mb-2">Message sent!</h3>
              <p className="text-white/70 text-sm">I'll get back to you within 24 hours.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Shooting Star Cursor Effect
const ShootingStarCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-8);
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: point.x - 3,
            top: point.y - 3,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.3,
          }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 191, 255, ${0.8 - index * 0.1}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${8 - index}px rgba(0, 191, 255, ${0.6 - index * 0.08})`
            }}
          />
        </motion.div>
      ))}
      
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.8
        }}
      >
        <div 
          className="w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 191, 255, 0.9) 0%, rgba(0, 191, 255, 0.4) 40%, transparent 70%)',
            boxShadow: '0 0 15px rgba(0, 191, 255, 0.6), 0 0 30px rgba(0, 191, 255, 0.3)'
          }}
        />
      </motion.div>
    </>
  );
};

// Navigation - WITH Email Capture
const Navigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <motion.div 
            className="text-white font-normal text-sm tracking-wide"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            ENDofDAIZY
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['WORK', 'SERVICES', 'TESTIMONIALS'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 hover:text-white text-xs font-normal tracking-wider transition-colors duration-500"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="hover"
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#00BFFF] text-black px-6 py-2 text-xs font-medium tracking-wide hover:bg-[#00BFFF]/90 transition-all duration-500"
              whileHover={{ scale: 1.02, y: -1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
            >
              START A PROJECT
            </motion.button>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.nav>
  );
};

// Hero Section - Abstract Background Image with Electric Blue Headings
const HeroSection = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const learnMoreRef = useRef(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo([headlineRef.current, subheadlineRef.current], 
        { 
          opacity: 0, 
          y: 50
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power3.out" 
        }
      );
      
      tl.fromTo(learnMoreRef.current, 
        { 
          opacity: 0, 
          y: 20
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }, 
        "-=0.4"
      );
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      
      {/* Abstract Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        <img 
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="Abstract Iridescent Landscape"
          className="w-full h-full object-cover"
          style={{ 
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Top Section with Headings - Aligned with ENDofDAIZY */}
      <div className="relative z-10 pt-32 pb-8">
        <div className="max-w-6xl mx-auto px-8">
          {/* Headings - Left Aligned with ENDofDAIZY */}
          <div className="text-left">
            <h1
              ref={headlineRef}
              className="text-2xl md:text-3xl font-normal text-white mb-2 leading-tight tracking-normal opacity-0"
            >
              IT'S YOUR WORLD
            </h1>
            
            <h2
              ref={subheadlineRef}
              className="text-2xl md:text-3xl font-normal text-white mb-6 leading-tight tracking-normal opacity-0"
            >
              WE'RE JUST BUILDING IT
            </h2>

            {/* Electric Blue Learn More Text */}
            <div
              ref={learnMoreRef}
              onClick={() => setIsModalOpen(true)}
              className="text-lg font-normal tracking-normal opacity-0 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              style={{ 
                color: '#00BFFF',
                textShadow: '0 0 20px rgba(0, 191, 255, 0.8), 0 0 40px rgba(0, 191, 255, 0.4)'
              }}
              data-cursor="hover"
            >
              LEARN MORE
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

// Portfolio Section - WITH Video in First Project
const PortfolioSection = () => {
  const projects = [
    {
      title: "DREAMS VISUALIZED IN-HOUSE",
      description: "4SITE.PRO—Revolutionary tech platform revolutionizing digital experiences. Complete tech ecosystem with advanced infrastructure, scalable solutions, and cutting-edge development.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      services: ["Full-Stack Development", "Cloud Infrastructure", "Brand Identity", "Bespoke Video Sequence", "Tech Consulting"],
      category: "TECH • INNOVATION",
      hasVideo: true,
      videoSrc: "https://videos.sproutvideo.com/embed/7991dabb1e1de8ccf0/d596dc8976989f8d?playerTheme=dark&playerColor=2f3437&autoPlay=true&loop=true&showControls=false&muted=true"
    },
    {
      title: "Smart Contract Security Audits",
      description: "Composable Security—Redesigning a Web3 security audit platform. Website Design, Branding, Copywriting.",
      image: "https://images.unsplash.com/photo-1660836814985-8523a0d713b5",
      services: ["Website Design", "Branding", "Copywriting"],
      category: "WEB3 & CYBERSECURITY"
    },
    {
      title: "AI FRAMEWORK TO TAKE YOU ANYWHERE",
      description: "AI & Tech Landing Pages — Exploring The Visual Identities. Website Design, Copywriting, Branding (Concept Work).",
      image: "https://images.unsplash.com/photo-1658401598980-c2276a6aba14",
      services: ["Website Design", "Copywriting", "Branding"],
      category: "AI • TECH"
    },
    {
      title: "Why Protein",
      description: "Bodypeak—Visual redesign and CRO for a supplement eCommerce site. E-commerce Design, Branding, CRO.",
      image: "https://images.unsplash.com/photo-1575388902449-6bca946ad549",
      services: ["E-commerce Design", "Branding", "CRO"],
      category: "HEALTH & SUPPLEMENTS"
    }
  ];

  return (
    <section id="work" className="relative py-24 overflow-hidden bg-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="grid gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 overflow-hidden hover:bg-[#222]/70 hover:border-white/10 transition-all duration-500">
                
                <div className="relative overflow-hidden" style={{ height: project.hasVideo ? '600px' : '320px' }}>
                  {project.hasVideo ? (
                    // Large Video for first project - No black edges
                    <iframe
                      src={project.videoSrc}
                      className="w-full h-full"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        transform: 'scale(1.1)',
                        transformOrigin: 'center center'
                      }}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      title={project.title}
                    />
                  ) : (
                    // Regular image for other projects
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                </div>
                
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{project.title}</h3>
                  <p className="text-white/70 mb-6 text-base leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3 mb-6 justify-center">
                    {project.services.map((service, idx) => (
                      <span key={idx} className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center items-center">
                    <span className="text-[#00BFFF] font-semibold text-xs tracking-wider mr-4">{project.category}</span>
                    <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section - WITH Ripple Background
const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32 overflow-hidden bg-black">
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        
        {/* Section Title - With Frosted Glass Frame */}
        <div className="text-center mb-24">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-12 rounded-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white leading-tight tracking-tight max-w-3xl mx-auto">
              From design to development I dream and deliver with speed and the utmost attention to detail
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-16 mb-24">
          {/* DESIGN Column */}
          <div className="text-center">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center justify-center mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-4"></div>
                <h3 className="text-xs font-normal text-green-400 tracking-widest">DESIGN</h3>
              </div>
              <div className="text-center">
                <h4 className="text-white text-base mb-3">Landing Pages</h4>
                <h4 className="text-white text-base mb-3">Websites</h4>
                <h4 className="text-white text-base mb-3">Product Design</h4>
                <h4 className="text-white text-base">Branding</h4>
              </div>
            </div>
          </div>
          
          {/* DEVELOPMENT Column */}
          <div className="text-center">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center justify-center mb-8">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                <h3 className="text-xs font-normal text-blue-400 tracking-widest">DEVELOPMENT</h3>
              </div>
              <div className="text-center">
                <h4 className="text-white text-base mb-3">Framer</h4>
                <h4 className="text-white text-base">Webflow</h4>
              </div>
            </div>
          </div>
          
          {/* WORKING WITH Column */}
          <div className="text-center">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center justify-center mb-8">
                <div className="w-2 h-2 bg-[#00BFFF] rounded-full mr-4"></div>
                <h3 className="text-xs font-normal text-[#00BFFF] tracking-widest">WORKING WITH</h3>
              </div>
              <div className="text-center">
                <h4 className="text-white text-base mb-3">AI</h4>
                <h4 className="text-white text-base mb-3">Web3</h4>
                <h4 className="text-white text-base mb-3">Tech</h4>
                <h4 className="text-white text-base mb-3">Sports</h4>
                <h4 className="text-white text-base">Health</h4>
              </div>
            </div>
          </div>
        </div>

        {/* About Text Section - With Frosted Glass Frame */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-12 rounded-2xl space-y-6">
            <p className="text-white/80 text-base leading-relaxed">
              I'm a full-stack senior designer who makes the web work for you. With over 15 years of experience working 
              alongside founders, I know not just about looks—it's about results.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              From concept to launch, I handle every step of the process, ensuring smooth and hassle-free so you can 
              focus on your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section - WITH Ripple Background
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Michael Owens",
      role: "Founder at Fribo Studio",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      text: "Working with ENDofDAIZY was a fantastic experience. He has an incredible ability to turn ideas into reality, making the process very enjoyable."
    },
    {
      name: "Ben Smith", 
      role: "Founder at Live Aura",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      text: "ENDofDAIZY is as much an artist as he is a web designer. He was able to communicate authority, attention to detail, and clarity."
    },
    {
      name: "Damian Schnell",
      role: "Founder at WeRoadyou.pl", 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      text: "I always work with professionals and ENDofDAIZY is one of the best designers I've ever met."
    },
    {
      name: "Fabian Schmidt",
      role: "Senior PM Engineer at Xelon",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", 
      text: "Working with ENDofDAIZY was a pleasure. His communication and UI/UX skills are stellar."
    },
    {
      name: "Piotr Drazek",
      role: "Physiotherapist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      text: "ENDofDAIZY created a website for me that significantly increased my ability to attract more patients."
    },
    {
      name: "Michal Walczak", 
      role: "Founder at FitlyCode",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      text: "I highly recommend ENDofDAIZY for his exceptional expertise in UI/UX design."
    }
  ];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Title with Frosted Glass Frame */}
        <div className="text-center mb-16">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-12 rounded-2xl inline-block">
            <h2 className="text-4xl font-normal text-white mb-6">
              Trusted by founders <span className="text-red-400">♥</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-[#1a1a1a]/80 hover:border-white/10 transition-all duration-700"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <h4 className="text-white font-normal text-sm">{testimonial.name}</h4>
                  <p className="text-white/60 text-xs">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer - WITH Email Capture Modal
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="relative py-24 overflow-hidden bg-black">
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        {/* Footer Content with Frosted Glass Frame */}
        <div className="bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/5 p-12 rounded-2xl">
          <h3 className="text-3xl font-normal text-white mb-8">
            Ready to start your project?
          </h3>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00BFFF] text-black px-10 py-4 text-sm font-medium tracking-wide hover:bg-[#00BFFF]/90 transition-all duration-500 mb-16"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            data-cursor="hover"
          >
            GET STARTED
          </motion.button>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-xs">© 2025 ENDofDAIZY. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </footer>
  );
};

// Main Component
const ENDofDAIZYReplica = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen overflow-x-hidden" style={{ cursor: 'none' }}>
      <ShootingStarCursor />
      <Navigation />
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default ENDofDAIZYReplica;