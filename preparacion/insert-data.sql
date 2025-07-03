\c mi_base_de_datos;

insert into city (name) values
('villa maria'),
('cordoba'),
('rosario'),
('buenos aires'),
('mendoza'),
('san juan');

insert into restaurant (name, "imageUrl") values
('The One Burger', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSh_8U_HIqU7xLFArpcpTbdW149aHLIoUOg&s'),
('Eddie Burgers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqciDxGRPpyJo21sRBFax0jsBx5vcV3rPVRA&s'),
('Holly Burgers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmnO_3xEqKXuX7jEGzeIoRa7TkAQL8khFNg&s'),
('Burger Town', 'https://example.com/burgertown.jpg'),
('Smash Bros Burgers', 'https://example.com/smashbros.jpg'),
('Fat Cow', 'https://example.com/fatcow.jpg'),
('Grill Master', 'https://example.com/grillmaster.jpg'),
('Burger Station', 'https://example.com/burgerstation.jpg'),
('RoadHouse Burgers', 'https://example.com/roadhouse.jpg'),
('Classic Buns', 'https://example.com/classicbuns.jpg'),
('Urban Grill', 'https://example.com/urbangrill.jpg'),
('Meat & Bread', 'https://example.com/meatbread.jpg'),
('Buns & Beer', 'https://example.com/bunsbeer.jpg'),
('Double Trouble', 'https://example.com/doubletrouble.jpg'),
('Holy Cow', 'https://example.com/holycow.jpg');

insert into address (street, number, "cityId", restaurant) values
('Santa fe', 761, 1, 1),
('9 de julio', 255, 1, 2),
('Saenz peña', 63, 1, 3),
('Mitre', 1200, 3, 4),
('Urquiza', 540, 3, 5),
('Belgrano', 800, 3, 6),
('San Martin', 1500, 4, 7),
('Entre Ríos', 455, 4, 8),
('Av. Libertador', 2300, 5, 9),
('Las Heras', 312, 5, 10),
('Sarmiento', 410, 2, 11),
('Rivadavia', 900, 2, 12),
('Maipú', 500, 1, 13),
('Corrientes', 150, 1, 14),
('Pasteur', 710, 1, 15);

insert into location (lat, lng, address) values
(-32.4, -63.2, 1),
(-32.4, -63.2, 2),
(-32.4, -63.2, 3),
(-32.95, -60.65, 4),
(-32.96, -60.66, 5),
(-32.97, -60.67, 6),
(-34.60, -58.38, 7),
(-34.61, -58.39, 8),
(-32.89, -68.83, 9),
(-32.90, -68.84, 10),
(-31.42, -64.18, 11),
(-31.43, -64.19, 12),
(-32.41, -63.24, 13),
(-32.42, -63.25, 14),
(-32.43, -63.26, 15);