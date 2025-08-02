import * as dotenv from "dotenv";
dotenv.config();

import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication, RequestMethod } from "@nestjs/common";
import { AppModule } from "./app.module";
import { CatchAllErrorsFilter } from "./core/infra/filters/catch-all-errors.filter";
import { DatabaseErrorsFilter } from "./core/infra/filters/database-errors.filter";

const setupSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle("Challenges API")
    .setDescription("API developed by Stepply")
    .setExternalDoc("Swagger JSON", "/swagger-json")
    .setVersion("1.0")
    .addTag("User")
    .addTag("Organization")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, documentFactory);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.useGlobalFilters(new CatchAllErrorsFilter(), new DatabaseErrorsFilter());
  app.setGlobalPrefix("api/v1", {
    exclude: [
      { path: "swagger", method: RequestMethod.ALL },
      { path: "swagger-json", method: RequestMethod.ALL }, // opcional, para o JSON puro
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
