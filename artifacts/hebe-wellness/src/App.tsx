import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ToolsPage from "./pages/ToolsPage";
import LongevityHubPage from "./pages/LongevityHubPage";
import ShopPage from "./pages/ShopPage";
import QuizPage from "./pages/QuizPage";
import AboutPage from "./pages/AboutPage";
import ConsultPage from "./pages/ConsultPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import ResourcesPage from "./pages/ResourcesPage";

// New clinical pages imports
import PrakritiTestPage from "./pages/PrakritiTestPage";
import GeroscienceMapPage from "./pages/GeroscienceMapPage";
import MitochondriaToolPage from "./pages/MitochondriaToolPage";
import HpaBurnoutPage from "./pages/HpaBurnoutPage";
import DhtBlockPage from "./pages/DhtBlockPage";
import GutRestorationPage from "./pages/GutRestorationPage";
import DermalCrocinPage from "./pages/DermalCrocinPage";
import Zone2CardioPage from "./pages/Zone2CardioPage";
import ClinicalTrialsPage from "./pages/ClinicalTrialsPage";
import MedicalBoardPage from "./pages/MedicalBoardPage";
import SourcingIndexPage from "./pages/SourcingIndexPage";
import RasayanaGerosciencePage from "./pages/RasayanaGerosciencePage";
import StackingProtocolsPage from "./pages/StackingProtocolsPage";
import BotanicalDosagePage from "./pages/BotanicalDosagePage";
import EpigeneticClockPage from "./pages/EpigeneticClockPage";
import CircadianPlannerPage from "./pages/CircadianPlannerPage";
import SleepDebtPage from "./pages/SleepDebtPage";
import WellnessBuilderPage from "./pages/WellnessBuilderPage";
import LabIntakePage from "./pages/LabIntakePage";
import ClinicalCasesPage from "./pages/ClinicalCasesPage";

import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--darkest)', color: 'white', textAlign: 'center'
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🌿</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem', color: 'var(--gold)' }}>
        Page Not Found
      </h1>
      <a href="/" style={{
        color: 'var(--gold)', textDecoration: 'none', fontWeight: 600,
        border: '1px solid var(--gold)', padding: '0.75rem 2rem', borderRadius: '100px'
      }}>
        Return Home
      </a>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 70 }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout><HomePage /></Layout>} />
      <Route path="/blog" component={() => <Layout><BlogPage /></Layout>} />
      <Route path="/blog/:id" component={({ params }) => <Layout><BlogDetailPage id={parseInt(params.id)} /></Layout>} />
      <Route path="/case-studies" component={() => <Layout><CaseStudiesPage /></Layout>} />
      <Route path="/tools" component={() => <Layout><ToolsPage /></Layout>} />
      <Route path="/tools/:id" component={() => <Layout><ToolsPage /></Layout>} />
      <Route path="/longevity-hub" component={() => <Layout><LongevityHubPage /></Layout>} />
      <Route path="/shop" component={() => <Layout><ShopPage /></Layout>} />
      <Route path="/quiz" component={() => <><Navbar /><QuizPage /><Footer /></>} />
      <Route path="/about" component={() => <Layout><AboutPage /></Layout>} />
      <Route path="/consult" component={() => <Layout><ConsultPage /></Layout>} />
      <Route path="/resources" component={() => <Layout><ResourcesPage /></Layout>} />

      {/* New Longevity Geroscience Routes */}
      <Route path="/prakriti-test" component={() => <Layout><PrakritiTestPage /></Layout>} />
      <Route path="/geroscience-map" component={() => <Layout><GeroscienceMapPage /></Layout>} />
      <Route path="/mitochondria-tool" component={() => <Layout><MitochondriaToolPage /></Layout>} />
      <Route path="/hpa-burnout" component={() => <Layout><HpaBurnoutPage /></Layout>} />
      <Route path="/dht-block" component={() => <Layout><DhtBlockPage /></Layout>} />
      <Route path="/gut-restoration" component={() => <Layout><GutRestorationPage /></Layout>} />
      <Route path="/dermal-crocin" component={() => <Layout><DermalCrocinPage /></Layout>} />
      <Route path="/zone2-cardio" component={() => <Layout><Zone2CardioPage /></Layout>} />
      <Route path="/clinical-trials" component={() => <Layout><ClinicalTrialsPage /></Layout>} />
      <Route path="/medical-board" component={() => <Layout><MedicalBoardPage /></Layout>} />
      <Route path="/sourcing-index" component={() => <Layout><SourcingIndexPage /></Layout>} />
      <Route path="/rasayana-geroscience" component={() => <Layout><RasayanaGerosciencePage /></Layout>} />
      <Route path="/stacking-protocols" component={() => <Layout><StackingProtocolsPage /></Layout>} />
      <Route path="/botanical-dosage" component={() => <Layout><BotanicalDosagePage /></Layout>} />
      <Route path="/epigenetic-clock" component={() => <Layout><EpigeneticClockPage /></Layout>} />
      <Route path="/circadian-planner" component={() => <Layout><CircadianPlannerPage /></Layout>} />
      <Route path="/sleep-debt" component={() => <Layout><SleepDebtPage /></Layout>} />
      <Route path="/wellness-builder" component={() => <Layout><WellnessBuilderPage /></Layout>} />
      <Route path="/lab-intake" component={() => <Layout><LabIntakePage /></Layout>} />
      <Route path="/clinical-cases" component={() => <Layout><ClinicalCasesPage /></Layout>} />

      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CartProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <Router />
      </WouterRouter>
      <CartDrawer />
    </CartProvider>
  );
}

export default App;
