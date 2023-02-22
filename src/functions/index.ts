import { FileTransferObj } from '../types';
import ToursStore from '../data/toursStore';

let key = 0;

export default (prefix = 'uniqueId') => {
  key += 1;
  return `${prefix}${key}`;
};

export const getFile = async (fileInfo: FileTransferObj) => {
  const blob = await (
    await fetch(fileInfo.src)).blob();
  const fileTest = new File([blob], fileInfo.name, { type: fileInfo.type });
  return fileTest;
};

const offers = [...ToursStore[0].data, ...ToursStore[1].data, ...ToursStore[2].data];
export const getOfferById = (offerId: string | undefined) => {
  if (offerId) {
    return offers.find(({ id }) => id === +offerId);
  }
  return null;
};
