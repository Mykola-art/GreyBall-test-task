import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { FighterService } from '../fighter/fighter.service';
import { EventService } from '../event/event.service';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Injectable()
export class FightRepository {
  constructor(
    @InjectRepository(Fight)
    private readonly repository: Repository<Fight>,
    private readonly fighterService: FighterService,
    private readonly eventService: EventService,
  ) {}

  async create(createFightInput: CreateFightInput): Promise<Fight> {
    const { fighter1Id, fighter2Id, eventId, result, winnerId } =
      createFightInput;

    const fight = this.repository.create({
      fighter1: await this.fighterService.findOne(fighter1Id),
      fighter2: await this.fighterService.findOne(fighter2Id),
      event: await this.eventService.findOne(eventId),
      result,
      winnerId,
    });

    return this.repository.save(fight);
  }

  async findAll(): Promise<Fight[]> {
    return this.repository.find({
      relations: ['fighter1', 'fighter2', 'event'],
    });
  }

  async findOne(id: string): Promise<Fight | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2', 'event'],
    });
  }

  async update(id: string, updateFightInput: UpdateFightInput): Promise<void> {
    await this.repository.update(id, updateFightInput);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEvent(eventId: string): Promise<Fight[]> {
    return this.repository.find({
      where: { event: { id: eventId } },
      relations: ['fighter1', 'fighter2', 'event'],
    });
  }
}
