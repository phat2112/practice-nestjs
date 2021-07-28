import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-helper';
import UserService from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    res.sendFile(image, { root: './public' });
  }

  @Post('search-friend')
  async searchUser(
    @Body() request: { searchKey: string },
    @Res() res: Response,
  ) {
    try {
      const users = await this.userService.searchUser(request.searchKey);
      const newFormatUser = users.map((user) => ({
        ...user,
        password: undefined,
      }));
      return res.status(200).send({ data: newFormatUser });
    } catch (error) {}
  }
}
