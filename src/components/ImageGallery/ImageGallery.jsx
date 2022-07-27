import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from '../ImageGallery/ImageGallery.module.css'
export const ImageGallery = ({images, openModal}) => {

  return (
		<>
      <ul className={style.ImageGallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={openModal}
            />
          );
        })}
      </ul>
		</>
  );
};
