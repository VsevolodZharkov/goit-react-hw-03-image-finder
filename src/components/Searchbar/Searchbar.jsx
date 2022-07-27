import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
		query: '',
	}
	
	handeleChange = event => {
		this.setState({query: event.target.value})
	}
	handelSubmit = event => {
		event.preventDefault();
		if(this.state.query.trim() === ''){
			toast.error('Fill input')
			return 
		}
		const { onSubmit } = this.props;
		onSubmit(this.state.query)
	}
	render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button
            type="submit"
            className="SearchForm-button"
            onClick={this.handelSubmit}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
						onChange={this.handeleChange}
            className="SearchForm-input"
            type="text"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
  }
}
Searchbar.propsTypes = {
	query: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
}