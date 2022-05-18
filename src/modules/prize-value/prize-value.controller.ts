import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrizeValueService } from './prize-value.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({
  path: 'prize-value',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class PrizeValueController {
  constructor(private readonly prizeValueService: PrizeValueService) {}

  // @Post()
  // create(@Body() createPrizeValueDto: CreatePrizeValueDto) {
  //   return this.prizeValueService.create(createPrizeValueDto);
  // }

  @Get()
  findAll() {
    return this.prizeValueService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.prizeValueService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePrizeValueDto: UpdatePrizeValueDto) {
  //   return this.prizeValueService.update(+id, updatePrizeValueDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prizeValueService.remove(+id);
  }
}
