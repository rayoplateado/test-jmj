class ApplicationController < ActionController::API
  include CommonResponses

  rescue_from ActiveRecord::RecordNotFound do
    render404
  end
end
