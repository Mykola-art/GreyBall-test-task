import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightService } from './fight.service';
import { FightResolver } from './fight.resolver';
import { Fight } from './entities/fight.entity';
import { FightRepository } from './fight.repository';
import { FighterModule } from '../fighter/fighter.module';
import { EventModule } from '../event/event.module';
import { RankingModule } from '../ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fight]),
    FighterModule,
    EventModule,
    RankingModule,
  ],
  providers: [FightService, FightResolver, FightRepository],
  exports: [FightService],
})
export class FightModule {}
