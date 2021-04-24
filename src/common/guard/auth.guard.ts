import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; //反射器，作用与自定义装饰器桥接

//自定义守卫必须实现自CanActivate，固定写法，该接口只有一个canActivate方法
//canActivate参数：
//context：请求的(Response/Request)的引用
//通过守卫返回true，否则返回false，返回403状态码
@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private readonly reflector: Reflector) { }

  // 白名单数组
  private whiteUrlList: string[] = ['/user'];

  // 验证该次请求是否为白名单内的路由
  private isWhiteUrl(urlList: string[], url: string): boolean {
    if (urlList.includes(url)) {
      return true;
    }
    return false;
  }

  canActivate(context: ExecutionContext): boolean {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    //console.log('request', request.headers);
    //console.log('request', request.params);
    //console.log('request', request.query);
    //console.log('request', request.url);

    // 用法一：验证是否是白名单内的路由
    if (this.isWhiteUrl(this.whiteUrlList, request.url)) {
      return true;
    } else {
      return false;
    }

    // 用法二：使用反射器，配合装饰器使用，获取装饰器传递过来的数据
    //const roles = this.reflector.get<string[]>('roles', context.getHandler());
    //console.log(roles); // [ 'admin' ]
    //http://localhost:3000/user/9?user=admin，如果与装饰器传递过来的值匹配则通过，否则不通过
    //真实开发中可能从cookie或token中获取值
    // const { user } = request.query;
    // if (roles.includes(user)) {
    //   return true;
    // } else {
    //   return false;
    // }

    // 其他用法
    // 获取请求头中的token字段
    const token = context.switchToRpc().getData().headers.token;
    // console.log('token', token);

    // 获取session
    const userinfo = context.switchToHttp().getRequest().session;
    // console.log('session', userinfo);

    return true;
  }
}
