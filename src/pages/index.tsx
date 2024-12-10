import { HomeBanner, HomeFooter, HomeHeader, HomeHero, HomeModels, HomeResponsibility } from "@/components";

const HomePage: React.FC = () => {
  return (
    <div>
      <HomeHeader />
      <HomeHero />
      <HomeModels />
      <HomeResponsibility />
      <HomeBanner />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
