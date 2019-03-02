json.data do
  json.id @user.id
  json.type 'user'
  json.attributes do
    json.email @user.email
    json.gravatar @user.gravatar
  end
end
