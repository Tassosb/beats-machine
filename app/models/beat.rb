class Beat < ActiveLeopard::Base
  validates :name, presence: true


  finalize!
end
