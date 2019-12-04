Rails.application.routes.draw do
  devise_for :users
  get 'messages/index'
  root "messages#index"
  resources :users, only: [:eidt, :update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
