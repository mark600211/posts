import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsRepository } from 'src/posts/posts.repository';
import {
  CommentsFilter,
  CreateCommentInput,
  UpdateCommentInput,
} from './comments.dto';
import { Comment } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly commentsService: CommentsService,
    private readonly postsRepository: PostsRepository,
  ) {}

  @Query(() => [Comment])
  async commentsList(
    @Args() commentsFilter: CommentsFilter,
  ): Promise<Comment[]> {
    const where = this.commentsService.generateWhere(commentsFilter);

    return this.commentsRepository.findMany(where);
  }

  @Query(() => Comment)
  async comment(@Args('id') id: string): Promise<Comment> {
    return this.commentsRepository.findOneWithException({ where: { id } });
  }

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') { postId, ...rest }: CreateCommentInput,
  ): Promise<Comment> {
    await this.postsRepository.findOneWithException({
      where: { id: postId },
    });

    return this.commentsRepository.create({ postId, ...rest });
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('updateCommentInput') { postId, id, ...rest }: UpdateCommentInput,
  ): Promise<Comment> {
    if (postId) {
      await this.postsRepository.findOneWithException({
        where: { id: postId },
      });
    }

    const comment = await this.commentsRepository.findOneWithException({
      where: { id },
    });

    return this.commentsRepository.save({ ...comment, postId, ...rest });
  }

  @Mutation(() => Comment)
  async deleteComment(@Args('id') id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOneWithException({
      where: { id },
    });

    return this.commentsRepository.softDelete(comment);
  }
}
