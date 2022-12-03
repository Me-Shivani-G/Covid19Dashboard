import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="covid-heading">
      COVID19<span className="india-text">INDIA</span>
    </h1>
    <p className="footer-text">
      We stand with everyone fighting on the front lines
    </p>
    <div className="icons-container">
      <VscGithubAlt className="footer-icon" />
      <FiInstagram className="footer-icon" />
      <FaTwitter className="footer-icon" />
    </div>
  </div>
)

export default Footer
