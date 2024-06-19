import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

import { BusinessException } from '@app/comm/exceptions/business.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('findError')
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.appService.getHello();
  }

  @Get('findBusinessError')
  findBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.appService.getHello();
  }
}
