import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException, Req,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { getMulterConfigForImage } from '../../configs/multer.config';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags("Upload File")
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
  }

  @UseInterceptors(getMulterConfigForImage('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUploadDto })
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const imageName = file?.filename;
    if (!imageName) {
      throw new BadRequestException(['File is required']);
    }
    const host = request.get('host');
    const fileUrl = `https://${host}/static/` + imageName;
    return { url: fileUrl };
  }

}
