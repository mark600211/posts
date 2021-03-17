import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async findOneWithException(where: FindOneOptions<Comment>): Promise<Comment> {
    const post = await this.commentsRepository.findOne(where);

    if (!post) {
      throw new NotFoundException('Comment isn`t found');
    }

    return post;
  }

  findMany(where: FindManyOptions<Comment>): Promise<Comment[]> {
    return this.commentsRepository.find(where);
  }

  save(data: Partial<Comment>): Promise<Comment> {
    return this.commentsRepository.save(data);
  }

  create(data: Comment): Promise<Comment> {
    return this.save(data);
  }

  softDelete(data: Partial<Comment>): Promise<Comment> {
    return this.commentsRepository.softRemove(data);
  }
}
