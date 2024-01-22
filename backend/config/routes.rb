Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :analytics do
        resources :metrics, only: %i[create]
        get 'metrics-averages', to: 'metrics#averages'
      end
    end
  end
end
