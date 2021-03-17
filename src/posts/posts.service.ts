import { Injectable } from '@nestjs/common';
import { FindConditions, FindManyOptions, ILike } from 'typeorm';
import { PostsFilter } from './posts.dto';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  generateWhere({
    search,
    limit: take,
    offset: skip,
  }: PostsFilter): FindManyOptions<Post> {
    const find = { take, skip } as FindManyOptions<Post>;

    const whereTitle = {} as FindConditions<Post>;
    const whereAuthor = {} as FindConditions<Post>;

    if (search) {
      whereTitle.title = ILike(`%${search}%`);
      whereAuthor.title = ILike(`%${search}%`);
    }

    const where = [
      { ...whereTitle },
      { ...whereAuthor },
    ] as FindConditions<Post>[];

    return { ...find, where };
  }
}
