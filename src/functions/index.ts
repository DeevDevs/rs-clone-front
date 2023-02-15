import { FileTransferObj } from '../types';

let id = 0;

export default (prefix = 'uniqueId') => {
  id += 1;
  return `${prefix}${id}`;
};

export const getFile = async (fileInfo: FileTransferObj) => {
  const blob = await (
    await fetch(fileInfo.src)).blob();
  const fileTest = new File([blob], fileInfo.name, { type: fileInfo.type });
  return fileTest;
};
