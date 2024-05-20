import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './characters/character.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CharacterModule, MongooseModule.forRoot('mongodb+srv://AnandK:AnandK@cluster0.ae9cmvd.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}