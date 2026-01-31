import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Amenities from '@/components/Amenities';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';


export default function Home() {
  return (
    <main className="page-transition">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Amenities />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
