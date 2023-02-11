// import * as memoirTypes from './memoirTypes';
import * as userTypes from '../user/userTypes';

async function sendUploadImagesRequest(files: FileList) {
  return Array.from(files).map((file: File) => {
    // eslint-disable-next-line no-async-promise-executor
    const promise = new Promise(async (resolve) => {
      const formData = new FormData();
      formData.set('set', '20130477ec7d5485cba138eb19349cbe');
      formData.append('image', file);
      const imgBBresponse = await fetch(
        'https://api.imgbb.com/1/upload?expiration=1000&key=20130477ec7d5485cba138eb19349cbe',
        {
          method: 'POST',
          body: formData,
        },
      );
      console.log(imgBBresponse);
      if (imgBBresponse.status === 200) {
        const imageData: userTypes.TImgBBResp = await imgBBresponse.json();
        const imgURL: string = imageData.data.url;
        resolve(imgURL);
      } else resolve('default.jpg');
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
      return ['default.jpg'];
    }
    const uploadImgPromises = await sendUploadImagesRequest(files);
    const listOfResolutions = await Promise.allSettled(uploadImgPromises);
    const listOfURLs = listOfResolutions.map((resol) => (resol.status === 'fulfilled' ? resol.value : 'default.jpg'));
    return listOfURLs;
  }
  if (files.length === 0 && listToRemove.length === 0) {
    return originalList;
  }
  if (files.length === 0 && listToRemove.length > 0) {
    const listWithoutDeletedPhotos = originalList.filter(
      (url) => listToRemove.indexOf(url) < 0 || url !== 'default.jpg',
    );
    return listWithoutDeletedPhotos.length > 0
      ? listWithoutDeletedPhotos
      : ['default.jpg'];
  }
  console.log(files.length, files);
  const uploadImgPromises = await sendUploadImagesRequest(files);
  const listOfResolutions = await Promise.allSettled(uploadImgPromises);
  const listOfURLs = listOfResolutions.map((resol) => (resol.status === 'fulfilled' ? resol.value : 'default.jpg'));
  const updatedList = [...originalList, ...listOfURLs] as string[];
  const listWithoutDeletedPhotos = updatedList.filter((url) => listToRemove.indexOf(url) < 0 || url !== 'default.jpg');
  return listWithoutDeletedPhotos;
}

export async function temp() {
  return 0;
}
