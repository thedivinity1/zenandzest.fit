import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  schemaJson?: any;
  type?: "website" | "article";
}

export default function SEOHead({
  title,
  description,
  image = "https://zenandzest.fit/opengraph.jpg",
  url = "https://zenandzest.fit/",
  canonicalUrl,
  schemaJson,
  type = "website",
}: SEOHeadProps) {
  const finalCanonicalUrl = canonicalUrl || url;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* OpenGraph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) for AEO */}
      {schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJson)}
        </script>
      )}
    </Helmet>
  );
}
