const express = require('express');
const mysql = require('mysql2');
const config = require('config');

const app = express.Router();

const connectionDetails = {host: config.get("host"),
                            database: config.get("database"),
                            port: config.get("serverport"),
                            user: config.get("user"),
                            password: config.get("password")
                        };
app.get("/", (request, response)=>{
    let queryText = `select * from Items`;

    console.log(queryText);
    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result)=>{
        response.setHeader('Content-Type', 'application/json');
        if(err==null)
            {
                response.write(JSON.stringify(result));
            }
        else
            {
                response.write(JSON.stringify(err));
            }
            connection.end();
            response.end();
    })
});


app.post("/", (request, response)=>{

    let ItemName = request.body.ItemName;
    let ItemPrice = request.body.ItemPrice;
    let ItemImage = request.body.ItemImage;

    let queryText = `insert into Items(ItemName,ItemPrice, ItemImage) 
			values('${ItemName}', ${ItemPrice}, '${ItemImage}');`;

    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result)=>{
        response.setHeader('Content-Type', 'application/json');
        if(err==null)
            {
                response.write(JSON.stringify(result));
            }
        else
            {
                response.write(JSON.stringify(err));
            }
            connection.end();
            response.end();
    })
});

app.put("/:itemno", (request, response)=>{
    let ItemName = request.body.ItemName;
    let ItemPrice = request.body.ItemPrice;
    let ItemImage = request.body.ItemImage;

    let queryText = `update Items set ItemName = '${ItemName}', 
                                    ItemPrice = ${ItemPrice}, 
                                    ItemImage = '${ItemImage}' where ItemId = ${request.params.itemno}`;

    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result)=>{
        response.setHeader('Content-Type', 'application/json');
        if(err==null)
            {
                response.write(JSON.stringify(result));
            }
        else
            {
                response.write(JSON.stringify(err));
            }
            connection.end();
            response.end();
    })
});


app.delete("/:itemno", (request, response)=>{
    let queryText = `delete from Items  where ItemId = ${request.params.itemno}`;

    let connection = mysql.createConnection(connectionDetails);
    connection.query(queryText, (err, result)=>{
        response.setHeader('Content-Type', 'application/json');
        if(err==null)
            {
                response.write(JSON.stringify(result));
            }
        else
            {
                response.write(JSON.stringify(err));
            }
            connection.end();
            response.end();
    })
});


//let connection = mysql.createConnection(); //this is use for intelligense





module.exports = app;