import { Link } from "react-router-dom";

function Button(props){
    return(
        <Link to={props.redirect}>
            <button className={`bg-brand-primary px-4 py-2 rounded text-sm cursor-pointer font-normal hover:bg-brand-dark w-${props.width}`}>{props.text}</button>
        </Link>
    )
}

export default Button;