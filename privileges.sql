use mysql;
grant all privileges on *.* to root@'%';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
flush privileges;