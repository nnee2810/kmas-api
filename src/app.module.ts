import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { EnvPayload } from "./interfaces/env-payload.interface"
import { LessonsModule } from "./modules/lessons/lessons.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<EnvPayload, true>({
        PORT: Joi.number(),
        KMA_URL: Joi.string(),
      }),
    }),
    LessonsModule,
  ],
})
export class AppModule {}
