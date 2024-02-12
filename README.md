# Svelte Chef

## Developing

When first checking out this project, you should install the dependencies with `npm install`.
To do that, you need to have [NodeJS](https://nodejs.org/en) installed.

The project is built to be hosted on [Vercel](https://vercel.com) and uses a [Vercel postgres database](https://vercel.com/docs/storage/vercel-postgres).
To connect to the database for development, you need to sync the credentials to a `.env.local` file, which can be done with `npx vercel pull` (possibly you need to run `npx vercel login` and/or `npx vercel link` first).

To then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

The code is automatically deployed on Vercel on push.

## Formatting

This project uses [Prettier](https://prettier.io/) for code formatting. Make sure to configure your editor via a plugin.
