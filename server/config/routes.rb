Rails.application.routes.draw do
  # Use for login and authorizing all resources
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'pages#ping'

  use_doorkeeper do
    # No need to register client application
    skip_controllers :applications, :authorized_applications
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'users/me', to: 'users#me'
      resources :notes, only: [ :index, :show, :create, :update, :destroy ]
        devise_for :users, controllers: {
          registrations: 'api/v1/users/registrations',
        }, skip: [:sessions, :password]
    end
  end
end
