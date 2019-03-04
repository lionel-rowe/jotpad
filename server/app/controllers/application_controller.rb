class ApplicationController < ActionController::API

  # skip_before_filter :verify_authenticity_token
  # skip_before_action :verify_authenticity_token

  # Doorkeeper code
  before_action :doorkeeper_authorize!

  # include Pundit
  # include Doorkeeper
  before_action :configure_permitted_parameters, if: :devise_controller?

  respond_to :json


  protected

  # Devise methods
  # Authentication key(:username) and password field will be added automatically by devise.
  def configure_permitted_parameters
    added_attrs = [ :email ]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  private

end

# class ApplicationController < ActionController::Base

#   #   include Pundit

#   before_action :authenticate_user_from_token!
#   before_action :authenticate_user!

#   # protect_from_forgery with: :exception, prepend: true

#   private

#   def authenticate_user_from_token!
#     authenticate_with_http_token do |token, options|
#       user_email = options[:email].presence
#       user = user_email && User.find_by_email(user_email)

#       if user && Devise.secure_compare(user.authentication_token, token)
#         sign_in user, store: false
#       end
#     end
#   end
# end




# class ApplicationController < ActionController::API

#   skip_before_filter :verify_authenticity_token
#   protect_from_forgery prepend: true, with: :exception
#   before_action :authenticate_user!


#   # protect_from_forgery with: :null_session
#   # protect_from_forgery with: :exception
#   # before_action :authenticate_user!

# end
