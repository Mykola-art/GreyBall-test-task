import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType({
  description: 'Input for creating a new ranking in the MMA platform.',
})
export class CreateRankingInput {
  @Field(() => ID, {
    description: 'Unique identifier of the fighter to rank (UUID).',
  })
  @IsString()
  @IsUUID()
  fighterId: string;
}
