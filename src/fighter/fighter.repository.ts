import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Injectable()
export class FighterRepository {
  constructor(
    @InjectRepository(Fighter)
    private readonly repository: Repository<Fighter>,
  ) {}

  async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
    const fighter = this.repository.create(createFighterInput);
    return this.repository.save(fighter);
  }

  async findAll(): Promise<Fighter[]> {
    return this.repository.find({
      relations: ['fightsAsFighter1', 'fightsAsFighter2', 'rankings'],
    });
  }

  async findOne(id: string): Promise<Fighter | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['fightsAsFighter1', 'fightsAsFighter2', 'rankings'],
    });
  }

  async update(
    id: string,
    updateFighterInput: UpdateFighterInput,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, updateFighterInput);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByWeightClass(weightClass: string): Promise<Fighter[]> {
    return this.repository.find({
      where: { weightClass },
      relations: ['fightsAsFighter1', 'fightsAsFighter2', 'rankings'],
    });
  }
}
