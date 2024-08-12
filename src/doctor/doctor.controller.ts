import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto, UpdateScheduleDoctorDto } from './dto/update-doctor.dto';
import { Request } from 'express';
import { getMulterConfigForImage } from '../../configs/multer.config';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DoctorDto } from './dto/doctor.dto';

@ApiTags("Doctor")
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @UseInterceptors(getMulterConfigForImage("avatar"))
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({status: HttpStatus.CREATED, type: CreateDoctorDto, description: "The doctor has been created successfully"})
  create(
    @Body() createDoctorDto: CreateDoctorDto
  ) {
    return this.doctorService.create({ ...createDoctorDto });
  }

  @Get()
  @ApiResponse({status: HttpStatus.OK, type: [DoctorDto], description: "List of doctors"})
  findAll(@Req() request: Request) {
    return this.doctorService.findAll();
  }


  @Get(':id')
  @ApiResponse({status: HttpStatus.OK, type: DoctorDto, description: "List of doctors"})
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({status: HttpStatus.CREATED, type: CreateDoctorDto, description: "The doctor has been updated successfully"})
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    return this.doctorService.update(+id, { ...updateDoctorDto });
  }

  @ApiBody({ type: [UpdateScheduleDoctorDto] })
  @Patch(':id/schedule')
  updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDoctorDto: UpdateScheduleDoctorDto[]
  ) {
    return this.doctorService.updateScheduleById(+id, updateScheduleDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
