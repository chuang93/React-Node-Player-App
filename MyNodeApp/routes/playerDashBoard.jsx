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

router.get('/teams', function(req,res){
  try{
    var collection = req.app.locals.db.collection('teamData');
    collection.find( {} , { _id:1 } ).toArray(function(e,docs){
          res.json(docs);
        });
  }
  catch(error){
    res.json(error);

  }
});


module.exports = router;
