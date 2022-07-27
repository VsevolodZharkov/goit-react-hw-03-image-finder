import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from '../ImageGallery/ImageGallery.module.css';
import { Spiner } from '../Loader/Loader';
import { STATUS } from '../Status/Status';

import { Component } from 'react';

export class ImageGallery extends Component {
	
  render() {
    const { status } = this.props;
    if (status === STATUS.Idle) {
      return <p className=''>Enter which photos you are interested in.</p>
    }

    if (status === STATUS.Loading) {
      return (
        <>
          <Spiner />
        </>
      );
    }

    if (status === STATUS.Error) {
      return <p>Sorry mb</p>;
    }

    return (
      <>
        <ul className={style.ImageGallery}>
          {this.props.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={this.props.openModal}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
