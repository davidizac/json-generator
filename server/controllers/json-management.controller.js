const { sendJSONToScannerQueue } = require('../services/json-management.service')

module.exports = {
    sendjson: (req, res) =>{
        return sendJSONToScannerQueue(req.body)
        .then(()=> {
            console.log('Message successfully sent to Scanner Queue')
            res.status(200).send()
        })
        .catch((err)=> {
            console.error('Message not sent due to error')
            return res.status(500).send(err)
        })
    }      
};
  