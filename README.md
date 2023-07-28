# Backoffice —— Code in the Dark

> Backoffice application for Code in the Dark ⚡

**IMPORTANT: Node.js v20 is required to run this project.**

## Setup ⚙️

1. Install the deps:

```sh
yarn
```

2. Copy `.env.example` file to a new `.env` file:

```sh
cp .env.example .env
```

3. Run migrations to create the database:

```sh
yarn migrate
```

4. Run seed to fill up the database:

```sh
yarn seed
```

6. Run the dev server:

```sh
yarn dev
```

If you want to check the data in the database, you can run `prisma studio`:

```sh
yarn prisma studio
```

To re-run the seed, first delete the file `prisma/dev.db`, then run steps `3` and `4` again.

## Contributing 📖

Follow our [guide](./CONTRIBUTING.md).

## Design 🎨

[Layout Figma](https://www.figma.com/file/PsD124B5jvDdxyYCqxIbys/Code-in-The-Dark---Back-Office?type=design&t=FQNPMNk5uC2gSuxr-0)

## License ⚖️

MIT
