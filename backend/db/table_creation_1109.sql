-- drop database patientdb;
create database patientdb;
use patientdb;

create table Patient(
   patient_id varchar(20) not null unique primary key,
   patient_name varchar(20) not null,
   patient_pw varchar(20) not null,
   age int not null,
   weight float not null,
   height float not null,
   birth_date varchar(10) not null,
   gender varchar(7) not null,
   illness varchar(20),
   medicine varchar(20),
   phone_number varchar(13)
);
select * from Patient;

create table Simple_solution(
   simple_sol varchar(40) not null,
   patient_id varchar(20) not null unique,
   foreign key(patient_id) references Patient(patient_id),
   primary key(simple_sol)
);

insert into Simple_solution values('염분량을 줄이셔야합니다.','esdfdg');
select * from Simple_solution;


create table Save_diet(
   food_detection varchar(255) not null primary key,
   image blob NOT NULL,
   -- photo_time varchar(20),
   photo_time datetime,
   patient_id varchar(20) not null unique,
   foreign key(patient_id) references Patient(patient_id)
);
alter table Save_diet modify image varchar(255);  -- image 링크 받는 것으로 바꿈
insert into Save_diet values('쌀밥, 된장국, 김치, 제육볶음','https://~~','2021-11-09 08:30:20','esdfdg');
 
create table Nutrient(
   patient_id varchar(20) not null unique primary key,
   carbohydrate float not null,
   protein float not null,
   fat float not null,
   calories float not null,
   sodium float not null,
   calcium float not null,
   vitamin_c float not null,
   food_detection varchar(80) not null,
   foreign key(food_detection) references Save_diet(food_detection),
   foreign key(patient_id) references Patient(patient_id)
);
insert into Nutrient values('esdfdg','10','20','30','800','23','31','12','쌀밥, 된장국, 김치, 제육볶음');
select * from Nutrient;

-- 질문이 5개라 가정
create table Query_patient(
   query_id varchar(20) not null unique primary key,
   patient_id varchar(20) not null unique,
   question_01 varchar(100) not null,
   question_02 varchar(100) not null,
   question_03 varchar(100) not null,
   question_04 varchar(100) not null,
   question_05 varchar(100) not null,
   foreign key(patient_id) references Patient(patient_id)
);
insert into Query_patient values ('qr1024000','esdfdg','1','3','4','2','2');
select * from Query_patient;

create table Doctor(
   doctor_id varchar(20) not null unique primary key,
   patient_id varchar(20) not null unique,
   doctor_name varchar(20) not null,
   dept varchar(20) not null,
   foreign key(patient_id) references Patient(patient_id)
);
insert into Doctor values ('Dr6677000','esdfdg','김길동','소화기내과');
select * from Doctor;