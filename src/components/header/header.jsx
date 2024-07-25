import logo from '../../assets/images/logo.svg'
import './header.css'
export default function Header (  ){
   
    return(
        <header>
        <div className="top_header">
            <div className="logo_section">
                <img src={logo} alt="" />
            </div>
        </div>

        </header>

    )
}