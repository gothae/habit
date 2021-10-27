create table Patient(
   patient_id varchar(20) not null unique,
   patient_pw varchar(20) not null,
   patient_name varchar(20) not null,
   age int not null unique,
   weight float not null unique,
   height float not null unique,
   birth_date char(8) not null,
   illness varchar(20),
   medicine varchar(20),
   phone_number varchar(13),
   primary key(patient_id, patient_name, age, weight, height, birth_date)
);

-- create table query(
--    query_id varchar(20) not null primary key,
--    query_date datetime default current_timestamp on update current_timestamp
-- );

create table diet(
   food_detection varchar(80) not null primary key,
   diet_time datetime default current_timestamp on update current_timestamp,
   diet_photo mediumblob not null,
   amount varchar(20),
   calories float
);

create table nutrient(
   carbohydrate float not null,
   protein float not null,
   fat float not null,
   food_detection varchar(80) not null,
   foreign key(food_detection) references diet(food_detection),
   primary key(carbohydrate, protein, fat)
);

-- create table food_standard(
--    carbo_over boolean not null,
--    protein_over boolean not null,
--    fat_over boolean not null,
--    carbohydrate float not null,
--    protein float not null,
--    fat float not null,
--    foreign key(carbohydrate, protein, fat) references nutrient(carbohydrate, protein, fat),
--    primary key(carbo_over, protein_over, fat_over)
-- );

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

-- create table Patient(
--    patient_id varchar(20) not null primary key,
--    patient_pw varchar(20) not null,
--    patient_name varchar(20) not null,
--    age int not null,
--    weight float not null,
--    height float not null,
--    birth_date char(8) not null,
--    illness varchar(20),
--    medicine varchar(20),
--    phone_number varchar(13)
-- );

insert into patient values('sh98','1234','신현호',24,80,176,'19981125','no','no','01048807780');
insert into patient values('james','2345','James',21,72,174,'19981125','no','no','01012345678');
select * from patient;

-- 질문이 5개라 가정
create table query(
   query_id varchar(100) not null,
   patient_id varchar(20) not null unique,
   question_01 varchar(100) not null,
   question_02 varchar(100) not null,
   question_03 varchar(100) not null,
   question_04 varchar(100) not null,
   question_05 varchar(100) not null,
   foreign key(patient_id) references patient(patient_id),
   primary key(query_id,patient_id)
);


