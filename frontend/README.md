## Frontend

Frontend for metric application

### Installation

To install the app:

```
npm install
```

### Execution

To launch the app:

```
npm run dev
```

To launch the tests:

```
npm run test
```

### Structure

- public: public resources of application
- src
  - action-handlers: Handlers for api requests
  - api: Definition of api client for Api (with axios)
  - assets: Assets of the application
  - components: Common components for all platform
  - models: Models of application (Ex: metric, notifications)
  - router: Router of the app (vue-router)
  - stores: Store for vue. It manages states (pinia)
  - utils: tools for tests and constants file
  - views: Components for pages.
- types: declaration types for typescript

### Linters and formatters

This project uses technologies to ensure the quality of the code:

- Eslist

```
npm run lint
```

- Prettier

```
npm run format
```
