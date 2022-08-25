import { Module } from "@nestjs/common"
import { WinstonModule } from "nest-winston"
import * as winston from "winston"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { LessonsModule } from "./modules/lessons/lessons.module"

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "DD/MM/YYYY HH:mm:ss",
        }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
      ],
    }),
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
