'use strict';

require('dotenv').config();

var AWS = require('aws-sdk');

const my_AWSAccessKeyId = process.env.AWSAccessKeyId;
const my_AWSSecretKey = process.env.AWSSecretKey;
const aws_region = process.env.region;
const empTable = process.env.tableName;

var dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: aws_region,
    accessKeyId: my_AWSAccessKeyId,
    secretAccessKey: my_AWSSecretKey,
});

async function insertDataintoDatabase() {
    var params = {
        TableName:empTable,
        Item: {
            id: "ANPLDELETE31111",
            client: 'client_'+Math.random(),
            Dept: "Manage",
            Status: true,
            json: { address:{ company:"Mynation", city:'Pune', street: 'JC road', pin:'598045'} }
        }
    };

    let putItem = new Promise((res, rej) => {
        dynamoDB.put(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Success!");
                res("Inserted data into Dynamodb!");
            }
        }); 
    });
    const result = await putItem;
    console.log(result);   
}    


async function fetchDatafromDatabase1() { // Scan method fetch data from dynamodb

    var params = {
        TableName:empTable
    };

    let queryExecute = new Promise((res, rej) => {
        dynamoDB.scan(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            rej(err);
        } else {
            console.log("Success! Scan method fetch data from dynamodb");
            res(JSON.stringify(data, null, 2));
        }
        }); 
    });
    const result = await queryExecute;
    console.log(result);   
} 


async function fetchDatafromDatabase2() {  // get method fetch data from dynamodb
    var id = "ANPL2032231113";
    var params = {
        TableName:empTable,
        Key:{
            "id": id
        }
    };

    let queryExecute = new Promise((res, rej) => {
        dynamoDB.get(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Success! get method fetch data from dynamodb");
                res(JSON.stringify(data, null, 2));
            }
        }); 
    });
    const result = await queryExecute;
    console.log(result);   
} 

async function fetchDatafromDatabase3() {  // query method fetch data from dynamodb
    var id = "ANPL2032231213";
    var Dept = "Sales";
    var params = {
        TableName:empTable,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: {
            "#id": "id",
            "#dept": "Dept"
        },
        ExpressionAttributeValues: {
            ':id': id,
            ':deptValue': Dept
        },
        FilterExpression: "#dept = :deptValue", //AttributeName with attributeValue
        Limit: 5,
        ScanIndexForward: false, // Set ScanIndexForward to false to display most recent entries first
    };

    let queryExecute = new Promise((res, rej) => {
        dynamoDB.query(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Success! query method fetch data from dynamodb");
                res(JSON.stringify(data, null, 2));
            }
        }); 
    });
    const result = await queryExecute;
    console.log(result);   
} 


async function updateDatafromDatabase() {  // update method fetch data from dynamodb
    var id = "ANPL2032231113";
    var Dept = "ABC Engineer";
    var params = {
        TableName:empTable,
        Key:{
            id: id
        },
        UpdateExpression: "set Dept = :r",
        ExpressionAttributeValues:{
            ":r": Dept
        },
        ReturnValues:"UPDATED_NEW"
    };


    let queryExecute = new Promise((res, rej) => {
        dynamoDB.update(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Updated Successfully done for :"+id);
                res(JSON.stringify(data, null, 2));
            }
        }); 
    });
    const result = await queryExecute;
    console.log(result);   
} 


async function deleteDatafromDatabase() {  // delete method fetch data from dynamodb
    var id = "ANPLDELETE31113";
    var params = {
        TableName:empTable,
        Key: {
            id: id
        },
      
    };


    let queryExecute = new Promise((res, rej) => {
        dynamoDB.delete(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                rej(err);
            } else {
                console.log("Deleted Successfully user :"+id);
                res(JSON.stringify(data, null, 2));
            }
        }); 
    });
    const result = await queryExecute;
    console.log(result);   
} 


insertDataintoDatabase();  //Insert data into dynamodb
// fetchDatafromDatabase1(); // Scan method fetch data from dynamodb
// fetchDatafromDatabase2(); // Get method fetch data from dynamodb
// fetchDatafromDatabase3(); // Query method fetch data from dynamodb
//updateDatafromDatabase(); // update data from the table
// deleteDatafromDatabase(); // delete data from perticular table
