import React from "react";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import ImageSection from "./components/ImageSection";
import EcoFriendlySection from "./components/EcoFriendlySection";
import ServicesSection from "./components/ServiceSection";

const HomeModule = () => {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <ImageSection />
      <EcoFriendlySection />
      <ServicesSection />
    </>
  );
};

export default HomeModule;
