'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import FadeInView from './animations/FadeInView';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    guests: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      eventType: '',
      guests: '',
      message: '',
    });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Background decorative elements */}
      <div 
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--primary)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInView>
            <span 
              className="text-sm tracking-[0.3em] uppercase mb-4 block"
              style={{ color: 'var(--primary)' }}
            >
              Get In Touch
            </span>
          </FadeInView>

          <FadeInView delay={0.1}>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Start Planning Your
              <br />
              <span style={{ color: 'var(--primary)' }}>Dream Event</span>
            </h2>
          </FadeInView>

          <FadeInView delay={0.2}>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Let us help you create an unforgettable celebration. 
              Fill out the form or contact us directly.
            </p>
          </FadeInView>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeInView delay={0.3}>
            <div 
              className="p-8 md:p-10 rounded-2xl gradient-border"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)]"
                      style={{ 
                        backgroundColor: 'var(--surface-light)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="phone"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)]"
                      style={{ 
                        backgroundColor: 'var(--surface-light)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)]"
                    style={{ 
                      backgroundColor: 'var(--surface-light)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label 
                      htmlFor="eventDate"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      id="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)]"
                      style={{ 
                        backgroundColor: 'var(--surface-light)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="eventType"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      id="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)] cursor-pointer"
                      style={{ 
                        backgroundColor: 'var(--surface-light)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <option value="">Select type</option>
                      <option value="wedding">Wedding</option>
                      <option value="reception">Reception/Walima</option>
                      <option value="mehndi">Mehndi/Sangeet</option>
                      <option value="birthday">Birthday</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label 
                      htmlFor="guests"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      id="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)]"
                      style={{ 
                        backgroundColor: 'var(--surface-light)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-primary)',
                      }}
                      placeholder="Number"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[var(--primary)] resize-none"
                    style={{ 
                      backgroundColor: 'var(--surface-light)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="Tell us about your event..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                  <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : isSubmitted ? (
                    <span>Message Sent! ✓</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Inquiry</span>
                    </>
                  )}
                  </span>
                </motion.button>
              </form>
            </div>
          </FadeInView>

          {/* Contact Info */}
          <FadeInView delay={0.4}>
            <div className="space-y-6">
              {/* Contact Cards */}
              <div 
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--surface-light)' }}
                >
                  <Phone size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Phone
                  </h3>
                  <a 
                    href="tel:+923458185651"
                    className="text-lg hover:underline cursor-pointer"
                    style={{ color: 'var(--primary)' }}
                  >
                    +92 345 8185651
                  </a>
                  <p style={{ color: 'var(--text-muted)' }}>Call for instant booking</p>
                </div>
              </div>

              <div 
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--surface-light)' }}
                >
                  <MessageCircle size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    WhatsApp
                  </h3>
                  <a 
                    href="https://wa.me/923458185651"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline cursor-pointer"
                    style={{ color: 'var(--primary)' }}
                  >
                    Message Us
                  </a>
                  <p style={{ color: 'var(--text-muted)' }}>Quick response guaranteed</p>
                </div>
              </div>

              <div 
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--surface-light)' }}
                >
                  <MapPin size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Location
                  </h3>
                  <p style={{ color: 'var(--text-light)' }}>
                    Jinnah Avenue, Model Colony<br />
                    Alamgir Society B Area, Karachi
                  </p>
                </div>
              </div>

              <div 
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{ backgroundColor: 'var(--surface)' }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--surface-light)' }}
                >
                  <Clock size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h3 
                    className="text-lg font-medium mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Working Hours
                  </h3>
                  <p style={{ color: 'var(--text-light)' }}>
                    Daily: 4:00 PM - 12:00 AM<br />
                    <span style={{ color: 'var(--text-muted)' }}>Open for site visits by appointment</span>
                  </p>
                </div>
              </div>

              {/* Map */}
              <div 
                className="rounded-2xl overflow-hidden h-64"
                style={{ border: '1px solid var(--border)' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.0!2d67.1797885!3d24.8966255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339dd6571f14d%3A0xc8d24e89a7d6a341!2sStar%20Crescent%20Lawn%20A!5e0!3m2!1sen!2s!4v1642688000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
