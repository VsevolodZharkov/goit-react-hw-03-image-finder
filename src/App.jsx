import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Modal } from './components/Modal/Modal';
import { Component } from 'react';
import { STATUS } from './components/Status/Status';
// import { Spiner } from './components/Loader/Loader';
import { Button } from './components/Button/Button';
// import { ToastContainer, toast } from 'react-toastify';
import { Fetch } from 'components/Fecth/Fetch';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    isOpen: false,
    status: STATUS.Idle,
    page: 1,
    totalHits: null,
		imgBigItem: '',
  };
  handelSubmit = query => {
    this.setState({ query });
  };

  openModal = (imgBig) => {
    this.setState(prevDtate => ({ isOpen: !prevDtate.isOpen }));
		this.setState(({ imgBigItem: imgBig }));

  };

  onClose = () => {
    this.setState(prevDtate => ({ isOpen: !prevDtate.isOpen }));
  };

  // getImages = (id) => {
  // 	this.setState({id})
  // }
  handelImagesTake = () => {
    const { getImages } = this.props;
    getImages(this.state.images);
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ status: STATUS.Loading });
      Fetch(this.state.query, this.state.page)
        .then(data => {
          this.setState({
            images: data.hits,
            status: STATUS.Success,
            totalHits: data.totalHits,
          });
        })
        .catch(() => {
          this.setState({ status: STATUS.Error });
        });
    }
  }

  handelLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    Fetch(this.state.query, this.state.page).then(responce => {
      this.setState(prevState => ({
        images: [...prevState.images, ...responce.hits],
      }));
    });
  };

  render() {
    const { images, query, page, totalHits, isOpen } = this.state;
    // const { images, status, page isOpen,} = this.state;
    console.log(page);
    console.log(query);
    console.log(images);
    console.log(totalHits >= page * 12);
    // if (status === STATUS.Idle) {
    //   return toast('Enter which photos you are interested in.');
    // }

    // if (status === STATUS.Loading) {
    //   return (
    //     <>
    //       <Spiner />
    //     </>
    //   );
    // }

    // if (status === STATUS.Error) {
    //   return <>{toast.error('Error')}</>;
    // }
    return (
      <div>
        <Searchbar onSubmit={this.handelSubmit} />
        {/* <ToastContainer /> */}
        {!!images.length && (
          <ImageGallery openModal={this.openModal} images={this.state.images} />
        )}
        {totalHits && totalHits >= page * 12 && (
          <Button handelLoadMore={this.handelLoadMore} />
        )}
        {isOpen && <Modal imgBigItem={this.state.imgBigItem} onClose={this.onClose} />}
      </div>
    );
  }
}
