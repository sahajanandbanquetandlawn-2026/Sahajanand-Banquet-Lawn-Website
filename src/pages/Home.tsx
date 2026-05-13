import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AmenitiesSection from '../components/home/AmenitiesSection';
import GallerySection from '../components/home/GallerySection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <AmenitiesSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
