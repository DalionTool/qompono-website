import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const COMING_SOON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Qompono — Coming Soon</title>
  <link rel="icon" href="/images/logo/qompono-icon.png" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0A4D50 0%, #062D2F 50%, #0A4D50 100%);
      overflow: hidden;
      position: relative;
    }
    .glow1 {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      border-radius: 50%;
      opacity: 0.15;
      background: radial-gradient(circle, #20FA9B 0%, transparent 70%);
      pointer-events: none;
    }
    .glow2 {
      position: absolute;
      bottom: -100px;
      right: -100px;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      opacity: 0.10;
      background: radial-gradient(circle, #20FA9B 0%, transparent 70%);
      pointer-events: none;
    }
    .container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 28rem;
      margin: 0 1rem;
      animation: fadeIn 0.7s ease-out;
    }
    .card {
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      padding: 2rem;
      text-align: center;
    }
    .logo { width: 64px; height: 64px; margin: 0 auto 1rem; }
    h1 { font-size: 1.875rem; font-weight: 700; color: #fff; letter-spacing: -0.025em; }
    .subtitle { font-size: 0.875rem; margin-top: 0.5rem; color: #20FA9B; }
    .hint { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 1.5rem; transition: opacity 0.5s; }
    .success {
      margin-top: 1rem;
      padding: 0.75rem;
      font-size: 0.875rem;
      border-radius: 0.5rem;
      background: rgba(32,250,155,0.15);
      border: 1px solid rgba(32,250,155,0.3);
      color: #20FA9B;
      animation: fadeIn 0.5s ease-out;
    }
    .footer { text-align: center; font-size: 0.75rem; color: rgba(255,255,255,0.3); margin-top: 1.5rem; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body>
  <div class="glow1"></div>
  <div class="glow2"></div>
  <div class="container">
    <div class="card">
      <img src="/images/logo/qompono-icon.png" alt="Qompono" class="logo" />
      <h1>Qompono</h1>
      <p class="subtitle">Coming Soon</p>
      <p class="hint" id="hint">Type the magic word...</p>
      <div id="success" class="success" style="display:none;">Welcome! Redirecting...</div>
    </div>
    <p class="footer">powered by Dalion</p>
  </div>
  <script>
    (function() {
      var magic = "dalion";
      var buffer = "";
      var unlocked = false;
      document.addEventListener("keydown", function(e) {
        if (unlocked || e.key.length !== 1) return;
        buffer = (buffer + e.key.toLowerCase()).slice(-magic.length);
        if (buffer === magic) {
          unlocked = true;
          var d = new Date();
          d.setDate(d.getDate() + 30);
          document.cookie = "qompono-access=true; path=/; expires=" + d.toUTCString() + "; SameSite=Lax";
          document.getElementById("hint").style.opacity = "0";
          document.getElementById("success").style.display = "block";
          setTimeout(function() { window.location.reload(); }, 800);
        }
      });
    })();
  </script>
</body>
</html>`;

export default function middleware(request: NextRequest) {
  // If no access cookie, serve coming-soon gate directly
  const hasAccess = request.cookies.get("qompono-access")?.value === "true";
  if (!hasAccess) {
    return new NextResponse(COMING_SOON_HTML, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Cookie present — proceed with next-intl routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
