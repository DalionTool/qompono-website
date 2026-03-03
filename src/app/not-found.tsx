export default function NotFound() {
  return (
    <html lang="nl">
      <body className="flex min-h-screen items-center justify-center bg-white font-sans">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-lg text-gray-600">
            Pagina niet gevonden
          </p>
          <a
            href="/nl"
            className="mt-6 inline-block rounded-lg bg-[#0A4D50] px-6 py-3 text-sm font-medium text-white hover:bg-[#0A4D50]/90"
          >
            Terug naar home
          </a>
        </div>
      </body>
    </html>
  );
}
