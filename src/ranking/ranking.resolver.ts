import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from './entities/ranking.entity';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Mutation(() => Ranking, {
    description:
      'Create a new ranking for a fighter. Points, win percentage, and rank are calculated server-side.',
  })
  async createRanking(
    @Args('createRankingInput') createRankingInput: CreateRankingInput,
  ) {
    return this.rankingService.create(createRankingInput);
  }

  @Query(() => [Ranking], {
    name: 'rankings',
    description: 'Retrieve a list of all rankings.',
  })
  async findAll() {
    return this.rankingService.findAll();
  }

  @Query(() => Ranking, {
    name: 'ranking',
    description: 'Retrieve a single ranking by its ID.',
  })
  async findOne(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the ranking (UUID).',
    })
    id: string,
  ) {
    return this.rankingService.findOne(id);
  }

  @Query(() => [Ranking], {
    name: 'rankingsByWeightClass',
    description:
      'Retrieve all rankings for a specific weight class, ordered by rank.',
  })
  async findByWeightClass(
    @Args('weightClass', {
      description: 'Weight class to filter rankings by (e.g., Lightweight).',
    })
    weightClass: string,
  ) {
    return this.rankingService.findByWeightClass(weightClass);
  }

  @Mutation(() => Ranking, {
    description:
      'Update an existing ranking’s points and win percentage by its ID. Rank is recalculated automatically.',
  })
  async updateRanking(
    @Args('updateRankingInput') updateRankingInput: UpdateRankingInput,
  ) {
    return this.rankingService.update(
      updateRankingInput.id,
      updateRankingInput,
    );
  }

  @Mutation(() => Boolean, {
    description: 'Delete a ranking by its ID. Returns true if successful.',
  })
  async removeRanking(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the ranking to delete (UUID).',
    })
    id: string,
  ) {
    return this.rankingService.remove(id).then(() => true);
  }
}
