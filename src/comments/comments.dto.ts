import {
  ArgsType,
  Field,
  ID,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Paginator } from 'src/paginator.dto';

@InputType()
export class CreateCommentInput {
  @IsString()
  @Field()
  author: string;

  @IsString()
  @Field()
  text: string;

  @IsUUID()
  @Field(() => ID)
  postId: string;
}

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @IsUUID()
  @Field(() => ID)
  id: string;
}

@ArgsType()
export class CommentsFilter extends Paginator {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  search?: string;

  @IsUUID()
  @Field(() => ID)
  postId: string;
}
