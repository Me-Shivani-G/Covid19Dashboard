import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {isToggleActive: false}

  clickToOpenMenu = () => {
    this.setState({isToggleActive: true})
  }

  clickToCloseMenu = () => {
    this.setState({isToggleActive: false})
  }

  render() {
    const {isToggleActive} = this.state
    return (
      <>
        <nav className="header-container">
          <Link to="/" className="link-item">
            <h1 className="covid-heading">
              COVID19<span className="india-text">INDIA</span>
            </h1>
          </Link>
          <ul className="header-items-list">
            <div className="home-about-container">
              <Link to="/" className="link-item">
                <li className="nav-item">Home</li>
              </Link>
              <Link to="/about" className="link-item">
                <li className="nav-item">About</li>
              </Link>
              <Link to="/vaccination" className="link-item">
                <li className="nav-item">Vaccination</li>
              </Link>
            </div>
          </ul>
        </nav>
        <nav className="mobile-nav-container">
          <div className="mobile-header-container">
            <Link to="/" className="link-item">
              <h1 className="covid-heading">
                COVID19<span className="india-text">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="mobile-button"
              onClick={this.clickToOpenMenu}
            >
              <GiHamburgerMenu className="mobile-header-icon" />
            </button>
          </div>
        </nav>
        {isToggleActive && (
          <div className="mobile-redirecting-container">
            <ul className="mobile-home-about-container">
              <Link to="/" className="link-item">
                <li className="mobile-nav-item">Home</li>
              </Link>
              <Link to="/about" className="link-item">
                <li className="mobile-nav-item">About</li>
              </Link>
              <Link to="/vaccination" className="link-item">
                <li className="mobile-nav-item">Vaccination</li>
              </Link>
            </ul>
            <button
              type="button"
              className="mobile-button"
              onClick={this.clickToCloseMenu}
            >
              <AiFillCloseCircle className="mobile-header-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}
export default Header
