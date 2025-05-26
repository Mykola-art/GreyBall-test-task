import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsInt,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

@InputType()
export class UpdateRankingInput {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  winPercentage?: number;
}
