import HeroSection from "./pages/HeroSection/page";
import Section1 from "./pages/Section1/page";
import Section2 from "./pages/Section2/page";
import Section3 from "./pages/Section3/page";

export default function Home() {
  return (
    <div className="flex flex-col w-screen justify-center ">
      <HeroSection />
      <Section1 />
      <Section2/>
      <Section3/>
    </div>
  );
}
