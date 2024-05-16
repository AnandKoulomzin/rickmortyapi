import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/character.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CharactersModule, MongooseModule.forRoot('mongodb+srv://AnandK:AnandK@cluster0.xj5lqs3.mongodb.net/rickmortyapi')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}