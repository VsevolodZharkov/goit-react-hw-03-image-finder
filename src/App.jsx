import { Component } from "react"
import { Searchbar } from './components/Searchbar/Searchbar'
import { ImageGallery } from './components/ImageGallery/ImageGallery'
// import { ImageGalleryItem } from './components/ImageGalleryItem/ImageGalleryItem'
// import { Button } from './components/Button/Button'
// import { Modal } from './components/Modal/Modal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {

	render() {
		return (
			<div>
				<ToastContainer />
				<Searchbar  />
				<ImageGallery />
					{/* <ImageGalleryItem /> */}
				{/* </ImageGallery> */}
				{/* <Modal /> */}
				{/* <Button /> */}
			</div>
		);
	}
};
