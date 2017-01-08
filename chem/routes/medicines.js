var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/chem_db');

router.get('/', function(req, res) {
    var collection = db.get('medicines');
    collection.find({}, function(err, medicines){
        if (err) throw err;
        res.json(medicines);
    });
});

router.post('/', function(req, res){
    var collection = db.get('medicines');
    collection.insert({
        'medi_name':req.body.medi_name,
        'medi_img':req.body.medi_img,
        'bef_bf':req.body.bef_bf,
        'aft_bf':req.body.aft_bf,
        'bef_ln':req.body.bef_ln,
        'aft_ln':req.body.aft_ln,
        'bef_dn':req.body.bef_dn,
        'aft_dn':req.body.aft_dn,
        'sos':req.body.sos,
        'pill_no':req.body.pill_no
    }, function(err, medicine){
        if (err) throw err;
        res.json(medicine);
    });
});

router.get('/:id', function(req,res){
    var collection = db.get('medicines');
    collection.findOne({ _id : req.params.id }, function(err, medicine){
        if(err) throw err;
        res.json(medicine);
    });
});

router.put('/:id', function(req,res){
    var collection = db.get('medicines');
    collection.update({ _id : req.params.id},{
        'medi_name':req.body.medi_name,
        'medi_img':req.body.medi_img,
        'bef_bf':req.body.bef_bf,
        'aft_bf':req.body.aft_bf,
        'bef_ln':req.body.bef_ln,
        'aft_ln':req.body.aft_ln,
        'bef_dn':req.body.bef_dn,
        'aft_dn':req.body.aft_dn,
        'sos':req.body.sos,
        'pill_no':req.body.pill_no
    }, function(err, medicine){
        if (err) throw err;
        res.json(medicine);
    }); 
});

router.delete('/:id', function(req, res){
    var collection = db.get('medicines');
    collection.remove({_id : req.params.id},function(err, medicine){
        if(err) throw err;
        res.json(medicine);
    });
});

module.exports = router;