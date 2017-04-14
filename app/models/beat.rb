class Beat < ActiveLeopard::Base
  validates :name, presence: true
  validates :author_id, presence: true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  def to_json
    {
      name: self.name,
      sound: self.sound,
      id: self.id
    }
  end

  finalize!
end
