const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const config = require('config');
const itemRoutesApp = require('./routes/items');
const authRoutesApp = require('./routes/signin');

const PORT = config.get("port");
const app = express();
app.use(cors());
app.use(express.json());
app.use((request, response, next) =>{
    if(request.url.includes("signin"))
        {
            next();
        }
        else
        {
            var authHeaderContent= request.headers.authorization;
            var reply = {message : ""};

            if(authHeaderContent != undefined)
                {

                    var splitHeaderContents = authHeaderContent.split(' ');
                    console.log(splitHeaderContents);
                    var tokenReceived = splitHeaderContents[1];

                    console.log(tokenReceived);

                    const secretKey = "sunbeaminfo.com";
                    const payloadDataFromToken =
                                                jwt.verify(tokenReceived, secretKey);

                    next();
                }
                else
                {
                    reply.message = "invalid or no Token!";
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(reply));
                    response.end();
                }
        }
})

app.use("/signin",authRoutesApp );
app.use("/items",itemRoutesApp );


app.listen(PORT, ()=>{console.log("Server started listening...")})