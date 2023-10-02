# Money Mapper

## What is Money Mapper?

[Money Mapper][Money Mapper] is a Next.js 13 fullstack finance tracker for organizing personal finances. Covers income, taxes, assets, debt, and net worth management. Utilizes next-auth for user authentication and stores user data in a MongoDB database with prisma ORM. The app uses shadcn-ui with tailwind css, providing a visually appealing and responsive user interface. Global client state is managed with zustand, ensuring efficient and streamlined data management across the app. Emphasizing user experience, the app offers both dark and light modes to suit individual preferences. To enhance data visualization, financial information is presented through interactive charts and comprehensive tables, allowing users to gain valuable insights at a glance.

---

## The Dashboard page

![Money Mapper dashboad page](/public/images/dashboard.png)

## The Money page

![Money Mapper money page](/public/images/money.png)

## The Login page

![Money Mapper login page](/public/images/login.png)

---

## How to Set Up the Project Locally

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/0mppula/money-mapper.git
```

### Install packages

```shell
npm i
```

### `.env` File Configuration

In the root of the project create an `.env` file and declare the following variables:

```js
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Populate the variables with the corresponding data.

### Setup Prisma

```shell
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

---

## Tech Stack

### Framework

-   **Front-end Framework:** Next.js (v13.4.12)

### UI

-   **UI Library:** shadcn-ui
-   **UI Styling:** tailwindcss (v3.3.3) with tailwindcss-animate (v1.0.6)
-   **Theming:** next-themes (v0.2.1)
-   **Data Visualization:** recharts (v2.7.2)
-   **Icons:** @radix-ui/react-icons (v1.3.0), react-icons (v4.10.1) & lucide-react (v0.263.1)
-   **Date Picker:** react-day-picker (v8.8.0)
-   **Date Manipulation:** date-fns (v2.30.0)
-   **CSS Utility:** clsx (v2.0.0)
-   **Class Variance Management:** class-variance-authority (v0.7.0)

### State Managment

-   **Global State Management:** zustand (v4.4.0)
-   **Data Fetching and Management:** @tanstack/react-query (v4.32.6) and @tanstack/react-table (v8.9.3)
-   **Form Handling:** react-hook-form (v7.45.2) with @hookform/resolvers (v3.1.1)
-   **State Validation:** zod (v3.21.4)

### Backend & Authentication

-   **Prisma ORM:** @prisma/client (v5.1.0) with prisma (v5.1.0) as a dev dependency
-   **User Authentication:** next-auth (v4.22.3)
-   **API Requests:** axios (v1.4.0)
-   **TypeScript:** (v5.1.6)
-   **Type Definitions:** @types/node (v20.4.5), @types/react (v18.2.18), @types/react-dom (v18.2.7)

[Money Mapper]: https://moneymapper.vercel.app/
