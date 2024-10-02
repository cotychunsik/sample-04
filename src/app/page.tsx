import HeroSection from "./pages/HeroSection/page";
import Section1 from "./pages/Section1/page";
import Section2 from "./pages/Section2/page";
import Section3 from "./pages/Section3/page";
import FAQ from "./pages/FAQ/page";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-screen justify-center ">
      <HeroSection />
      <div className="bg-gradient-to-t from-indigo-950  to-zinc-950 ">
      <Section1 />
      </div>
      <Section2/>
      <Section3/>
      <FAQ/>
      <div className="bg-gradient-to-b from-zinc-950  to-indigo-950 ">
      <CTA/>
      </div>
      <Footer/>
    </div>
  );
}
