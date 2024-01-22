require 'rails_helper'

RSpec.describe BaseRepository, type: :repository do
  describe 'methods' do
    let(:subject) { described_class.new }
    let(:data) { [{ sample: 1 }] }

    describe '#initialize' do
      it 'returns correct data' do
        expect(described_class.new(data).data).to eq data
      end
    end
  end
end
