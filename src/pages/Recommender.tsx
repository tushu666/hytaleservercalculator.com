import { useState } from "react";
import { type UserPreferences, recommendPlans, type VPSPlan } from "@/data/RecommendationEngine";
import { VPSCard } from "@/components/VPSCard";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Box, MapPin, Loader2, RefreshCw, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Recommender() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<VPSPlan[]>([]);
  const [duration, setDuration] = useState(1);
  const { t } = useTranslation();
  
  // Form State
  const [prefs, setPrefs] = useState<UserPreferences>({
    playerCount: 10,
    modLevel: "vanilla",
    region: "",
  });

  const handleRecommend = () => {
    setLoading(true);
    // Simulate thinking time for better UX
    setTimeout(() => {
      const recs = recommendPlans(prefs);
      setResults(recs);
      setLoading(false);
    }, 800);
  };

  const playersLabels = t('recommender.steps.playersLabels', { returnObjects: true }) as string[];

  return (
    <div className="space-y-12">
      {/* Wizard Section */}
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-primary">{t('recommender.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('recommender.subtitle')}</p>
        </div>

        <Card className="border-2 border-primary/20 shadow-xl bg-card/95 backdrop-blur">
          <CardContent className="p-8 space-y-8">
            
            {/* Step 1: Players */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary"><Users className="w-6 h-6" /></div>
                <Label className="text-xl font-semibold">{t('recommender.steps.players')}</Label>
              </div>
              <div className="px-2 pt-4 pb-2">
                <Slider 
                  defaultValue={[10]} 
                  max={100} 
                  step={5} 
                  value={[prefs.playerCount]}
                  onValueChange={(val) => setPrefs({...prefs, playerCount: val[0]})}
                  className="py-4"
                />
                <div className="flex justify-between text-sm font-bold text-primary">
                  <span>{playersLabels[0]}</span>
                  <span className="text-2xl text-foreground">{prefs.playerCount}</span>
                  <span>{playersLabels[1]}</span>
                </div>
              </div>
            </div>

            {/* Step 2: Mods */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary"><Box className="w-6 h-6" /></div>
                <Label className="text-xl font-semibold">{t('recommender.steps.mods')}</Label>
              </div>
              <RadioGroup 
                defaultValue="vanilla" 
                value={prefs.modLevel} 
                onValueChange={(val: any) => setPrefs({...prefs, modLevel: val})}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { id: "vanilla", title: t('recommender.steps.modsOptions.vanilla.title'), desc: t('recommender.steps.modsOptions.vanilla.desc') },
                  { id: "light", title: t('recommender.steps.modsOptions.light.title'), desc: t('recommender.steps.modsOptions.light.desc') },
                  { id: "heavy", title: t('recommender.steps.modsOptions.heavy.title'), desc: t('recommender.steps.modsOptions.heavy.desc') },
                ].map((opt) => (
                  <div key={opt.id}>
                    <RadioGroupItem value={opt.id} id={opt.id} className="peer sr-only" />
                    <Label
                      htmlFor={opt.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all h-full text-center"
                    >
                      <span className="text-lg font-bold mb-2">{opt.title}</span>
                      <span className="text-sm text-muted-foreground font-normal">{opt.desc}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Step 3: Region */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full text-primary"><MapPin className="w-6 h-6" /></div>
                <Label className="text-xl font-semibold">{t('recommender.steps.region')}</Label>
              </div>
              <Select value={prefs.region} onValueChange={(val) => setPrefs({...prefs, region: val})}>
                <SelectTrigger className="w-full text-lg h-12">
                  <SelectValue placeholder={t('recommender.steps.regionPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">{t('recommender.steps.regionAny')}</SelectItem>
                  <SelectItem value="USA">{t('recommender.steps.regions.usa')}</SelectItem>
                  <SelectItem value="Europe">{t('recommender.steps.regions.europe')}</SelectItem>
                  <SelectItem value="Asia">{t('recommender.steps.regions.asia')}</SelectItem>
                  <SelectItem value="Australia">{t('recommender.steps.regions.australia')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button size="lg" className="w-full text-lg font-bold h-14" onClick={handleRecommend} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : t('recommender.findBtn')}
            </Button>

          </CardContent>
        </Card>
      </section>

      {/* Results Section */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8 pb-16"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
               <div>
                  <h2 className="text-3xl font-display font-bold">{t('recommender.results.title')}</h2>
                  <p className="text-muted-foreground">{t('recommender.results.subtitle')}</p>
               </div>
               <Button variant="ghost" onClick={handleRecommend}><RefreshCw className="mr-2 h-4 w-4"/> {t('recommender.refreshBtn')}</Button>
            </div>

            {/* Cost Estimator */}
            <div className="bg-card/50 backdrop-blur border-2 border-primary/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-accent/20 rounded-full text-accent-foreground">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{t('recommender.results.estimator.title')}</h3>
                        <p className="text-sm text-muted-foreground">{t('recommender.results.estimator.desc')}</p>
                    </div>
                </div>
                <div className="flex-1 w-full md:max-w-md flex items-center gap-4 bg-background/50 p-3 rounded-lg border border-border/50">
                    <span className="text-sm font-semibold w-16 text-right text-muted-foreground">1 {t('recommender.results.estimator.months')}</span>
                    <Slider 
                        min={1} 
                        max={12} 
                        step={1} 
                        value={[duration]} 
                        onValueChange={(val) => setDuration(val[0])}
                        className="flex-1 cursor-pointer"
                    />
                    <div className="flex flex-col items-center w-16">
                        <span className="text-lg font-bold text-primary">{duration}</span>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">{t('recommender.results.estimator.months')}</span>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.slice(0, 3).map((plan, idx) => (
                <VPSCard key={idx} plan={plan} isRecommended={idx === 0} score={plan._score} duration={duration} />
              ))}
            </div>

            {results.length > 3 && (
               <div className="pt-8">
                 <h3 className="text-xl font-bold mb-4 text-muted-foreground">{t('recommender.results.otherOptions')}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {results.slice(3, 7).map((plan, idx) => (
                      <VPSCard key={idx + 3} plan={plan} duration={duration} />
                    ))}
                 </div>
               </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
