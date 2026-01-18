import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import hytaleLogo from "@/assets/images/hytale-logo.png";
import bgMain from "@/assets/images/bg-main.png";
import { cn } from "@/lib/utils";
import { Home, Server, Settings } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.home'), path: "/", icon: <Home className="w-4 h-4" /> },
    { name: t('nav.recommender'), path: "/recommender", icon: <Settings className="w-4 h-4" /> },
    { name: t('nav.allPlans'), path: "/all-plans", icon: <Server className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body text-foreground">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgMain})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-background/80 backdrop-blur-sm" /> {/* Overlay for readability */}
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center px-4 mx-auto">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src={hytaleLogo} alt="Hytale Logo" className="h-8 w-auto object-contain" />
            <span className="hidden font-display font-bold sm:inline-block text-xl text-primary">
              {t('nav.brand')}
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 transition-colors hover:text-primary",
                  location === item.path ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-screen-xl mx-auto">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('footer.builtFor')}
          </p>
        </div>
      </footer>
    </div>
  );
}
