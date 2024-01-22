require 'rails_helper'

RSpec.describe BaseService, type: :service do
  describe 'functionallity' do
    context 'when is called' do
      let(:valid_params) { { params1: 'test' } }

      it 'raises' do
        service = described_class.new(valid_params)

        expect(service.params).to eq(valid_params)

        expect do
          service.execute
        end.to raise_error BaseService::NotImplementedMethodException
      end
    end
  end
end
