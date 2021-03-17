import { ArgsType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';
import { Paginator } from 'src/paginator.dto';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  description: string;
}

@InputType()
export class UpdatePostsInput extends PartialType(CreatePostInput) {
  @IsUUID('4')
  @Field(() => ID)
  id: string;
}

@ArgsType()
export class PostsFilter extends Paginator {
  @IsString()
  @Field()
  search: string;
}
