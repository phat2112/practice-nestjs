import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-helper';

@Controller('user')
export class UserController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      // fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      fileName: file.filename,
    };

    return response;
  }

  @Post('multiple-upload')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response = [];
    files.forEach((item) => {
      response.push({
        originalName: item.originalname,
        fileName: item.filename,
      });
    });

    return response;
  }

  @Get(':imgPath')
  seeUploadedFile(@Param('imgPath') image, @Res() res) {
    console.log('image :>> ', image);
    res.sendFile(image, { root: './public' });
  }
}
