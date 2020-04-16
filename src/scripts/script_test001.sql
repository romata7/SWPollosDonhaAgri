CREATE DATABASE IF NOT EXISTS dbtest001;
USE dbtest001;
create table tproducto(
	id integer auto_increment primary key,
    producto varchar(50) not null unique,
    costo decimal(10,2)    
);

create table tcomanda(
	id_coma integer not null primary key,
    user varchar(50),
    fecha datetime not null,
    total decimal(10,2) not null
);

create table tdetalle (
	id_deta integer auto_increment primary key,
    id_coma integer not null,
    cant integer not null,
    producto varchar(50),
    costo decimal(10,2),
    total decimal(10,2),
    foreign key (id_coma)
		references tcomanda(id_coma)
        on delete cascade
);
create table tegreso(
	id_egre integer not null auto_increment primary key,
    concepto varchar(100) unique not null,    
    monto decimal(10,2) not null,
    fecha datetime default current_timestamp
);

select * from tegreso;

drop table tegreso;
drop table tdetalle;
drop table tcomanda;

select * from tproducto;
select * from tcomanda;
select * from tdetalle;

select * from tegreso;

delete from tcomanda where id_coma = 2;

select D.producto , count(D.producto) as Unidades from tdetalle AS D, tcomanda AS C WHERE C.fecha between "2020-4-1 00:00:00" AND "2020-4-15 23:59:59" and C.id_coma = D.id_coma group by producto order by Unidades desc;

SELECT B.id_deta, B.id_coma, A.fecha, A.user, B.cant, B.producto, B.costo, B.total FROM tcomanda as A, tdetalle as B WHERE A.fecha BETWEEN '2020-4-12' AND '2020-4-13 23:59:59' and A.id_coma = B.id_coma;
