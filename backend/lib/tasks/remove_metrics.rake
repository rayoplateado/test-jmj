require 'rake'

task remove_metrics: :environment do
  desc 'Remove all metrics in database'
  Analytics::MetricRepository.new.destroy_all
end
