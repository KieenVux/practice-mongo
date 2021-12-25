import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Accounts example')
    .setDescription('The Accounts API description')
    .setVersion('1.0')
    .addTag('account')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
