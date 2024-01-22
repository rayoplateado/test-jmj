module Analytics
  class CreateMetricsService < BaseService
    # Service that create the metric in database
    #
    # @params[:name] Name of the metric
    # @params[:created_at] Timestamp of the metric
    # @params[:value] Value given for the metric

    validates :name, presence: true, length: { minimum: 1, maximum: 512 }
    validates :value, presence: true
    validates :created_at, presence: true

    attr_accessor :params, :name, :value, :created_at

    def initialize(params)
      @name = params[:name]
      @value = params[:value]
      @created_at = params[:created_at]

      super(params)
    end

    def execute
      return false if invalid?

      Analytics::MetricRepository.new.create(params)
    end
  end
end
