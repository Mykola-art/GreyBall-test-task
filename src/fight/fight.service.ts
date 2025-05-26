import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { Fight } from './entities/fight.entity';
import { FighterService } from '../fighter/fighter.service';
import { RankingService } from '../ranking/ranking.service';
import { FightRepository } from './fight.repository';
import { FightResult } from './enums/fight-result.enum';

@Injectable()
export class FightService {
  constructor(
    private readonly fightRepository: FightRepository,
    private readonly fighterService: FighterService,
    private readonly rankingService: RankingService,
  ) {}

  async create(createFightInput: CreateFightInput): Promise<Fight> {
    const fight = await this.fightRepository.create(createFightInput);
    if (createFightInput.result && createFightInput.winnerId) {
      this.updateFighterStatsAndRankings(fight).catch(console.error);
    }
    return fight;
  }

  async findAll(): Promise<Fight[]> {
    return this.fightRepository.findAll();
  }

  async findOne(id: string): Promise<Fight> {
    const fight = await this.fightRepository.findOne(id);
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    return fight;
  }

  async update(id: string, updateFightInput: UpdateFightInput): Promise<Fight> {
    await this.fightRepository.update(id, updateFightInput);
    const updatedFight = await this.fightRepository.findOne(id);
    if (!updatedFight) {
      throw new NotFoundException(`Fight with ID ${id} not found after update`);
    }
    if (updateFightInput.result && updateFightInput.winnerId) {
      this.updateFighterStatsAndRankings(updatedFight).catch(console.error);
    }
    return updatedFight;
  }

  async remove(id: string): Promise<void> {
    const fight = await this.fightRepository.findOne(id);
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    await this.fightRepository.remove(id);
  }

  async findByEvent(eventId: string): Promise<Fight[]> {
    return this.fightRepository.findByEvent(eventId);
  }

  private async updateFighterStatsAndRankings(fight: Fight): Promise<void> {
    const fighter1 = await this.fighterService.findOne(fight.fighter1.id);
    const fighter2 = await this.fighterService.findOne(fight.fighter2.id);

    if (fight.result === FightResult.DRAW) {
      fighter1.draws += 1;
      fighter2.draws += 1;
    } else if (fight.winnerId) {
      const winner = fight.winnerId === fighter1.id ? fighter1 : fighter2;
      const loser = fight.winnerId === fighter1.id ? fighter2 : fighter1;

      winner.wins += 1;
      loser.losses += 1;

      if (fight.result === FightResult.KO) winner.knockouts += 1;
      if (fight.result === FightResult.SUBMISSION) winner.submissions += 1;
    }

    await this.fighterService.update(fighter1.id, fighter1);
    await this.fighterService.update(fighter2.id, fighter2);

    await this.rankingService.updateRankings(fighter1.weightClass);
  }
}
