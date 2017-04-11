class Human < ActiveLeopard::Base
  has_many :cats, :foreign_key => :owner_id

  belongs_to :house, :foreign_key => :house_id

  finalize!

  def name
    "#{fname.capitalize} #{lname.capitalize}"
  end
end
