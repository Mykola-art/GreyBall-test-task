import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { Fighter } from '../fighter/entities/fighter.entity';

@Injectable()
export class RankingRepository {
  constructor(
    @InjectRepository(Ranking)
    private readonly repository: Repository<Ranking>,
  ) {}

  async create(
    fighter: Fighter,
    weightClass: string,
    points: number,
    winPercentage: number,
  ): Promise<Ranking> {
    const ranking = this.repository.create({
      fighter,
      weightClass,
      points,
      winPercentage,
      rank: 0,
    });
    return this.repository.save(ranking);
  }

  async findAll(): Promise<Ranking[]> {
    return this.repository.find({ relations: ['fighter'] });
  }

  async findOne(id: string): Promise<Ranking | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['fighter'],
    });
  }

  async findByWeightClass(weightClass: string): Promise<Ranking[]> {
    return this.repository.find({
      where: { weightClass },
      relations: ['fighter'],
      order: { rank: 'ASC' },
    });
  }

  async update(id: string, points: number, winPercentage: number, rank: number = 0): Promise<void> {
    await this.repository.update(id, { points, winPercentage, rank });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
