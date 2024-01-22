import type {Notification} from '../../models/notification/domain/Notification'
import {NotificationType} from '../../models/notification/domain/NotificationType'
import {useNotificationStore} from '../../stores/notification/notificationStore'
import {
  MetricsApiService,
  MetricsApiV1Urls,
} from '../../api/metrics-service/MetricsApiService'
import {PostMetricBody} from '../../models/metrics/domain/PostMetricBody'

/**
 * Class for create a metric in Metric Api Service
 */
export class PostMetricActionHandler {
  constructor(
    private readonly notificationStore = useNotificationStore(),
    private readonly metricsApiService = new MetricsApiService(),
  ) {}

  /**
   * Function to launch main action in class
   * @param postMetricBody - Body of the metric
   * @returns Promise<void>
   */
  public async handle(postMetricBody: PostMetricBody): Promise<void> {
    try {
      return await this.metricsApiService.post({
        endpoint: MetricsApiV1Urls.apiV1AnalyticsMetrics,
        body: postMetricBody,
      })
    } catch (error: unknown) {
      const notification: Notification = {
        id: crypto.randomUUID(),
        text: 'Error with request',
        type: NotificationType.error,
      }

      this.notificationStore.addNotification(notification)

      throw error
    }
  }
}
