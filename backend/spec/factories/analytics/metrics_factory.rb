require 'faker'
require_relative '../base_factory'

module Analytics
  class MetricsFactory < BaseFactory
    def repository
      Analytics::MetricRepository
    end

    def default_values_for_params
      params = {}
      params[:name] = Faker::Name.name
      params[:value] = rand(-1_000.0..1_000.0).round(2)

      params
    end
  end
end
