import React,{useEffect} from "react";
import CardSection from "./Sections/CardSection";
import ChartSection from "./Sections/ChartSection";
import Footer from "./components/Footer";
import Header from "./Sections/Header";
import MessagingSection from "./Sections/MessagingSection";
import FAQSection from "./Sections/FAQSection";
import PaymentSection from "./Sections/PricingSection";
import { OuterLayout } from "./styles/Layout";
import aos from 'aos'
import 'aos/dist/aos.css'
import ScrolledButton from "./components/ScrolledButton";
import './LandingPg.css'

function LandingPg() {


  useEffect(()=>{
    aos.init({duration: 2000})
  },[])

  return (
    <div>
      <Header />
      <OuterLayout>
        <main>
          <CardSection />
          <ChartSection />
          <MessagingSection />
          <PaymentSection />
          <FAQSection />
        </main>
      </OuterLayout>
      <Footer />
      <ScrolledButton />
    </div>
  );
}

export default LandingPg;
