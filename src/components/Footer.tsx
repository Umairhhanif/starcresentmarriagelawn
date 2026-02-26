'use client';

import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'Weddings', href: '#services' },
    { name: 'Receptions', href: '#services' },
    { name: 'Corporate Events', href: '#services' },
    { name: 'Birthday Parties', href: '#services' },
    { name: 'Mehndi & Sangeet', href: '#services' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative pt-24 pb-8 overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, var(--primary), transparent)'
        }}
      />

      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-5"
        style={{ background: 'var(--primary)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand - Takes more space */}
          <div className="lg:col-span-5">
            <a href="#home" className="inline-block mb-8 group">
              <div className="flex flex-col">
                <span
                  className="text-4xl md:text-5xl font-light tracking-wider transition-all duration-300 group-hover:text-gold-glow"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontStyle: 'italic' }}
                >
                  Star Crescent
                </span>
                <span
                  className="text-xs tracking-[0.3em] uppercase mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Marriage Lawn
                </span>
              </div>
            </a>
            <p
              className="mb-8 leading-relaxed max-w-md text-base"
              style={{ color: 'var(--text-muted)' }}
            >
              Where dreams begin. Premium wedding and event venue in Karachi,
              crafting unforgettable celebrations since 2009.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/pages/Star-crescent/606704579344276"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="w-12 h-12 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: 'var(--surface-light)',
                  border: '1px solid var(--border)'
                }}
              >
                <Facebook size={20} style={{ color: 'var(--primary)' }} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -3 }}
                className="w-12 h-12 flex items-center justify-center transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: 'var(--surface-light)',
                  border: '1px solid var(--border)'
                }}
              >
                <Instagram size={20} style={{ color: 'var(--primary)' }} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-medium mb-6 tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative inline-block transition-colors cursor-pointer group"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: 'var(--primary)' }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-medium mb-6 tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              Our Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative inline-block transition-colors cursor-pointer group"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: 'var(--primary)' }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3
              className="text-sm font-medium mb-6 tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'var(--surface-light)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <Phone size={16} style={{ color: 'var(--primary)' }} />
                </div>
                <a
                  href="tel:+923001609087"
                  className="transition-colors cursor-pointer hover:text-primary pt-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  +92 300 1609087
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'var(--surface-light)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <Mail size={16} style={{ color: 'var(--primary)' }} />
                </div>
                <a
                  href="mailto:info@starcrescentlawn.com"
                  className="transition-colors cursor-pointer hover:text-primary pt-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  info@starcrescentlawn.com
                </a>
              </li>
              <li className="flex items-start gap-4 group">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'var(--surface-light)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <MapPin size={16} style={{ color: 'var(--primary)' }} />
                </div>
                <span className="pt-2" style={{ color: 'var(--text-muted)' }}>
                  Jinnah Avenue, Model Colony,<br />
                  Karachi, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} Star Crescent Marriage Lawn. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-sm transition-colors cursor-pointer hover:text-primary relative group"
              style={{ color: 'var(--text-muted)' }}
            >
              Privacy Policy
              <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: 'var(--primary)' }}
              />
            </a>
            <a
              href="#"
              className="text-sm transition-colors cursor-pointer hover:text-primary relative group"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms of Service
              <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: 'var(--primary)' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
