import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Modal } from './components/Modal/Modal';
import { Component } from 'react';
import { Button } from './components/Button/Button';
import { STATUS } from './Status/Status';
import { ToastContainer } from 'react-toastify';
import { Fetch } from './Fecth/Fetch';
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
		imgBigItem: {},
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

  handelImagesTake = () => {
    const { getImages } = this.props;
    getImages(this.state.images);
  };
	
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ status: STATUS.Loading });

      Fetch(this.state.query, this.setState(({page: 1})))
        .then(data => {
          this.setState({
            images: data.hits,
            status: STATUS.Success,
            totalHits: data.totalHits,
          });
        })
        .catch(() => {
          this.setState({ status: STATUS.Error });
        })
    }
  }

  handelLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    Fetch(this.state.query, this.state.page + 1)
		.then(responce => {
      this.setState(prevState => ({
        images: [...prevState.images, ...responce.hits],
      }))
			.catch(() => {
				this.setState({ status: STATUS.Error });
			});
    });
  };

  render() {
    const { page, totalHits, isOpen } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handelSubmit} />
        <ToastContainer />
        <ImageGallery openModal={this.openModal} images={this.state.images} status={this.state.status}/>
        {totalHits && totalHits >= page * 12 && (
          <Button handelLoadMore={this.handelLoadMore} />
        )}
        {isOpen && <Modal imgBigItem={this.state.imgBigItem} onClose={this.onClose} />}
      </div>
    );
  }
}
