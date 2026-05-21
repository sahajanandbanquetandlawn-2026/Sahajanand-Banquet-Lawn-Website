import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';

import AmenitiesSection from '../components/home/AmenitiesSection';
import GallerySection from '../components/home/GallerySection';
import ContactSection from '../components/home/ContactSection';
import SchemaMarkup from '../components/common/SchemaMarkup';

const homeBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.sahajanandbanquetandlawn.com/"
    }
  ]
};

export default function Home() {
  return (
    <main>
      <SchemaMarkup schema={homeBreadcrumb} id="breadcrumb-home" />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AmenitiesSection />

      <GallerySection />
      <ContactSection />
    </main>
  );
}

