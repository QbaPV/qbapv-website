// SEO Head Component - Maneja meta tags dinámicos
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { seoConfig, getPageSEO, getCanonicalUrl, getPageImage } from '../config/seoConfig';

const SEOHead = ({ 
  page, 
  title, 
  description, 
  keywords,
  image,
  path = '',
  type = 'website',
  article = null 
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  // Obtener configuración SEO de la página
  const pageSEO = getPageSEO(page, currentLanguage);
  
  // Usar props o fallback a configuración de página
  const finalTitle = title || (pageSEO ? pageSEO.title : seoConfig.siteName);
  const finalDescription = description || (pageSEO ? pageSEO.description : '');
  const finalKeywords = keywords || (pageSEO ? pageSEO.keywords : '');
  const finalImage = image || getPageImage(page);
  const canonicalUrl = getCanonicalUrl(path);
  const locale = pageSEO ? pageSEO.locale : seoConfig.openGraph.locale.es;

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="QbaPV" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={currentLanguage} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph tags para Facebook, LinkedIn, etc. */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content={seoConfig.twitter.card} />
      <meta name="twitter:site" content={seoConfig.twitter.site} />
      <meta name="twitter:creator" content={seoConfig.twitter.creator} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Tags específicos para artículos de blog */}
      {article && (
        <>
          <meta property="article:author" content={article.author} />
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:section" content={article.section} />
          {article.tags && article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data - JSON-LD para SEO avanzado */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? "Article" : "WebPage",
          "name": finalTitle,
          "description": finalDescription,
          "url": canonicalUrl,
          "image": finalImage,
          "inLanguage": currentLanguage,
          "isPartOf": {
            "@type": "WebSite",
            "name": seoConfig.siteName,
            "url": seoConfig.siteUrl
          },
          ...(article && {
            "author": {
              "@type": "Organization",
              "name": "QbaPV"
            },
            "publisher": {
              "@type": "Organization", 
              "name": "QbaPV",
              "logo": {
                "@type": "ImageObject",
                "url": `${seoConfig.siteUrl}/images/qbapv-logo.png`
              }
            },
            "datePublished": article.publishedTime,
            "dateModified": article.modifiedTime
          })
        })}
      </script>
      
      {/* Preload critical resources */}
      <link rel="preload" as="image" href={finalImage} />
      
      {/* DNS prefetch para mejores cargas */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Favicons - diferentes tamaños */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Manifest para PWA */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme color para móviles */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
    </Helmet>
  );
};

export default SEOHead;
