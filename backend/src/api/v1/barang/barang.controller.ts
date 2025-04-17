import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BarangService } from './barang.service';

import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';

import { AuthBarrier } from '@/common/guards/auth-barrier.guard';

@UseGuards(AuthBarrier)
@ApiBearerAuth('access-token')
@ApiTags('Barang')
@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Post('create')
  create(@Request() req, @Body() data: CreateBarangDto) {
    return this.barangService.create(data, req.user.sub);
  }

  @Get('data')
  findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('search') search?: string,
  ) {
    const parsedPage = page ? parseInt(page, 10) : undefined;
    const parsedPageSize = pageSize ? parseInt(pageSize, 10) : undefined;

    console.log('Parsed Page:', parsedPage);
    console.log('Parsed Page Size:', parsedPageSize);

    return this.barangService.findAll(
      req.user.sub,
      parsedPage,
      parsedPageSize,
      search,
    );
  }

  @Get('data/:id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.barangService.findOne(id, req.user.sub);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() data: UpdateBarangDto,
  ) {
    return this.barangService.update(id, data, req.user.sub);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.barangService.remove(id, req.user.sub);
  }

  @Get('dashboard')
  async getDashboardData(@Request() req) {
    return this.barangService.getStats(req.user.sub);
  }
}
