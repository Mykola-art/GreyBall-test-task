import { Injectable, NotFoundException } from '@nestjs/common';
import { FighterRepository } from './fighter.repository';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { Fighter } from './entities/fighter.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class FighterService {
  constructor(private readonly fighterRepository: FighterRepository) {}

  async create(createFighterInput: CreateFighterInput): Promise<Fighter> {
    return this.fighterRepository.create(createFighterInput);
  }

  async findAll(): Promise<Fighter[]> {
    return this.fighterRepository.findAll();
  }

  async findOne(id: string): Promise<Fighter> {
    const fighter = await this.fighterRepository.findOne(id);
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return fighter;
  }

  async update(
    id: string,
    updateFighterInput: UpdateFighterInput,
  ): Promise<UpdateResult> {
    const fighter = await this.fighterRepository.findOne(id);
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return this.fighterRepository.update(id, updateFighterInput);
  }

  async remove(id: string): Promise<void> {
    const fighter = await this.fighterRepository.findOne(id);
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    await this.fighterRepository.remove(id);
  }

  async findByWeightClass(weightClass: string): Promise<Fighter[]> {
    return this.fighterRepository.findByWeightClass(weightClass);
  }
}
