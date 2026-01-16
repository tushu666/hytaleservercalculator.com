import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import kweebecVillage from "@/assets/images/kweebec-village.webp";
import { ArrowRight, Server, Shield, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-display font-black text-primary drop-shadow-sm tracking-tight">
          {t('home.heroTitle')}
        </h1>
        <p className="max-w-[800px] text-xl md:text-2xl text-muted-foreground font-semibold">
          {t('home.heroSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/recommender">
            <Button size="lg" className="h-14 px-8 text-xl font-bold shadow-xl shadow-primary/20">
              {t('home.startConfig')} <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
          <Link href="/all-plans">
            <Button size="lg" variant="outline" className="h-14 px-8 text-xl bg-background/50 backdrop-blur">
              {t('home.browsePlans')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="bg-card/80 backdrop-blur p-6 rounded-xl border shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-secondary/20 rounded-full text-secondary-foreground">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">{t('home.features.perfTitle')}</h3>
          <p className="text-muted-foreground">{t('home.features.perfDesc')}</p>
        </div>
        <div className="bg-card/80 backdrop-blur p-6 rounded-xl border shadow-sm flex flex-col items-center text-center space-y-4">
           <div className="p-4 bg-primary/20 rounded-full text-primary">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">{t('home.features.ddosTitle')}</h3>
          <p className="text-muted-foreground">{t('home.features.ddosDesc')}</p>
        </div>
        <div className="bg-card/80 backdrop-blur p-6 rounded-xl border shadow-sm flex flex-col items-center text-center space-y-4">
           <div className="p-4 bg-accent/20 rounded-full text-accent-foreground">
            <Server className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold">{t('home.features.globalTitle')}</h3>
          <p className="text-muted-foreground">{t('home.features.globalDesc')}</p>
        </div>
      </section>

      {/* Decorative Image */}
      <div className="w-full max-w-4xl mt-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
        <img src={kweebecVillage} alt="Kweebec Village" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
}
