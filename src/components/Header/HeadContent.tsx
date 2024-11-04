export const metadata = {
  title: "ProMall",
  description: "It's not just an app, it's your friend :)",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs15", "next15", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "X",
      url: "X",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function HeadContent() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="generator" content={metadata.generator} />
      <link rel="manifest" href={metadata.manifest} />
      <meta name="keywords" content={metadata.keywords.join(", ")} />
      {metadata.themeColor.map(({ media, color }, index) => (
        <meta key={index} name="theme-color" media={media} content={color} />
      ))}
      {metadata.authors.map(({ name, url }, index) => (
        <meta
          key={index}
          name="author"
          content={name}
          {...(url ? { href: url } : {})}
        />
      ))}
      <meta name="viewport" content={metadata.viewport} />
      {metadata.icons.map(({ rel, url }, index) => (
        <link key={index} rel={rel} href={url} />
      ))}
    </>
  );
}
