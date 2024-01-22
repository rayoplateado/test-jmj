require 'rails_helper'

RSpec.describe Analytics::AveragesMetricsService, type: :service do
  describe '#execute' do
    context 'when params are valid' do
      let(:valid_params) do
        {
          from_date: '2024-01-14T10:30:00+01:00',
          to_date: '2024-01-15T12:30:00+01:00',
          timezone: '+1',
          range: 'day'
        }
      end

      it 'responds with info' do
        service = described_class.new(valid_params)
        expect_any_instance_of(Analytics::MetricRepository).to receive(:averages)
        expect(service.execute).not_to eq(false)
      end
    end

    context 'when params are invalid' do
      let(:invalid_params) { { range: 'year' } }

      it 'responds with false and save errors' do
        service = described_class.new(invalid_params)
        expect(service.execute).to be(false)
        expect(service.errors.as_json).to eq(
          {
            from_date: ['can\'t be blank'],
            range: ['is not included in the list'],
            timezone: ['can\'t be blank'],
            to_date: ['can\'t be blank']
          }
        )
      end
    end
  end
end
