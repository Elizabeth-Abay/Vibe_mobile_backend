const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');
const PostController = require('../controller/PostController');
const PostSchemas = require('../schemas/PostSchemas');
const validate = require('../middleware/joiValidator');

const postRouter = express.Router();



postRouter.get('/get-post-given-category', TokenDecoder.accessDecode ,validate(PostSchemas.getPostCategory) );


postRouter.post('/make-post', TokenDecoder.accessDecode , validate(PostSchemas.makePost) );