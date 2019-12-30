var aws = require('aws-sdk');
var dynamoDb = new aws.DynamoDB.DocumentClient();
var response = null;
const header_core = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
const reponse_error = {
    statusCode: 500,
    headers: header_core,
    body: JSON.stringify({status:false})
};
const response_ok = {
    statusCode: 200,
    headers: header_core
};

function responseOk(data){
    response = response_ok;
    response["body"]=JSON.stringify(data.Item);
};

export function getNote(params, callback){
    dynamoDb.get(params, (err, data) => {
        console.log('err:', err);
        console.log('data', data);
        if(err){
            console.log("Error al obtener la nota");
            response = reponse_error;
        }else{
            if(JSON.stringify(data)=='{}'){
                console.log("Nota vacia");
                response={
                    statusCode: 204,
                    headers: header_core,
                    body: JSON.stringify({status:false})
                };
            }else{
                console.log("Recuperando la nota");
                responseOk(data);
            }
        }
        callback(null, response);
    });
};

export function createNote(params, callback){
    dynamoDb.put(params, (err,data) => {
        if(err){
            console.log("La nota no puede ser creada");
            response = reponse_error;
        }else{
            console.log("Nota creada exitosamente");
            responseOk(data);
        }
        callback(null, response);
    });
};
