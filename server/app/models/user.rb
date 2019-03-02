class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  before_save :ensure_authentication_token

  def ensure_authentication_token
     if authentication_token.blank?
         self.authentication_token = generate_authentication_token
     end
  end

  def gravatar(size=80)
    # api: https://en.gravatar.com/site/implement/images/

    md5 = Digest::MD5.hexdigest(email.strip.downcase)

    default = 'identicon'
    # default = URI.escape(default_url, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))

    "https://www.gravatar.com/avatar/#{md5}?s=#{size}&d=#{default}"
  end

  private

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless User.where(authentication_token: token).first
    end
  end

end
