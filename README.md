This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

This time I wanted to create a live ground handling operations dashboard and model it on actual turnaround workflow (gate assignement, aircraft status, handler dispatch). It will also include KPI breach alert state (flight turning amber or red when it's behind the schedule).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Recharts
- next-themes

## How it works

There's no backend — all flight data is mocked and driven by a `setInterval` hook that ticks every 5 seconds. Flights advance through their lifecycle automatically (ON TIME → BOARDING → DEPARTED), turnaround times increment in real time, and any flight that exceeds its KPI target gets flagged immediately.

The idea was to make it easy to swap the mock data hook for a real WebSocket or API call without touching any of the components.
