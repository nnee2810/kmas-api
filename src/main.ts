import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import helmet from "helmet"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get("PORT")

  app.enableCors()
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle("kmas-api")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document)

  await app.listen(port)
}
bootstrap()
