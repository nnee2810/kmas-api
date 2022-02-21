import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { LessonsModule } from "./modules/lessons/lessons.module"

@Module({
  imports: [LessonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
