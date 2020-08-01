import { readDir, ReadDirItem } from 'react-native-fs';

type Promisable<T> = Promise<T> | T;

export interface FileFilter {
  (file: ReadDirItem): unknown;
}

export interface DirectoryFilter {
  (file: ReadDirItem): boolean;
}

const defaultFileFilter: FileFilter = (x) => x;
const defaultDirectoryFilter: DirectoryFilter = () => true;

interface Options {
  /** A function which will be called when finding a file;
   * if it returns a falsy value,
   * callback won't be called for it.
   */
  fileFilter?: FileFilter;
  /** A function which will be called when finding a directory;
   * if it returns a falsy value,
   * the callback won't be called for it
   * and the directory's contents won't be processed.
   */
  directoryFilter?: DirectoryFilter;
}

export const readdirp = (dirPath: string, options: Options = {}) => ({
  async forEach(callback: (file: ReadDirItem) => Promisable<void>) {
    const {
      fileFilter = defaultFileFilter,
      directoryFilter = defaultDirectoryFilter,
    } = options;

    const files = await readDir(dirPath);
    for (const file of files) {
      if (file.isDirectory()) {
        const keep = await directoryFilter(file);
        if (keep) {
          await callback(file);
          await readdirp(file.path, options).forEach(callback);
        }
      } else if (file.isFile()) {
        const keep = await fileFilter(file);
        if (keep) {
          await callback(file);
        }
      }
    }
  },
});

export default readdirp;
