\c mi_base_de_datos;

insert into city (name) values
('villa maria'),
('cordoba');

insert into restaurant (name, "imageUrl") values
('The One Burger', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSh_8U_HIqU7xLFArpcpTbdW149aHLIoUOg&s'),
('Eddie Burgers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqciDxGRPpyJo21sRBFax0jsBx5vcV3rPVRA&s'),
('Holly Burgers', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmnO_3xEqKXuX7jEGzeIoRa7TkAQL8khFNg&s');

insert into address (street, number, "cityId", restaurant) values
('Santa fe', 761, 1, 1),
('9 de julio', 255, 1, 2),
('Saenz peña', 63, 1, 3);

insert into location (lat, lng, address) values
(-32.4, -63.2, 1),
(-32.4, -63.2, 2),
(-32.4, -63.2, 3);