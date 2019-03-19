class Api::V1::UsersController < Api::V1::BaseController

  def me
    @user = current_resource_owner
    render :show
  end

end
