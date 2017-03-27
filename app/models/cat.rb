class Cat < ActiveLeopard::Base
  validates :name, presence: true, uniqueness: true

  belongs_to :human, :foreign_key => :owner_id

  has_one_through :house, :human, :house

  finalize!
end
