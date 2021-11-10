-- drop database patientdb;

create database patientdb;
use patientdb;

create table User(
   user_id varchar(20) not null unique primary key,
   user_name varchar(20) not null,
   user_pw varchar(20) not null,
   is_patient int not null,
   age int not null,
   weight float not null,
   height float not null,
   birth_date varchar(10) not null,
   gender varchar(7) not null,
   illness varchar(20),
   medicine varchar(20),
   phone_number varchar(13)
);
-- select * from Patient;
insert into User values ('12','현호','12','0',24,80,176,'19981125','M','X','X','01048807780');

create table Simple_solution(
   simple_sol_id int not null unique,
   simple_sol varchar(300) not null,
   user_id varchar(20) not null unique,
   foreign key(user_id) references User(user_id),
   primary key(simple_sol_id)
);
insert into Simple_solution values (123,'염분 줄이기','12');
-- insert into Simple_solution values('염분량을 줄이셔야합니다.','12');
-- select * from Simple_solution;


create table Diet(
   diet_id int not null primary key,
   foods varchar(255) not null,
   image_link varchar(255) NOT NULL,
   -- photo_time varchar(20),
   photo_time varchar(50) not null,
   user_id varchar(20) not null unique,
   foreign key(user_id) references User(user_id)
);
alter table Diet modify image_link varchar(1500);
insert into Diet values (1234, '쌀밥, 제육볶음','https://www.google.com/imgres?imgurl=https%3A%2F%2Fnews.kbs.co.kr%2Fdata%2Fnews%2F2017%2F01%2F04%2F3405677_bH6.jpg&imgrefurl=https%3A%2F%2Fnews.kbs.co.kr%2Fnews%2Fview.do%3Fncd%3D3405677&tbnid=o-NvJWR3wUZo9M&vet=12ahUKEwjj3JyHrIv0AhWtQPUHHZqUCPcQMygAegUIARCqAQ..i&docid=Suc0OJSJnld1AM&w=596&h=335&q=%EC%9D%8C%EC%8B%9D%20%EC%82%AC%EC%A7%84&ved=2ahUKEwjj3JyHrIv0AhWtQPUHHZqUCPcQMygAegUIARCqAQ', '점심','12');
-- alter table Save_diet modify image varchar(255);  -- image 링크 받는 것으로 바꿈
-- alter table Save_diet modify photo_time varchar(25);
-- -- alter table Save_diet
-- insert into Save_diet values('쌀밥, 된장국, 김치, 제육볶음','https://~~','2021-11-09 08:30:20','12');
 
create table Nutrient(
   nutrient_id int not null unique primary key,
   user_id varchar(20) not null unique,
   carbohydrate float not null,
   protein float not null,
   fat float not null,
   calories float not null,
   sodium float not null,
   calcium float not null,
   vitamin_c float not null,
   foreign key(user_id) references User(user_id)
);
insert into Nutrient values (23456, '12',3.4,5.6,6.5,67.7,3.4,3.4,3.4);
-- insert into Nutrient values('12','10','20','30','800','23','31','12','쌀밥, 된장국, 김치, 제육볶음');
-- select * from Nutrient;

-- 질문이 5개라 가정
create table Query(
   query_id varchar(20) not null unique primary key,
   user_id varchar(20) not null unique,
   answer_01 varchar(100) not null,
   answer_02 varchar(100) not null,
   answer_03 varchar(100) not null,
   answer_04 varchar(100) not null,
   answer_05 varchar(100) not null,
   foreign key(user_id) references User(user_id)
);
insert into Query values (23455, '12','2','2','3','4','6');
-- insert into Query_patient values ('qr1024000','12','1','3','4','2','2');
-- select * from Query_patient;
