import express from 'express';
import AppRoutes from '../scripts/jsx/AppRoutes.jsx';
import renderToString from 'react-dom/server';
import {match, createRoutes, RouterContext} from 'react-router';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

module.exports = router;