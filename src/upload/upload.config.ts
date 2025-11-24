//Multer storage

import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

//Memory storage stays on server memory
export const storage = memoryStorage();
export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(
      new BadRequestException('Apenas arquivos de imagem são permitidos'),
      false,
    );
  }
  cb(null, true);
};

export const limits = {
  // fileSize: 900 * 1024, //900KB per image
};
