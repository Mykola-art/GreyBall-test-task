import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Fight } from '../../fight/entities/fight.entity';
import { Ranking } from '../../ranking/entities/ranking.entity';

@ObjectType({
  description:
    'A fighter in the MMA platform, representing an athlete with fight records and rankings.',
})
@Entity()
export class Fighter {
  @Field(() => ID, { description: 'Unique identifier of the fighter (UUID).' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'First name of the fighter.' })
  @Column()
  firstName: string;

  @Field({ description: 'Last name of the fighter.' })
  @Column()
  lastName: string;

  @Field({
    description:
      'Weight class of the fighter (e.g., Lightweight, Heavyweight).',
  })
  @Column()
  weightClass: string;

  @Field(() => Int, { description: 'Number of wins the fighter has.' })
  @Column({ default: 0 })
  wins: number;

  @Field(() => Int, { description: 'Number of losses the fighter has.' })
  @Column({ default: 0 })
  losses: number;

  @Field(() => Int, { description: 'Number of draws the fighter has.' })
  @Column({ default: 0 })
  draws: number;

  @Field(() => Int, {
    description: 'Number of knockouts the fighter has achieved.',
  })
  @Column({ default: 0 })
  knockouts: number;

  @Field(() => Int, {
    description: 'Number of submissions the fighter has achieved.',
  })
  @Column({ default: 0 })
  submissions: number;

  @Field(() => [Fight], {
    nullable: true,
    description: 'List of fights where the fighter is Fighter 1.',
  })
  @OneToMany(() => Fight, (fight) => fight.fighter1)
  fightsAsFighter1: Fight[];

  @Field(() => [Fight], {
    nullable: true,
    description: 'List of fights where the fighter is Fighter 2.',
  })
  @OneToMany(() => Fight, (fight) => fight.fighter2)
  fightsAsFighter2: Fight[];

  @Field(() => [Ranking], {
    nullable: true,
    description: 'List of rankings associated with the fighter.',
  })
  @OneToMany(() => Ranking, (ranking) => ranking.fighter)
  rankings: Ranking[];
}
