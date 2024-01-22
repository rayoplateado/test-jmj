module Analytics
  class Metric < ApplicationRecord
    # This class represent a metric in the platform
    self.table_name = 'analytics_metrics'
  end
end
