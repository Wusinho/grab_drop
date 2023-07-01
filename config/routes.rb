Rails.application.routes.draw do
  get 'tasks/index'
  resources :tasks do
    patch 'update_status', on: :member
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "tasks#index"
end
