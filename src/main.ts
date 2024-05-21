import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import helmet from 'helmet';
import { OrderModule } from './Order/order.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: false,
  });

  // Lazy Loading Module
  const lazyModuleLoader = app.get(LazyModuleLoader);
  await lazyModuleLoader.load(() => OrderModule);

  // Helmet for extra headers
  app.use(helmet());

  // Swagger Implementation
  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription("Api's")
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // validation pipe
  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen(3030);
}
bootstrap();
