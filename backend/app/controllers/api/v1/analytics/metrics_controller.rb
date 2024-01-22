module Api
  module V1
    module Analytics
      class MetricsController < ApplicationController
        def create
          metric_service = ::Analytics::CreateMetricsService.new(permitted_params_for_create)

          metric = metric_service.execute

          if metric
            render json: { data: metric.as_json }, status: 201
          else
            render json: { errors: metric_service.errors.details }, status: 422
          end
        end

        def averages
          average_service = ::Analytics::AveragesMetricsService.new(permitted_params_for_average)

          averages = average_service.execute

          if averages
            render json: { data: averages.as_json }
          else
            render json: {}, status: 200
          end
        end

        private

        def permitted_params_for_create
          valid_params = params.permit(%i[name value timestamps])

          valid_params[:created_at] = DateTime.now.utc.to_s if valid_params[:created_at].blank?

          valid_params
        end

        def permitted_params_for_average
          valid_params = params.permit(%i[from_date to_date range timezone metric_name])

          # Range by minutes by default
          valid_params[:rage] = :day if valid_params[:range].blank?

          # 1 week ago by default for from_date
          valid_params[:from_date] = (DateTime.now - 1.week) if valid_params[:from_date].blank?

          # Now by default for to_date
          valid_params[:to_date] = DateTime.now if valid_params[:to_date].blank?

          # Timezone by default
          valid_params[:timezone] = '+0' if valid_params[:timezone].blank?

          valid_params
        end
      end
    end
  end
end
