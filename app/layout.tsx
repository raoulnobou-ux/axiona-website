// Layout racine minimal : le vrai layout (html, lang, polices) est dans app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
