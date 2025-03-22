import React from "react";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import ImageSection from "./components/ImageSection";
import EcoFriendlySection from "./components/EcoFriendlySection";

const HomeModule = () => {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <ImageSection />
      <EcoFriendlySection />
    </>
  );
};

export default HomeModule;
