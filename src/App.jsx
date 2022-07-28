import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Modal } from './components/Modal/Modal';
import { Component } from 'react';
import { Button } from './components/Button/Button';
import { STATUS } from './Status/Status';
import { ToastContainer } from 'react-toastify';
import { fetch } from './Fecth/Fetch';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
const KEY = '28344913-175486e0517d92fb48d77b40d';

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
    this.setState({ query , page: 1});
  };

  openModal = (imgBig) => {
    this.setState(prevDtate => ({ isOpen: !prevDtate.isOpen }));
		this.setState(({ imgBigItem: imgBig }));

  };

  onClose = () => {
    this.setState(prevDtate => ({ isOpen: !prevDtate.isOpen }));
  };
	fetchFilm = (  query, page  ) => {
		console.log(query);
		console.log(page);

		return fetch(
			`https://pixabay.com/api/?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
		)
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
	}
  // handelImagesTake = () => {
  //   const { getImages } = this.props;
  //   getImages(this.state.images);
  // };
	
  componentDidUpdate(prevProps, prevState) {
		console.log(prevState.query === this.state.query );
		console.log(prevState.page === this.state.page );
		console.log(prevState.query);
		console.log(this.state.query);

    if (prevState.query !== this.state.query || prevState.page !== this.state.page ) {
			this.fetchFilm(this.state.query, this.state.page)
			// console.log(1);
      // this.setState({ status: STATUS.Loading });
    //   fetch( this.state.query, this.state.page )
    //     .then(data => {
		// 			console.log(data);
    //       this.setState({
    //         images: data.hits,
    //         status: STATUS.Success,
    //         totalHits: data.totalHits,
    //       });
    //     })
    //     .catch(() => {
    //       this.setState({ status: STATUS.Error });
    //     })
    }
  }

  handelLoadMore = () => {
    // fetch(this.state.query, this.state.page + 1)
		// .then(responce => {
    //   this.setState(prevState => ({
    //     images: [...prevState.images, ...responce.hits],
    //   }))
		// 	.catch(() => {
		// 		this.setState({ status: STATUS.Error });
		// 	});
    // });
		// this.state.page += 1;
		// this.setState({page: this.state.page})
		this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { page, totalHits, isOpen } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handelSubmit} />
        <ToastContainer />
        <ImageGallery openModal={this.openModal} images={this.state.images} status={this.state.status}/>
        {!!totalHits && totalHits >= page * 12 && (
          <Button handelLoadMore={this.handelLoadMore} />
        )}
        {isOpen && <Modal imgBigItem={this.state.imgBigItem} onClose={this.onClose} />}
      </div>
    );
  }
}
