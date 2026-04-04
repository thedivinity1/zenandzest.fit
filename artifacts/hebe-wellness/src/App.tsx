import { Switch, Route, Router as WouterRouter } from "wouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ToolsPage from "./pages/ToolsPage";
import ShopPage from "./pages/ShopPage";
import QuizPage from "./pages/QuizPage";
import AboutPage from "./pages/AboutPage";
import ConsultPage from "./pages/ConsultPage";

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
      <Route path="/tools" component={() => <Layout><ToolsPage /></Layout>} />
      <Route path="/shop" component={() => <Layout><ShopPage /></Layout>} />
      <Route path="/quiz" component={() => <><Navbar /><QuizPage /><Footer /></>} />
      <Route path="/about" component={() => <Layout><AboutPage /></Layout>} />
      <Route path="/consult" component={() => <Layout><ConsultPage /></Layout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
