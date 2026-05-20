import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AmenitiesSection from '../components/home/AmenitiesSection';
import GallerySection from '../components/home/GallerySection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
