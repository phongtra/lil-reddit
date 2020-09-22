import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';
import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware
} from 'type-graphql';

import { Post } from '../entities/Post';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }
  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(@Arg('input') input: PostInput, @Ctx() { req }: MyContext) {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ) {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Post.update({ id }, { title });
    }

    return post;
  }
  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number) {
    await Post.delete(id);
    return true;
  }
}
