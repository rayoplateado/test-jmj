require 'rails_helper'

RSpec.describe PostgresRepository, type: :repository do
  describe 'inheritance' do
    describe '#extend' do
      it 'extends correctly' do
        expect(described_class.ancestors[1]).to eq BaseRepository
      end
    end
  end
end
