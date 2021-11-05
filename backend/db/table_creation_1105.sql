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


create table Simple_solution(
   simple_sol varchar(40) not null,
   patient_id varchar(20) not null unique,
   foreign key(patient_id) references Patient(patient_id),
   primary key(simple_sol)
);


create table Save_diet(
   food_detection varchar(255) not null primary key,
   image blob NOT NULL,
   photo_time varchar(20),
   patient_id varchar(20) not null unique,
   foreign key(patient_id) references Patient(patient_id)
);

-- create table Diet(
--    food_detection varchar(80) not null primary key,
--    diet_time varchar(20),
--    diet_photo mediumblob not null,
--    amount varchar(20)
-- );

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

create table Doctor(
   doctor_id varchar(20) not null unique primary key,
   patient_id varchar(20) not null unique,
   doctor_name varchar(20) not null,
   dept varchar(20) not null,
   foreign key(patient_id) references Patient(patient_id)
);
