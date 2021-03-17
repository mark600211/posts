import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Post } from './posts.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findOneWithException(where: FindOneOptions<Post>): Promise<Post> {
    const post = await this.postsRepository.findOne(where);

    if (!post) {
      throw new NotFoundException('Post isn`t found');
    }

    return post;
  }

  findMany(where: FindManyOptions<Post>): Promise<Post[]> {
    return this.postsRepository.find(where);
  }

  save(data: Partial<Post>): Promise<Post> {
    return this.postsRepository.save(data);
  }

  create(data: Post): Promise<Post> {
    return this.save(data);
  }

  softDelete(data: Partial<Post>): Promise<Post> {
    return this.postsRepository.softRemove(data);
  }
}
