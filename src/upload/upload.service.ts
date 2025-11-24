import { BadRequestException, Injectable } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { generateRandomSuffix } from 'src/common/utils/generate-random-suffix';

@Injectable()
export class UploadService {
  async handleUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const maxFileSize = 900 * 1024;

    if (file.size > maxFileSize) {
      throw new BadRequestException('Tamanho do arquivo muito grande.');
    }

    const fileType = await fileTypeFromBuffer(file.buffer);

    if (
      !fileType ||
      ![
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
        'image/avif',
      ].includes(fileType.mime)
    ) {
      throw new BadRequestException(
        'Formato de arquivo inválido ou não permitido.',
      );
    }
    //2025-11-24T12:56 ---- split[0] ----> 2025-11-24
    const today = new Date().toISOString().split('T')[0];
    const uploadPath = resolve(__dirname, '..', '..', 'uploads', today);

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${generateRandomSuffix()}`;
    const fileExtension = fileType.ext;
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    const fileFullPath = resolve(uploadPath, fileName);

    writeFileSync(fileFullPath, file.buffer);

    return {
      url: `/uploads/${today}/${fileName}`,
    };
  }
}
