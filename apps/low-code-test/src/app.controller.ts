import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigService } from '@nestjs/config';

import { BusinessException } from '@app/comm/exceptions/business.exception';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

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

  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }
}
