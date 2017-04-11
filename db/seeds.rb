
Human.destroy_all
Cat.destroy_all

names = "Werner Gapinski  
Georgianna Bonner  
Trudi Nesbitt  
Kanesha Blanca  
Cicely Orme  
Marx Valdivia  
Diane Greenhaw  
Carisa Schmieder  
Alayna Delapp  
Nicky Haran  
Abbey Throneberry  
Leisha Hartsock  
Vance Gregori  
Samual Hayslett  
Esmeralda Desimone  
Maureen Claus  
Roselle Wiedemann  
Dorothea Layden  
Cherie Ghent  
Edgar Casias".split(/\n/).map { |name| name.strip.split(' ') }

humans = names.map do |fname, lname|

  h = Human.new(fname: fname, lname: lname)
  h.save
  h
end

human_ids = humans.map(&:id)


cats = ["Bella", "Tigger", "Chloe", "Shadow", "Luna", "Oreo", "Oliver", "Kitty",
  "Lucy", "Molly", "Jasper", "Smokey", "Gizmo", "Simba", "Tiger",
  "Charlie", "Angel", "Jack", "Lily", "Peanut", "Toby", "Baby",
  "Loki", "Midnight", "Milo", "Princess", "Sophie", "Harley",
  "Max", "Missy", "Rocky", "Zoe", "CoCo", "Misty", "Nala",
  "Oscar", "Pepper", "Sasha", "Buddy", "Pumpkin", "Kiki", "mittens",
  "bailey", "Callie", "Lucky", "Patches", "Simon", "Garfield", "George",
  "Maggie", "Sammy", "Sebastian", "Boots", "Cali", "Felix", "Lilly",
  "Phoebe", "Sassy", "tucker", "bandit", "Dexter", "Fiona", "Jake",
  "Precious", "Romeo", "Snickers", "Socks", "Daisy", "Gracie", "Lola",
  "Sadie", "sox", "Casper", "Fluffy", "Marley", "minnie", "Sweetie",
  "Ziggy", "Belle", "Blackie", "Chester", "Frankie", "Ginger", "Muffin",
  "Murphy", "Rusty", "Scooter", "BatMan", "boo", "Cleo", "Izzy",
  "Jasmine", "MIMI", "SUGAR", "cupcake", "Dusty", "Leo", "Noodle",
  "Panda", "Peaches"]

cats.each do |cat|
  c = Cat.new(name: cat, owner_id: human_ids.sample)
  c.save
end

u = User.new(username: "Tbar", password: "password")
u.save
