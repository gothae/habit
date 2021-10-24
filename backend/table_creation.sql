create table Patient(
   patient_id varchar(20) not null primary key,
   patient_pw varchar(20) not null,
   patient_name varchar(20) not null,
   age int not null,
   weight float not null,
   height float not null,
   birth_date char(8) not null,
   illness varchar(20),
   medicine varchar(20),
   phone_number varchar(13)
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

create table food_standard(
   carbo_over boolean not null,
   protein_over boolean not null,
   fat_over boolean not null,
   carbohydrate float not null,
   protein float not null,
   fat float not null,
   foreign key(carbohydrate, protein, fat) references nutrient(carbohydrate, protein, fat),
   primary key(carbo_over, protein_over, fat_over)
);

create table simple_solution(
   simple_sol varchar(40) not null,
   carbo_over boolean not null,
   protein_over boolean not null,
   fat_over boolean not null,
   foreign key(carbo_over, protein_over, fat_over) references food_standard(carbo_over, protein_over, fat_over),
   primary key(simple_sol)
);

create table save_diet(
   diet_id varchar(20) not null,
   save_diet_photo mediumblob not null,
   photo_time datetime default current_timestamp on update current_timestamp,
   primary key(diet_id)
);
