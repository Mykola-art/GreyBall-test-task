import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FighterModule } from './fighter/fighter.module';
import { EventModule } from './event/event.module';
import { FightModule } from './fight/fight.module';
import { RankingModule } from './ranking/ranking.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { Fighter } from './fighter/entities/fighter.entity';
import { Event } from './event/entities/event.entity';
import { Fight } from './fight/entities/fight.entity';
import { Ranking } from './ranking/entities/ranking.entity';
import { config } from './config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLVoyagerController } from './graphql-voyager/graphql-voyager.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: [Fighter, Event, Fight, Ranking],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: {
        settings: {
          'editor.theme': 'dark',
          'editor.cursorShape': 'line',
          'request.credentials': 'same-origin',
        },
      },
    }),
    FighterModule,
    EventModule,
    FightModule,
    RankingModule,
  ],
  controllers: [GraphQLVoyagerController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
