import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { LessonsModule } from "./modules/lessons/lessons.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string(),
        PORT: Joi.number(),
        KMA_URL: Joi.string(),
      }),
    }),
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
