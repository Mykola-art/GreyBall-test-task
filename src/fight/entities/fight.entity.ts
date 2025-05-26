import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Fighter } from '../../fighter/entities/fighter.entity';
import { Event } from '../../event/entities/event.entity';
import { FightResult } from '../enums/fight-result.enum';

@ObjectType({
  description:
    'A fight in the MMA platform, representing a match between two fighters at an event.',
})
@Entity()
export class Fight {
  @Field(() => ID, { description: 'Unique identifier of the fight (UUID).' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Fighter, { description: 'The first fighter in the match.' })
  @ManyToOne(() => Fighter, { eager: false })
  fighter1: Fighter;

  @Field(() => Fighter, { description: 'The second fighter in the match.' })
  @ManyToOne(() => Fighter, { eager: false })
  fighter2: Fighter;

  @Field(() => Event, {
    description: 'The event where this fight takes place.',
  })
  @ManyToOne(() => Event, { eager: false })
  event: Event;

  @Field(() => FightResult, {
    nullable: true,
    description: 'Result of the fight (e.g., KO, SUBMISSION, DECISION, DRAW).',
  })
  @Column({ type: 'enum', enum: FightResult, nullable: true })
  result: FightResult;

  @Field(() => ID, {
    nullable: true,
    description:
      'Unique identifier of the winning fighter (UUID), if applicable.',
  })
  @Column({ nullable: true })
  winnerId: string;
}
