'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    // Initial states
    gsap.set(imageRef.current, { scale: 1.3, filter: 'blur(20px) brightness(0.6)' });
    gsap.set([overlayRef.current, titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current, decorRef.current], {
      y: 80,
      autoAlpha: 0
    });

    // Orchestrated entrance
    tl.to(imageRef.current, {
      scale: 1,
      filter: 'blur(0px) brightness(1)',
      duration: 3,
      ease: 'power2.out'
    })
    .to(overlayRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1.2,
    }, '-=2.5')
    .to(subtitleRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1.4,
    }, '-=2')
    .to(titleRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1.6,
      ease: 'power4.out'
    }, '-=1.8')
    .to(decorRef.current, {
      y: 0,
      autoAlpha: 1,
      scaleX: 1,
      duration: 1.2,
    }, '-=1.4')
    .to(descriptionRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1.2,
    }, '-=1')
    .to(buttonsRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 1.2,
    }, '-=0.8');

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
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
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-[140%] -top-[20%]">
        <div ref={imageRef} className="w-full h-full relative">
          <Image
            src="https://lh3.googleusercontent.com/gps-cs-s/AHVAwepRaWUk3W_hlTZ9s9uT-Ge0Bx-S0lRN1GxgjmM0pPgl3508JKLYlFEW-JpxjXjLuM1r9-kBNqi6xINgVJQ8gtPTvLQHsZ39VQrbJ5PW6PYU6Cv8oWucJYKJhZhLIyuZzNh5sN-TkQ=w1200-h800-k-no"
            alt="Star Crescent Marriage Lawn"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay with texture */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(13, 13, 13, 0.3) 0%, rgba(13, 13, 13, 0.7) 60%, rgba(13, 13, 13, 0.95) 100%)',
              mixBlendMode: 'multiply'
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(13, 13, 13, 0.8) 100%)'
            }}
          />
        </div>
      </div>

      {/* Ambient glow effects */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'var(--primary)' }}
      />

      {/* Content - Asymmetric layout */}
      <div ref={contentRef} className="relative z-10 px-6 max-w-7xl w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Main content */}
          <div className="lg:col-span-7">
            {/* Decorative overlay number */}
            <div ref={overlayRef} className="invisible mb-6">
              <span
                className="text-[120px] lg:text-[180px] font-bold leading-none opacity-10"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--primary)',
                  fontStyle: 'italic'
                }}
              >
                01
              </span>
            </div>

            <div ref={subtitleRef} className="invisible mb-4 flex items-center gap-4">
              <div
                className="w-12 h-px"
                style={{ backgroundColor: 'var(--primary)' }}
              />
              <span
                className="text-xs tracking-[0.4em] uppercase font-medium"
                style={{ color: 'var(--primary)' }}
              >
                Karachi's Premier Venue
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-8 leading-[0.95] invisible"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Where
              <br />
              <span
                className="italic font-normal"
                style={{ color: 'var(--primary)' }}
              >
                Dreams
              </span>
              <br />
              Begin
            </h1>

            {/* Decorative line */}
            <div ref={decorRef} className="invisible mb-8 flex items-center gap-4">
              <div
                className="h-px flex-1 max-w-[200px]"
                style={{
                  background: 'linear-gradient(to right, var(--primary), transparent)'
                }}
              />
            </div>

            <p
              ref={descriptionRef}
              className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed invisible"
              style={{ color: 'var(--text-muted)' }}
            >
              An exquisite marriage lawn in the heart of Karachi, where timeless elegance
              meets modern luxury. Capacity for 600-1000 guests.
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-wrap gap-4 invisible"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-12 py-5 font-medium cursor-pointer"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--background)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.05em',
                  boxShadow: '0 10px 40px rgba(201, 169, 97, 0.3)'
                }}
              >
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 1.5,
                  }}
                />
                <span className="relative z-10 uppercase text-sm">Reserve Your Date</span>
              </motion.a>

              <motion.a
                href="#gallery"
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden px-12 py-5 font-medium border cursor-pointer"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'rgba(201, 169, 97, 0.05)',
                  letterSpacing: '0.05em'
                }}
              >
                <span className="relative z-10 uppercase text-sm">Explore Gallery</span>
              </motion.a>
            </div>
          </div>

          {/* Right side - Stats overlay */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 1.2 }}
              className="glass p-10 rounded-sm"
              style={{ borderLeft: '2px solid var(--primary)' }}
            >
              <div className="space-y-8">
                {[
                  { value: '15+', label: 'Years of Excellence' },
                  { value: '2000+', label: 'Celebrations Hosted' },
                  { value: '1000', label: 'Guest Capacity' },
                  { value: '4.0', label: 'Google Rating' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 + index * 0.15, duration: 0.8 }}
                    className="flex items-baseline gap-4"
                  >
                    <div
                      className="text-5xl font-light"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--primary)',
                        fontStyle: 'italic'
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-sm tracking-wider uppercase flex-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-12 hidden md:flex flex-col items-center gap-3"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase font-medium"
          style={{ color: 'var(--text-muted)', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} style={{ color: 'var(--primary)' }} />
        </motion.div>
        <div
          className="w-px h-20"
          style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
        />
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 hidden lg:block"
        style={{ borderColor: 'var(--primary)', opacity: 0.3 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.7, duration: 1 }}
        className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 hidden lg:block"
        style={{ borderColor: 'var(--primary)', opacity: 0.3 }}
      />
    </section>
  );
}
