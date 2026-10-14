import HeroSection from '../components/home/HeroSection';
import FeaturedProperties from '../components/home/FeaturedProperties';
import CategoriesSection from '../components/home/CategoriesSection';
import StatsSection from '../components/home/StatsSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <CategoriesSection />
      <StatsSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
};

export default Home;