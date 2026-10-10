# DASHRES Research Group Website

The official website for the DASHRES Research Group at Jazan University. It
introduces the group, highlights its projects, and presents its research areas
across health and computational science.

## Research areas

- Mental health
- Maternal and child health
- Infectious disease
- AI and bioinformatics

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Vercel Functions
- Resend email API

## Getting started

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite starts the frontend at [http://localhost:5173](http://localhost:5173).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Site routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About the group |
| `/projects` | Research projects |
| `/tools` | Research areas overview |
| `/tools/mental-health` | Mental health |
| `/tools/maternal-child-health` | Maternal and child health |
| `/tools/infectious-disease` | Infectious disease |
| `/tools/ai-bioinformatics` | AI and bioinformatics |
| `/contact` | Contact form |

## Contact form configuration

The contact form sends submissions through the Vercel Function in
[`api/contact.ts`](./api/contact.ts), using Resend. The recipient address and
email provider credentials are kept on the server and are not included in the
public frontend.

1. Verify a sender domain with [Resend](https://resend.com/) and create an API
   key.
2. In the Vercel project settings, add these environment variables:

   | Variable | Value |
   | --- | --- |
   | `RESEND_API_KEY` | Resend API key |
   | `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |
   | `CONTACT_FROM_EMAIL` | Sender address on the verified domain, e.g. `DASHRES <forms@example.org>` |

3. Apply the variables to the required Vercel environments and redeploy.

Never expose these values with a `VITE_` prefix or commit them to the repository.

### Local API testing

The standard Vite server runs the frontend only. To test the contact form and
Vercel Function locally:

1. Link the project to Vercel with the Vercel CLI.
2. Pull the development environment variables, or add them to an ignored
   `.env.local` file.
3. Run:

   ```bash
   npx vercel dev
   ```

## Deployment

Deploy the project to Vercel and configure the contact form environment
variables before testing submissions. The app uses client-side routes; confirm
that direct navigation and page refreshes work for the routes listed above.

## Project structure

```text
api/
└── contact.ts                Contact validation and email delivery
src/
├── components/
│   ├── layout/               Site header and footer
│   └── ui/                   Shared UI components
├── data/                     Research projects, tools, and site content
├── hooks/                    Shared React hooks
├── pages/
│   ├── About/
│   ├── Contact/
│   ├── Home/
│   ├── Projects/
│   └── Tools/
├── styles/                   Global and shared styles
└── routes.ts                 Client-side route definitions
```

## Content updates

- Research projects: [`src/data/projects.ts`](./src/data/projects.ts)
- Research topics and tools: [`src/data/tools.ts`](./src/data/tools.ts)
- Group, team, and research information: `src/pages/About/content.ts`
- Address and social profile links: [`src/data/site.ts`](./src/data/site.ts)
