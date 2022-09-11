import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.APP_URL,
  })
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(5000)
}
bootstrap()
