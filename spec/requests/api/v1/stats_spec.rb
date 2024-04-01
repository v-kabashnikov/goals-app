require 'rails_helper'

RSpec.describe 'Stats API', type: :request do
  let!(:goal) { create(:goal) }
  describe 'POST /api/v1/goals/:goal_id/stats' do
    let(:valid_attributes) { { stat: { value: 20 } } }

    context 'when the request is valid' do
      before { post "/api/v1/goals/#{goal.id}/stats", params: valid_attributes }

      it 'creates a stat' do
        expect(response).to have_http_status(201)
        expect(json['value']).to eq(20)
      end
    end

    context 'when the request is invalid' do
      before { post "/api/v1/goals/#{goal.id}/stats", params: { stat: { value: '' } } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'DELETE /api/v1/goals/:goal_id/stats/:id' do
    let!(:stat) { create(:stat, goal:) }

    before { delete "/api/v1/goals/#{goal.id}/stats/#{stat.id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
