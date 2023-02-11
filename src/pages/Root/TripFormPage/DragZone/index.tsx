import React, { useState } from 'react';
import { FileTransferObj, FileTransferProps } from '../../../../types';
import style from './DragZone.module.scss';

const Drag = ({ photos, setPhotos } : FileTransferProps) => {
  const [highLight, setHighLight] = useState(false);

  const handleFiles = (files: FileList) => {
    const arr = Object.values(files);
    const photosArr: FileTransferObj[] = [];

    arr.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        const { result } = reader;

        if (typeof result === 'string') {
          const fileObj: FileTransferObj = {
            name: file.name,
            type: file.type,
            size: file.size,
            src: result,
          };
          photosArr.push(fileObj);
          setPhotos([...photos, ...photosArr]);
        }
      });
    });
  };

  const handleFileChange = (e: React.ChangeEvent) => {
    const { files } = e.target as HTMLInputElement;
    if (files) {
      handleFiles(files);
    }
  };

  const eventStop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleHighLight = (e: React.DragEvent) => {
    eventStop(e);
    setHighLight(true);
  };
  const handleUnHighLight = (e: React.DragEvent) => {
    eventStop(e);
    setHighLight(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    eventStop(e);
    setHighLight(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = (e.target as HTMLElement).parentElement;
    const targetIndex = target?.dataset.imgindex;

    if (targetIndex) {
      setPhotos([
        ...photos.slice(0, +targetIndex),
        ...photos.slice(+targetIndex + 1),
      ]);
    }
  };

  return (
    <div className={style['file-upload']}>
      <div>
        <div
          className={
            highLight
              ? `${style['file-dropArea']} ${style.highLight}`
              : style['file-dropArea']
          }
          onDragEnter={handleHighLight}
          onDragOver={handleHighLight}
          onDragLeave={handleUnHighLight}
          onDrop={handleDrop}
        >
          <label htmlFor="filePhotos">
            Add or drop your best image here
            <input
              type="file"
              name="photos"
              multiple
              id="filePhotos"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>
        <div className={style['file-preview']}>
          {photos.length > 0 && photos
            .map((item, idx) => (
              <div
                className={style['prev-img']}
                key={`${item.name + idx}`}
                data-imgindex={idx}
              >
                <button type="button" onClick={(e) => handleDelete(e)}>&times;</button>
                <img src={item.src} alt={item.name} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Drag;
