import style from '../../components/ImageGalleryItem/ImageGalleryItem.module.css'
export const ImageGalleryItem = ({image, onClick}) => {

	return (
			<li className={style.ImageGalleryItem} onClick={() =>onClick(image)}>
  			<img className={style.ImageGalleryItemImage} src={image.webformatURL} alt={image.tags} />
			</li>
		)
	}	
