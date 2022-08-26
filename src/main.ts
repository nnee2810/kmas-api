import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import * as csurf from "csurf"
import * as fs from "fs"
import helmet from "helmet"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: process.env.NODE_ENV === "production" && {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    },
    cors: {
      origin: ["localhost:3000", "kmas.nnee.dev"],
    },
  })

  app.use(cookieParser())
  app.use(csurf())
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(5000)
}
bootstrap()
