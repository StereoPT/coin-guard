<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/StereoPT/coin-guard">
    <img src="images/CoinGuard.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">CoinGuard</h3>

  <p align="center">
    Take control of your personal finances with comprehensive tracking and insights
    <br />
    <a href="https://github.com/StereoPT/coin-guard"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/StereoPT/coin-guard">View Demo</a>
    ·
    <a href="https://github.com/StereoPT/coin-guard/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/StereoPT/coin-guard/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![CoinGuard Screen Shot][product-screenshot]](https://github.com/StereoPT/coin-guard)

CoinGuard is a self-hostable web application for tracking personal finances - transactions, categories, bank accounts, and the analytics that come from them.

Key features include:

- **Transaction Tracking**: Record income, expenses and transfers, or import them from a bank export
- **Categories**: Organize transactions into categories
- **Bank Accounts**: Track balances across multiple accounts
- **Monthly & Yearly Analytics**: Break down spending and income over time
- **Import Enrichment**: Attach categories and descriptions to imported transactions before they're saved

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

CoinGuard is a pnpm/Turborepo monorepo built with:

- [![Next][Next.js]][Next-url]
- [![TypeScript][TypeScript.com]][TypeScript-url]
- [![TailwindCSS][TailwindCSS.com]][TailwindCSS-url]
- [![Prisma][Prisma.io]][Prisma-url]
- [![PostgreSQL][PostgreSQL.com]][PostgreSQL-url]
- [![Turborepo][Turborepo.com]][Turborepo-url]
- [![Biome][Biome.dev]][Biome-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT STRUCTURE -->

## Project Structure

CoinGuard is a pnpm workspace managed by Turborepo:

```
coin-guard/
├── apps/
│   └── web/           # Next.js app (routes, pages, UI logic)
├── packages/
│   ├── db/            # Prisma schema, migrations, and DB client
│   ├── ui/            # Shared component library (Base UI + shadcn)
│   ├── biome-config/  # Shared Biome (lint/format) config
│   └── ts-config/     # Shared TypeScript config
├── docker-compose.yml # Local PostgreSQL for development
└── Dockerfile         # Production image for the web app
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of CoinGuard up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (version 20.9 or higher)
- [pnpm](https://pnpm.io/) (via [corepack](https://pnpm.io/installation#using-corepack), which ships with Node)
  ```sh
  corepack enable
  ```
- [Docker](https://www.docker.com/) (to run the local PostgreSQL database)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/StereoPT/coin-guard.git
   cd coin-guard
   ```
2. Install dependencies
   ```sh
   pnpm install
   ```
3. Create your root env file and fill in the Postgres credentials and `DATABASE_URL`
   ```sh
   cp .env.example .env.local
   ```
   > `apps/web/.env.local` and `packages/db/.env` are symlinks to this root file, so this is the only one you need to edit.
4. Create the web app's env file
   ```sh
   cp apps/web/.env.example apps/web/.env
   ```
5. Start the local PostgreSQL database
   ```sh
   docker compose up -d
   ```
6. Apply database migrations and generate the Prisma client
   ```sh
   pnpm db:migrate
   pnpm db:generate
   ```
7. Start the development server
   ```sh
   pnpm dev
   ```
8. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Track Your Finances

- Add transactions manually, or import them from a bank export (CSV)
- Organize transactions into categories you create and manage
- Track balances across multiple bank accounts

### Import Transactions

- During import, enrich each transaction with a category and description before it's saved

### Dashboard & Analytics

- Get a quick snapshot of your financial health, with recent transactions at a glance
- Break down spending and income by category over the month or year

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

**Shipped**

- [x] Unified Analytics page (merge Monthly & Yearly views, with flexible date filtering)
- [x] Flexible date filtering on Category Details
- [x] Default bank account
- [x] Grouped Lookup Descriptions
- [x] Delete action for Lookup Logs

**Up Next**

- [ ] Optimistic UI updates
- [ ] Loading States
 
See the [open issues](https://github.com/StereoPT/coin-guard/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make CoinGuard better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/StereoPT/coin-guard/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=StereoPT/coin-guard" alt="StereoPT Avatar" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

StereoPT - [@StereoPT](https://github.com/StereoPT) - stereopt@gmail.com

Project Link: [https://github.com/StereoPT/coin-guard](https://github.com/StereoPT/coin-guard)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Special thanks to the following resources and tools that made CoinGuard possible:

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/StereoPT/coin-guard.svg?style=for-the-badge
[contributors-url]: https://github.com/StereoPT/coin-guard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/StereoPT/coin-guard.svg?style=for-the-badge
[forks-url]: https://github.com/StereoPT/coin-guard/network/members
[stars-shield]: https://img.shields.io/github/stars/StereoPT/coin-guard.svg?style=for-the-badge
[stars-url]: https://github.com/StereoPT/coin-guard/stargazers
[issues-shield]: https://img.shields.io/github/issues/StereoPT/coin-guard.svg?style=for-the-badge
[issues-url]: https://github.com/StereoPT/coin-guard/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/guidosp
[product-screenshot]: images/banner_03.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TailwindCSS.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://prisma.io/
[TypeScript.com]: https://img.shields.io/badge/typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[PostgreSQL.com]: https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Turborepo.com]: https://img.shields.io/badge/turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white
[Turborepo-url]: https://turbo.build/repo
[Biome.dev]: https://img.shields.io/badge/biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white
[Biome-url]: https://biomejs.dev/
