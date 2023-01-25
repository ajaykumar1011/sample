# Steps to start the repo

## Prerequisites

- NodeJS [Visit Link](https://nodejs.org/en/download/)
- MySQL [Visit Link](https://dev.mysql.com/downloads/installer/)

# Server setup in local environment

### Open `employee.code-workspace`

```
cd server
```

### Install dependencies & devdependencies

```
npm install
```

### Compile TypeScript files to JavaScript

```
npm run build
```

## Compile TypeScript files in watch mode

```
npm run watchbuild
```

### Above steps will run typescript in watch mode. Whenever a file changes it will automatically compile .ts files to .js files

## DB Scripts

---

### Execute the sql scripts available under `utils/dbscripts.sql`

### Above steps will create default tables required for development

## Start server in Debug mode

---

### Select `Run and Debug` option from VSCode left menu options.

### This will show `Launch Program` option in the dropdown available on the top

### Click on `Start Debugging` (Play) button, this will start the server in your local environment
