CREATE TABLE usuario (
id serial PRIMARY KEY,
nombre text,
celular varchar(10)
);

CREATE TABLE carro(
id serial PRIMARY KEY,
marca text,
placa text,
color text,
id_usuario int,
FOREIGN KEY (id_usuario) references usuario (id)
);