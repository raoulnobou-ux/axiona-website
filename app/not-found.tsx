// 404 hors des routes /fr et /en (ex. fichier inexistant).
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, sans-serif', color: '#0B2A4A', padding: '4rem 1.5rem' }}>
        <h1>404</h1>
        <p>
          Page introuvable · Page not found. <a href="/fr">AXIONA</a>
        </p>
      </body>
    </html>
  );
}
