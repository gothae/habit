create table Patient(
   patient_id varchar(20) not null unique,
   patient_pw varchar(20) not null,
   patient_name varchar(20) not null,
   age int not null,
   weight float not null,
   height float not null,
   birth_date char(8) not null,
   gender varchar(7) not null,
   illness varchar(20),
   medicine varchar(20),
   phone_number varchar(13),
   primary key(patient_id, patient_name, age, weight, height, birth_date, gender)
);

create table diet(
   food_detection varchar(80) not null primary key,
   diet_time datetime default current_timestamp on update current_timestamp,
   diet_photo mediumblob not null,
   amount varchar(20)
);

create table nutrient(
   carbohydrate float not null,
   protein float not null,
   fat float not null,
   calories float not null,
   sodium float not null,
   calcium float not null,
   vitamin_c float not null,
   food_detection varchar(80) not null,
   foreign key(food_detection) references diet(food_detection),
   primary key(carbohydrate, protein, fat, calories)
);


create table simple_solution(
   simple_sol varchar(40) not null,
  
   primary key(simple_sol)
);


create table save_diet(
   diet_id varchar(20) not null,
   save_diet_photo mediumblob not null,
   photo_time datetime default current_timestamp on update current_timestamp,
   primary key(diet_id)
);



insert into patient values('sh98','1234','신현호',24,80,176,'19981125','male','no','no','01048807780');
insert into patient values('james','2345','James',21,72,174,'19981125','male','no','no','01012345678');
select * from patient;


-- 질문이 5개라 가정
create table query_patient(
   query_id varchar(20) not null unique primary key,
   patient_id varchar(20) not null unique,
   patient_name varchar(20) not null,
   age int not null,
   weight float not null,
   height float not null,
   birth_date char(8) not null,
   gender varchar(7) not null,
   question_01 varchar(100) not null,
   question_02 varchar(100) not null,
   question_03 varchar(100) not null,
   question_04 varchar(100) not null,
   question_05 varchar(100) not null,
   foreign key(patient_id, patient_name,age, weight, height, birth_date,gender) references patient(patient_id, patient_name,age, weight, height,birth_date,gender)
);

alter table query_patient add foreign key(patient_id) references patient_register(patient_id);
alter table query_patient add constraint query_patient_ibfk_2 foreign key(patient_name) references patient_register(patient_name);

create table doctor(
   doctor_id varchar(20) not null unique primary key,
   patient_id varchar(20) not null unique,
   doctor_name varchar(20) not null,
   dept varchar(20) not null,
   foreign key(patient_id) references patient(patient_id)
   );
   
   

insert into doctor values('dr_lee','sh98','이길동','정형외과');
insert into doctor values('dr_kim','james','김길동','내과');
select * from doctor;