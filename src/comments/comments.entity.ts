import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/base.entity';
import { Post } from 'src/posts/posts.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comments')
@ObjectType()
export class Comment extends BaseEntity {
  @Column()
  @Field()
  author: string;

  @Column()
  @Field()
  text: string;

  @Column()
  postId: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { lazy: true })
  post?: Post;
}
