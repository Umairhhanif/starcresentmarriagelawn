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
      className="pt-16 pb-8"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-6">
              <span 
                className="text-4xl text-gold-glow"
                style={{ fontFamily: 'var(--font-script)', color: 'var(--primary)' }}
              >
                Star Crescent
              </span>
            </a>
            <p 
              className="mb-6 leading-relaxed"
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
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--surface-light)' }}
              >
                <Facebook size={20} style={{ color: 'var(--primary)' }} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--surface-light)' }}
              >
                <Instagram size={20} style={{ color: 'var(--primary)' }} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg font-medium mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="animated-underline transition-colors cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 
              className="text-lg font-medium mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="animated-underline transition-colors cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 
              className="text-lg font-medium mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} style={{ color: 'var(--primary)' }} className="mt-1 flex-shrink-0" />
                <a 
                  href="tel:+923001609087"
                  className="transition-colors cursor-pointer hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  +92 300 1609087
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} style={{ color: 'var(--primary)' }} className="mt-1 flex-shrink-0" />
                <a 
                  href="mailto:info@starcrescentlawn.com"
                  className="transition-colors cursor-pointer hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  info@starcrescentlawn.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} style={{ color: 'var(--primary)' }} className="mt-1 flex-shrink-0" />
                <span style={{ color: 'var(--text-muted)' }}>
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ color: 'var(--text-muted)' }}>
            © {currentYear} Star Crescent Marriage Lawn. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a 
              href="#"
              className="text-sm transition-colors cursor-pointer hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              Privacy Policy
            </a>
            <a 
              href="#"
              className="text-sm transition-colors cursor-pointer hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
