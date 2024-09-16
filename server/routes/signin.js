const express = require('express');
const jwt = require('jsonwebtoken');

const app = express.Router();

const secretKey = "sunbeaminfo.com";

app.post("/", (request, response)=>
{
    var reply = {jwtoken : undefined, message : ""};
    response.setHeader("Content-Type", "application/json");

    console.log("username received is " + request.body.username);
    console.log("password received is " + request.body.password);

    var isUserValid = 
            CheckWithDB(request.body.username,request.body.password);
    if(isUserValid)
        {
             var payload = {
                                username : request.body.username,
                                datetime : new Date().toString(),
                                role: "admin",
                                RandomNo : Math.random()
                           };
             reply.jwtoken = jwt.sign(payload, secretKey);
             reply.message = "success";
             
             response.write(JSON.stringify(reply));           
        }
    else
        {
            reply.message = "User is invalid!";
            response.write(JSON.stringify(reply));            
        }
    response.end();
});

const CheckWithDB = (username, password)=>
{
    if(username == "sunbeam" && password == "sunbeam@123")
        {
            return true;
        }
    else
        {
            return false;
        }
}

module.exports = app; 