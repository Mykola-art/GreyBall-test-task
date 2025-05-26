import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    return this.eventRepository.create(createEventInput);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
    const updatedEvent = await this.eventRepository.findOne(id);
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found after update`);
    }
    await this.eventRepository.update(id, updateEventInput);
    return updatedEvent;
  }

  async remove(id: string): Promise<void> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    await this.eventRepository.remove(id);
  }

  async findUpcoming(): Promise<Event[]> {
    return this.eventRepository.findUpcoming();
  }
}
