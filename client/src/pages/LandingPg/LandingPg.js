import React, { useEffect } from "react";
import CardSection from "./Sections/CardSection";
import Footer from "./components/Footer";
import Header from "./Sections/Header";
import FAQSection from "./Sections/FAQSection";
import { OuterLayout } from "./styles/Layout";
import aos from 'aos'
import 'aos/dist/aos.css'
import ScrolledButton from "./components/ScrolledButton";
import './LandingPg.css'
import Slideshow from "./components/Slideshow";
import Navigation from "./components/Navigation";

function LandingPg() {


  useEffect(() => {
    aos.init({ duration: 2000 })
  }, [])

  return (
    <div>
      {/* <Navigation /> */}
      <Header />
      <br/> <br/> <br/>
      <Slideshow />
      <OuterLayout>
        <main>
          <CardSection />
          <FAQSection />
          <h3>For More such questions, use our bot!</h3>
          <ScrolledButton />
        </main>
      </OuterLayout>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPg;
