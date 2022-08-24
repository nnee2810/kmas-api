import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as fs from "fs"
import { AppModule } from "./app.module"
import { TransformInterceptor } from "./interceptors/transform.interceptor"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    },
  })

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(5000)
}
bootstrap()
