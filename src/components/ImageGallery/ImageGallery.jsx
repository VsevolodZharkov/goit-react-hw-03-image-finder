import { Component } from 'react';
import { STATUS } from '../Status/Status';
import { toast } from 'react-toastify';
import { Spiner } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
const KEY = '28344913-175486e0517d92fb48d77b40d';
export class ImageGallery extends Component {
  state = {
    images: null,
    status: STATUS.Idle,
		page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    
		if(prevProps.query !== this.props.query) {
			this.setState({ status: STATUS.Loading });
			fetch(
				`https://pixabay.com/api/?key=${KEY}&q=${this.props.query}&page=${this.props.page}&image_type=photo&orientation=horizontal&per_page=12`
			)
				.then(res => res.json())
				.then(data => this.setState({ images: data, status: STATUS.Success }))
				.catch(() => {
					this.setState({ status: STATUS.Error });
					toast.error('Error');
				});
		}
    
  }

  render() {
    const { images, status } = this.state;

    console.log(images?.hits);

    const totalHits = images?.totalHits;

    if (status === STATUS.Loading) {
      return (
        <>
          <Spiner />
        </>
      );
    }

    if (status === STATUS.Idle) {
      return toast('Enter which photos you are interested in.');
    }

    if (status === STATUS.Error) {
      return <>{toast.error('Error')}</>;
    }

    if (!images.hits.length) {
      return <p>No data</p>;
    }
		
    return (
      <>
        <ul className="ImageGallery">
          {images?.hits.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
        </ul>
				{totalHits && <Button />}
      </>
    );
  }
}
