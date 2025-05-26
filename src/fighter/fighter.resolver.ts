import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FighterService } from './fighter.service';
import { Fighter } from './entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(private readonly fighterService: FighterService) {}

  @Mutation(() => Fighter, {
    description: 'Create a new fighter with the specified details.',
  })
  async createFighter(
    @Args('createFighterInput') createFighterInput: CreateFighterInput,
  ) {
    return this.fighterService.create(createFighterInput);
  }

  @Query(() => [Fighter], {
    name: 'fighters',
    description: 'Retrieve a list of all fighters.',
  })
  findAll() {
    return this.fighterService.findAll();
  }

  @Query(() => Fighter, {
    name: 'fighter',
    description: 'Retrieve a single fighter by their ID.',
  })
  async findOne(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the fighter (UUID).',
    })
    id: string,
  ) {
    return this.fighterService.findOne(id);
  }

  @Query(() => [Fighter], {
    name: 'fightersByWeightClass',
    description: 'Retrieve all fighters in a specific weight class.',
  })
  async findByWeightClass(
    @Args('weightClass', {
      description: 'Weight class to filter fighters by (e.g., Lightweight).',
    })
    weightClass: string,
  ) {
    return this.fighterService.findByWeightClass(weightClass);
  }

  @Mutation(() => Fighter, {
    description: 'Update an existing fighter’s details by their ID.',
  })
  async updateFighter(
    @Args('updateFighterInput') updateFighterInput: UpdateFighterInput,
  ) {
    return this.fighterService.update(
      updateFighterInput.id,
      updateFighterInput,
    );
  }

  @Mutation(() => Boolean, {
    description: 'Delete a fighter by their ID. Returns true if successful.',
  })
  async removeFighter(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the fighter to delete (UUID).',
    })
    id: string,
  ) {
    return this.fighterService.remove(id).then(() => true);
  }
}
