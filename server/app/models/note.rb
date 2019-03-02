class Note < ApplicationRecord
  belongs_to :owner, class_name: "User"

  validates :owner, presence: true
  validates :title, presence: true # but can be empty string
  validates :content, presence: true # but can be empty string

  # scope :mine, -> { where(owner: current_user) }

end
