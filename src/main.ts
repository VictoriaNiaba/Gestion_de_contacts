import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Filtre global qui applique les règles de validation pour chaque route
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Phone Book')
    .setDescription(
      `This API is developed as part of the Software 
    Engineering course at Aix-Marseille University. It is public and
    allows to manage a set of contacts (creation, deletion, update, reading ...).`,
    )
    .setVersion('1.0')
    .setContact('Phone book administrators', null, 'phonebook.m2ild@gmail.com')
    .setExternalDoc(
      'Source code on Gitlab',
      'https://gitlab.com/farhane.hafsa/phone-book',
    )
    .setLicense('MIT License', 'http://opensource.org/licenses/MIT')
    .addServer('http://localhost:{port}', 'Local server', {
      port: { description: 'API port', default: 3000 },
    })
    .addServer('https://phone-book-staging.herokuapp.com', 'Staging server')
    .addServer('https://phone-book-prod.herokuapp.com', 'Production server')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
