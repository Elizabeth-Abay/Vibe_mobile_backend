class PostService{
    async getPostsInACategory(categorySelected){
        try {

        } catch (err) {
            err.from = 'PostService.getPostsInACategory';
            next(err);
        }
    }
}