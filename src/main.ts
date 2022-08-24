import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as fs from "fs"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: process.env.NODE_ENV === "production" && {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    },
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.enableCors()

  await app.listen(5000)
}
bootstrap()
