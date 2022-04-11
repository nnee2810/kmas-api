import { ValidationPipe } from "@nestjs/common"
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface"
import { NestFactory } from "@nestjs/core"
import "dotenv/config"
import * as fs from "fs"
import { AppModule } from "./app.module"
import { TransformInterceptor } from "./interceptors/transform.interceptor"

const httpsOptions: HttpsOptions = {
  cert: fs.readFileSync("./ssl/certificate.crt"),
  key: fs.readFileSync("./ssl/private.key"),
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions })

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(process.env.PORT)
}
bootstrap()
