create table tags (
    id serial primary key,
    name varchar(255) unique,
    created_at timestamp default now()
);