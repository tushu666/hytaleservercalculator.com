import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Recommender from "@/pages/Recommender";
import AllPlans from "@/pages/AllPlans";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";

// Use hash-based routing (/#/) to support opening index.html directly via file:// protocol
function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/recommender" component={Recommender} />
          <Route path="/all-plans" component={AllPlans} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
