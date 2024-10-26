create database hackaton_2024
go

use hackaton_2024
go

create table tb_suporte(
id_sup int identity(1,1) primary key,
area varchar(100),
telefone int,
id_admin int
)
go

create table tb_admin(
id_admin int identity(1,1) primary key,
login varchar(100),
senha varchar(255)
)
go

create table tb_medicos(
id_medic int identity(1,1) primary key,
nome varchar(100),
especialidade varchar(100),
telefone int,
consultorio varchar(100),
id_admin int
)
go

create table tb_relatorio(
id_rel int identity(1,1) primary key,
tipo_rel varchar(100),
dt_rel datetime
)
go

create table tb_hist_rel(
id_hist_rel int identity(1,1) primary key,
id_rel int,
id_hist int,
dt_hist_rel datetime
)
go

create table tb_historico(
id_hist int identity(1,1) primary key,
historico varchar(100),
dt_log datetime,
id_cliente int
)
go

create table tb_cliente(
id_cliente int identity(1,1) primary key,
nome varchar(100),
senha varchar(255),
telefone int,
data_nasc datetime,
email varchar(100),
cep varchar(9),
temp_sono time,
ativ_fisica time,
passos int,
distancia_per numeric(7,2),
altura numeric(4,2),
peso numeric(3,3),
obs_medicamentos varchar(255),
batimentos int,
pressao int,
saturacao numeric (4,2)
)
go


create table tb_quest(
id_quest int identity(1,1) primary key,
id_cliente int,
questao varchar(100),
resp varchar(100),
score int
)
go

-------------------------------------------------------------------
alter table tb_suporte
add constraint fk_id_admin_tb_suporte foreign key (id_admin) references tb_admin (id_admin)
go

alter table tb_medicos
add constraint fk_id_admin_tb_medicos foreign key (id_admin) references tb_admin (id_admin)
go

alter table tb_hist_rel
add constraint fk_id_rel_tb_hist_rel foreign key (id_rel) references tb_relatorio (id_rel)
go

alter table tb_hist_rel
add constraint fk_id_hist_tb_hist_rel foreign key (id_hist) references tb_historico (id_hist)
go

alter table tb_historico
add constraint fk_id_hist_tb_historico foreign key (id_cliente) references tb_cliente (id_cliente)
go

alter table tb_quest
add constraint fk_id_cliente_tb_quest foreign key (id_cliente) references tb_cliente (id_cliente)
go
