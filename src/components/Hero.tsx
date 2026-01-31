'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Refs for animation targets
  const subtitleRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !imageRef.current) return;

    // Create a timeline for the entrance animation
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Initial states
    gsap.set(imageRef.current, { scale: 1.2, filter: 'blur(10px)' });
    gsap.set([subtitleRef.current, title1Ref.current, title2Ref.current, descriptionRef.current, buttonsRef.current, scrollRef.current], { 
      y: 50, 
      autoAlpha: 0 
    });

    // Animation sequence
    tl.to(imageRef.current, {
      scale: 1,
      filter: 'blur(0px)',
      duration: 2.5,
      ease: 'power2.out'
    })
    .to(subtitleRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
    }, '-=2') // Overlay with image zoom
    .to(title1Ref.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
    }, '-=1.7')
    .to(title2Ref.current, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=1.5')
    .to(descriptionRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
    }, '-=1.2')
    .to(buttonsRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
    }, '-=1')
    .to(scrollRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
    }, '-=0.5');

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Content fade out on scroll
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <div ref={imageRef} className="w-full h-full relative">
            <Image
            src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzhHLaEt94YtqJRIUJTyZeH4G96YcrMj0B8nZrJKgEvdfUJdZrWO_XfuYZmC2z29WLyzH1rZ3G6o6GBEeW7XztwACMu3VFlJjWKWBy7DPIV1pC7fuiTsx4ZAuP1q9dq1LaZtZm6Rw=s1920-k-no"
            alt="Star Crescent Marriage Lawn - Wedding Venue"
            fill
            priority
            className="object-cover"
            />
            {/* Overlay */}
            <div 
            className="absolute inset-0"
            style={{ 
                background: 'linear-gradient(to bottom, rgba(10, 10, 15, 0.4), rgba(10, 10, 15, 0.8))' 
            }}
            />
        </div>
      </div>

      {/* Gold Glow Effects - Animated via CSS for continuous ambient feeling */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: 'var(--primary)', animationDuration: '4s' }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: 'var(--primary)', animationDuration: '6s' }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl">
        <div ref={subtitleRef} className="mb-4 invisible">
          <span 
            className="text-sm md:text-base tracking-[0.3em] uppercase"
            style={{ color: 'var(--primary)' }}
          >
            Premium Wedding & Event Venue
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight relative">
          <div ref={title1Ref} className="invisible" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Where Dreams
          </div>
          <div ref={title2Ref} className="invisible inline-block mt-2 shimmer" style={{ fontFamily: 'var(--font-script)', fontSize: '1.2em' }}>
            Begin
          </div>
        </h1>

        <p
          ref={descriptionRef}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto invisible"
          style={{ color: 'var(--text-muted)' }}
        >
          Experience the magic of unforgettable celebrations at Karachi&apos;s most 
          elegant marriage lawn. Capacity for 600-1000 guests.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center invisible"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden px-10 py-4 rounded-full font-medium cursor-pointer gold-glow"
            style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'var(--background)' 
            }}
          >
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
            />
            <span className="relative z-10">Book Your Date</span>
          </motion.a>
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden px-10 py-4 rounded-full font-medium border cursor-pointer"
            style={{ 
              borderColor: 'var(--primary)', 
              color: 'var(--primary)' 
            }}
          >
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)',
                opacity: 0.4,
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.5,
              }}
            />
            <span className="relative z-10">View Gallery</span>
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 invisible"
      >
        <span 
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} style={{ color: 'var(--primary)' }} />
        </motion.div>
      </div>

      {/* Decorative Lines */}
      <div 
        className="absolute left-0 top-1/4 w-px h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)' }}
      />
      <div 
        className="absolute right-0 bottom-1/4 w-px h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)' }}
      />
    </section>
  );
}
