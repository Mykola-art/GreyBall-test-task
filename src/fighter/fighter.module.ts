import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterService } from './fighter.service';
import { FighterResolver } from './fighter.resolver';
import { Fighter } from './entities/fighter.entity';
import { FighterRepository } from './fighter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FighterService, FighterResolver, FighterRepository],
  exports: [FighterService],
})
export class FighterModule {}
