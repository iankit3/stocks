var express = require('express');
var router = express.Router();
var connection = require('../database/connector');

router.get('/stocks/:ticker', (req,res) => {
    var ticker = req.params.ticker;
    var from = req.params.from;
    var query = 'SELECT date,open,close,low,high,volume from prices WHERE symbol="'+ticker+'" limit 30';

   if(from) 
        query = 'SELECT date,open,close,low,high,volume from prices WHERE symbol="'+ticker+'" limit '+from+', '+parseInt(to)-parseInt(from);   ;      

    console.log(query)
    res.setHeader("Access-Control-Allow-Origin","*");
    connection.executeQuery(query,function(err,rows){
        res.end( JSON.stringify(rows) )
    })
})

router.get('/topstocks/',(req,res) => {
    var query = "SELECT DISTINCT symbol,high FROM prices group by symbol order by high desc limit 5";
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log(query)
    connection.executeQuery(query,(err,rows) => {
        res.send(JSON.stringify(rows.data));
    })
})

router.get("/stocks/all/:from-:to-:order", (req, res) => {
    var order = req.params.order;
    var from = req.params.from;
    var to = req.params.to;

    res.setHeader("Access-Control-Allow-Origin","*");
    if(order == "asc" || order == "desc"){

        var query = 'SELECT date,open,close,low,high,volume from prices limit '+from+', '+ (parseInt(to)-parseInt(from));   
        console.log(query)
        connection.executeQuery(query,function(err,rows){
            res.end( JSON.stringify(rows) )
        })
    }else  res.end("Params not as expected !");

})

module.exports = router;
