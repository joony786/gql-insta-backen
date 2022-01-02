import jwt from 'jsonwebtoken';
import client from '../client';
import shortId from "shortid"
import { createWriteStream,unlink } from "fs"
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await client.user.findUnique({ where: { id } });
    if (foundUser) {
      return foundUser;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const authResolver = (ourProvider) => (root, args, context, info) => {
  console.log('inside auth');
  if (!context.currentUser) {
    return {
      ok: false,
      error: 'Login to perform this action',
    };
  }
  return ourProvider(root, args, context, info);
};

export const saveFiles = async (file) => {
  const { createReadStream, filename } = await file;
  const readStream = createReadStream();
  const newFileName = filename.replace(/[" "]+/g, '_').toLowerCase();
  const storedFileName = `${shortId.generate()}-${newFileName}`;
  const storedFileUrl =    process.cwd() + '/assets/' + storedFileName
  
  // readStream.pipe(writeStream)
  // await finished(writeStream)

  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    // const writeStream = createWriteStream(storedFileUrl);
    const writeStream = createWriteStream(storedFileUrl);
    // When the upload is fully written, resolve the promise.
    writeStream.on('finish', resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on('error', (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    readStream.on('error', (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    readStream.pipe(writeStream);
  });

  return storedFileName;
};
