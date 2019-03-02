class Api::V1::UsersController < Api::V1::BaseController

  def me
    p doorkeeper_token
    @user = current_resource_owner
  end

end
