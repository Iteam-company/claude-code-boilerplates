import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = Number(process.env.PORT) || 3333;

  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3333',
    'http://localhost:5555',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(port);
}

bootstrap();
