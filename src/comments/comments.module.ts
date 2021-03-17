import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { Comment } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostsModule],
  providers: [CommentsResolver, CommentsRepository, CommentsService],
})
export class CommentsModule {}
