# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  # ...

  skip_before_action :verify_authenticity_token, only: :create

  # POST /resource
  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      @user = resource
      if resource.active_for_authentication?
        # set_flash_message! :notice, :signed_up
        # To avoid login comment out sign_up method
        # sign_up(resource_name, resource)
        # render json: resource # , location: after_sign_up_path_for(resource)
        render 'api/v1/users/show'
      else
        # set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        # render json: resource # , location: after_inactive_sign_up_path_for(resource)
        render 'api/v1/users/show'
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # ...

  protected
  # ...

  def sign_up_params
    params
      .require(:data).require(:attributes)
      .permit(:email, :password)
  end

end
