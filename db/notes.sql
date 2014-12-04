create table notes (
    id serial primary key,
    title varchar(255),
    body text,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    user_id integer references users(id)
);