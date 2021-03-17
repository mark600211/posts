import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput, PostsFilter, UpdatePostsInput } from './posts.dto';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [Post])
  async postsList(@Args() postsFilter: PostsFilter): Promise<Post[]> {
    const where = this.postsService.generateWhere(postsFilter);

    return this.postsRepository.findMany(where);
  }

  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    return this.postsRepository.findOneWithException({ where: { id } });
  }

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postsRepository.create(createPostInput);
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('updatePostInput') { id, ...rest }: UpdatePostsInput,
  ): Promise<Post> {
    const post = await this.postsRepository.findOneWithException({
      where: { id },
    });

    return this.postsRepository.save({ ...post, ...rest });
  }

  @Mutation(() => Post)
  async deletePost(@Args('id') id: string): Promise<Post> {
    const post = await this.postsRepository.findOneWithException({
      where: { id },
    });

    return this.postsRepository.softDelete(post);
  }
}
