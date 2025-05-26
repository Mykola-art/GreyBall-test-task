import { Injectable, NotFoundException } from '@nestjs/common';
import { RankingRepository } from './ranking.repository';
import { CreateRankingInput } from './dto/create-ranking.input';
import { UpdateRankingInput } from './dto/update-ranking.input';
import { Ranking } from './entities/ranking.entity';
import { FighterService } from '../fighter/fighter.service';
import { Fighter } from '../fighter/entities/fighter.entity';

@Injectable()
export class RankingService {
  constructor(
    private readonly rankingRepository: RankingRepository,
    private readonly fighterService: FighterService,
  ) {}

  async create(createRankingInput: CreateRankingInput): Promise<Ranking> {
    const fighter = await this.fighterService.findOne(
      createRankingInput.fighterId,
    );
    if (!fighter) {
      throw new NotFoundException(
        `Fighter with ID ${createRankingInput.fighterId} not found`,
      );
    }

    const points = this.calculatePoints(fighter);
    const winPercentage =
      fighter.wins / (fighter.wins + fighter.losses + fighter.draws) || 0;
    const weightClass = fighter.weightClass;

    const ranking = await this.rankingRepository.create(
      fighter,
      weightClass,
      points,
      winPercentage,
    );
    await this.updateRankings(weightClass);
    return ranking;
  }

  async findAll(): Promise<Ranking[]> {
    return this.rankingRepository.findAll();
  }

  async findOne(id: string): Promise<Ranking> {
    const ranking = await this.rankingRepository.findOne(id);
    if (!ranking) {
      throw new NotFoundException(`Ranking with ID ${id} not found`);
    }
    return ranking;
  }

  async findByWeightClass(weightClass: string): Promise<Ranking[]> {
    return this.rankingRepository.findByWeightClass(weightClass);
  }

  async update(
    id: string,
    updateRankingInput: UpdateRankingInput,
  ): Promise<Ranking> {
    const ranking = await this.rankingRepository.findOne(id);
    if (!ranking) {
      throw new NotFoundException(`Ranking with ID ${id} not found`);
    }

    const fighter = await this.fighterService.findOne(ranking.fighter.id);
    const points = updateRankingInput.points ?? this.calculatePoints(fighter);
    const winPercentage =
      updateRankingInput.winPercentage ??
      (fighter.wins / (fighter.wins + fighter.losses + fighter.draws) || 0);

    await this.rankingRepository.update(id, points, winPercentage);
    await this.updateRankings(ranking.weightClass);

    const updatedRanking = await this.rankingRepository.findOne(id);
    if (!updatedRanking) {
      throw new NotFoundException(
        `Ranking with ID ${id} not found after update`,
      );
    }
    return updatedRanking;
  }

  async remove(id: string): Promise<void> {
    const ranking = await this.findOne(id);
    await this.rankingRepository.remove(id);
    await this.updateRankings(ranking.weightClass);
  }

  async updateRankings(weightClass: string): Promise<void> {
    const rankings =
      await this.rankingRepository.findByWeightClass(weightClass);

    const sortedRankings = rankings
      .map((ranking) => ({
        id: ranking.id,
        points: ranking.points,
        winPercentage: ranking.winPercentage,
      }))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return b.winPercentage - a.winPercentage;
      });

    for (let i = 0; i < sortedRankings.length; i++) {
      const rankingId = sortedRankings[i].id;
      const points = sortedRankings[i].points;
      const winPercentage = sortedRankings[i].winPercentage;
      const rank = i + 1;
      await this.rankingRepository.update(
        rankingId,
        points,
        winPercentage,
        rank,
      );
    }
  }

  private calculatePoints(fighter: Fighter): number {
    return (
      fighter.wins * 3 +
      fighter.knockouts * 4 +
      fighter.submissions * 4 +
      fighter.draws * 1
    );
  }
}
