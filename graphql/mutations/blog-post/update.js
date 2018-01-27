
import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString,
    GraphQLID

} from 'graphql';

import blogPostInputType from '../../types/blog-post-input';
import BlogPostModel from '../../../models/blog-post';

export default {
    type: GraphQLBoolean,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: 'data',
            type: new GraphQLNonNull(blogPostInputType)
        }
    },
    async resolve(root, params, option) {
        const blogPostModel = new BlogPostModel(params.data);
        const updateBlogPost = BlogPostModel.findByIdAndUpdate(params._id,
            { $set: { title: params.data.title, description: params.data.description } })
            .exec();
        if (!updateBlogPost) {
            throw new Error('Error update blog post');
        }
        return true;
    }
}