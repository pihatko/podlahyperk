# Podlahy Perk – Next.js web

Moderní firemní web pro **Podlahy Perk – Martin Perk** postavený na Next.js 14 App Router.

## Technologie

- **Next.js 14** – App Router, Server Components, ISR
- **TypeScript** – plná typová bezpečnost
- **CSS Modules** – scoped styly, plná kontrola
- **Framer Motion** – scroll-triggered animace
- **React Hook Form + Zod** – validace kontaktního formuláře
- **Resend** – odesílání emailů
- **Instagram Graph API** – live feed realizací

---

## Rychlý start

```bash
# 1. Instalace závislostí
npm install

# 2. Zkopírovat env soubor a vyplnit hodnoty
cp .env.local.example .env.local

# 3. Spustit vývojový server
npm run dev
```

Otevřít [http://localhost:3000](http://localhost:3000)

---

## Nastavení prostředí (.env.local)

```env
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_USER_ID=...
RESEND_API_KEY=...
CONTACT_EMAIL=info@podlahyperk.cz
NEXT_PUBLIC_SITE_URL=https://www.podlahyperk.cz
CRON_SECRET=...  # náhodný řetězec pro ochranu cron endpointu
```

---

## Instagram setup – krok za krokem

### 1. Vytvořit Meta Developer App

1. Jít na [developers.facebook.com](https://developers.facebook.com)
2. Vytvořit novou app → vybrat typ **"Business"**
3. Přidat produkt **"Instagram Basic Display"**

### 2. Přidat Instagram účet

1. V Instagram Basic Display → **"Add or Remove Instagram Testers"**
2. Přidat účet `podlahyperk`
3. Na Instagramu přijmout pozvánku: Nastavení → Apps and Websites

### 3. Získat User Token

1. V Developer konzoli → **"User Token Generator"**
2. Kliknout **"Generate Token"** pro účet podlahyperk
3. Autorizovat permissions: `instagram_graph_user_profile`, `instagram_graph_user_media`
4. Zkopírovat **Short-lived token**

### 4. Vyměnit za Long-lived token (platnost 60 dní)

```bash
curl -X GET \
  "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=SHORT_LIVED_TOKEN"
```

Zkopírovat `access_token` z odpovědi → uložit do `.env.local` jako `INSTAGRAM_ACCESS_TOKEN`

### 5. Získat User ID

```bash
curl "https://graph.instagram.com/me?fields=id&access_token=YOUR_LONG_LIVED_TOKEN"
```

Zkopírovat `id` → uložit jako `INSTAGRAM_USER_ID`

### 6. Automatické obnovování tokenu (Vercel Cron)

Token se obnovuje přes `/api/instagram/refresh` každý 1. den v měsíci.

V `vercel.json` je již nakonfigurováno. Potřeba přidat `CRON_SECRET` do Vercel env proměnných.

---

## Resend setup

1. Registrovat se na [resend.com](https://resend.com) (free tier: 3 000 emailů/měsíc)
2. Ověřit doménu `podlahyperk.cz` (přidat DNS záznamy)
3. Vytvořit API klíč → uložit jako `RESEND_API_KEY`

---

## Struktura projektu

```
src/
├── app/
│   ├── layout.tsx          # Root layout + JSON-LD schema
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Automatický sitemap
│   ├── robots.ts           # robots.txt
│   ├── not-found.tsx       # 404 stránka
│   ├── sluzby/
│   │   ├── page.tsx        # Přehled služeb
│   │   └── [slug]/
│   │       └── page.tsx    # Detail služby (staticky generované)
│   ├── realizace/page.tsx  # Galerie + Instagram feed
│   ├── o-nas/page.tsx      # O nás
│   ├── udrzba/page.tsx     # Péče o podlahy + PDF ke stažení
│   ├── kontakt/page.tsx    # Kontakt + formulář
│   └── api/
│       ├── contact/route.ts         # POST – odesílání emailů přes Resend
│       └── instagram/
│           ├── route.ts             # GET – Instagram feed (cache 1h)
│           └── refresh/route.ts     # GET – obnovení tokenu (cron)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx + .module.css
│   │   └── Footer.tsx + .module.css
│   ├── sections/
│   │   ├── Hero.tsx + .module.css
│   │   ├── ServicesGrid.tsx + .module.css
│   │   ├── StatsSection.tsx + .module.css
│   │   ├── InstagramFeed.tsx + .module.css
│   │   ├── PartnersStrip.tsx + .module.css
│   │   ├── CTABanner.tsx + .module.css
│   │   └── ContactForm.tsx + .module.css
│   └── ui/
│       ├── Button.tsx + .module.css
│       └── AnimatedSection.tsx
│
├── lib/
│   ├── constants.ts        # Kontakty, partneři, statistiky
│   ├── services.ts         # Data všech služeb
│   ├── instagram.ts        # Instagram API util
│   └── validations.ts      # Zod schéma pro formulář
│
├── styles/
│   └── globals.css         # CSS proměnné, reset, utility třídy
│
└── types/
    └── index.ts            # TypeScript typy
```

---

## PDF soubory

Návody k údržbě podlah jsou odkazovány z `/public/assets/`. Zkopírovat originální PDF soubory z aktuálního webu (podlahyperk.cz/assets/) do složky `public/assets/`.

```bash
# Ukázka – stáhnout PDF z původního webu
curl -O https://www.podlahyperk.cz/assets/drevo-korek-lakovane.pdf
# ... atd.
```

---

## Nasazení na Vercel

```bash
# Instalovat Vercel CLI
npm i -g vercel

# Deploy
vercel

# Nastavit env proměnné
vercel env add INSTAGRAM_ACCESS_TOKEN
vercel env add INSTAGRAM_USER_ID
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add CRON_SECRET
```

---

## Build

```bash
npm run build   # produkční build
npm run start   # spustit produkční build lokálně
npm run lint    # ESLint
```
