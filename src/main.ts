import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as fs from "fs"
import helmet from "helmet"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: process.env.NODE_ENV === "prod" && {
      cert: fs.readFileSync("../ssl/cert.pem"),
      key: fs.readFileSync("../ssl/private.pem"),
    },
  })

  app.enableCors()
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(5000)
}
bootstrap()
