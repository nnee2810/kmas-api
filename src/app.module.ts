import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { WinstonModule } from "nest-winston"
import * as DailyRotateFile from "winston-daily-rotate-file"
import { EnvPayload } from "./interfaces/env-payload.interface"
import { LoggerMiddleware } from "./middlewares/logger.middleware"
import { LessonsModule } from "./modules/lessons/lessons.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<EnvPayload, true>({
        PORT: Joi.number(),
        KMA_URL: Joi.string(),
      }),
    }),
    WinstonModule.forRoot({
      transports: [
        new DailyRotateFile({
          dirname: process.cwd() + "/logs",
          filename: "%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
        }),
      ],
    }),
    LessonsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
