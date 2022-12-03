import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {apiStatus: apiStatusConstants.initial, faqDetails: {}, factsData: {}}

  componentDidMount() {
    this.getFaqDetails()
  }

  getFaqDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    // console.log(response)
    if (response.ok) {
      const faqData = await response.json()
      console.log(faqData)
      const faqs = faqData.faq
      const factoid = faqData.factoids
      console.log(faqs)
      this.setState({faqDetails: faqs})
      this.setState({factsData: factoid})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getCurrentDate = (separator = '-') => {
    const newDate = new Date()
    const date = newDate.getDate()
    const month = newDate.getMonth()
    const year = newDate.getFullYear()

    return `${date}${separator}${
      month < 10 ? `0${month + 1}` : `${month}`
    }${separator}${year}`
  }

  renderSuccessView = () => {
    const {faqDetails, factsData} = this.state
    return (
      <>
        <div className="about-faqs-container">
          <h1 className="about-heading">About</h1>

          <p className="vaccination-details">
            COVID-19 Vaccines be ready for distribution
          </p>
          <ul className="faq-unordered-list">
            {faqDetails.map(each => (
              <li className="faq-list-item">
                <p className="faq-question">{each.question}</p>
                <p className="faq-answer">{each.answer}</p>
              </li>
            ))}
          </ul>
          <h1 className="about-vaccine-title">Facts</h1>
          <ul className="facts-list">
            {factsData.map(each => (
              <li className="facts">{each.banner}</li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  onClickToRedirectToHome = () => {
    const {history} = this.Props
    history.replace('/')
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637986931/Group_7484_a35iey.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">PAGE NOT FOUND</h1>
      <p className="failure-text">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <button
        className="home-redirect-button"
        type="button"
        onClick={this.onClickToRedirectToHome}
      >
        Home
      </button>
    </div>
  )

  renderAboutResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-bg-container">
        <Header />
        {this.renderAboutResult()}
        <Footer />
      </div>
    )
  }
}
export default About
