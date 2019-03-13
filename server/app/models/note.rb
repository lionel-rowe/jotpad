class Note < ApplicationRecord
  belongs_to :owner, class_name: 'User'

  validates :owner, presence: true
  validates :title, length: { in: 0..255, allow_nil: false }
  validates :content, length: { in: 0..65536, allow_nil: false }

  # scope :mine, -> { where(owner: current_user) }

  before_validation :generate_random_title

  private

  def generate_random_title
    if !self.title
      self.title = Haikunator.haikunate(0, ' ') # => "green fire"
    end
  end

end
