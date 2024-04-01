require 'rails_helper'

RSpec.describe Api::V1::GoalsController, type: :request do
  describe 'GET #index' do
    before do
      create_list(:goal, 3) # Assumes you have a factory named :goal
      get '/api/v1/goals'
    end

    it 'returns all goals' do
      expect(json.size).to eq(3)
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_attributes) { attributes_for(:goal) } # Assumes you have a factory named :goal

      it 'creates a new goal' do
        expect do
          post '/api/v1/goals', params: { goal: valid_attributes }
        end.to change(Goal, :count).by(1)
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new goal' do
        expect do
          post '/api/v1/goals', params: { goal: { description: '' } } # Assuming description can't be blank
        end.to_not change(Goal, :count)
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'GET #show' do
    let(:goal) { create(:goal) } # Assumes you have a factory named :goal

    it 'returns the goal details' do
      get "/api/v1/goals/#{goal.id}"
      expect(response).to have_http_status(200)
      expect(json['id']).to eq(goal.id)
    end

    it 'returns a 404 for a non-existent goal' do
      get '/api/v1/goals/999999'
      expect(response).to have_http_status(404)
    end
  end

  describe 'DELETE #destroy' do
    let!(:goal) { create(:goal) } # Assumes you have a factory named :goal

    it 'deletes the goal' do
      expect do
        delete "/api/v1/goals/#{goal.id}"
      end.to change(Goal, :count).by(-1)
      expect(response).to have_http_status(204)
    end
  end
end
