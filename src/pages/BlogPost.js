// src/pages/BlogPost.js - PÁGINA INDIVIDUAL DE ARTÍCULO DEL BLOG
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Importar imágenes existentes
import forexImg from '../assets/images/forex-home.jpg';
import criptoImg from '../assets/images/cripto-home.jpg';
import freebitcoinImg from '../assets/images/freebitcoin-home.jpg';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Datos completos de los artículos con contenido expandido
  const blogPosts = [
    {
      id: 1,
      title: {
        es: 'Estrategias Avanzadas de Trading para 2025',
        en: 'Advanced Trading Strategies for 2025',
        pt: 'Estratégias Avançadas de Trading para 2025',
        fr: 'Stratégies de Trading Avancées pour 2025',
        de: 'Fortgeschrittene Trading-Strategien für 2025',
        it: 'Strategie di Trading Avanzate per il 2025'
      },
      excerpt: {
        es: 'Descubre las técnicas más efectivas para maximizar tus ganancias en el mercado financiero actual.',
        en: 'Discover the most effective techniques to maximize your profits in the current financial market.',
        pt: 'Descubra as técnicas mais eficazes para maximizar seus lucros no mercado financeiro atual.',
        fr: 'Découvrez les techniques les plus efficaces pour maximiser vos profits sur le marché financier actuel.',
        de: 'Entdecken Sie die effektivsten Techniken, um Ihre Gewinne auf dem aktuellen Finanzmarkt zu maximieren.',
        it: 'Scopri le tecniche più efficaci per massimizzare i tuoi profitti nel mercato finanziario attuale.'
      },
      content: {
        es: `En el mundo del trading moderno, las estrategias tradicionales ya no son suficientes. Los mercados han evolucionado, y con ellos, las técnicas que debemos emplear para mantener una ventaja competitiva.

El análisis técnico ha evolucionado más allá de las simples líneas de soporte y resistencia. Hoy en día, los traders exitosos utilizan análisis de volumen por precio (VPA), análisis de estructura de mercado, y reconocimiento de zonas de liquidez.

La gestión de riesgo es el pilar fundamental de cualquier estrategia de trading exitosa. Los profesionales implementan dimensionamiento de posición dinámico, diversificación temporal, y hedging selectivo.

El aspecto psicológico del trading es a menudo subestimado. Los traders exitosos desarrollan disciplina emocional, sistemas de reglas claras, y rutinas de preparación mental.

La tecnología moderna ofrece herramientas poderosas como algoritmos de trading, análisis de sentimiento basado en IA, y backtesting avanzado.

El éxito en el trading moderno requiere una combinación de habilidades técnicas, gestión de riesgo sofisticada, fortaleza mental y aprovechamiento de la tecnología.`,
        en: `In the modern trading world, traditional strategies are no longer sufficient. Markets have evolved, and with them, the techniques we must employ to maintain a competitive edge.

Technical analysis has evolved beyond simple support and resistance lines. Today, successful traders use Volume Price Analysis (VPA), market structure analysis, and liquidity zone recognition.

Risk management is the fundamental pillar of any successful trading strategy. Professionals implement dynamic position sizing, temporal diversification, and selective hedging.

The psychological aspect of trading is often underestimated. Successful traders develop emotional discipline, clear rule systems, and mental preparation routines.

Modern technology offers powerful tools like trading algorithms, AI-based sentiment analysis, and advanced backtesting.

Success in modern trading requires a combination of technical skills, sophisticated risk management, mental strength, and technology leverage.`,
        pt: `No mundo do trading moderno, as estratégias tradicionais já não são suficientes. Os mercados evoluíram, e com eles, as técnicas que devemos empregar para manter uma vantagem competitiva.

A análise técnica evoluiu além das simples linhas de suporte e resistência. Hoje, os traders bem-sucedidos usam Análise de Volume por Preço (VPA), análise de estrutura de mercado, e reconhecimento de zonas de liquidez.

A gestão de risco é o pilar fundamental de qualquer estratégia de trading bem-sucedida. Os profissionais implementam dimensionamento de posição dinâmico, diversificação temporal, e hedge seletivo.

O aspecto psicológico do trading é frequentemente subestimado. Traders bem-sucedidos desenvolvem disciplina emocional, sistemas de regras claras, e rotinas de preparação mental.

A tecnologia moderna oferece ferramentas poderosas como algoritmos de trading, análise de sentimento baseada em IA, e backtesting avançado.

O sucesso no trading moderno requer uma combinação de habilidades técnicas, gestão de risco sofisticada, força mental e aproveitamento da tecnologia.`,
        fr: `Dans le monde du trading moderne, les stratégies traditionnelles ne suffisent plus. Les marchés ont évolué, et avec eux, les techniques que nous devons employer pour maintenir un avantage concurrentiel.

L'analyse technique a évolué au-delà des simples lignes de support et de résistance. Aujourd'hui, les traders à succès utilisent l'Analyse Volume Prix (VPA), l'analyse de structure de marché, et la reconnaissance des zones de liquidité.

La gestion de risque est le pilier fondamental de toute stratégie de trading réussie. Les professionnels implémentent le dimensionnement de position dynamique, la diversification temporelle, et la couverture sélective.

L'aspect psychologique du trading est souvent sous-estimé. Les traders à succès développent la discipline émotionnelle, des systèmes de règles claires, et des routines de préparation mentale.

La technologie moderne offre des outils puissants comme les algorithmes de trading, l'analyse de sentiment basée sur l'IA, et le backtesting avancé.

Le succès dans le trading moderne nécessite une combinaison de compétences techniques, gestion de risque sophistiquée, force mentale et exploitation de la technologie.`,
        de: `In der modernen Trading-Welt reichen traditionelle Strategien nicht mehr aus. Die Märkte haben sich entwickelt, und mit ihnen die Techniken, die wir einsetzen müssen, um einen Wettbewerbsvorteil zu behalten.

Die technische Analyse hat sich über einfache Unterstützungs- und Widerstandslinien hinaus entwickelt. Heute verwenden erfolgreiche Trader Volumen-Preis-Analyse (VPA), Marktstrukturanalyse und Erkennung von Liquiditätszonen.

Risikomanagement ist der grundlegende Pfeiler jeder erfolgreichen Trading-Strategie. Profis implementieren dynamische Positionsgrößenbestimmung, zeitliche Diversifikation und selektive Absicherung.

Der psychologische Aspekt des Tradings wird oft unterschätzt. Erfolgreiche Trader entwickeln emotionale Disziplin, klare Regelsysteme und mentale Vorbereitungsroutinen.

Moderne Technologie bietet mächtige Werkzeuge wie Trading-Algorithmen, KI-basierte Sentiment-Analyse und fortgeschrittenes Backtesting.

Erfolg im modernen Trading erfordert eine Kombination aus technischen Fähigkeiten, ausgeklügeltem Risikomanagement, mentaler Stärke und Technologienutzung.`,
        it: `Nel mondo del trading moderno, le strategie tradizionali non sono più sufficienti. I mercati si sono evoluti, e con essi, le tecniche che dobbiamo impiegare per mantenere un vantaggio competitivo.

L'analisi tecnica si è evoluta oltre le semplici linee di supporto e resistenza. Oggi, i trader di successo utilizzano l'Analisi Volume Prezzo (VPA), l'analisi della struttura di mercato, e il riconoscimento delle zone di liquidità.

La gestione del rischio è il pilastro fondamentale di qualsiasi strategia di trading di successo. I professionisti implementano dimensionamento dinamico delle posizioni, diversificazione temporale e copertura selettiva.

L'aspetto psicologico del trading è spesso sottovalutato. I trader di successo sviluppano disciplina emotiva, sistemi di regole chiare e routine di preparazione mentale.

La tecnologia moderna offre strumenti potenti come algoritmi di trading, analisi del sentiment basata su IA e backtesting avanzato.

Il successo nel trading moderno richiede una combinazione di competenze tecniche, gestione del rischio sofisticata, forza mentale e sfruttamento della tecnologia.`
      },
      category: 'trading',
      author: 'QbaPV Team',
      date: '2025-06-25',
      readTime: '8 min',
      views: 1247,
      image: forexImg,
      tags: ['trading', 'estrategias', 'finanzas']
    },
    {
      id: 2,
      title: {
        es: 'El Futuro de las Criptomonedas en 2025',
        en: 'The Future of Cryptocurrencies in 2025',
        pt: 'O Futuro das Criptomoedas em 2025',
        fr: 'L\'Avenir des Cryptomonnaies en 2025',
        de: 'Die Zukunft der Kryptowährungen in 2025',
        it: 'Il Futuro delle Criptovalute nel 2025'
      },
      excerpt: {
        es: 'Análisis profundo de las tendencias cripto y las oportunidades de inversión emergentes.',
        en: 'Deep analysis of crypto trends and emerging investment opportunities.',
        pt: 'Análise profunda das tendências cripto e oportunidades de investimento emergentes.',
        fr: 'Analyse approfondie des tendances crypto et des opportunités d\'investissement émergentes.',
        de: 'Tiefgreifende Analyse von Krypto-Trends und aufkommenden Investitionsmöglichkeiten.',
        it: 'Analisi approfondita delle tendenze crypto e delle opportunità di investimento emergenti.'
      },
      content: {
        es: `Las criptomonedas han experimentado una evolución sin precedentes, y 2025 marca un punto de inflexión crucial en su adopción masiva y regulación.

La adopción institucional ha alcanzado niveles nunca antes vistos. Los ETFs de Bitcoin y Ethereum han facilitado el acceso institucional, más empresas incluyen Bitcoin en sus reservas de efectivo, y las CBDC están en fase de implementación.

El marco regulatorio se ha clarificado significativamente con directrices claras para exchanges y custodios, tratamiento fiscal definido para diferentes tipos de activos, y marcos de compliance robustos pero manejables.

Los avances tecnológicos están impulsando nuevas aplicaciones: Layer 2 Solutions para escalabilidad mejorada, DeFi 3.0 más seguro y accesible, NFT Utilities con casos de uso reales, y Web3 Integration con aplicaciones cotidianas.

Las oportunidades de inversión se han diversificado: inversión directa en criptomonedas establecidas, staking y yield farming con riesgos calculados, inversión en infraestructura blockchain, y tokens de utilidad con casos de uso reales.

Es crucial entender los riesgos persistentes: volatilidad inherente del mercado, riesgos tecnológicos y de seguridad, cambios regulatorios inesperados, y competencia tecnológica.

2025 representa un año de maduración para el ecosistema cripto con un entorno más estable y predecible para los inversores.`,
        en: `Cryptocurrencies have experienced unprecedented evolution, and 2025 marks a crucial turning point in their mass adoption and regulation.

Institutional adoption has reached never-before-seen levels. Bitcoin and Ethereum ETFs have facilitated institutional access, more companies are including Bitcoin in their cash reserves, and CBDCs are in implementation phase.

The regulatory framework has been significantly clarified with clear guidelines for exchanges and custodians, defined tax treatment for different types of assets, and robust but manageable compliance frameworks.

Technological advances are driving new applications: Layer 2 Solutions for improved scalability, more secure and accessible DeFi 3.0, NFT Utilities with real use cases, and Web3 Integration with everyday applications.

Investment opportunities have diversified: direct investment in established cryptocurrencies, staking and yield farming with calculated risks, investment in blockchain infrastructure, and utility tokens with real use cases.

It's crucial to understand persistent risks: inherent market volatility, technological and security risks, unexpected regulatory changes, and technological competition.

2025 represents a year of maturation for the crypto ecosystem with a more stable and predictable environment for investors.`,
        pt: `As criptomoedas experimentaram uma evolução sem precedentes, e 2025 marca um ponto de virada crucial em sua adoção em massa e regulamentação.

A adoção institucional alcançou níveis nunca antes vistos. Os ETFs de Bitcoin e Ethereum facilitaram o acesso institucional, mais empresas incluem Bitcoin em suas reservas de caixa, e as CBDCs estão em fase de implementação.

O marco regulatório foi significativamente esclarecido com diretrizes claras para exchanges e custodiantes, tratamento fiscal definido para diferentes tipos de ativos, e estruturas de compliance robustas mas gerenciáveis.

Os avanços tecnológicos estão impulsionando novas aplicações: Soluções Layer 2 para escalabilidade melhorada, DeFi 3.0 mais seguro e acessível, NFT Utilities com casos de uso reais, e Integração Web3 com aplicações cotidianas.

As oportunidades de investimento se diversificaram: investimento direto em criptomoedas estabelecidas, staking e yield farming com riscos calculados, investimento em infraestrutura blockchain, e tokens de utilidade com casos de uso reais.

É crucial entender os riscos persistentes: volatilidade inerente do mercado, riscos tecnológicos e de segurança, mudanças regulatórias inesperadas, e competição tecnológica.

2025 representa um ano de maturação para o ecossistema cripto com um ambiente mais estável e previsível para os investidores.`,
        fr: `Les cryptomonnaies ont connu une évolution sans précédent, et 2025 marque un tournant crucial dans leur adoption de masse et leur réglementation.

L'adoption institutionnelle a atteint des niveaux jamais vus. Les ETF Bitcoin et Ethereum ont facilité l'accès institutionnel, plus d'entreprises incluent Bitcoin dans leurs réserves de trésorerie, et les CBDC sont en phase d'implémentation.

Le cadre réglementaire a été significativement clarifié avec des directives claires pour les exchanges et dépositaires, un traitement fiscal défini pour différents types d'actifs, et des cadres de conformité robustes mais gérables.

Les avancées technologiques stimulent de nouvelles applications : Solutions Layer 2 pour une évolutivité améliorée, DeFi 3.0 plus sûr et accessible, NFT Utilities avec des cas d'usage réels, et Intégration Web3 avec des applications quotidiennes.

Les opportunités d'investissement se sont diversifiées : investissement direct dans les cryptomonnaies établies, staking et yield farming avec risques calculés, investissement dans l'infrastructure blockchain, et tokens d'utilité avec cas d'usage réels.

Il est crucial de comprendre les risques persistants : volatilité inhérente du marché, risques technologiques et de sécurité, changements réglementaires inattendus, et compétition technologique.

2025 représente une année de maturation pour l'écosystème crypto avec un environnement plus stable et prévisible pour les investisseurs.`,
        de: `Kryptowährungen haben eine beispiellose Entwicklung erfahren, und 2025 markiert einen entscheidenden Wendepunkt in ihrer Massenadoption und Regulierung.

Die institutionelle Adoption hat nie dagewesene Niveaus erreicht. Bitcoin- und Ethereum-ETFs haben den institutionellen Zugang erleichtert, mehr Unternehmen nehmen Bitcoin in ihre Bargeldreserven auf, und CBDCs befinden sich in der Implementierungsphase.

Das regulatorische Framework wurde erheblich geklärt mit klaren Richtlinien für Börsen und Verwahrer, definierter steuerlicher Behandlung für verschiedene Asset-Typen, und robusten aber handhabbaren Compliance-Frameworks.

Technologische Fortschritte treiben neue Anwendungen voran: Layer-2-Lösungen für verbesserte Skalierbarkeit, sichereres und zugänglicheres DeFi 3.0, NFT-Dienstprogramme mit realen Anwendungsfällen, und Web3-Integration mit alltäglichen Anwendungen.

Investmentmöglichkeiten haben sich diversifiziert: Direktinvestition in etablierte Kryptowährungen, Staking und Yield Farming mit kalkulierten Risiken, Investment in Blockchain-Infrastruktur, und Utility-Token mit realen Anwendungsfällen.

Es ist entscheidend, persistente Risiken zu verstehen: inhärente Marktvolatilität, technologische und Sicherheitsrisiken, unerwartete regulatorische Änderungen, und technologische Konkurrenz.

2025 stellt ein Jahr der Reifung für das Krypto-Ökosystem dar mit einer stabileren und vorhersagbareren Umgebung für Investoren.`,
        it: `Le criptovalute hanno sperimentato un'evoluzione senza precedenti, e il 2025 segna un punto di svolta cruciale nella loro adozione di massa e regolamentazione.

L'adozione istituzionale ha raggiunto livelli mai visti prima. Gli ETF di Bitcoin ed Ethereum hanno facilitato l'accesso istituzionale, più aziende includono Bitcoin nelle loro riserve di cassa, e le CBDC sono in fase di implementazione.

Il quadro regolamentare è stato significativamente chiarito con linee guida chiare per exchange e custodi, trattamento fiscale definito per diversi tipi di asset, e framework di compliance robusti ma gestibili.

I progressi tecnologici stanno guidando nuove applicazioni: Soluzioni Layer 2 per scalabilità migliorata, DeFi 3.0 più sicuro e accessibile, NFT Utilities con casi d'uso reali, e Integrazione Web3 con applicazioni quotidiane.

Le opportunità di investimento si sono diversificate: investimento diretto in criptovalute consolidate, staking e yield farming con rischi calcolati, investimento in infrastruttura blockchain, e token di utilità con casi d'uso reali.

È cruciale comprendere i rischi persistenti: volatilità inherente del mercato, rischi tecnologici e di sicurezza, cambiamenti regolamentari inaspettati, e competizione tecnologica.

Il 2025 rappresenta un anno di maturazione per l'ecosistema crypto con un ambiente più stabile e prevedibile per gli investitori.`
      },
      category: 'crypto',
      author: 'QbaPV Team',
      date: '2025-06-24',
      readTime: '12 min',
      views: 2156,
      image: criptoImg,
      tags: ['crypto', 'bitcoin', 'inversión']
    },
    // Los otros 4 artículos más simples
    {
      id: 3,
      title: {
        es: 'Inversiones Pasivas: Construye Riqueza Mientras Duermes',
        en: 'Passive Investments: Build Wealth While You Sleep',
        pt: 'Investimentos Passivos: Construa Riqueza Enquanto Dorme',
        fr: 'Investissements Passifs: Construisez de la Richesse Pendant Votre Sommeil',
        de: 'Passive Investitionen: Bauen Sie Vermögen auf, während Sie schlafen',
        it: 'Investimenti Passivi: Costruisci Ricchezza Mentre Dormi'
      },
      excerpt: {
        es: 'Aprende cómo generar ingresos pasivos consistentes con estrategias probadas y de bajo riesgo.',
        en: 'Learn how to generate consistent passive income with proven, low-risk strategies.',
        pt: 'Aprenda como gerar renda passiva consistente com estratégias comprovadas e de baixo risco.',
        fr: 'Apprenez à générer des revenus passifs cohérents avec des stratégies éprouvées et à faible risque.',
        de: 'Lernen Sie, wie Sie mit bewährten, risikoarmen Strategien konsistente passive Einkommen generieren.',
        it: 'Impara come generare reddito passivo consistente con strategie provate e a basso rischio.'
      },
      content: {
        es: `Las inversiones pasivas representan una de las estrategias más efectivas para construir riqueza a largo plazo sin requerir gestión activa constante. Los dividendos aristocráticos, fondos indexados, REITs y bonos de calidad forman la base de una cartera diversificada exitosa.`,
        en: `Passive investments represent one of the most effective strategies for building long-term wealth without requiring constant active management. Dividend aristocrats, index funds, REITs, and quality bonds form the foundation of a successful diversified portfolio.`,
        pt: `Os investimentos passivos representam uma das estratégias mais eficazes para construir riqueza a longo prazo sem exigir gestão ativa constante. Aristocratas de dividendos, fundos de índice, REITs e títulos de qualidade formam a base de uma carteira diversificada bem-sucedida.`,
        fr: `Les investissements passifs représentent l'une des stratégies les plus efficaces pour construire de la richesse à long terme sans nécessiter une gestion active constante. Les aristocrates de dividendes, fonds indiciels, REITs et obligations de qualité forment la base d'un portefeuille diversifié réussi.`,
        de: `Passive Investitionen stellen eine der effektivsten Strategien dar, um langfristig Vermögen aufzubauen, ohne konstante aktive Verwaltung zu benötigen. Dividenden-Aristokraten, Indexfonds, REITs und Qualitätsanleihen bilden die Grundlage eines erfolgreichen diversifizierten Portfolios.`,
        it: `Gli investimenti passivi rappresentano una delle strategie più efficaci per costruire ricchezza a lungo termine senza richiedere gestione attiva costante. Aristocratici dei dividendi, fondi indicizzati, REIT e obbligazioni di qualità formano la base di un portafoglio diversificato di successo.`
      },
      category: 'investment',
      author: 'QbaPV Team',
      date: '2025-06-23',
      readTime: '10 min',
      views: 1876,
      image: freebitcoinImg,
      tags: ['pasivo', 'inversión', 'riqueza']
    },
    {
      id: 4,
      title: {
        es: 'Análisis del Mercado: Tendencias Q3 2025',
        en: 'Market Analysis: Q3 2025 Trends',
        pt: 'Análise do Mercado: Tendências Q3 2025',
        fr: 'Analyse du Marché: Tendances Q3 2025',
        de: 'Marktanalyse: Q3 2025 Trends',
        it: 'Analisi del Mercato: Tendenze Q3 2025'
      },
      excerpt: {
        es: 'Un vistazo detallado a los movimientos del mercado y las oportunidades para el tercer trimestre.',
        en: 'A detailed look at market movements and opportunities for the third quarter.',
        pt: 'Um olhar detalhado sobre os movimentos do mercado e oportunidades para o terceiro trimestre.',
        fr: 'Un regard détaillé sur les mouvements du marché et les opportunités pour le troisième trimestre.',
        de: 'Ein detaillierter Blick auf Marktbewegungen und Chancen für das dritte Quartal.',
        it: 'Uno sguardo dettagliato ai movimenti del mercato e alle opportunità per il terzo trimestre.'
      },
      content: {
        es: `El tercer trimestre de 2025 presenta oportunidades únicas en los mercados financieros. Las tendencias macroeconómicas, los cambios en políticas monetarias y los avances tecnológicos están creando nuevos escenarios de inversión que requieren análisis cuidadoso.`,
        en: `The third quarter of 2025 presents unique opportunities in financial markets. Macroeconomic trends, monetary policy changes, and technological advances are creating new investment scenarios that require careful analysis.`,
        pt: `O terceiro trimestre de 2025 apresenta oportunidades únicas nos mercados financeiros. As tendências macroeconômicas, mudanças nas políticas monetárias e avanços tecnológicos estão criando novos cenários de investimento que requerem análise cuidadosa.`,
        fr: `Le troisième trimestre 2025 présente des opportunités uniques sur les marchés financiers. Les tendances macroéconomiques, les changements de politique monétaire et les avancées technologiques créent de nouveaux scénarios d'investissement qui nécessitent une analyse minutieuse.`,
        de: `Das dritte Quartal 2025 bietet einzigartige Chancen an den Finanzmärkten. Makroökonomische Trends, geldpolitische Veränderungen und technologische Fortschritte schaffen neue Investitionsszenarien, die sorgfältige Analyse erfordern.`,
        it: `Il terzo trimestre del 2025 presenta opportunità uniche nei mercati finanziari. Le tendenze macroeconomiche, i cambiamenti nelle politiche monetarie e i progressi tecnologici stanno creando nuovi scenari di investimento che richiedono un'analisi attenta.`
      },
      category: 'analysis',
      author: 'QbaPV Team',
      date: '2025-06-22',
      readTime: '15 min',
      views: 3245,
      image: forexImg,
      tags: ['análisis', 'mercado', 'tendencias']
    },
    {
      id: 5,
      title: {
        es: 'Gestión de Riesgo en Inversiones de Alto Rendimiento',
        en: 'Risk Management in High-Yield Investments',
        pt: 'Gestão de Risco em Investimentos de Alto Rendimento',
        fr: 'Gestion des Risques dans les Investissements à Haut Rendement',
        de: 'Risikomanagement bei hochrentablen Investitionen',
        it: 'Gestione del Rischio negli Investimenti ad Alto Rendimento'
      },
      excerpt: {
        es: 'Estrategias esenciales para proteger tu capital mientras buscas rendimientos superiores.',
        en: 'Essential strategies to protect your capital while seeking superior returns.',
        pt: 'Estratégias essenciais para proteger seu capital enquanto busca retornos superiores.',
        fr: 'Stratégies essentielles pour protéger votre capital tout en recherchant des rendements supérieurs.',
        de: 'Wesentliche Strategien zum Schutz Ihres Kapitals bei der Suche nach höheren Renditen.',
        it: 'Strategie essenziali per proteggere il tuo capitale mentre cerchi rendimenti superiori.'
      },
      content: {
        es: `La gestión de riesgo en inversiones de alto rendimiento requiere un equilibrio delicado entre la búsqueda de retornos superiores y la protección del capital. Las estrategias incluyen diversificación, stop-loss dinámicos, y análisis de correlación.`,
        en: `Risk management in high-yield investments requires a delicate balance between seeking superior returns and protecting capital. Strategies include diversification, dynamic stop-losses, and correlation analysis.`,
        pt: `A gestão de risco em investimentos de alto rendimento requer um equilíbrio delicado entre buscar retornos superiores e proteger o capital. As estratégias incluem diversificação, stop-loss dinâmicos e análise de correlação.`,
        fr: `La gestion des risques dans les investissements à haut rendement nécessite un équilibre délicat entre la recherche de rendements supérieurs et la protection du capital. Les stratégies incluent la diversification, les stop-loss dynamiques et l'analyse de corrélation.`,
        de: `Das Risikomanagement bei hochrentablen Investitionen erfordert eine heikle Balance zwischen der Suche nach höheren Renditen und dem Schutz des Kapitals. Strategien umfassen Diversifikation, dynamische Stop-Losses und Korrelationsanalyse.`,
        it: `La gestione del rischio negli investimenti ad alto rendimento richiede un equilibrio delicato tra la ricerca di rendimenti superiori e la protezione del capitale. Le strategie includono diversificazione, stop-loss dinamici e analisi di correlazione.`
      },
      category: 'education',
      author: 'QbaPV Team',
      date: '2025-06-21',
      readTime: '11 min',
      views: 1654,
      image: criptoImg,
      tags: ['riesgo', 'gestión', 'educación']
    },
    {
      id: 6,
      title: {
        es: 'Tecnología Blockchain: Más Allá de las Criptomonedas',
        en: 'Blockchain Technology: Beyond Cryptocurrencies',
        pt: 'Tecnologia Blockchain: Além das Criptomoedas',
        fr: 'Technologie Blockchain: Au-delà des Cryptomonnaies',
        de: 'Blockchain-Technologie: Jenseits von Kryptowährungen',
        it: 'Tecnologia Blockchain: Oltre le Criptovalute'
      },
      excerpt: {
        es: 'Explora las aplicaciones revolucionarias de blockchain en diversos sectores e industrias.',
        en: 'Explore the revolutionary applications of blockchain across various sectors and industries.',
        pt: 'Explore as aplicações revolucionárias do blockchain em vários setores e indústrias.',
        fr: 'Explorez les applications révolutionnaires de la blockchain dans divers secteurs et industries.',
        de: 'Erkunden Sie die revolutionären Anwendungen von Blockchain in verschiedenen Sektoren und Industrien.',
        it: 'Esplora le applicazioni rivoluzionarie della blockchain in vari settori e industrie.'
      },
      content: {
        es: `La tecnología blockchain está transformando industrias más allá de las criptomonedas. Desde supply chain hasta identidad digital, smart contracts hasta voting systems, las aplicaciones son infinitas y están revolucionando la forma en que hacemos negocios.`,
        en: `Blockchain technology is transforming industries beyond cryptocurrencies. From supply chain to digital identity, smart contracts to voting systems, applications are endless and revolutionizing how we do business.`,
        pt: `A tecnologia blockchain está transformando indústrias além das criptomoedas. Desde supply chain até identidade digital, smart contracts até sistemas de votação, as aplicações são infinitas e estão revolucionando a forma como fazemos negócios.`,
        fr: `La technologie blockchain transforme les industries au-delà des cryptomonnaies. De la chaîne d'approvisionnement à l'identité numérique, des contrats intelligents aux systèmes de vote, les applications sont infinies et révolutionnent notre façon de faire des affaires.`,
        de: `Die Blockchain-Technologie transformiert Industrien jenseits von Kryptowährungen. Von Lieferketten bis zur digitalen Identität, von Smart Contracts bis zu Wahlsystemen sind die Anwendungen endlos und revolutionieren unsere Geschäftstätigkeit.`,
        it: `La tecnologia blockchain sta trasformando le industrie oltre le criptovalute. Dalla supply chain all'identità digitale, dagli smart contract ai sistemi di voto, le applicazioni sono infinite e stanno rivoluzionando il modo in cui facciamo business.`
      },
      category: 'technology',
      author: 'QbaPV Team',
      date: '2025-06-20',
      readTime: '9 min',
      views: 987,
      image: freebitcoinImg,
      tags: ['blockchain', 'tecnología', 'innovación']
    }
  ];

  // Función para encontrar el post actual
  useEffect(() => {
    const currentPost = blogPosts.find(p => p.id === parseInt(id));
    
    if (currentPost) {
      setPost(currentPost);
      
      // Encontrar posts relacionados (misma categoría, excluyendo el actual)
      const related = blogPosts
        .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
        .slice(0, 3);
      
      // Si no hay suficientes de la misma categoría, completar con otros
      if (related.length < 3) {
        const others = blogPosts
          .filter(p => p.id !== currentPost.id && p.category !== currentPost.category)
          .slice(0, 3 - related.length);
        related.push(...others);
      }
      
      setRelatedPosts(related);
    } else {
      // Si no se encuentra el post, redirigir al blog
      navigate('/blog');
    }
    
    setLoading(false);
  }, [id, navigate]);

  // Función para navegar al anterior/siguiente
  const getAdjacentPosts = () => {
    const currentIndex = blogPosts.findIndex(p => p.id === parseInt(id));
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
    return { prevPost, nextPost };
  };

  const { prevPost, nextPost } = getAdjacentPosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Artículo no encontrado</h1>
          <p className="text-gray-500 mb-6">El artículo que buscas no existe o ha sido movido.</p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volver al Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600">Inicio</Link>
            <span className="mx-2">→</span>
            <Link to="/blog" className="hover:text-purple-600">Blog</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{post.title[i18n.language]}</span>
          </nav>
        </div>
      </section>

      {/* Artículo Principal */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header del artículo */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full font-medium">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span>👤 {post.author}</span>
            <span>📅 {new Date(post.date).toLocaleDateString()}</span>
            <span>⏱️ {post.readTime}</span>
            <span>👁️ {post.views}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title[i18n.language]}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt[i18n.language]}
          </p>
        </header>

        {/* Imagen principal */}
        <div className="mb-12">
          <img 
            src={post.image} 
            alt={post.title[i18n.language]}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Contenido del artículo */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed"
            style={{
              fontSize: '18px',
              lineHeight: '1.8',
              whiteSpace: 'pre-line'
            }}
          >
            {post.content[i18n.language]}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Navegación Anterior/Siguiente */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          {prevPost ? (
            <Link 
              to={`/blog/${prevPost.id}`}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="mr-4 text-2xl group-hover:-translate-x-1 transition-transform">←</div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Artículo anterior</p>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {prevPost.title[i18n.language]}
                </h4>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
          
          {nextPost ? (
            <Link 
              to={`/blog/${nextPost.id}`}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group text-right"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">Siguiente artículo</p>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {nextPost.title[i18n.language]}
                </h4>
              </div>
              <div className="ml-4 text-2xl group-hover:translate-x-1 transition-transform">→</div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Artículos Relacionados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title[i18n.language]}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span>📅 {new Date(relatedPost.date).toLocaleDateString()}</span>
                    <span>⏱️ {relatedPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {relatedPost.title[i18n.language]}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {relatedPost.excerpt[i18n.language]}
                  </p>
                  
                  <Link
                    to={`/blog/${relatedPost.id}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-yellow-400 mx-auto mb-6">📰</div>
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Te gustó este artículo?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Suscríbete a nuestro newsletter y no te pierdas nuestros últimos análisis y estrategias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Suscribirse al Newsletter
            </Link>
            <Link
              to="/blog"
              className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Ver Más Artículos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;        