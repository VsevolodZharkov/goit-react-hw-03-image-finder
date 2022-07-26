import { Component, Fragment } from "react"
import { STATUS } from '../Status/Status'
import { toast } from "react-toastify";
import { TailSpin } from  'react-loader-spinner'
export class ImageGallery extends Component {
	state = {
		images: null,
		status: STATUS.Loading,
	}
	
	componentDidMount() {
		this.setState({status: STATUS.Loading });
		setTimeout(() => {
		fetch('https://pixabay.com/api/?key=28344913-175486e0517d92fb48d77b40d&q=car&page=1&image_type=photo&orientation=horizontal&per_page=12')
		.then(res => res.json())
		.then(data => this.setState({ images: data, status: STATUS.Success}))
		.catch(() => {
			this.setState({ status: STATUS.Error });
			toast.error('Error');
			// alert('Ошибка запроса на бекенд')
			// console.log(Error)
			});
		},10000)
	}

	render() {
		const {images, status } = this.state
		console.log(images?.hits);
		if(status === STATUS.Loading) {
			return <><TailSpin color="blue" height={80} width={80} /></>
		}
	
		if(status === STATUS.Idle) {
			return toast('Enter which photos you are interested in.')
		}

		
		// return (
		// 	<ul className="ImageGallery">
		// 		{this.props.children}
		// 	</ul>
		// )
	}
}



