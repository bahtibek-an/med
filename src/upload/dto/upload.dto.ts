import { ApiProperty } from '@nestjs/swagger';


export class UploadDto {
  @ApiProperty()
  lastModified: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;
}