import { Component } from 'react';

export class Searchbar extends Component {
  state = {
		searce: '',
	}
	// Searchbar.proptypes = {
	// 	onSubmit: 
	// }
	render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <button
            type="submit"
            className="SearchForm-button"
            // onClick={onSubmit}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
