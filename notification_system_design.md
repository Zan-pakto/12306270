
STAGE 1
-- I have mapped "http://locahost:3000/login" with the given server ip address "http://4.224.186.213/evaluation-service/auth"  whenver user will try to login with the http://localhost:3000/login it will verify the user in the server and send a login success message with the acces token i have hardcoded the user data in the loginroute so that if u dont send data correct the with postman it will sned fromm the in memory And if you want the real time notifcation  what we can do is after checking the status code if it is 200 we can directly send the notifcaiton to the user as Logged in success 

STAGE 2
-- i will select PostgreSQL for the first route as the database can be of n number it can exapand to lets say 50000 and in Realtional databse we can use the indexing for better retriving of the user from the database and data is preistent in the RDMS because of the transcation property it has 
SCHEMA --
Users Table:
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
notification table we dont need to created as the frotnend devloper will directly send notficaiton if status code is 200 no need to call the backend server again
SQL query to fetch user by email--
----SELECT user_id, email, username, is_active
----FROM Users
----WHERE email = ?;




