import React from 'react';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Configure i18next
// Using a singleton configuration to ensure it's initialized before usage
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      resources: {
        en: {
          translation: {
            meta: {
              title: "Hytale Server Calculator"
            },
            nav: {
              home: "Home",
              recommender: "Recommender",
              allPlans: "All Plans",
              brand: "Hytale Server Calculator"
            },
            footer: {
              builtFor: "Built for the Hytale Community. Not affiliated with Hypixel Studios."
            },
            home: {
              heroTitle: "Ready for Orbis?",
              heroSubtitle: "Don't let lag ruin your adventure. Find the perfect VPS for your Hytale server in seconds.",
              startConfig: "Start Configuration",
              browsePlans: "Browse All Plans",
              features: {
                perfTitle: "Performance First",
                perfDesc: "We filter for high-frequency CPUs and NVMe storage to ensure smooth block updates.",
                ddosTitle: "DDoS Ready",
                ddosDesc: "Public servers need protection. We highlight providers with built-in game shielding.",
                globalTitle: "Global Reach",
                globalDesc: "Find servers near you or your community to minimize latency."
              }
            },
            recommender: {
              title: "Find Your Perfect Hytale Server",
              subtitle: "Tell us about your adventure, and we'll suggest the best hardware.",
              findBtn: "Find My Server",
              refreshBtn: "Refresh",
              steps: {
                players: "How many players?",
                playersLabels: ["Small Party (5)", "Community (100+)"],
                mods: "Modding Level",
                modsOptions: {
                  vanilla: { title: "Vanilla / Light", desc: "Standard gameplay, no heavy mods." },
                  light: { title: "Moderate Mods", desc: "Some plugins or gameplay tweaks." },
                  heavy: { title: "Heavy Modpack", desc: "Complex systems, many custom assets." }
                },
                region: "Preferred Region",
                regionPlaceholder: "Select a region (Optional)",
                regionAny: "Anywhere",
                regions: {
                  usa: "North America (USA/Canada)",
                  europe: "Europe (Germany, UK, France...)",
                  asia: "Asia (Singapore, Japan, India...)",
                  australia: "Oceania (Australia/Sydney)"
                }
              },
              results: {
                title: "Recommended Plans",
                subtitle: "Best matches for your specifications",
                otherOptions: "Other Good Options",
                estimator: {
                  title: "Cost Estimator",
                  desc: "Adjust duration to see total cost",
                  months: "Months"
                }
              }
            },
            plans: {
              title: "All Server Plans",
              search: "Search plans...",
              provider: "Provider",
              allProviders: "All Providers",
              noResults: "No plans found matching your criteria."
            },
            card: {
              bestMatch: "Best Match",
              viewDeal: "View Deal",
              monthly: "Monthly",
              total: "Total for {{count}} mos"
            }
          }
        },
        zh: {
          translation: {
            meta: {
              title: "Hytale 服务器计算器"
            },
            nav: { home: "首页", recommender: "配置推荐", allPlans: "所有套餐", brand: "Hytale 服务器计算器" },
            footer: { builtFor: "为 Hytale 社区构建。与 Hypixel Studios 无关。" },
            home: {
              heroTitle: "准备好探索 Orbis 了吗？",
              heroSubtitle: "别让延迟毁了你的冒险。几秒钟内找到适合你 Hytale 服务器的完美 VPS。",
              startConfig: "开始配置",
              browsePlans: "浏览所有套餐",
              features: {
                perfTitle: "性能优先", perfDesc: "筛选高频 CPU 和 NVMe 存储，确保方块更新流畅。",
                ddosTitle: "DDoS 防护", ddosDesc: "公开服务器需要保护。我们重点推荐内置游戏防护的供应商。",
                globalTitle: "全球覆盖", globalDesc: "寻找离你或社区最近的服务器以最小化延迟。"
              }
            },
            recommender: {
              title: "寻找完美的 Hytale 服务器",
              subtitle: "告诉我们你的冒险计划，我们将推荐最佳硬件。",
              findBtn: "寻找服务器",
              refreshBtn: "重置",
              steps: {
                players: "有多少玩家？",
                playersLabels: ["小队 (5)", "社区 (100+)"],
                mods: "模组等级",
                modsOptions: {
                  vanilla: { title: "原版 / 轻量", desc: "标准玩法，无重度模组。" },
                  light: { title: "中度模组", desc: "一些插件或玩法调整。" },
                  heavy: { title: "重度模组包", desc: "复杂系统，大量自定义资源。" }
                },
                region: "首选地区",
                regionPlaceholder: "选择地区（可选）",
                regionAny: "任何地方",
                regions: { usa: "北美 (美国/加拿大)", europe: "欧洲 (德国/英国/法国...)", asia: "亚洲 (新加坡/日本/印度...)", australia: "大洋洲 (澳大利亚/悉尼)" }
              },
              results: {
                title: "推荐套餐",
                subtitle: "最符合你规格的匹配",
                otherOptions: "其他不错的选择",
                estimator: { title: "成本估算器", desc: "调整时长以查看总成本", months: "月" }
              }
            },
            plans: { title: "所有服务器套餐", search: "搜索套餐...", provider: "供应商", allProviders: "所有供应商", noResults: "未找到符合条件的套餐。" },
            card: { bestMatch: "最佳匹配", viewDeal: "查看优惠", monthly: "月付", total: "{{count}} 个月总计" }
          }
        },
        es: {
          translation: {
            meta: {
              title: "Calculadora de Servidores Hytale"
            },
            nav: { home: "Inicio", recommender: "Recomendador", allPlans: "Todos los Planes", brand: "Calculadora Hytale" },
            footer: { builtFor: "Creado para la comunidad de Hytale. No afiliado a Hypixel Studios." },
            home: {
              heroTitle: "¿Listo para Orbis?",
              heroSubtitle: "No dejes que el lag arruine tu aventura. Encuentra el VPS perfecto para tu servidor Hytale en segundos.",
              startConfig: "Iniciar Configuración",
              browsePlans: "Ver Todos los Planes",
              features: {
                perfTitle: "Rendimiento Primero", perfDesc: "Filtramos CPUs de alta frecuencia y almacenamiento NVMe para asegurar actualizaciones de bloques fluidas.",
                ddosTitle: "Listo para DDoS", ddosDesc: "Los servidores públicos necesitan protección. Destacamos proveedores con protección de juegos integrada.",
                globalTitle: "Alcance Global", globalDesc: "Encuentra servidores cerca de ti o tu comunidad para minimizar la latencia."
              }
            },
            recommender: {
              title: "Encuentra tu Servidor Hytale Perfecto",
              subtitle: "Cuéntanos sobre tu aventura y te sugeriremos el mejor hardware.",
              findBtn: "Buscar Mi Servidor",
              refreshBtn: "Actualizar",
              steps: {
                players: "¿Cuántos jugadores?",
                playersLabels: ["Grupo Pequeño (5)", "Comunidad (100+)"],
                mods: "Nivel de Mods",
                modsOptions: {
                  vanilla: { title: "Vanilla / Ligero", desc: "Juego estándar, sin mods pesados." },
                  light: { title: "Mods Moderados", desc: "Algunos plugins o ajustes de juego." },
                  heavy: { title: "Paquete de Mods Pesado", desc: "Sistemas complejos, muchos recursos personalizados." }
                },
                region: "Región Preferida",
                regionPlaceholder: "Selecciona una región (Opcional)",
                regionAny: "Cualquier lugar",
                regions: { usa: "Norteamérica (EE.UU./Canadá)", europe: "Europa (Alemania, Reino Unido...)", asia: "Asia (Singapur, Japón...)", australia: "Oceanía (Australia)" }
              },
              results: {
                title: "Planes Recomendados",
                subtitle: "Mejores coincidencias para tus especificaciones",
                otherOptions: "Otras Buenas Opciones",
                estimator: { title: "Estimador de Costos", desc: "Ajusta la duración para ver el costo total", months: "Meses" }
              }
            },
            plans: { title: "Todos los Planes", search: "Buscar planes...", provider: "Proveedor", allProviders: "Todos los Proveedores", noResults: "No se encontraron planes." },
            card: { bestMatch: "Mejor Opción", viewDeal: "Ver Oferta", monthly: "Mensual", total: "Total por {{count}} mes(es)" }
          }
        },
        pt: {
          translation: {
            meta: {
              title: "Calculadora de Servidores Hytale"
            },
            nav: { home: "Início", recommender: "Recomendador", allPlans: "Planos", brand: "Calculadora Hytale" },
            footer: { builtFor: "Feito para a comunidade Hytale. Não afiliado à Hypixel Studios." },
            home: {
              heroTitle: "Pronto para Orbis?",
              heroSubtitle: "Não deixe o lag estragar sua aventura. Encontre o VPS perfeito para seu servidor Hytale em segundos.",
              startConfig: "Iniciar Configuração",
              browsePlans: "Ver Todos os Planos",
              features: {
                perfTitle: "Desempenho Primeiro", perfDesc: "Filtramos CPUs de alta frequência e NVMe para garantir fluidez.",
                ddosTitle: "Proteção DDoS", ddosDesc: "Servidores públicos precisam de proteção. Destacamos provedores com shield gamer.",
                globalTitle: "Alcance Global", globalDesc: "Encontre servidores próximos a você para minimizar a latência."
              }
            },
            recommender: {
              title: "Encontre seu Servidor Perfeito",
              subtitle: "Conte-nos sobre sua aventura e sugeriremos o melhor hardware.",
              findBtn: "Buscar Servidor",
              refreshBtn: "Atualizar",
              steps: {
                players: "Quantos jogadores?",
                playersLabels: ["Grupo Pequeno (5)", "Comunidade (100+)"],
                mods: "Nível de Mods",
                modsOptions: {
                  vanilla: { title: "Vanilla / Leve", desc: "Jogabilidade padrão, sem mods pesados." },
                  light: { title: "Mods Moderados", desc: "Alguns plugins ou ajustes." },
                  heavy: { title: "Modpack Pesado", desc: "Sistemas complexos, muitos assets." }
                },
                region: "Região Preferida",
                regionPlaceholder: "Selecione uma região (Opcional)",
                regionAny: "Qualquer lugar",
                regions: { usa: "América do Norte", europe: "Europa", asia: "Ásia", australia: "Oceania" }
              },
              results: {
                title: "Planos Recomendados",
                subtitle: "Melhores opções para você",
                otherOptions: "Outras Boas Opções",
                estimator: { title: "Estimativa de Custo", desc: "Ajuste a duração para ver o total", months: "Meses" }
              }
            },
            plans: { title: "Todos os Planos", search: "Buscar...", provider: "Provedor", allProviders: "Todos", noResults: "Nenhum plano encontrado." },
            card: { bestMatch: "Melhor Escolha", viewDeal: "Ver Oferta", monthly: "Mensal", total: "Total por {{count}} m(s)" }
          }
        },
        fr: {
          translation: {
            meta: {
              title: "Calculateur de Serveur Hytale"
            },
            nav: { home: "Accueil", recommender: "Recommandeur", allPlans: "Tous les plans", brand: "Calculateur Hytale" },
            footer: { builtFor: "Conçu pour la communauté Hytale. Non affilié à Hypixel Studios." },
            home: {
              heroTitle: "Prêt pour Orbis ?",
              heroSubtitle: "Ne laissez pas le lag gâcher votre aventure. Trouvez le VPS parfait pour votre serveur Hytale en quelques secondes.",
              startConfig: "Commencer",
              browsePlans: "Voir les plans",
              features: {
                perfTitle: "Performance avant tout", perfDesc: "CPUs haute fréquence et stockage NVMe pour une fluidité optimale.",
                ddosTitle: "Protection DDoS", ddosDesc: "Protection anti-DDoS incluse pour les serveurs publics.",
                globalTitle: "Portée mondiale", globalDesc: "Des serveurs proches de chez vous pour une latence minimale."
              }
            },
            recommender: {
              title: "Trouvez votre serveur idéal",
              subtitle: "Dites-nous en plus sur votre aventure, nous suggérerons le meilleur matériel.",
              findBtn: "Trouver mon serveur",
              refreshBtn: "Actualiser",
              steps: {
                players: "Combien de joueurs ?",
                playersLabels: ["Petit groupe (5)", "Communauté (100+)"],
                mods: "Niveau de mods",
                modsOptions: {
                  vanilla: { title: "Vanilla / Léger", desc: "Jeu standard, pas de gros mods." },
                  light: { title: "Mods modérés", desc: "Quelques plugins ou ajustements." },
                  heavy: { title: "Gros Modpack", desc: "Systèmes complexes, beaucoup d'assets." }
                },
                region: "Région préférée",
                regionPlaceholder: "Choisir une région (Optionnel)",
                regionAny: "N'importe où",
                regions: { usa: "Amérique du Nord", europe: "Europe", asia: "Asie", australia: "Océanie" }
              },
              results: {
                title: "Plans recommandés",
                subtitle: "Meilleures correspondances",
                otherOptions: "Autres bonnes options",
                estimator: { title: "Estimateur de coût", desc: "Ajustez la durée pour voir le total", months: "Mois" }
              }
            },
            plans: { title: "Tous les plans", search: "Rechercher...", provider: "Fournisseur", allProviders: "Tous", noResults: "Aucun plan trouvé." },
            card: { bestMatch: "Meilleur choix", viewDeal: "Voir l'offre", monthly: "/mois", total: "Total pour {{count}} mois" }
          }
        },
        de: {
          translation: {
            meta: {
              title: "Hytale Server Rechner"
            },
            nav: { home: "Start", recommender: "Empfehlung", allPlans: "Alle Pläne", brand: "Hytale Rechner" },
            footer: { builtFor: "Für die Hytale-Community gebaut. Nicht verbunden mit Hypixel Studios." },
            home: {
              heroTitle: "Bereit für Orbis?",
              heroSubtitle: "Lass Lag nicht dein Abenteuer ruinieren. Finde den perfekten VPS für deinen Hytale-Server in Sekunden.",
              startConfig: "Konfiguration starten",
              browsePlans: "Alle Pläne ansehen",
              features: {
                perfTitle: "Leistung zuerst", perfDesc: "Hochfrequenz-CPUs und NVMe-Speicher für flüssiges Gameplay.",
                ddosTitle: "DDoS-Schutz", ddosDesc: "Öffentliche Server brauchen Schutz. Wir zeigen Anbieter mit integriertem Schutz.",
                globalTitle: "Globale Reichweite", globalDesc: "Finde Server in deiner Nähe für minimale Latenz."
              }
            },
            recommender: {
              title: "Finde deinen perfekten Server",
              subtitle: "Erzähl uns von deinem Abenteuer, wir schlagen die beste Hardware vor.",
              findBtn: "Server finden",
              refreshBtn: "Aktualisieren",
              steps: {
                players: "Wie viele Spieler?",
                playersLabels: ["Kleine Gruppe (5)", "Community (100+)"],
                mods: "Mod-Level",
                modsOptions: {
                  vanilla: { title: "Vanilla / Leicht", desc: "Standard-Gameplay, keine schweren Mods." },
                  light: { title: "Mittlere Mods", desc: "Einige Plugins oder Anpassungen." },
                  heavy: { title: "Schweres Modpack", desc: "Komplexe Systeme, viele Assets." }
                },
                region: "Bevorzugte Region",
                regionPlaceholder: "Region wählen (Optional)",
                regionAny: "Überall",
                regions: { usa: "Nordamerika", europe: "Europa", asia: "Asien", australia: "Ozeanien" }
              },
              results: {
                title: "Empfohlene Pläne",
                subtitle: "Beste Treffer für deine Anforderungen",
                otherOptions: "Andere gute Optionen",
                estimator: { title: "Kostenschätzer", desc: "Dauer anpassen für Gesamtkosten", months: "Monate" }
              }
            },
            plans: { title: "Alle Server-Pläne", search: "Suchen...", provider: "Anbieter", allProviders: "Alle", noResults: "Keine Pläne gefunden." },
            card: { bestMatch: "Beste Wahl", viewDeal: "Angebot ansehen", monthly: "Monatlich", total: "Gesamt für {{count}} Mon." }
          }
        },
        ru: {
          translation: {
            meta: {
              title: "Калькулятор Серверов Hytale"
            },
            nav: { home: "Главная", recommender: "Подбор", allPlans: "Все тарифы", brand: "Hytale Калькулятор" },
            footer: { builtFor: "Создано для сообщества Hytale. Не связано с Hypixel Studios." },
            home: {
              heroTitle: "Готовы к Orbis?",
              heroSubtitle: "Не позволяйте лагам испортить приключение. Найдите идеальный VPS за секунды.",
              startConfig: "Начать подбор",
              browsePlans: "Все тарифы",
              features: {
                perfTitle: "Производительность", perfDesc: "Высокочастотные CPU и NVMe для плавной игры.",
                ddosTitle: "Защита от DDoS", ddosDesc: "Мы выделяем провайдеров с встроенной защитой.",
                globalTitle: "Глобальный охват", globalDesc: "Серверы рядом с вами для минимального пинга."
              }
            },
            recommender: {
              title: "Найдите идеальный сервер",
              subtitle: "Расскажите о ваших планах, и мы подберем железо.",
              findBtn: "Найти сервер",
              refreshBtn: "Обновить",
              steps: {
                players: "Сколько игроков?",
                playersLabels: ["Группа (5)", "Сообщество (100+)"],
                mods: "Уровень модов",
                modsOptions: {
                  vanilla: { title: "Ванилла / Легкий", desc: "Стандартная игра, без тяжелых модов." },
                  light: { title: "Средние моды", desc: "Немного плагинов." },
                  heavy: { title: "Тяжелая сборка", desc: "Сложные системы, много ассетов." }
                },
                region: "Регион",
                regionPlaceholder: "Выберите регион (Опционально)",
                regionAny: "Любой",
                regions: { usa: "Северная Америка", europe: "Европа", asia: "Азия", australia: "Океания" }
              },
              results: {
                title: "Рекомендуемые тарифы",
                subtitle: "Лучшие совпадения",
                otherOptions: "Другие варианты",
                estimator: { title: "Калькулятор цены", desc: "Измените срок для расчета", months: "Мес." }
              }
            },
            plans: { title: "Все тарифы", search: "Поиск...", provider: "Провайдер", allProviders: "Все", noResults: "Тарифы не найдены." },
            card: { bestMatch: "Лучший выбор", viewDeal: "Смотреть", monthly: "/мес", total: "Итого за {{count}} мес." }
          }
        },
        ja: {
          translation: {
            meta: {
              title: "Hytale サーバー計算機"
            },
            nav: { home: "ホーム", recommender: "サーバー診断", allPlans: "全プラン", brand: "Hytale 計算機" },
            footer: { builtFor: "Hytaleコミュニティのために作成。Hypixel Studiosとは無関係です。" },
            home: {
              heroTitle: "Orbisへの準備はいい？",
              heroSubtitle: "ラグで冒険を台無しにしないで。Hytaleに最適なVPSを数秒で見つけよう。",
              startConfig: "構成を開始",
              browsePlans: "全プランを見る",
              features: {
                perfTitle: "パフォーマンス優先", perfDesc: "高周波CPUとNVMeストレージでスムーズな動作を保証。",
                ddosTitle: "DDoS対策", ddosDesc: "公開サーバーには保護が必要です。ゲーム保護機能付きのプロバイダーを推奨。",
                globalTitle: "グローバル対応", globalDesc: "近くのサーバーを見つけてレイテンシを最小限に。"
              }
            },
            recommender: {
              title: "理想のサーバーを見つける",
              subtitle: "冒険の計画を教えてください。最適なハードウェアを提案します。",
              findBtn: "サーバーを探す",
              refreshBtn: "更新",
              steps: {
                players: "プレイヤー人数は？",
                playersLabels: ["少人数 (5)", "コミュニティ (100+)"],
                mods: "MODレベル",
                modsOptions: {
                  vanilla: { title: "バニラ / 軽量", desc: "標準的なプレイ、重いMODなし。" },
                  light: { title: "中規模MOD", desc: "いくつかのプラグインや調整。" },
                  heavy: { title: "大規模MODパック", desc: "複雑なシステム、多数のアセット。" }
                },
                region: "希望の地域",
                regionPlaceholder: "地域を選択 (任意)",
                regionAny: "どこでも",
                regions: { usa: "北米", europe: "ヨーロッパ", asia: "アジア", australia: "オセアニア" }
              },
              results: {
                title: "おすすめプラン",
                subtitle: "条件に最適なマッチ",
                otherOptions: "その他の選択肢",
                estimator: { title: "コスト見積もり", desc: "期間を調整して合計を確認", months: "ヶ月" }
              }
            },
            plans: { title: "全サーバープラン", search: "検索...", provider: "プロバイダー", allProviders: "すべて", noResults: "プランが見つかりません。" },
            card: { bestMatch: "ベストマッチ", viewDeal: "詳細を見る", monthly: "月額", total: "{{count}}ヶ月の合計" }
          }
        },
        ko: {
          translation: {
            meta: {
              title: "Hytale 서버 계산기"
            },
            nav: { home: "홈", recommender: "서버 추천", allPlans: "모든 플랜", brand: "Hytale 계산기" },
            footer: { builtFor: "Hytale 커뮤니티를 위해 제작됨. Hypixel Studios와 무관함." },
            home: {
              heroTitle: "Orbis로 떠날 준비 되셨나요?",
              heroSubtitle: "렉 때문에 모험을 망치지 마세요. Hytale 서버를 위한 완벽한 VPS를 찾아보세요.",
              startConfig: "구성 시작",
              browsePlans: "모든 플랜 보기",
              features: {
                perfTitle: "성능 우선", perfDesc: "고주파 CPU와 NVMe 스토리지로 부드러운 플레이 보장.",
                ddosTitle: "DDoS 방어", ddosDesc: "공개 서버는 보호가 필요합니다. 게임 방어 기능이 있는 공급자를 추천합니다.",
                globalTitle: "글로벌 도달", globalDesc: "가까운 서버를 찾아 지연 시간을 최소화하세요."
              }
            },
            recommender: {
              title: "완벽한 서버 찾기",
              subtitle: "모험 계획을 알려주시면 최고의 하드웨어를 제안해 드립니다.",
              findBtn: "서버 찾기",
              refreshBtn: "새로고침",
              steps: {
                players: "플레이어 수?",
                playersLabels: ["소규모 파티 (5)", "커뮤니티 (100+)"],
                mods: "모드 레벨",
                modsOptions: {
                  vanilla: { title: "바닐라 / 라이트", desc: "기본 플레이, 무거운 모드 없음." },
                  light: { title: "중간 모드", desc: "일부 플러그인 또는 조정." },
                  heavy: { title: "헤비 모드팩", desc: "복잡한 시스템, 많은 에셋." }
                },
                region: "선호 지역",
                regionPlaceholder: "지역 선택 (선택 사항)",
                regionAny: "어디서나",
                regions: { usa: "북미", europe: "유럽", asia: "아시아", australia: "오세아니아" }
              },
              results: {
                title: "추천 플랜",
                subtitle: "사양에 가장 적합한 매치",
                otherOptions: "다른 좋은 옵션",
                estimator: { title: "비용 계산기", desc: "기간을 조정하여 총 비용 확인", months: "개월" }
              }
            },
            plans: { title: "모든 서버 플랜", search: "검색...", provider: "제공자", allProviders: "모두", noResults: "플랜을 찾을 수 없습니다." },
            card: { bestMatch: "최고의 선택", viewDeal: "거래 보기", monthly: "월", total: "{{count}}개월 합계" }
          }
        },
        id: {
          translation: {
            meta: {
              title: "Kalkulator Server Hytale"
            },
            nav: { home: "Beranda", recommender: "Rekomendasi", allPlans: "Semua Paket", brand: "Kalkulator Hytale" },
            footer: { builtFor: "Dibuat untuk Komunitas Hytale. Tidak berafiliasi dengan Hypixel Studios." },
            home: {
              heroTitle: "Siap untuk Orbis?",
              heroSubtitle: "Jangan biarkan lag merusak petualanganmu. Temukan VPS sempurna untuk server Hytale dalam hitungan detik.",
              startConfig: "Mulai Konfigurasi",
              browsePlans: "Lihat Semua Paket",
              features: {
                perfTitle: "Performa Utama", perfDesc: "Kami menyaring CPU frekuensi tinggi dan NVMe untuk kelancaran.",
                ddosTitle: "Siap DDoS", ddosDesc: "Server publik butuh perlindungan. Kami menyoroti penyedia dengan game shield.",
                globalTitle: "Jangkauan Global", globalDesc: "Temukan server di dekatmu untuk latensi minimal."
              }
            },
            recommender: {
              title: "Temukan Server Sempurna",
              subtitle: "Ceritakan petualanganmu, kami sarankan perangkat keras terbaik.",
              findBtn: "Cari Server",
              refreshBtn: "Segarkan",
              steps: {
                players: "Berapa pemain?",
                playersLabels: ["Grup Kecil (5)", "Komunitas (100+)"],
                mods: "Level Mod",
                modsOptions: {
                  vanilla: { title: "Vanilla / Ringan", desc: "Gameplay standar, tanpa mod berat." },
                  light: { title: "Mod Sedang", desc: "Beberapa plugin atau penyesuaian." },
                  heavy: { title: "Modpack Berat", desc: "Sistem kompleks, banyak aset." }
                },
                region: "Wilayah Pilihan",
                regionPlaceholder: "Pilih wilayah (Opsional)",
                regionAny: "Di mana saja",
                regions: { usa: "Amerika Utara", europe: "Eropa", asia: "Asia", australia: "Oseania" }
              },
              results: {
                title: "Paket Rekomendasi",
                subtitle: "Pencocokan terbaik untuk spesifikasi",
                otherOptions: "Pilihan Bagus Lainnya",
                estimator: { title: "Estimasi Biaya", desc: "Sesuaikan durasi untuk lihat total", months: "Bulan" }
              }
            },
            plans: { title: "Semua Paket Server", search: "Cari...", provider: "Penyedia", allProviders: "Semua", noResults: "Tidak ada paket ditemukan." },
            card: { bestMatch: "Pilihan Terbaik", viewDeal: "Lihat Penawaran", monthly: "Bulanan", total: "Total untuk {{count}} bln" }
          }
        }
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage', 'cookie'],
      }
    });
}

export default i18n;
