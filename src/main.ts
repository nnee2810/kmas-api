import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import "dotenv/config"
import { AppModule } from "./app.module"
import { TransformInterceptor } from "./interceptors/transform.interceptor"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(5000)
}
bootstrap()
