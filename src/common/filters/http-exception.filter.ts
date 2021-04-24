import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
//必须实现自ExceptionFilter，该类只有一个catch方法
//exception：当前正在处理的异常对象
//host：传递给原始处理程序的参数的一个包装(Response/Request)的引用
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus(); //获取状态码
    const exceptionRes: any = exception.getResponse(); //获取响应对象
    const { error, message } = exceptionRes;

    //自定义的异常响应内容
    const msgLog = {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    };

    response.status(status).json(msgLog);
  }
}
