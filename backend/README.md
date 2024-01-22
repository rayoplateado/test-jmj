## Backend

Backend for metric application

### Installation

To install the app:

```
bundle install
```

### Execution

To launch the server:

```
rails s
```

To launch the tests:

```
bundle exec rspec

```

### Seed

If you want to add automatically data, there is some tasks to do it

| Task                              | Description                                                    | usage                                       |
| --------------------------------- | -------------------------------------------------------------- | ------------------------------------------- |
| create_metrics[from_date,to_date] | create from 1 upto 100 metrics each day for the range of dates | rails create_metrics[10/01/2024,22/01/2024] |
| remove_metrics                    | remove all metrics                                             | rails remove_metrics                        |

### Api

| method | endpoint                           | Description                    |
| ------ | ---------------------------------- | ------------------------------ |
| Get    | /api/v1/analytics/metrics          | Get metrics grouped for charts |
| Post   | /api/v1/analytics/metrics-averages | Create a metric in database    |

#### Get /api/v1/analytics/metrics

Filter params:

| Filter param | description                      | type              | example                    |
| ------------ | -------------------------------- | ----------------- | -------------------------- |
| from_date    | From date in query               | datetime (string) | '2024-01-18T18:52:00.000Z' |
| to_date      | To date in query                 | datetime (string) | '2024-01-18T18:52:00.000Z  |
| range        | Range for groups                 | string            | 'day', 'hour', 'minute'    |
| timezone     | Timezone for query               | string            | '+1'                       |
| metric_name  | Filter by metric (empty for all) | string            | a metric name              |

#### Post /api/v1/analytics/metrics-averages

| Param      | description         | type              | example                    | mandatory           |
| ---------- | ------------------- | ----------------- | -------------------------- | ------------------- |
| name       | Name of metric      | string            | a metric name              | yes                 |
| value      | Value for metric    | number (float)    | 1.02                       | yes                 |
| created_at | Metric's timestamps | datetime (string) | '2024-01-18T18:52:00.000Z' | no (now by default) |

### Structure

- app
  - controllers: Entry point of http requests
  - models: Contain models (metric) for application
  - repositories: Repositories of each tecnology to access models
  - services: Services for manage actions in controllers
- spec
  - controllers: Test for controller
  - factories: Factories for construct objects for tests
  - repositories: Tests for repositories
  - services: Tests for services
- tasks

### Linters and formatters

This project uses technologies to ensure the quality of the code:

- Rubocop

```
bundle exec rubocop
```
