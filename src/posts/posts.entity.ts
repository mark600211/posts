import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/comments.entity';

@Entity('posts')
@ObjectType()
export class Post extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @OneToMany(() => Comment, (comments) => comments.post, { lazy: true })
  @Field(() => [Comment], { nullable: 'itemsAndList' })
  comments?: Promise<Comment[]> | Comment;
}
