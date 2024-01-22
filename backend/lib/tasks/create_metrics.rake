require 'rake'

task :create_metrics, %i[from_date to_date] => [:environment] do |_t, args|
  desc 'Create from 1 to 3 metrics each day in range given'

  raise(StandardError, 'Not correct format') if args[:from_date].blank? || args[:to_date].blank?

  (Date.parse(args[:from_date])..Date.parse(args[:to_date])).each do |date|
    1.upto(rand(1..100)).each do |_metric|
      Analytics::MetricRepository.new.create(
        created_at: Time.zone.at(date.to_time).to_datetime,
        name: 'example',
        value: rand(1.0..100.0).round(2)
      )
    end
  end
end
