import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Fighter } from '../../fighter/entities/fighter.entity';

@ObjectType({
  description:
    'A ranking in the MMA platform, representing a fighter’s standing in a weight class.',
})
@Entity()
export class Ranking {
  @Field(() => ID, { description: 'Unique identifier of the ranking (UUID).' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Fighter, {
    description: 'The fighter associated with this ranking.',
  })
  @ManyToOne(() => Fighter)
  fighter: Fighter;

  @Field({
    description:
      'Weight class for this ranking (e.g., Lightweight, Heavyweight).',
  })
  @Column()
  weightClass: string;

  @Field(() => Int, {
    description:
      'Points accumulated by the fighter, based on wins, knockouts, submissions, and draws.',
  })
  @Column()
  points: number;

  @Field(() => Int, {
    description: 'Rank position within the weight class (1 is the highest).',
  })
  @Column()
  rank: number;

  @Field(() => Float, {
    description: 'Win percentage of the fighter (wins / total fights).',
  })
  @Column({ type: 'float' })
  winPercentage: number;
}
