require 'rails_helper'

RSpec.describe Api::V1::Analytics::MetricsController, type: :controller do
  describe 'GET #averages' do
    let(:metric1) do
      Analytics::MetricsFactory.new.create(
        name: 'metric_1', value: 100.0, created_at: '2024-01-15T00:30:00+01:00'
      )
    end

    let(:metric2) do
      Analytics::MetricsFactory.new.create(
        name: 'metric_2', value: 50.0, created_at: '2024-01-15T10:30:00+01:00'
      )
    end

    let(:metric3) do
      Analytics::MetricsFactory.new.create(
        name: 'metric_2', value: 20.0, created_at: '2024-01-15T11:30:00+01:00'
      )
    end

    context 'when attributes are corrects' do
      let(:url_params) do
        {
          from_date: '2024-01-14T10:30:00+00:00',
          to_date: '2024-01-15T12:30:00+00:00',
          timezone: '+1',
          range: 'day'
        }
      end

      before do
        ::Analytics::MetricRepository.new.destroy_all
        metric1
        metric2
        metric3
      end

      it 'returns 200 Http status code' do
        get :averages, params: url_params
        expect(response).to have_http_status(:ok)
      end

      it 'returns the correct values with timezone' do
        get :averages, params: url_params

        parsed_response = JSON.parse(response.body)

        expect(parsed_response['data'].count).to eq(2)
        expect(parsed_response['data'][0]['sum']).to eq(0.0)
        expect(parsed_response['data'][0]['count']).to eq(0)
        expect(parsed_response['data'][1]['sum']).to eq(170.0)
        expect(parsed_response['data'][1]['count']).to eq(3)

        # With timezone utc (by default)
        get :averages, params: url_params.except(:timezone)
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['data'].count).to be(2)
        expect(parsed_response['data'][0]['sum']).to eq(100.0)
        expect(parsed_response['data'][0]['count']).to eq(1)
        expect(parsed_response['data'][1]['sum']).to eq(70.0)
        expect(parsed_response['data'][1]['count']).to eq(2)
      end
    end

    context 'when params are incorrects' do
      let(:invalid_url_params) { { range: 'year' } }

      it 'returns 200 Http status code' do
        get :averages, params: invalid_url_params
        expect(response).to have_http_status(:ok)
      end

      it 'returns the correct values' do
        get :averages, params: invalid_url_params

        expect(JSON.parse(response.body)).to eql({})
      end
    end
  end
end
