import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from "uuid";
import { getStaticFilePath } from '../../configs/path.config';
import { Request } from 'express';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: getStaticFilePath(),
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = uuidv4();
          cb(null, `${randomName}${fileExtName}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('Unsupported file type'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createDoctorDto: CreateDoctorDto
  ) {
    const imageName = image.filename;
    return this.doctorService.create({ ...createDoctorDto, avatar: imageName });
  }

  @Get()
  findAll(@Req() request: Request) {
    const protocol = request.protocol;
    const host = request.get('host');
    const fullUrl = `${protocol}://${host}/static/`;

    return this.doctorService.findAll(fullUrl);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
