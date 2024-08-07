import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException, HttpStatus,
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
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({status: HttpStatus.CREATED, type: CreateDoctorDto, description: "The doctor has been created successfully"})
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createDoctorDto: CreateDoctorDto
  ) {
    const imageName = image?.filename;
    if(!imageName) {
      throw new BadRequestException(['Image is required']);
    }
    return this.doctorService.create({ ...createDoctorDto, avatar: imageName });
  }

  @Get()
  @ApiResponse({status: HttpStatus.OK, type: [DoctorDto], description: "List of doctors"})
  findAll(@Req() request: Request) {
    const host = request.get('host');
    const fullUrl = `https://${host}/static/`;

    return this.doctorService.findAll(fullUrl);
  }


  @Get(':id')
  @ApiResponse({status: HttpStatus.OK, type: DoctorDto, description: "List of doctors"})
  findOne(@Req() request: Request, @Param('id') id: string) {
    const host = request.get('host');
    const fullUrl = `https://${host}/static/`;

    return this.doctorService.findOne(+id, fullUrl);
  }

  @Patch(':id')
  @UseInterceptors(getMulterConfigForImage("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({status: HttpStatus.CREATED, type: CreateDoctorDto, description: "The doctor has been updated successfully"})
  update(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto
  ) {
    const imageName = image?.filename;
    if(!imageName) {
      throw new BadRequestException(['Image is required']);
    }
    return this.doctorService.update(+id, { ...updateDoctorDto, avatar: imageName });
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
