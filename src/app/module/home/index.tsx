import React from "react";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import ImageSection from "./components/ImageSection";
import EcoFriendlySection from "./components/EcoFriendlySection";
import ServicesSection from "./components/ServiceSection";
import CompanyStory from "./components/CompanyStory";
import BestServices from "./components/BestServices";
import PricingSection from "./components/PriceSection";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

const HomeModule = () => {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <ImageSection />
      <EcoFriendlySection />
      <ServicesSection />
      <CompanyStory />
      <BestServices />
      <PricingSection />
      <TestimonialsCarousel />
      <CTASection />
      <Footer />
    </>
  );
};

export default HomeModule;
