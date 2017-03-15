import express from 'express';
import AppRoutes from '../scripts/jsx/AppRoutes.jsx';
import ReactDOMServer from 'react-dom/server';
import {match, createRoutes, RouterContext} from 'react-router';

var router = express.Router();

const context = {} //no context for now.

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;