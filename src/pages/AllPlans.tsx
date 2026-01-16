import { allPlans } from "@/data/RecommendationEngine";
import { VPSCard } from "@/components/VPSCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AllPlans() {
  const [search, setSearch] = useState("");
  const [filterProvider, setFilterProvider] = useState("all");
  const { t } = useTranslation();

  const providers = Array.from(new Set(allPlans.map(p => p.provider)));

  const filtered = allPlans.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.notes.toLowerCase().includes(search.toLowerCase());
    const matchesProvider = filterProvider === "all" || p.provider === filterProvider;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-display font-bold">{t('plans.title')}</h1>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('plans.search')} 
              className="pl-8 bg-card/80" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filterProvider} onValueChange={setFilterProvider}>
            <SelectTrigger className="w-[180px] bg-card/80">
              <SelectValue placeholder={t('plans.provider')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('plans.allProviders')}</SelectItem>
              {providers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((plan, idx) => (
          <VPSCard key={idx} plan={plan} />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {t('plans.noResults')}
        </div>
      )}
    </div>
  );
}
