const PostModel = require('../model/postModel');
const PostModelG = require('../model/postModelG');



const postModel = new PostModel();
const postModelG = new PostModelG();


class PostService {
    async getPostsInACategory(categorySelected) {
        try {
            // get ids from the graph and content from postgres
            let result = await postModelG.selectPostsBasedOnCategory(categorySelected);

            if (result?.data.length === 0) return result;

            // else have the posts information be extracted from the postgres
            let { data } = result;


            let resultSent = await postModel.extractPostInformation(data);

            return resultSent;

        } catch (err) {
            err.from = 'PostService.getPostsInACategory';
            next(err);
        }
    }


    async createPost({ id, categorySelected, postTitle, postContent, postImage }) {
        try {


            // putting the information in postgres table and link to graph
            // one post many categories in that case we uw
            let { mimetype } = postImage;

            let postIn = await postModel.makePost({ id, categorySelected, postTitle, postContent, mimetype });

            return postIn;


        } catch (err) {
            err.from = 'PostService.createPost';
            next(err);
        }
    }
}


module.exports = PostService;