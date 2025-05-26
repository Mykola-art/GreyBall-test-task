import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateFighterInput } from './create-fighter.input';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateFighterInput extends PartialType(CreateFighterInput) {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
