import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
// import { AuthGuard } from './common/guard/auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new AuthInterceptor());

  await app.listen(3000);
}
bootstrap();
