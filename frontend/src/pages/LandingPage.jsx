import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import ShowcaseSection from '../components/landing/ShowcaseSection';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <ShowcaseSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;