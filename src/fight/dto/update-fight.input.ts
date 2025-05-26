import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateFightInput } from './create-fight.input';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateFightInput extends PartialType(CreateFightInput) {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
