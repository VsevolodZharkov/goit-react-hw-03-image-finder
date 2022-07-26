
import ButtonModul from './Button.module.css'
export const Button = ({handlerLoad}) => {
	return (
		<div className={ButtonModul.position}>
		  <button className="Button" type='button' onClick={handlerLoad}>
			  Load more
		  </button>
		</div>
	)
}