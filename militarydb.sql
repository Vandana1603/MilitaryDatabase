create database militarydb;
use militarydb;
create table personnel(id int auto_increment primary key,
name varchar(100) not null,
contact varchar(20),
role varchar(50),
p_address varchar(100),
password varchar(200) not null);
create table Logistics(
sid int auto_increment primary key,
itemid int,
itemname varchar(250),
status varchar(35) default "pending",
quantity int not null,
shipment_d timestamp default current_timestamp,
arrival_d timestamp);
create table mission(
mid int auto_increment primary key,
mname varchar(100) not null,
status varchar(50),
priority varchar(20));

CREATE USER 'Low_user'@'localhost' IDENTIFIED BY 'Low';
CREATE USER 'Intermediate_user'@'localhost' IDENTIFIED BY 'Intermediate';
CREATE USER 'High_user'@'localhost' IDENTIFIED BY 'High';

GRANT SELECT ON militarydb.personnel TO 'Low_user'@'localhost';

GRANT SELECT, INSERT, UPDATE ON militarydb.personnel TO 'Intermediate_user'@'localhost';

GRANT ALL PRIVILEGES ON militarydb.personnel TO 'High_user'@'localhost';

REVOKE SELECT ON militarydb.Logistics FROM 'Low_user'@'localhost';
GRANT SELECT, INSERT, UPDATE ON militarydb.Logistics TO 'Intermediate_user'@'localhost';
GRANT ALL PRIVILEGES ON militarydb.Logistics TO 'High_user'@'localhost';

REVOKE SELECT ON militarydb.Mission FROM 'Low_user'@'localhost';
REVOKE SELECT ON militarydb.Mission FROM  'Intermediate_user'@'localhost';
GRANT ALL PRIVILEGES ON militarydb.Mission TO 'High_user'@'localhost';

FLUSH PRIVILEGES;

SHOW TABLES;










