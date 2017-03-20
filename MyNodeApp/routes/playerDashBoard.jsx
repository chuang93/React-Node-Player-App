import express from 'express';
import request from 'request';
import AppRoutes from '../scripts/jsx/AppRoutes.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter } from 'react-router';

var router = express.Router();

router.get('/', function (req, res) {
  const context = {};
  const htmlRendered = ReactDOMServer.renderToString(
    <StaticRouter
     location ={req.url}
     context = {context}>
      <AppRoutes title="Hello"/>
    </StaticRouter>
    );

	try{
          res.render('index', { 
            appLayout : htmlRendered
          });
  }
  catch(error){
  	console.log("failed to perform server side rendering of player app routes..");
  	res.json(error);

  }
});

router.get('/players', function(req,res){
  try{
    var collection = req.app.locals.db.collection('playerData');
    collection.find( {} , { _id:1, object:1 } ).toArray(function(e,docs){
          res.json(docs);
        });
  }
  catch(error){
    res.json(error);

  }
});

router.get('/players/:id',function(req,res){
  try{
    var collection = req.app.locals.db.collection('playerDashBoard');
    collection.find( {} , { _id:1, imageUrl:1 } ).toArray(function(e,docs){
          res.json(docs);
        });
  }
  catch(error){
    res.json(error);

  }
});

router.get('/players/image/:imageURL',function(req,res){
    try{
    var collection = req.app.locals.db.collection('playerDashBoard');
    var dataModel={
      _id:201566, 
      imageURL:req.params.imageURL,
    };
    collection.insert(dataModel);
    res.json(dataModel);
  }
  catch(error){
    res.json(error);

  }
});

router.get('/teams', function(req,res){
  try{
    var collection = req.app.locals.db.collection('teamData');
    collection.find( {} , { _id:1 , "object.teamId":1} ).toArray(function(e,docs){
          res.json(docs);
        });
  }
  catch(error){
    res.json(error);

  }
});

router.get('/teams/:id', function (req, res) {
    
    var collection = req.app.locals.db.collection('teamData');
    collection.find({"object.teamId":parseInt(req.params.id)}, {_id:1} ).toArray(function(e,docs){
      if(docs.length===0){
        console.log("team ID: " +req.params.id + " is not stored in database");
        res.json("no team");
      }
      else{
        console.log("team ID: " +req.params.id + "exists, pulling from Mongo Collection: 'playerProfiles'.");
        res.json(docs[0]);
      }
    }); 
});


module.exports = router;
