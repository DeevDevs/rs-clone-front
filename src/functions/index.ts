import { FileTransferObj } from '../types';
import { StatisticsItemsText } from '../enums';

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

export const getGradeText = (grade: number) => {
  switch (grade) {
    case 1: case 2:
      return StatisticsItemsText.Awful;
    case 3: case 4:
      return StatisticsItemsText.DidNotLike;
    case 5: case 6:
      return StatisticsItemsText.Good;
    case 7: case 8:
      return StatisticsItemsText.Great;
    case 9: case 10:
      return StatisticsItemsText.Awesome;
    default:
      return StatisticsItemsText.Ok;
  }
};
