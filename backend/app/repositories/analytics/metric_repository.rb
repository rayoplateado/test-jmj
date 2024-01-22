module Analytics
  # This class allow accessing to Metric database operations with a layer
  class MetricRepository < ::PostgresRepository
    def entity
      @data_source || Analytics::Metric
    end

    def averages(from_date, to_date, metric = 'all', timezone = '+0', range = 'day')
      ranges = {
        'day': '1d',
        'hour': '1h',
        'minute': '1m'
      }

      cast = {
        'day': 'date',
        'hour': 'timestamp',
        'minute': 'timestamp'
      }

      name_filter = (metric.present? ? "AND analytics_metrics.name = '#{metric}'" : '')
      apply_tmz = range == 'day' ? "at time zone '#{timezone}'" : ''

      sql = "
        SELECT
          CAST(calendar.entry as #{cast[range.to_sym]}) as date,
          COALESCE(SUM(analytics_metrics.value)::float, 0) as sum,
          COUNT(analytics_metrics.id) as count
        FROM
          generate_series(
            date_trunc('#{range}', '#{from_date}'::#{cast[range.to_sym]}),
            date_trunc('#{range}', '#{to_date}'::#{cast[range.to_sym]}),
            '#{ranges[range.to_sym]}'
          ) AS calendar (entry)
          LEFT JOIN analytics_metrics
            ON date_trunc('#{range}', analytics_metrics.created_at #{apply_tmz}) = calendar.entry
            #{name_filter}
        GROUP BY calendar.entry
        ORDER BY date ASC;
      "

      ActiveRecord::Base.connection.execute(sql).presence
    end
  end
end
