import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { LocalityService } from './locality.service';

@Controller('locality')
export class LocalityController {
  constructor(private localityService: LocalityService) {}

  @Get()
  async getLocality(@Query('postcode', ParseIntPipe) postcode: number) {
    return this.localityService.getLocality(postcode);
  }
}
