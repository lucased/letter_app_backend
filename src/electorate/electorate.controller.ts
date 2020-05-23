import { Controller, Get } from '@nestjs/common';
import { ElectorateService } from './electorate.service';

@Controller('electorate')
export class ElectorateController {
  constructor(private eletorateService: ElectorateService) {}

  @Get()
  getMemberByPostcode() {
    return this.eletorateService.getElectorate();
  }
}
