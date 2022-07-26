import { Component } from "react"
import { Searchbar } from './components/Searchbar/Searchbar'
import { ImageGallery } from './components/ImageGallery/ImageGallery'

// import { Modal } from './components/Modal/Modal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
	state = {
		query: '',
		page: 1,
	}
	handelSubmit = (query) => {
		this.setState({query})
	}
	render() {
		return (
			<div>
				<ToastContainer />
				<Searchbar onSubmit={this.handelSubmit}/>
				<ImageGallery query={this.state.query} page={this.state.page}/>
				{/* <Modal /> */}
			
			</div>
		);
	}
};
