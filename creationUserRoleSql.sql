use `computer-database-db`;
drop table if exists users;
drop table if exists role;

create table role (
id                        bigint not null auto_increment,
name                      varchar(255),
constraint pk_role primary key (id))
;

create table users (
id                        bigint not null auto_increment,
loginName                 varchar(255) not null,
passwordHash              varchar(255) not null,
role_id                   bigint default NULL,
constraint pk_users primary key (id))
;
alter table users add constraint fk_users_role_1 foreign key (role_id) references role (id) on delete restrict on update restrict;
  create index ix_users_role_1 on users (role_id);

insert into role(id,name) values(1,'ADMIN');
insert into role(id,name) values(2,'USER');

insert into users(id,loginName,passwordHash,role_id) values(1,'Lorenzo','$2a$10$E.FXHjiQ4FnD4qFbSDizqeln1ASXDeVacIIsgRbNzolXQt4/S/Ufq',1);
insert into users(id,loginName,passwordHash,role_id) values(2,'Jerome','$2a$10$E.FXHjiQ4FnD4qFbSDizqeln1ASXDeVacIIsgRbNzolXQt4/S/Ufq',1);
insert into users(id,loginName,passwordHash,role_id) values(3,'Sylvie','$2a$10$E.FXHjiQ4FnD4qFbSDizqeln1ASXDeVacIIsgRbNzolXQt4/S/Ufq',1);
insert into users(id,loginName,passwordHash,role_id) values(4,'Noobs','$2a$10$E.FXHjiQ4FnD4qFbSDizqeln1ASXDeVacIIsgRbNzolXQt4/S/Ufq',2);

