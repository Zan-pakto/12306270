import express from 'express';
import axios from 'axios';

const router =express.Router();    
const ip ='http://4.224.186.213';

router.post('/', async (req, res) => {
    const body={
    "email": "arvindshahi555@gmail.com",
    "name": "arvind shahi",
    "rollNo": "12306270",
    "accessCode": "TRvZWq",
    "clientID": "4adcf4e2-6513-4792-919b-9ae8fb1f93c7",
    "clientSecret": "cdnQMDCsRBJScCSs"
    };
    try {
        const response =await axios.post(`${ip}/evaluation-service/auth`,body||req.body);
        return res.status(response.status ||200).json({ message: 'Login successful'},{data: response.data});
    } catch (error) {
       
        return res.status(error.response?.status||500).json({ message: 'Login failed',error: error.response?.data||error.message});
    }
});

export default router;