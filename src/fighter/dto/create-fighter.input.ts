import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

@InputType({
  description: 'Input for creating a new fighter in the MMA platform.',
})
export class CreateFighterInput {
  @Field({ description: 'First name of the fighter.' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field({ description: 'Last name of the fighter.' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field({
    description:
      'Weight class of the fighter. Must be one of: Flyweight, Bantamweight, Featherweight, Lightweight, Welterweight, Middleweight, Light Heavyweight, Heavyweight.',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn([
    'Flyweight',
    'Bantamweight',
    'Featherweight',
    'Lightweight',
    'Welterweight',
    'Middleweight',
    'Light Heavyweight',
    'Heavyweight',
  ])
  weightClass: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of wins the fighter has. Optional, defaults to 0.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  wins?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of losses the fighter has. Optional, defaults to 0.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  losses?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of draws the fighter has. Optional, defaults to 0.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  draws?: number;

  @Field(() => Int, {
    nullable: true,
    description:
      'Number of knockouts the fighter has achieved. Optional, defaults to 0.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  knockouts?: number;

  @Field(() => Int, {
    nullable: true,
    description:
      'Number of submissions the fighter has achieved. Optional, defaults to 0.',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  submissions?: number;
}
