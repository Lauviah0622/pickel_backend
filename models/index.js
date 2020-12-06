/* eslint-disable */

'use strict';

const { timeStamp } = require('console');
const { text } = require('express');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

