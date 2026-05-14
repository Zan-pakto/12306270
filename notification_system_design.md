
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
-- Notifications Table (PostgreSQL schema)
-- stores user notifications;
CREATE TABLE Notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    title VARCHAR(255),
    message TEXT NOT NULL,
    notification_type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
);

-- Indexes for efficient retrieval
CREATE INDEX idx_notifications_user_id ON Notifications(user_id);
CREATE INDEX idx_notifications_user_read_created ON Notifications(user_id, is_read, created_at DESC);

--frontend can still decide to show realtime notifications
--but persisting notifications allows history, retrie
SQL query to fetch user by email--
----SELECT user_id, email, username, is_active
----FROM Users
----WHERE email = ?;


STAGE 3
Select * from notifications 
where studentID=1042 AND is Read=false
order BY createdAT DESC;


