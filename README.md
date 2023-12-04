# CLOUTHY

This is a repository for a CLOUTYHY (Full Stack E-Commerce + Dashboard & CMS) : Next.js 14 App Router, React, Tailwind, Prisma, Postgresql, UploadThing, Supabase

Key Features:

- We will be using Shadcn UI for the Admin!
- Our admin dashboard is going to serve as both CMS, Admin and API!
- be able to create, update and delete categories
- be able to create, update and delete products
- be able to upload multiple images for products, and change them whenever you want!
- be able to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form.
- be able to Search through all categories, products, sizes, colors, billboards with included pagination!
- be able to control which products are "featured" so they show on the homepage!
- be able to see your orders, sales, etc.
- be able to see graphs of your revenue etc.
- learn Clerk Authentication!
- Order creation
- Stripe checkout
- Stripe webhooks
- MySQL + Prisma + PlanetScale

Technology Used:

- NextJS 14
- TailwindCSS + Shadcn - styles
- Postgresql + Prisma + Supabase - backend
- UploadThing - Cloud files
- NextAuth - auth
- Xendit - Payment

### Setup .env file

```js
NEXTAUTH_SECRET=
NEXTAUTH_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
XENDIT_API_KEY=
GOOGLE_API_KEY=


# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
```

### Connect to Supabase and Push Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
