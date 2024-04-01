Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :goals, only: %i[index create show destroy] do
        resources :stats, only: %i[create destroy]
      end
    end
  end
  root 'homepage#index'

  get '*path', to: 'homepage#index', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
