import {ApiService} from '../ApiService'

export enum MetricsApiV1Urls {
  apiV1AnalyticsMetrics = '/api/v1/analytics/metrics',
  apiV1AnalyticsMetricsAverages = '/api/v1/analytics/metrics-averages',
}

export class MetricsApiService extends ApiService {
  constructor() {
    const apiBaseUrl =
      import.meta.env.METRICS_API_URL || 'http://localhost:3000'
    super(apiBaseUrl)
  }
}
