create table libros (
    id int AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(50) not null,
    autor varchar(100) not null,
    editorial varchar(100) not null,
    nro_paginas int,
    stock int DEFAULT 0,
    estado boolean DEFAULT 1
);

insert into libros(titulo,autor,editorial,nro_paginas,stock,estado)
values ('El principito','Desconocido','Desconocida',100,20,1);

insert into libros(titulo,autor,editorial,nro_paginas,stock,estado)
values ('Ingenieria de Software','Roger Pressman','Pearson Education',100,20,1);