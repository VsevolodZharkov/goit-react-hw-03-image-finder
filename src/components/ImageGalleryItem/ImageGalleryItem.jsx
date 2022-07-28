import Style from '../../components/ImageGalleryItem/ImageGalleryItem.module.css'
export const ImageGalleryItem = ({image, onClick}) => {

	return (
			<li className={Style.ImageGalleryItem} onClick={() =>onClick(image)}>
  			<img className={Style.ImageGalleryItemImage} src={image.webformatURL} alt={image.tags} />
			</li>
		)
	}	
