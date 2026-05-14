
STAGE 1
-- I have mapped "http://locahost:3000/login" with the given server ip address "http://4.224.186.213/evaluation-service/auth"  whenver user will try to login with the http://localhost:3000/login it will verify the user in the server and send a login success message with the acces token i have hardcoded the user data in the loginroute so that if u dont send data correct the with postman it will sned fromm the in memory And if you want the real time notifcation  what we can do is after checking the status code if it is 200 we can directly send the notifcaiton to the user as Logged in success 

