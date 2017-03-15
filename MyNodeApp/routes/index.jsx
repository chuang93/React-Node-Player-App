import express from 'express';
import AppRoutes from '../scripts/jsx/AppRoutes.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, createRoutes, RouterContext} from 'react-router';
import {StaticRouter } from 'react-router';
// now supports server side rendering

var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {

	const context = {}; //no context for now.
	const htmlRendered= ReactDOMServer.renderToString(
		<StaticRouter
		 location ={req.url}
		 context = {context}>
		 	<AppRoutes/>
		</StaticRouter>
		);
    res.render('index', 
    	{ title: 'Express',
    	   appLayout: htmlRendered });
});

module.exports = router;