const sendJsonService = require('../services/sendjson.service')

module.exports = {
    sendjson: (req, res) =>{
        return sendJsonService.sendJSONToScannerQueue(req.body)
        .then(()=> {
            console.log('Message successfully sent to Scanner Queue')
            res.status(200).send('Message successfully sent to Scanner Queue')
        })
        .catch((err)=> {
            console.error('Message not sent due to error')
            return res.status(500).send(err)
        })
    }
      
  };
  