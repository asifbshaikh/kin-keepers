Rails.application.routes.draw do
  # This line mounts Spree's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to
  # Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the
  # :at option to something different.
  #
  # We ask that you don't use the :as option here, as Spree relies on it being
  # the default of "spree".
  mount Spree::Core::Engine, at: '/'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :vendors, only: [ :new, :create ]

  get "/vendors/register/success", to: "vendors#register_success"
  post "/vendors/register/validate/vendor_name", to: "vendors#vendor_exists", defaults: { format: "json" }
  post "/vendors/register/validate/vendor_email", to: "vendors#user_exists", defaults: { format: "json" }
  get "/admin/vendor_dashboard", to: "spree/admin/vendor_dashboard#index"
  get "/admin/vendor_dashboard2", to: "spree/admin/vendor_dashboard#dashboard"
  post "/vendors/register/validate_email", to:"vendors#validate_email"
  post "/vendors/register/validate_name", to:"vendors#validate_name"

  post "/vendors/create", to: "vendors#create"
end
