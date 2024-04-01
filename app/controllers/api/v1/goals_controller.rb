# frozen_string_literal: true

module Api
  module V1
    class GoalsController < ApplicationController
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
      rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

      def index
        goals = Goal.all.includes(:last_stat)
        render json: goals, each_serializer: GoalWithLastStatSerializer
      end

      def create
        goal = Goal.create!(goal_params)
        render json: goal, status: :created, serializer: GoalWithLastStatSerializer
      end

      def show
        render json: goal, serializer: GoalWithStatsSerializer
      end

      def destroy
        goal.destroy!
        head :no_content
      end

      private

      def goal
        @goal ||= Goal.find(params[:id])
      end

      def goal_params
        params.require(:goal).permit(:description, :target_value, :target_date, :tracking_interval)
      end

      def render_not_found_response
        render json: { error: 'Goal not found' }, status: :not_found
      end

      def render_unprocessable_entity_response(exception)
        render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end
