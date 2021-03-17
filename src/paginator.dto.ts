import { IsOptional, IsInt, Min } from 'class-validator';
import { Field, Int, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class Paginator {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Field(() => Int, { defaultValue: 0 })
  public offset?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { defaultValue: 10 })
  public limit?: number;
}
