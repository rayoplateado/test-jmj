require 'rails_helper'

RSpec.describe Analytics::MetricRepository, type: :repository do
  describe 'methods' do
    subject(:repository) { described_class.new }

    describe '#entity' do
      it 'returns correct class' do
        expect(repository.entity).to eq(Analytics::Metric)
      end
    end

    describe '#averages' do
      let(:valid_params) do
        {
          from_date: '2024-01-14T10:30:00+01:00',
          to_date: '2024-01-15T12:30:00+01:00',
          timezone: '+1',
          range: 'day'
        }
      end

      it 'calls to database connection' do
        connection = instance_double('Connection')
        allow(ActiveRecord::Base).to receive(:connection) { connection }
        expect(connection).to receive(:execute)

        repository.averages(
          valid_params[:from_date],
          valid_params[:to_date],
          valid_params[:timezone],
          valid_params[:range]
        )
      end
    end
  end
end
