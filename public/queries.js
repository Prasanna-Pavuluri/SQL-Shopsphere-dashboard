const queries = {

  module1: `-- module-1
-- creating database

create database shopshere_db;
use shopshere_db;`,

  module23: `-- module 2,3
-- creating tables and apply constraints

-- users
use shopshere_db;
create table users(user_id int primary key,
                    name varchar(20) not null,
                    email varchar(50) unique not null,
                    phno varchar(15) unique not null);
desc users;

-- categories
create table categories(category_id int primary key,
                        category_name varchar(20) unique not null);
desc categories;

-- Products
create table products(product_id int primary key,
                     product_name varchar(20) not null,
                     category_id int not null,
                     stock int check(stock>=0) not null,
                     price int check(price>0) not null,
                     foreign key(category_id) references categories(category_id));
desc products;

-- cart
create table cart(cart_id int primary key,
                     user_id int not null,
                     product_id int not null,
                     quantity int check(quantity>0) not null,
                     unique(user_id,product_id),
                     foreign key(user_id) references users(user_id),
                     foreign key(product_id) references products(product_id));
desc cart;

-- orders
create table orders(order_id int primary key,
                    user_id int not null,
                    order_date date not null,
                    foreign key(user_id) references users(user_id));
desc orders;

-- order items
create table order_items(order_item_id int primary key,
                         order_id int not null,
                         product_id int not null,
                         quantity int not null,
                         price int not null,
                         foreign key(order_id) references orders(order_id),
                         foreign key(product_id) references products(product_id));

alter table order_items modify quantity int not null check(quantity>0);
alter table order_items modify price int not null check(price>0);

-- payments
create table payments(payment_id int primary key,
                      order_id int not null,
                      payment_mode varchar(10) not null,
                      paymnet_status varchar(10) not null,
                      payment_date date not null,
                      amount int not null,
                      foreign key(order_id) references orders(order_id));

-- reviews
create table reviews(review_id int primary key,
                     order_id int not null,
                     user_id int not null,
                     product_id int not null,
                     rating int not null check(rating between 1 and 5),
                     feedback varchar(20) not null,
                     foreign key(order_id) references orders(order_id),
                     foreign key(product_id) references products(product_id),
                     foreign key(user_id) references users(user_id));

-- wishlist
create table wishlist(wishlist_id int primary key,
                      user_id int not null,
                      product_id int not null,
                      foreign key(user_id) references users(user_id),
                      foreign key(product_id) references products(product_id));

-- auditlog
create table audit_log(log_id int primary key,
                       action varchar(20) not null,
                       table_name varchar(20) not null,
                       old_value int,
                       new_value int,
                       action_time datetime not null default current_timestamp,
                       message varchar(100));

alter table audit_log modify log_id int auto_increment;`,

  module4: `-- module-4
-- insert values

INSERT INTO users (user_id, name, email, phno) VALUES
(1,'Rahul','rahul@gmail.com','9876543210'),
(2,'Priya','priya@gmail.com','9876543211'),
(3,'Arjun','arjun@gmail.com','9876543212'),
(4,'Sneha','sneha@gmail.com','9876543213'),
(5,'Kiran','kiran@gmail.com','9876543214'),
(6,'Anjali','anjali@gmail.com','9876543215'),
(7,'Vikram','vikram@gmail.com','9876543216'),
(8,'Pooja','pooja@gmail.com','9876543217'),
(9,'Rohan','rohan@gmail.com','9876543218'),
(10,'Meena','meena@gmail.com','9876543219'),
(11,'Akhil','akhil@gmail.com','9876543220'),
(12,'Divya','divya@gmail.com','9876543221'),
(13,'Nikhil','nikhil@gmail.com','9876543222'),
(14,'Kavya','kavya@gmail.com','9876543223'),
(15,'Suresh','suresh@gmail.com','9876543224'),
(16,'Neha','neha@gmail.com','9876543225'),
(17,'Manoj','manoj@gmail.com','9876543226'),
(18,'Swathi','swathi@gmail.com','9876543227'),
(19,'Harsha','harsha@gmail.com','9876543228'),
(20,'Deepika','deepika@gmail.com','9876543229');

INSERT INTO categories (category_id, category_name) VALUES
(1,'Electronics'),
(2,'Fashion'),
(3,'Books'),
(4,'Home'),
(5,'Sports');

INSERT INTO products (product_id, product_name, category_id, stock, price) VALUES
(101,'Laptop',1,15,60000),
(102,'Smartphone',1,30,25000),
(103,'Headphones',1,50,2500),
(104,'Smartwatch',1,20,5000),
(105,'BluetoothSpeaker',1,25,3500),
(106,'Tablet',1,18,30000),
(107,'Keyboard',1,40,1200),
(108,'Mouse',1,45,800),
(109,'TShirt',2,60,700),
(110,'Jeans',2,35,1500),
(111,'Jacket',2,20,2500),
(112,'Shoes',2,30,3000),
(113,'Cap',2,40,500),
(114,'Handbag',2,18,1800),
(115,'SQLBook',3,25,650),
(116,'JavaBook',3,20,800),
(117,'PythonBook',3,30,900),
(118,'DataScience',3,15,1200),
(119,'AIBook',3,18,1500),
(120,'Novel',3,40,450),
(121,'DiningTable',4,10,12000),
(122,'OfficeChair',4,15,4500),
(123,'Sofa',4,8,25000),
(124,'WallClock',4,20,900),
(125,'Lamp',4,35,1500),
(126,'Curtains',4,25,1800),
(127,'CricketBat',5,20,2200),
(128,'Football',5,30,900),
(129,'BadmintonKit',5,18,2800),
(130,'YogaMat',5,40,1200);

INSERT INTO orders (order_id, user_id, order_date) VALUES
(1001,1,'2026-07-01'),
(1002,2,'2026-07-02'),
(1003,3,'2026-07-03'),
(1004,4,'2026-07-04'),
(1005,5,'2026-07-05'),
(1006,6,'2026-07-06'),
(1007,7,'2026-07-07'),
(1008,8,'2026-07-08'),
(1009,9,'2026-07-09'),
(1010,10,'2026-07-10'),
(1011,11,'2026-07-11'),
(1012,12,'2026-07-12'),
(1013,13,'2026-07-13'),
(1014,14,'2026-07-14'),
(1015,15,'2026-07-15'),
(1016,16,'2026-07-16'),
(1017,17,'2026-07-17'),
(1018,18,'2026-07-18'),
(1019,19,'2026-07-19'),
(1020,20,'2026-07-20');`,

  module5: `-- module-5
-- DML

-- A new customer Aarav registers
insert into users values(21,'Aarav','aarav@gmail.com',9876500001);

-- Customer User 3 adds Product 126 with quantity 2 to the cart.
insert into cart values(21,3,126,2);

-- Customer User 5 adds Product 129 to the wishlist.
insert into wishlist values(21,5,129);

-- Customer User 8 places a new order.
insert into orders values(1021,8,'2026-07-25');

-- Record a payment for Order 1021.
insert into payments values(21,1021,'UPI','Success','2026-07-15',3000);

-- Admin increases the price of Laptop.
update products set price=62000 where product_id=101;

-- Customer User 1 changes cart quantity.
update cart set quantity=3 where product_id=108 and user_id=1;

-- Admin updates stock.
update products set stock=stock+20 where product_id=102;

-- Payment status changes.
update payments set paymnet_status='Success' where payment_id=17;

-- User 10 edits review feedback.
update reviews set feedback='Great'
where product_id=122 and user_id=10;

-- Customer removes Product 115.
delete from cart where product_id=115 and user_id=1;

-- Customer removes Product 127 from wishlist.
delete from wishlist where product_id=127 and user_id=1;

-- Admin deletes a discontinued product (Product 130).
-- error

-- Customer cancels Review ID 25.
delete from reviews where review_id=25;

-- Delete all cart items belonging to User 6.
delete from cart where user_id=6;

-- Show all products.
select * from products;

-- Show all orders placed by User 5.
select * from orders where user_id=5;

-- Show all products whose price is greater than ₹5,000.
select * from products where price>5000;

-- Show all reviews with a 5-star rating.
select * from reviews where rating=5;

-- Show all payments whose status is Success.
select * from payments where paymnet_status='Success';`,

  module6: `-- module-6
-- business queries

select * from orders where user_id=8;

select p.product_name
from products p join order_items o
on p.product_id=o.product_id
where order_id=1002;

select * from reviews where user_id=6;

select * from products where stock<20;

select p.product_name,c.category_name
from categories c join products p
on c.category_id=p.category_id
where c.category_name='Electronics';

select sum(stock) from products;

select sum(amount)
from payments
where payment_date='2026-07-15';

select max(amount) from payments;

select * from payments where paymnet_status='Pending';

select p.product_name,w.user_id
from wishlist w
join products p
on w.product_id=p.product_id
where w.user_id=1;

select p.product_name,r.rating
from products p join reviews r
on r.product_id=p.product_id
where r.rating=5;

select *
from users u left join orders o
on u.user_id=o.user_id
where o.order_id is null;

select p.product_name,sum(o.quantity) as quantity
from products p join order_items o
on o.product_id=p.product_id
group by p.product_name
order by sum(o.quantity) desc
limit 1;

select p.product_name,p.price
from products p
order by price desc
limit 3;

select c.category_name,
sum(o.price*o.quantity) as revenue
from categories c join products p
on c.category_id=p.category_id
join order_items o
on o.product_id=p.product_id
group by c.category_name
order by revenue desc
limit 1;`,

  module7: `-- module-7
-- joins

select u.name,o.order_id,o.order_date
from users u join orders o
on u.user_id=o.user_id;

select p.product_name,c.category_name,p.price
from products p join categories c
on p.category_id=c.category_id;

select u.name,p.product_name,c.quantity
from users u join cart c
on u.user_id=c.user_id
join products p
on c.product_id=p.product_id;

select u.name,p.product_name,r.rating,r.feedback
from users u join reviews r
on u.user_id=r.user_id
join products p
on r.product_id=p.product_id;

select o.order_id,p.product_name,o.quantity,o.price
from order_items o join products p
on o.product_id=p.product_id;

select c.*,o.*
from users c left join orders o
on c.user_id=o.user_id;

select p.*,r.*
from products p
left join reviews r
on p.product_id=r.product_id;

select c.*,p.*
from categories c
left join products p
on c.category_id=p.category_id;

select u.*,w.*
from users u
left join wishlist w
on u.user_id=w.user_id;

select u.name,c.category_name,p.product_name,
oi.quantity,oi.price * oi.quantity
from users u join orders o
on u.user_id=o.user_id
join order_items oi
on o.order_id=oi.order_id
join products p
on oi.product_id=p.product_id
join categories c
on c.category_id=p.category_id;`,

  module8: `-- module-8
-- Subqueries

select * from products
where price >
(select avg(price) from products);

select * from products
where stock <
(select avg(stock) from products);

select * from products
where price=(select max(price) from products);

select u.name
from users u
where user_id in (select user_id from orders o);

select p.product_name
from products p
where product_id not in
(select product_id from order_items);

select u.name,sum(oi.price * oi.quantity) as revenue
from users u join orders o
on u.user_id=o.user_id
join order_items oi
on o.order_id=oi.order_id
group by u.name
having sum(oi.price * oi.quantity) >
(select avg(total_spending)
from
(select sum(oi.price * oi.quantity) as total_spending
from users u join orders o
on u.user_id=o.user_id
join order_items oi
on o.order_id=oi.order_id
group by u.name) as customer_average_spending);

select c.category_name
from products p join categories c
on c.category_id=p.category_id
where p.price >
(select avg(p.price) from products p);

select p.product_name,sum(oi.quantity)
from products p join order_items oi
on p.product_id=oi.product_id
group by p.product_name
having sum(oi.quantity) >
(select avg(product_wise_quantity)
from
(select sum(oi.quantity) as product_wise_quantity,p.product_name
from products p join order_items oi
on p.product_id=oi.product_id
group by product_name) as total_average_quantity);

select name,sum(oi.quantity)
from users u join orders o
on u.user_id=o.user_id
join order_items oi
on o.order_id=oi.order_id
group by name
having sum(oi.quantity)=
(select max(highest_total_quantity)
from
(select sum(oi.quantity) as highest_total_quantity,u.name
from users u join orders o
on u.user_id=o.user_id
join order_items oi
on o.order_id=oi.order_id
group by u.name) as highest_quantity);`,

  module9: `-- module-9
-- views

create view customer_order_summary as
select u.name,o.order_id,o.order_date
from users u join orders o
on u.user_id=o.user_id;

select * from customer_order_summary;

create or replace view product_sales_summary as
select p.product_name,
sum(oi.price*oi.quantity) as total_revenue,
sum(quantity) as total_quantity
from products p join order_items oi
on p.product_id=oi.product_id
group by p.product_name;

select * from product_sales_summary;

create view low_stock_products as
select p.product_id,p.product_name,c.category_name,p.stock
from products p join categories c
on p.category_id=c.category_id
where p.stock<10;

select * from low_stock_products;`,

  module10: `-- module-10
-- stored procedures

delimiter $$

create procedure new_product(
in id int,
name varchar(20),
c_id int,
stock int,
price int
)
begin
insert into products values(id,name,c_id,stock,price);
end $$

delimiter ;

call new_product(131,'phonestand',1,10,200);

delimiter $$

create procedure order_history(in u_id int)
begin
select o.user_id,o.order_date,oi.*
from orders o join order_items oi
on o.order_id=oi.order_id
where o.user_id=u_id;
end $$

delimiter ;

call order_history(1);

delimiter $$

create procedure total_amount(in u_id int)
begin
select sum(amt) as total_amount_customer
from
(select oi.price*oi.quantity as amt
from orders o join order_items oi
on o.order_id=oi.order_id
where o.user_id=u_id) as total_amount_spent;
end $$

delimiter ;

call total_amount(7);

delimiter $$

create procedure stock_limit(in stock_limit int)
begin
select p.product_name,p.stock
from products p
where p.stock<stock_limit;
end $$

delimiter ;

call stock_limit(30);`,

  module11: `-- module-11
-- triggers

delimiter $$

create trigger new_product
after insert on products
for each row
begin
insert into audit_log
(action, table_name, old_value, new_value, message)
values
('insert','products',NULL,NEW.product_id,
CONCAT('new product ',NEW.product_id,' inserted'));
end $$

delimiter ;

insert into products values(132,'Laptopskin',1,20,300);

delimiter $$

create trigger delete_product
before delete on products
for each row
begin
insert into audit_log
(action,table_name,old_value,new_value,message)
values
('delete','products',old.product_id,NULL,
concat('product id ',old.product_id,' is deleted'));
end $$

delimiter ;

delete from products where product_id=131;

delimiter $$

create trigger product_price_update
after update on products
for each row
begin
insert into audit_log
(action,table_name,old_value,new_value,message)
values
('update','products',old.price,new.price,
concat('price changed from ',old.price,' to ',new.price));
end $$

delimiter ;

update products set price=750
where product_id in (108,109);

delimiter $$

create trigger insert_order
after insert on orders
for each row
begin
insert into audit_log
(action,table_name,old_value,new_value,message)
values
('insert','orders',null,new.order_id,
concat('order ',new.order_id,' is placed'));
end $$

delimiter ;

insert into orders values
(1024,13,'2026-07-19'),
(1025,8,'2026-07-25');

delimiter $$

create trigger product_stock
after insert on order_items
for each row
begin
update products
set stock=stock-new.quantity
where product_id=new.product_id;

insert into audit_log(action,table_name,message)
values('insert','products','stock updated');
end $$

delimiter ;

insert into order_items values(52,1025,107,2,1200);

delimiter $$

create trigger stock_update
before delete on order_items
for each row
begin
update products
set stock=stock+old.quantity
where product_id=old.product_id;
end $$

delimiter ;

delete from order_items where order_item_id=50;`,

  module12: `-- module-12
-- TCL

start transaction;
savepoint s5;

insert into orders values(1026,10,'2026-05-17');

insert into order_items values
(53,1026,103,1,2500),
(54,1026,110,3,1500);

insert into payments values
(22,1026,'UPI','Failed','2026-05-17',7000);

rollback to s5;
commit;

start transaction;

insert into orders values(1026,10,'2026-05-17');

insert into order_items values
(53,1026,103,1,2500),
(54,1026,110,3,1500);

insert into payments values
(22,1026,'UPI','Suceess','2026-05-17',7000);

commit;

select * from order_items;
select * from orders;
select * from payments;`,

  module13: `-- module-13
-- String functions

select upper(name) from users;

select lower(name) from users;

select concat(name,'-',email) from users;

select substring(email,1,(instr(email,'@')-1)) from users;

select substring(email,(instr(email,'@')+1),char_length(email))
from users;

select substring(product_name,1,5) from products;

select replace(product_name,'phone','Mobile') from products;

select trim(product_name) from products;

select char_length(product_name) from products;

select concat(left(name,3),right(phno,3))
from users;`,

  module14: `-- module-14
-- Date functions

select * from orders
where order_date=date(now());

select * from orders
where order_date=curdate();

select * from orders
where month(order_date)=month(curdate())
and year(order_date)=year(curdate());

select * from orders
where year(order_date)=year(now());

select sum(oi.price*oi.quantity) as total_revenue,
monthname(o.order_date)
from order_items oi
join orders o
on o.order_id=oi.order_id
group by monthname(o.order_date);

select monthname(order_date),count(o.order_id)
from orders o
group by monthname(order_date);

select distinct u.name,year(order_date)
from orders o join users u
on o.user_id=u.user_id
where year(order_date)=year(curdate());

select count(order_id),order_date
from orders
group by order_date;

select * from orders
where order_date between
date_sub(date(now()),interval 7 day)
and curdate();

select dayname(order_date),order_date
from orders;

select u.name,max(o.order_date)
from orders o join users u
on o.user_id=u.user_id
group by u.name;`,

  dcl: `-- DCL
-- creating 3 users
-- admin
-- inventory managemnt
-- customer support

create user 'Administrator'@'%'
identified by 'admin@123';

grant all on shopshere_db.*
to 'Administrator'@'%';

show grants for 'Administrator'@'%';

create user 'InventoryManagement'@'%'
identified by 'im@123';

grant select,update,insert
on shopshere_db.products
to 'InventoryManagement'@'%';

grant select on shopshere_db.orders
to 'InventoryManagement'@'%';

grant select on shopshere_db.order_items
to 'InventoryManagement'@'%';

show grants for 'InventoryManagement'@'%';

create user 'CustomerSupport'@'%'
identified by 'c@123';

grant select on shopshere_db.users
to 'CustomerSupport'@'%';

grant select on shopshere_db.orders
to 'CustomerSupport'@'%';

grant select on shopshere_db.order_items
to 'CustomerSupport'@'%';

show grants for 'CustomerSupport'@'%';

flush privileges;`,

  bonus: `-- Bonus
-- Design your database so that placing an order behaves like a real application.

delimiter $$

create procedure place_order(
in o_id int,
in u_id int,
in o_date date,
in oi_id int,
in p_id int,
in quantity int,
in price int
)
begin
insert into orders values(o_id,u_id,o_date);
insert into order_items
values(oi_id,o_id,p_id,quantity,price);
commit;
end $$

delimiter ;

call place_order(
1027,11,'2026-07-18',
55,114,5,1800
);

select * from products;
select * from order_items;
select * from orders;
select * from audit_log;`
};

function showQuery(module) {
  document.getElementById("query-display").textContent =
    queries[module] || "Query not found.";
}
