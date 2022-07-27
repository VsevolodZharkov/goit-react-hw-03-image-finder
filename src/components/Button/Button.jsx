
import ButtonModul from './Button.module.css'
export const Button = ({handelLoadMore}) => {
	return (
		<div className={ButtonModul.position}>
		  <button className="Button" type='button' onClick={handelLoadMore}>
			  Load more
		  </button>
		</div>
	)
}