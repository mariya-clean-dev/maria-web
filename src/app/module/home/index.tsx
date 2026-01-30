import React from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import ServicesSection from "./components/ServiceSection/ServiceSection";
import AboutSection from "./components/AboutSection/AboutSection";
import DetailsSection from "./components/DetailsSection/DetailsSection";
import ProcessSection from "./components/ProcessSection/ProcessSection";
import PromiseSection from "./components/PromiseSection/PromiseSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import FaqSection from "./components/FaqSection/FaqSection";
import CTASection from "./components/CTASection/CTASection";
import Footer from "./components/Footer/Footer";
import PriceSection from "./components/PriceSection/PriceSection";

const HomeModule = () => {
  return (
    <>
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="about">
        <AboutSection/>
      </div>
      <DetailsSection/>
      <div id="process">
        <ProcessSection/>
      </div>
      <div id="pricing">
        <PriceSection/>
      </div>
      <PromiseSection/>
      <div id="reviews">
        <ReviewsSection/>
      </div>
      <FaqSection/>
      <CTASection/>
      <Footer/>
    </>
  );
};

export default HomeModule;
