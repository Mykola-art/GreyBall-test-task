import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { FightResult } from '../enums/fight-result.enum';

@InputType({
  description: 'Input for creating a new fight in the MMA platform.',
})
export class CreateFightInput {
  @Field(() => ID, {
    description: 'Unique identifier of the first fighter (UUID).',
  })
  @IsString()
  @IsUUID()
  fighter1Id: string;

  @Field(() => ID, {
    description: 'Unique identifier of the second fighter (UUID).',
  })
  @IsString()
  @IsUUID()
  fighter2Id: string;

  @Field(() => ID, {
    description:
      'Unique identifier of the event where the fight takes place (UUID).',
  })
  @IsString()
  @IsUUID()
  eventId: string;

  @Field(() => FightResult, {
    nullable: true,
    description:
      'Result of the fight (e.g., KO, SUBMISSION, DECISION, DRAW). Optional.',
  })
  @IsOptional()
  @IsEnum(FightResult)
  result?: FightResult;

  @Field(() => ID, {
    nullable: true,
    description:
      'Unique identifier of the winning fighter (UUID). Optional, required if result is not DRAW.',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  winnerId?: string;
}
