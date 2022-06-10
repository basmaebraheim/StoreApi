CREATE TABLE order_products (
    id SERIAL PRIMARY KEY , 
    quantity integer,
    order_id bigint, 
    FOREIGN KEY (order_id) REFERENCES orders(id)  ,
    product_id bigint, 
    FOREIGN KEY (product_id) REFERENCES products(id) 
    
      
)
