CREATE TABLE orders (
    id SERIAL PRIMARY KEY ,
    user_id bigint, 
    status VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
  
)