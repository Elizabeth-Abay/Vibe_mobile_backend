const PostService = require('../service/postService');

const postService = new PostService();


class PostController {
    async getPostsInACategory(req, res, next) {
        try {

            let { categorySelected } = req.body;

            let result = await postService.getPostsInACategory(categorySelected);

            return (result.success) ?
                res.status(200).json(result) : res.status(400).json({ message: 'bad request' })

        } catch (err) {
            err.from = 'PostController.getPostsInACategory';
            next(err);
        }

    }

    async makeAPost(req, res, next) {
        try {
            let { id } = req.decodedAccess;


            // have req.files .. part
            // info in the postImage
            // fieldname , originalname ,encoding ,mimetype ,size ,destination ,filename ,path 

            let {
                categorySelected,
                postTitle,
                postContent,
                postImage
            } = req.body;

            let result = await postService.createPost({
                id,
                categorySelected,
                postTitle,
                postContent,
                postImage
            });


        } catch (err) {
            err.from = 'PostController.makeAPost';
            next(err);
        }

    }
}
