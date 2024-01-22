require 'rails_helper'

RSpec.describe Api::V1::Analytics::MetricsController, type: :controller do
  let(:path) { api_v1_analytics_metrics_path }

  describe 'POST #create' do
    let(:attributes) do
      { name: 'metric_1', value: 100.0 }
    end

    context 'when attributes are corrects' do
      before do
        ::Analytics::MetricRepository.new.destroy_all
      end

      it 'creates resource' do
        expect do
          post :create, params: attributes
        end.to change(Analytics::Metric, :count).by(1)
      end

      it 'returns 201 Http status code' do
        post :create, params: attributes
        expect(response).to have_http_status(:created)
      end

      it 'returns the correct values' do
        post :create, params: attributes

        model = Analytics::MetricRepository.new.all.last

        attributes.each do |field, value|
          expect(model.send(field)).to eq value
        end
      end
    end

    context 'when params are incorrects' do
      it 'does not create resource' do
        expect do
          post :create, params: { name: '' }
        end.to change(Analytics::Metric, :count).by(0)
      end

      it 'returns 422 Http status code' do
        post :create, params: { name: '' }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
