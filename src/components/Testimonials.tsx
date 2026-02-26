'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ahmed & Fatima',
    event: 'Wedding Reception',
    rating: 5,
    text: 'Star Crescent made our wedding absolutely magical! The décor was stunning, the staff was incredibly attentive, and our guests are still talking about the food. Truly the best venue in Karachi!',
    date: 'December 2024',
  },
  {
    name: 'Hassan Ali',
    event: 'Corporate Event',
    rating: 5,
    text: 'Hosted our annual company gala here and everything was perfect. Professional staff, excellent facilities, and the ambiance impressed all our clients. Highly recommended!',
    date: 'November 2024',
  },
  {
    name: 'Sara & Bilal',
    event: 'Mehndi Ceremony',
    rating: 5,
    text: 'The colorful setup and energy at our mehndi was exactly what we dreamed of. The team understood our vision perfectly and executed it beautifully. Thank you Star Crescent!',
    date: 'October 2024',
  },
  {
    name: 'Zainab Khan',
    event: 'Birthday Party',
    rating: 4,
    text: 'Celebrated my 50th birthday here with 200 guests. The venue was spacious, food was delicious, and the arrangements were top-notch. Will definitely come back!',
    date: 'September 2024',
  },
  {
    name: 'Imran & Ayesha',
    event: 'Walima',
    rating: 5,
    text: 'From the moment we walked in, we knew this was the right choice. The elegant hall, beautiful lighting, and exceptional service made our walima unforgettable.',
    date: 'August 2024',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll('.header-element');
        gsap.fromTo(
          elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Quote icon animation
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 0.2,
            duration: 1.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sliderRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Testimonial card animation
      if (sliderRef.current) {
        gsap.fromTo(
          sliderRef.current,
          {
            y: 80,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sliderRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Stats animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');

        gsap.fromTo(
          statItems,
          {
            y: 60,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );

        // Animate stat numbers
        statItems.forEach((item) => {
          const valueEl = item.querySelector('.stat-value');
          if (valueEl) {
            const text = valueEl.textContent || '';
            const numMatch = text.match(/[\d.]+/);
            if (numMatch) {
              const targetNum = parseFloat(numMatch[0]);
              const suffix = text.replace(/[\d.]+/, '');

              gsap.fromTo(
                valueEl,
                { innerText: 0 },
                {
                  innerText: targetNum,
                  duration: 2,
                  ease: 'power2.out',
                  snap: { innerText: targetNum >= 10 ? 1 : 0.1 },
                  scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                  },
                  onUpdate: function() {
                    if (valueEl) {
                      const current = parseFloat(valueEl.textContent || '0');
                      valueEl.textContent = (targetNum >= 10 ? Math.ceil(current) : current.toFixed(1)) + suffix;
                    }
                  }
                }
              );
            }
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="header-element text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ color: 'var(--primary)' }}
          >
            Testimonials
          </span>

          <h2
            className="header-element text-4xl md:text-5xl lg:text-6xl font-light mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            What Our Guests
            <br />
            <span style={{ color: 'var(--primary)' }}>Say About Us</span>
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div
            ref={quoteRef}
            className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-20"
            style={{ color: 'var(--primary)' }}
          >
            <Quote size={80} />
          </div>

          <motion.div
            ref={sliderRef}
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 md:p-12 rounded-2xl gradient-border"
            style={{ backgroundColor: 'var(--surface-light)' }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'backOut' }}
                >
                  <Star
                    size={20}
                    fill="var(--primary)"
                    style={{ color: 'var(--primary)' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-light)' }}
            >
              &ldquo;{testimonials[activeIndex].text}&rdquo;
            </p>

            {/* Author */}
            <div>
              <div
                className="text-lg font-medium mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {testimonials[activeIndex].name}
              </div>
              <div
                className="text-sm"
                style={{ color: 'var(--primary)' }}
              >
                {testimonials[activeIndex].event} • {testimonials[activeIndex].date}
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex ? 'w-8' : 'w-3'
                }`}
                style={{
                  backgroundColor: index === activeIndex
                    ? 'var(--primary)'
                    : 'var(--surface-light)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="stat-item text-center">
            <div
              className="stat-value text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
            >
              4.0★
            </div>
            <div style={{ color: 'var(--text-muted)' }}>Google Rating</div>
          </div>
          <div className="stat-item text-center">
            <div
              className="stat-value text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
            >
              1,595+
            </div>
            <div style={{ color: 'var(--text-muted)' }}>Reviews</div>
          </div>
          <div className="stat-item text-center">
            <div
              className="stat-value text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
            >
              2000+
            </div>
            <div style={{ color: 'var(--text-muted)' }}>Happy Events</div>
          </div>
        </div>
      </div>
    </section>
  );
}
