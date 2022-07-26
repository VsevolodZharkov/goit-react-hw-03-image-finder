import { Component } from 'react';

export class Searchbar extends Component {
  state = {
		query: '',
	}
	
	handeleChange = event => {
		this.setState({query: event.target.value})
	}
	handelSubmit = event => {
		event.preventDefault();
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
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
  }
}
