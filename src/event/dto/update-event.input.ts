import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateEventInput } from './create-event.input';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
