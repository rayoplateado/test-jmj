require 'rails_helper'

RSpec.describe Analytics::CreateMetricsService, type: :service do
  describe '#execute' do
    context 'when params are valid' do
      let(:valid_params) do
        {
          name: Faker::Name.name,
          value: 100.0,
          created_at: '2024-01-14T10:30:00+01:00'
        }
      end

      it 'responds with info' do
        service = described_class.new(valid_params)
        expect_any_instance_of(Analytics::MetricRepository).to receive(:create)
        expect(service.execute).not_to eq(false)
      end
    end

    context 'when params are invalid' do
      let(:invalid_params) { {} }

      it 'responds with false and save errors' do
        service = described_class.new(invalid_params)
        expect(service.execute).to be(false)
        expect(service.errors.as_json).to eq(
          {
            created_at: ['can\'t be blank'],
            name: ['can\'t be blank', 'is too short (minimum is 1 character)'],
            value: ['can\'t be blank']
          }
        )
      end
    end
  end
end
