import { Injectable } from '@nestjs/common';
import { FindConditions, FindManyOptions, ILike } from 'typeorm';
import { CommentsFilter } from './comments.dto';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  generateWhere({
    offset: skip,
    postId,
    search,
    limit: take,
  }: CommentsFilter): FindManyOptions<Comment> {
    const find = { take, skip } as FindManyOptions<Comment>;

    const postWhere = {} as FindConditions<Comment>;
    const authorWhere = {} as FindConditions<Comment>;
    const textWhere = {} as FindConditions<Comment>;

    if (postId) {
      postWhere.postId = postId;
    }

    if (search) {
      authorWhere.author = ILike(`%${search}%`);
      textWhere.author = ILike(`%${search}%`);
    }

    const where = [
      { ...authorWhere, ...postWhere },
      { ...textWhere, ...postWhere },
    ];

    return { ...find, where };
  }
}
