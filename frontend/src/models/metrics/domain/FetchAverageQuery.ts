import {TimeRange} from '../../common/domain/Constants'

export interface FetchAverageQuery {
  from_date: string
  to_date: string
  range: TimeRange
  timezone: string
  metric_name: string
}
