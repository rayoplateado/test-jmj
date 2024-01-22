module Analytics
  class AveragesMetricsService < BaseService
    # Service that calculate averages for timelines
    #
    # @params[:range] range (hour, minutes, day)
    # @params[:from_date] Init date for query
    # @params[:to_date] End date for query
    # @params[:timezone] Timezone for database group in days
    # @params[:metric_name] Name of metric

    validates :range, presence: true, inclusion: { in: %w[minute hour day] }
    validates :from_date, presence: true
    validates :to_date, presence: true
    validates :timezone, presence: true

    attr_accessor :params, :range, :from_date, :to_date, :timezone, :metric_name

    def initialize(params)
      @range = params[:range]
      @from_date = params[:from_date]
      @to_date = params[:to_date]
      @timezone = params[:timezone]
      @metric_name = params[:metric_name]

      super
    end

    def execute
      return false if invalid?

      Analytics::MetricRepository.new.averages(
        @from_date, @to_date, @metric_name, @timezone, @range
      )
    end
  end
end
