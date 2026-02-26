'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzwEs7jgtVuGuvOm-_RgcGniMt_4nRzrY8CxHYIRLctpVa68JUpL9KnHcTEYFjrArV8t3_GN1kl3uKcRAMcCZeXlq__xagfsuKKN3_wTDsecbhsvksbX64gyYKiRcbCa04I737koQ=s800-k-no',
    title: 'Grand Entrance',
    category: 'Exterior',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzeTFgvGVcn2V4LAEoFnEJ_mCt5NK4GwUb78PVQDZdEFWJFMhS67Z_F1-8CVsj2p9iQm4-6OrtjYK6mt7ND6-qLAvW1ADWYE0hfV4qINfvqzc7nYyqd5mj7oUSXYph0GRONgSoRtpqxaFsJ=s800-k-no',
    title: 'Wedding Stage',
    category: 'Interior',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy8_cW_gHXGNkkgOXtQgL3ceeZ35qC3mLwarrvKZDKbImY_DMXcLoeAwdcdS7QkkuSQB1NAA4k1bCBuyGI13eKJG4rc7Rx0z_bRxwyv3QBEzGayf9PYKPL8L04nS8oyGbJBqAjI7Q=s800-k-no',
    title: 'Lawn Setup',
    category: 'Events',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzA_uk5mM0mKN0LvUrETwFD9lkO-EzboPIthyaTH6kHr5JdfQr6ECuRchWy_CkE_1NTGxJDeq2ooiVLgLzGKqfov7HTz9ocxpeYaK36oIObGU0nLa8tmeLwu97tnWZWaobZU6AI=s800-k-no',
    title: 'Event Decor',
    category: 'Events',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzhHLaEt94YtqJRIUJTyZeH4G96YcrMj0B8nZrJKgEvdfUJdZrWO_XfuYZmC2z29WLyzH1rZ3G6o6GBEeW7XztwACMu3VFlJjWKWBy7DPIV1pC7fuiTsx4ZAuP1q9dq1LaZtZm6Rw=s800-k-no',
    title: 'Aerial View',
    category: 'Exterior',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw96kPeqRMF-u-FR9J6gBdEaovFBHm6VZF_HLldKhubco_AkvRfeeXmw6wuRRvUFpXQYpPTHDv9ctThAyH_1XA0kBQODpouLczJRZsvSKKx2pTT0ZNOl68KH9ckOtYH5TLRT5uU=s800-k-no',
    title: 'Night Ambiance',
    category: 'Interior',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzBugWdrLK26u3YXcJtzbdhD9LG28vCQ6fEugy4EdoSCNgFoo8C-gC33OJGjZfpbI26W1RVx0T21Kbs2RcG7rgenYoYcOwCa8kMgkCamahaFGM1DmJB2KonRokzJOvuRnsPIEWF=s800-k-no',
    title: 'Banquet Hall',
    category: 'Interior',
  },
  {
    src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy2yZgmNzu_pPaextESfUe37SgzvIkB-uLT9NkLwsobPQ9bjnyQPcVQiiiOxfrcLLEh8BXBcy3oZuIsXICOlFZLTN-t9NU2Tid-GezA7Y6Gp_3tEH8-lYB71p7pasHiNT3vSAMgBg=s800-k-no',
    title: 'Table Setting',
    category: 'Events',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

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

      // Parallax rows
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (row3Ref.current) {
        gsap.to(row3Ref.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Gallery images entrance animation
      const allImages = containerRef.current.querySelectorAll('.gallery-image');
      gsap.fromTo(
        allImages,
        {
          scale: 0.8,
          opacity: 0,
          rotateY: -30
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          stagger: {
            amount: 1.2,
            from: 'center',
            ease: 'power2.out'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="header-element text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ color: 'var(--primary)' }}
          >
            Our Gallery
          </span>

          <h2
            className="header-element text-4xl md:text-5xl lg:text-6xl font-light mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            A Glimpse of
            <br />
            <span style={{ color: 'var(--primary)' }}>Elegance</span>
          </h2>

          <p
            className="header-element text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Explore our stunning venue through the lens of countless
            celebrations we&apos;ve been honored to host.
          </p>
        </div>

        {/* Fountain Gallery - Cascading layout */}
        <div ref={containerRef} className="relative">
          {/* Center Hero Image */}
          <div ref={row1Ref} className="flex justify-center mb-8">
            <motion.div
              className="gallery-image relative overflow-hidden rounded-2xl cursor-pointer"
              style={{ width: '500px', height: '350px' }}
              onHoverStart={() => setHoveredIndex(0)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => openLightbox(0)}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].title}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: hoveredIndex === 0 ? 'scale(1.1)' : 'scale(1)' }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === 0 ? 1 : 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.9), rgba(13,13,13,0.3))' }}
              >
                <span className="text-2xl font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {galleryImages[0].title}
                </span>
                <span className="text-sm mt-1" style={{ color: 'var(--primary)' }}>{galleryImages[0].category}</span>
              </motion.div>
              <div className="absolute inset-0 border-2 rounded-2xl transition-all duration-300" style={{ borderColor: hoveredIndex === 0 ? 'var(--primary)' : 'transparent' }} />
            </motion.div>
          </div>

          {/* First Cascade Row - 2 images */}
          <div ref={row2Ref} className="flex justify-center gap-6 mb-6">
            {[1, 2].map((idx, i) => (
              <motion.div
                key={idx}
                className="gallery-image relative overflow-hidden rounded-xl cursor-pointer"
                style={{
                  width: '280px',
                  height: '200px',
                  marginTop: i === 0 ? '20px' : '40px'
                }}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => openLightbox(idx)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src={galleryImages[idx].src}
                  alt={galleryImages[idx].title}
                  fill
                  className="object-cover transition-transform duration-500"
                  style={{ transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)' }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.9), rgba(13,13,13,0.5))' }}
                >
                  <span className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{galleryImages[idx].title}</span>
                  <span className="text-sm" style={{ color: 'var(--primary)' }}>{galleryImages[idx].category}</span>
                </motion.div>
                <div className="absolute inset-0 border rounded-xl transition-all duration-300" style={{ borderColor: hoveredIndex === idx ? 'var(--primary)' : 'transparent' }} />
              </motion.div>
            ))}
          </div>

          {/* Second Cascade Row - 3 images */}
          <div ref={row3Ref} className="flex justify-center gap-5 mb-6">
            {[3, 4, 5].map((idx, i) => (
              <motion.div
                key={idx}
                className="gallery-image relative overflow-hidden rounded-xl cursor-pointer"
                style={{
                  width: '240px',
                  height: '180px',
                  marginTop: i === 1 ? '0px' : i === 0 ? '30px' : '50px'
                }}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => openLightbox(idx)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src={galleryImages[idx].src}
                  alt={galleryImages[idx].title}
                  fill
                  className="object-cover transition-transform duration-500"
                  style={{ transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)' }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.9), rgba(13,13,13,0.5))' }}
                >
                  <span className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{galleryImages[idx].title}</span>
                  <span className="text-sm" style={{ color: 'var(--primary)' }}>{galleryImages[idx].category}</span>
                </motion.div>
                <div className="absolute inset-0 border rounded-xl transition-all duration-300" style={{ borderColor: hoveredIndex === idx ? 'var(--primary)' : 'transparent' }} />
              </motion.div>
            ))}
          </div>

          {/* Third Cascade Row - 2 images */}
          <div className="flex justify-center gap-6">
            {[6, 7].map((idx, i) => (
              <motion.div
                key={idx}
                className="gallery-image relative overflow-hidden rounded-xl cursor-pointer"
                style={{
                  width: '220px',
                  height: '160px',
                  marginTop: i === 0 ? '40px' : '20px'
                }}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => openLightbox(idx)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Image
                  src={galleryImages[idx].src}
                  alt={galleryImages[idx].title}
                  fill
                  className="object-cover transition-transform duration-500"
                  style={{ transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)' }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.9), rgba(13,13,13,0.5))' }}
                >
                  <span className="text-lg font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{galleryImages[idx].title}</span>
                  <span className="text-sm" style={{ color: 'var(--primary)' }}>{galleryImages[idx].category}</span>
                </motion.div>
                <div className="absolute inset-0 border rounded-xl transition-all duration-300" style={{ borderColor: hoveredIndex === idx ? 'var(--primary)' : 'transparent' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(13, 13, 13, 0.95)' }}
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                fill
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <h3
                className="text-xl mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {galleryImages[selectedImage].title}
              </h3>
              <span style={{ color: 'var(--text-muted)' }}>
                {selectedImage + 1} / {galleryImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
