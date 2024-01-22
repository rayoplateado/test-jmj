import type {Notification} from '../../models/notification/domain/Notification'
import {NotificationType} from '../../models/notification/domain/NotificationType'
import {useNotificationStore} from '../../stores/notification/notificationStore'
import {
  MetricsApiService,
  MetricsApiV1Urls,
} from '../../api/metrics-service/MetricsApiService'
import {AverageApi} from '../../models/metrics/api/AverageApi'
import {FetchAverageQuery} from '../../models/metrics/domain/FetchAverageQuery'

/**
 * Class for getting averages from Metric Api Service
 */
export class FetchAveragesActionHandler {
  constructor(
    private readonly notificationStore = useNotificationStore(),
    private readonly metricsApiService = new MetricsApiService(),
  ) {}

  /**
   * Method to launch main action in class
   * @param fetchAveragesQuery - Query for averages
   * @returns AverageApi - Elements of AverageApi
   */
  public async handle(
    fetchAveragesQuery: FetchAverageQuery,
  ): Promise<AverageApi> {
    try {
      return await this.metricsApiService.get({
        endpoint: MetricsApiV1Urls.apiV1AnalyticsMetricsAverages,
        params: fetchAveragesQuery,
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
