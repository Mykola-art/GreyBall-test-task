import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

@InputType({
  description: 'Input for creating a new event in the MMA platform.',
})
export class CreateEventInput {
  @Field({ description: 'Name of the event (e.g., UFC 300).' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ description: 'Location of the event (e.g., Las Vegas, NV).' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field({ description: 'Date of the event in ISO format (e.g., 2025-09-15).' })
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
