import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Fight } from '../../fight/entities/fight.entity';

@ObjectType({
  description:
    'An event in the MMA platform, representing a scheduled fight night with multiple fights.',
})
@Entity()
export class Event {
  @Field(() => ID, { description: 'Unique identifier of the event (UUID).' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'Name of the event (e.g., UFC 300).' })
  @Column()
  name: string;

  @Field({
    description: 'Location where the event takes place (e.g., Las Vegas, NV).',
  })
  @Column()
  location: string;

  @Field({ description: 'Date of the event.' })
  @Column()
  date: Date;

  @Field(() => [Fight], {
    nullable: true,
    description: 'List of fights scheduled for this event.',
  })
  @OneToMany(() => Fight, (fight) => fight.event)
  fights: Fight[];
}
