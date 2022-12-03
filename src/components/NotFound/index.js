import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const NotFound = () => (
  <div className="not-found-bg">
    <Header />
    <div className="not-found-container">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/student-sudheer/image/upload/v1623931254/covid-19/Group_7484_mkuc3u.png"
        alt="not-found-pic"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-desc">
        we are sorry, the page you requested could not be found
      </p>
      <p className="not-found-desc">Please go back to the homepage</p>
      <Link to="/">
        <button className="not-found-home-btn" type="button">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
