import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import React from 'react';

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows?.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl, image } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-4 bg-white flex justify-center items-start">
        { (imageUrl || image) && (
          <img src={imageUrl || image} alt={name} className="w-full h-auto max-h-[70vh] object-contain rounded" />
        ) }
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageWindow;
