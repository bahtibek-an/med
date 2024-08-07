import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { getStaticFilePath } from './path.config';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';


export const getMulterConfigForImage = (field: string) => {
  return FileInterceptor(field, {
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
  });
};