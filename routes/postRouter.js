const express = require('express');
const TokenDecoder = require('../middleware/tokenDecoder');
const PostController = require('../controller/PostController');
const PostSchemas = require('../schemas/PostSchemas');
const validate = require('../middleware/joiValidator');
const uploads = require('../config/multerConfig');

const postRouter = express.Router();
const postController = new PostController();



postRouter.get('/get-post-given-category', TokenDecoder.accessDecode, validate(PostSchemas.getPostCategory), postController.getPostsInACategory);


postRouter.post('/make-post', TokenDecoder.accessDecode, uploads.single('postPic') ,validate(PostSchemas.makePost) , postController.makeAPost);


module.exports = postRouter;