import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useLocation } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Recommender from "@/pages/Recommender";
import AllPlans from "@/pages/AllPlans";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Wrapper to allow static location for SSG/SSR
function AppRouter({ ssrPath }: { ssrPath?: string }) {
  // Use a custom hook if ssrPath is provided to simulate the router location
  const useStaticLocation = () => [ssrPath, () => {}] as [string, (to: string) => void];

  return (
    <Router hook={ssrPath ? useStaticLocation : undefined}>
      <InnerRoutes />
    </Router>
  );
}

function InnerRoutes() {
    return (
        <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/recommender" component={Recommender} />
          <Route path="/all-plans" component={AllPlans} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )
}

function App({ ssrPath }: { ssrPath?: string }) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = t('meta.title');
  }, [i18n.language, t]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter ssrPath={ssrPath} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
