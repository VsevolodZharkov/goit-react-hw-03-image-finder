import { Component } from 'react'
import { STATUS } from '../Status/Status'
import { toast } from "react-toastify";
import { Spiner } from '../Loader/Loader'
import { ImageGalleryItem } from './components/ImageGalleryItem/ImageGalleryItem'
export class ImageGallery extends Component {
	state = {
		images: null,
		status: STATUS.Idle,
	}
	
	componentDidMount() {
		this.setState({status: STATUS.Loading })

		fetch('https://pixabay.com/api/?key=28344913-175486e0517d92fb48d77b40d&q=car&page=1&image_type=photo&orientation=horizontal&per_page=12')
		.then(res => {
			this.setState({status: STATUS.Success})
			return res.json()
		})
		.then(data => this.setState({ images: data }))
		.catch(() => {
			this.setState({ status: STATUS.Error });
			toast.error('Error');
			});
	}

	render() {
		const {images, status } = this.state
		// console.log(images?.hits);

		if(status === STATUS.Loading) {
			return <><Spiner /></>
		}
	
		if(status === STATUS.Idle) {
			return toast('Enter which photos you are interested in.')
		}

		if(status === STATUS.Error) {
			return <>{toast.error('Error')}</>
		}

		return (
			<ul className="ImageGallery">
				{images?.hits.map(image =>{
					<ImageGalleryItem key={image.id} />
				})}
			</ul>
		)
	}
}




