# Arnav Sharma — Portfolio

My personal portfolio for software engineering, ML systems, and research work.

**[Visit the portfolio](https://arnav-sharma2.com)** · [GitHub profile](https://github.com/Arnavsharma2) · [LinkedIn](https://www.linkedin.com/in/arnav-sharma2/)

## Built with

Next.js 14, React, TypeScript, and Tailwind CSS. A minimal serif index sits over an original animated canvas flow field with drifting particle trails. Dedicated pages cover my background, experience, and Dynamo Diff, the site's sole featured project. 

## Run locally

```bash
git clone https://github.com/Arnavsharma2/Personal-Website.git
cd Personal-Website
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). To create a production build:

```bash
npm run build
npm start
```

## Project structure

- [`app/page.tsx`](app/page.tsx) contains the homepage index and contact links.
- [`app/about/`](app/about/), [`app/experience/`](app/experience/), and [`app/projects/`](app/projects/) contain the detail pages.
- [`components/`](components/) contains the shared page shell, content, animated flow background, and visit tracker.
- [`public/`](public/) contains images and other static assets.
- [`app/api/log-visit/route.ts`](app/api/log-visit/route.ts) implements the existing in-memory visit log with rate limiting and optional IP geolocation.

Deployment uses Vercel. The public portfolio is available at [arnav-sharma2.com](https://arnav-sharma2.com).
