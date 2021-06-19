import { extname } from 'path';

export const editFileName = (req, file: Express.Multer.File, cb) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  cb(null, `${name}-${randomName}-${fileExtName}`);
};

export const imageFileFilter = (req, file: Express.Multer.File, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed'), false);
  }

  return cb(null, true);
};
