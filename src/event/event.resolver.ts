import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event, {
    description: 'Create a new event with the specified details.',
  })
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event], {
    name: 'events',
    description: 'Retrieve a list of all events.',
  })
  async findAll() {
    return this.eventService.findAll();
  }

  @Query(() => Event, {
    name: 'event',
    description: 'Retrieve a single event by its ID.',
  })
  async findOne(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the event (UUID).',
    })
    id: string,
  ) {
    return this.eventService.findOne(id);
  }

  @Query(() => [Event], {
    name: 'upcomingEvents',
    description: 'Retrieve all upcoming events (events with a future date).',
  })
  async findUpcoming() {
    return this.eventService.findUpcoming();
  }

  @Mutation(() => Event, {
    description: 'Update an existing event’s details by its ID.',
  })
  async updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation(() => Boolean, {
    description: 'Delete an event by its ID. Returns true if successful.',
  })
  async removeEvent(
    @Args('id', {
      type: () => ID,
      description: 'Unique identifier of the event to delete (UUID).',
    })
    id: string,
  ) {
    return this.eventService.remove(id).then(() => true);
  }
}
