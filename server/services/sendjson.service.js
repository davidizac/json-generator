const amqp = require('amqplib/callback_api');

function publishToScanner(rabbitmq,message){
    return new Promise((resolve,reject) => {
        const connectionString = `amqp://${rabbitmq.username}:${rabbitmq.password}@${rabbitmq.host}:${rabbitmq.port}${rabbitmq.vhost ? `/${rabbitmq.vhost}` : ''}`;
        amqp.connect(connectionString,(err, connection)=> {
            if(err){
                return reject(err)
            }

            connection.createConfirmChannel(async (err,channel)=>{
                if (err){
                    return reject(err)
                }

                channel.assertQueue('Scanner',{
                    durable:false   
                })
                channel.sendToQueue('Scanner',Buffer.from(message),{},(err)=> {
                    if(err){
                        return reject('Message not sent')
                    }
                    connection.close();
                    return resolve('Message sent')
                })

            })
        })
    })
}

function getRabbitMQdata(){
    const username = process.env.RABBITMQ_USERNAME;
    const password = process.env.RABBITMQ_PASSWORD;
    const host = process.env.RABBITMQ_HOST;
    const port = process.env.RABBITMQ_PORT;
    const vhost = process.env.RABBITMQ_VHOST
    return {username,password,host,port,vhost}
}

function generateJSON(json){
    const message =  {
        uuid: "",
        name: "flow_1",
        order_id: "",
        environment: json.environment,
        json_folder: "",
        scanner_stage: {
            status: "todo",
            first_name: json.first_name,
            last_name: json.last_name,
            doctor_pass: json.doctor_pass,
            doctor_email: json.doctor_email,
            company_id: json.company_id,
            agent: "",
            lab_name: json.lab_name,
            case_type: json.case_type,
            model_type:json.model_type,
            retries: 3,
            attempts: 0
        },
        lab_stage: {
            status: "todo",
            retries: 3,
            attempts: 0
        },
        modeling_stage: {
            status: "todo",
            retries: 3,
            attempts: 0
        }
    }
    return message;
}

module.exports = {
    sendJSONToScannerQueue:(json)=> {
        const rabbitmq = getRabbitMQdata();
        return publishToScanner(rabbitmq,JSON.stringify(generateJSON(json)));
    }
}