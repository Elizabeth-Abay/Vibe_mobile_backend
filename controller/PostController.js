const PostService = require('../service/postService');

const postService = new PostService();


class PostController {
    async getPostsInACategory(req, res, next) {
        try {
            let { id } = req.decodedAccess;

            let { categorySelected } = req.body;

            let result = await postService.getPostsInACategory(categorySelected);

        } catch (err) {
            err.from = 'PostController.getPostsInACategory';
            next(err);
        }

    }

    async makeAPost(req, res, next) {
        try {

        } catch (err) {
            err.from = 'PostController.makeAPost';
            next(err);
        }

    }
}
