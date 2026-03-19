import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Bathroom from "./pages/Bathroom";
import Kitchen from "./pages/Kitchen";
import Construction from "./pages/Construction";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import DynamicForm from "./pages/DynamicForm";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import LeadCaptureProvider from "./components/LeadCaptureProvider";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/bathroom" component={Bathroom} />
      <Route path="/kitchen" component={Kitchen} />
      <Route path="/construction" component={Construction} />
      <Route path="/products" component={Products} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/form/:slug" component={DynamicForm} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <FloatingWhatsApp />
          <LeadCaptureProvider />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
