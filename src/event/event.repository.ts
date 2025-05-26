import { Repository, MoreThanOrEqual } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = this.repository.create(createEventInput);
    return this.repository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.repository.find({ relations: ['fights'] });
  }

  async findOne(id: string): Promise<Event | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['fights'],
    });
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<void> {
    await this.repository.update(id, updateEventInput);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findUpcoming(): Promise<Event[]> {
    return this.repository.find({
      where: {
        date: MoreThanOrEqual(new Date()),
      },
      relations: ['fights'],
      order: { date: 'ASC' },
    });
  }
}
