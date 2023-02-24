import { getDistance } from 'geolib';
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

export const getTripDist = (pointFrom: number[], pointTo: number[]) => {
  const [longFrom, latFrom] = pointFrom;
  const [longTo, latTo] = pointTo;

  const from = { latitude: latFrom, longitude: longFrom };
  const to = { latitude: latTo, longitude: longTo };
  const distance = getDistance(from, to);
  return Number((distance / 1000).toFixed());
};

export const getDate = (date: string, duration: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + duration);
  return newDate.toISOString().slice(0, 10);
};
