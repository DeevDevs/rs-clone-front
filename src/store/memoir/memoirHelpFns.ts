// import * as memoirTypes from './memoirTypes';
import * as memoirTypes from './memoirTypes';
import * as userTypes from '../user/userTypes';

async function sendUploadImagesRequest(files: FileList) {
  return Array.from(files).map((file: File) => {
    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise(async (resolve) => {
      const formData = new FormData();
      formData.set('set', '20130477ec7d5485cba138eb19349cbe');
      formData.append('image', file);
      const imgBBresponse = await fetch(
        'https://api.imgbb.com/1/upload?expiration=259200&key=20130477ec7d5485cba138eb19349cbe',
        {
          method: 'POST',
          body: formData,
        },
      );
      if (imgBBresponse.status === 200) {
        const imageData: userTypes.TImgBBResp = await imgBBresponse.json();
        const imgURL: string = imageData.data.url;
        resolve(imgURL);
      } else resolve('https://i.ibb.co/XWyGkgv/default-trip-img.jpg');
    });
    return promise;
  });
}

export async function uploadMemoirImages(
  files: FileList,
  update = false,
  originalList: string[] = [],
  listToRemove: string[] = [],
) {
  if (update === false) {
    if (files.length === 0) {
      return ['https://i.ibb.co/XWyGkgv/default-trip-img.jpg'];
    }
    const uploadImgPromises = await sendUploadImagesRequest(files);
    const listOfResolutions = await Promise.allSettled(uploadImgPromises);
    const listOfURLs = listOfResolutions.map((resol) => (resol.status === 'fulfilled' ? resol.value : 'https://i.ibb.co/XWyGkgv/default-trip-img.jpg'));
    return listOfURLs;
  }
  if (files.length === 0 && listToRemove.length === 0) {
    return originalList;
  }
  if (files.length === 0 && listToRemove.length > 0) {
    const listWithoutDeletedPhotos = originalList.filter(
      (url) => listToRemove.indexOf(url) < 0,
    );
    return listWithoutDeletedPhotos.length > 0
      ? listWithoutDeletedPhotos
      : ['https://i.ibb.co/XWyGkgv/default-trip-img.jpg'];
  }
  const uploadImgPromises = await sendUploadImagesRequest(files);
  const listOfResolutions = await Promise.allSettled(uploadImgPromises);
  const listOfURLs = listOfResolutions.map((resol) => (resol.status === 'fulfilled' ? resol.value : 'https://i.ibb.co/XWyGkgv/default-trip-img.jpg'));
  const updatedList = [...originalList, ...listOfURLs] as string[];
  const listWithoutDeletedPhotos = updatedList.filter(
    (url) => listToRemove.indexOf(url) < 0 || url !== 'https://i.ibb.co/XWyGkgv/default-trip-img.jpg',
  );
  return listWithoutDeletedPhotos;
}

export function allFilesImages(files: FileList) {
  const arrayOfFiles = Array.from(files);
  if (arrayOfFiles.length === 0) return true;
  if (
    arrayOfFiles.some(
      (file) => !file.name.endsWith('png')
      && !file.name.endsWith('jpg')
      && !file.name.endsWith('webp'),
    )
  ) return false;
  return true;
}

export function updateMemoirState(state: memoirTypes.TMemoir, newMemoir: memoirTypes.TDBMemoir) {
  state.id = newMemoir._id;
  state.tripName = newMemoir.tripName;
  state.destinationName = newMemoir.destinationName;
  state.longLat = newMemoir.longLat;
  state.countryName = newMemoir.countryName;
  state.continentName = newMemoir.continentName;
  state.whereFromLongLat = newMemoir.whereFromLongLat;
  state.distance = newMemoir.distance;
  state.date = newMemoir.date;
  state.rateValue = newMemoir.rateValue;
  state.days = newMemoir.days;
  state.sites = newMemoir.sites;
  state.memoirPhotos = newMemoir.memoirPhotos;
  state.description = newMemoir.description;
}

export function emptyMemoirState(state: memoirTypes.TMemoir) {
  state.id = '';
  state.tripName = '';
  state.destinationName = '';
  state.longLat = [];
  state.countryName = '';
  state.continentName = '';
  state.whereFromLongLat = [];
  state.distance = 0;
  state.date = '';
  state.rateValue = 0;
  state.days = 0;
  state.sites = [];
  state.memoirPhotos = ['https://i.ibb.co/XWyGkgv/default-trip-img.jpg'];
  state.description = '';
}
