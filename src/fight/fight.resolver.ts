import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { Fight } from './entities/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Mutation(() => Fight, {
    description:
      'Create a new fight with the specified fighters, event, and result.',
  })
  async createFight(@Args('createFightInput') createFightInput: CreateFightInput) {
    return this.fightService.create(createFightInput);
  }

  @Query(() => [Fight], {
    name: 'fights',
    description: 'Retrieve a list of all fights.',
  })
  async findAll() {
    return this.fightService.findAll();
  }

  @Query(() => Fight, {
    name: 'fight',
    description: 'Retrieve a single fight by its ID.',
  })
  async findOne(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the fight (UUID).',
    })
    id: string,
  ) {
    return this.fightService.findOne(id);
  }

  @Query(() => [Fight], {
    name: 'fightsByEvent',
    description: 'Retrieve all fights for a specific event.',
  })
  async findByEvent(
    @Args('eventId', {
      type: () => ID,
      description: 'Unique identifier of the event (UUID).',
    })
    eventId: string,
  ) {
    return this.fightService.findByEvent(eventId);
  }

  @Mutation(() => Fight, {
    description: 'Update an existing fight’s details by its ID.',
  })
  async updateFight(@Args('updateFightInput') updateFightInput: UpdateFightInput) {
    return this.fightService.update(updateFightInput.id, updateFightInput);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a fight by its ID. Returns true if successful.',
  })
  async removeFight(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the fight to delete (UUID).',
    })
    id: string,
  ) {
    return this.fightService.remove(id).then(() => true);
  }
}
