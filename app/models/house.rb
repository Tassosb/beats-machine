class House < ActiveLeopard::Base
  has_many :humans, foreign_key: :house_id

  has_many_through :cats, :humans, :cats

  finalize!
end
