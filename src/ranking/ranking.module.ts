import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './entities/ranking.entity';
import { FighterModule } from '../fighter/fighter.module';
import { RankingService } from './ranking.service';
import { RankingResolver } from './ranking.resolver';
import { RankingRepository } from './ranking.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking]), FighterModule],
  providers: [RankingService, RankingResolver, RankingRepository],
  exports: [RankingService],
})
export class RankingModule {}
