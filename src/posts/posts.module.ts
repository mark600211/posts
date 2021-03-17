import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  exports: [PostsRepository],
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsResolver, PostsRepository, PostsService],
})
export class PostsModule {}
