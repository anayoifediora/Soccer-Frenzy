const db = require('../config/connection');
const { User, Article, Comment } = require('../models/index');
const userSeeds = require('./userSeeds.json');
const articleSeeds = require('./articleSeeds.json');
const commentSeeds = require('./commentSeeds.json');

db.once('open', )