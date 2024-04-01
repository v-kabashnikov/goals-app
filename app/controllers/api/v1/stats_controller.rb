# frozen_string_literal: true

module Api
  module V1
    class StatsController < ApplicationController
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
      rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

      def create
        stat = goal.stats.create!(stat_params)
        render json: stat, status: :created
      end

      def destroy
        stat.destroy!
        head :no_content
      end

      private

      def goal
        @goal ||= Goal.find(params[:goal_id])
      end

      def stat
        @stat ||= Stat.find(params[:id])
      end

      def stat_params
        params.require(:stat).permit(:value)
      end

      def render_not_found_response
        render json: { error: 'Record not found' }, status: :not_found
      end

      def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
end