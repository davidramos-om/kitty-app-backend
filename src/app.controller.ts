import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('greeter')
  getGreeter() {  
    return this.appService.getGreeter();
  }

  @Get('info')
  serverInfo() {  
    return this.appService.serverInfo();
  }


}
