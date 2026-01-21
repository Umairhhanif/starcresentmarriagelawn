'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import FadeInView from './animations/FadeInView';

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
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="testimonials" 
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInView>
            <span 
              className="text-sm tracking-[0.3em] uppercase mb-4 block"
              style={{ color: 'var(--primary)' }}
            >
              Testimonials
            </span>
          </FadeInView>

          <FadeInView delay={0.1}>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              What Our Guests
              <br />
              <span style={{ color: 'var(--primary)' }}>Say About Us</span>
            </h2>
          </FadeInView>
        </div>

        {/* Featured Testimonial */}
        <FadeInView delay={0.2}>
          <div 
            ref={sliderRef}
            className="relative max-w-4xl mx-auto mb-12"
          >
            <div 
              className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-20"
              style={{ color: 'var(--primary)' }}
            >
              <Quote size={80} />
            </div>

            <motion.div
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
                  <Star 
                    key={i} 
                    size={20} 
                    fill="var(--primary)" 
                    style={{ color: 'var(--primary)' }}
                  />
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
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex ? 'w-8' : ''
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
        </FadeInView>

        {/* Stats */}
        <FadeInView delay={0.3}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-light mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
              >
                4.0★
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Google Rating</div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-light mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
              >
                1,595+
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Reviews</div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl md:text-5xl font-light mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)' }}
              >
                2000+
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Happy Events</div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
