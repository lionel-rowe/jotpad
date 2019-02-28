Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :notes, only: [ :index, :show, :create, :update, :destroy ]
      # post '/login', to: 'users#login'
      # post '/signup', to: 'users#signup'

      # resources :parent, only: [  ] do
      #   resources :child, only: [  ]
      # end
    end
  end

  root to: 'pages#ping'

  # get '*path', to: 'pages#index'
  # devise_for :users#, skip: :sessions
end
