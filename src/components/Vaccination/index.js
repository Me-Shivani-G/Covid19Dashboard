import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiOutlineHome} from 'react-icons/ai'
import {VaccinationTrendChart, VaccinationTrendByAges} from '../AreaChart'
// import {VacGenderPieChart, VacTypePieChart, VacAgePieChart} from '../PieChart'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const fetchConstants = {
  initial: 'Initial',
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

class Vaccination extends Component {
  state = {
    vacDetailsFetchStatus: fetchConstants.initial,
    statesIdsList: [],
    districtsList: [],
    stateId: 2,
    districtId: '',
    stateName: 'Andhra Pradesh',
    vaccinationData: {},
    showDosesTrend: true,
    showAgeTrend: false,
  }

  componentDidMount() {
    this.getStatesData()
    this.getVaccinationDetails()
  }

  getStatesData = async () => {
    const stateIdsUrl = 'https://apis.ccbp.in/covid19-state-ids'
    const response = await fetch(stateIdsUrl)
    if (response.ok) {
      const statesData = await response.json()
      const modifiedStatesData = statesData.states.map(each => ({
        stateId: each.state_id,
        stateName: each.state_name,
      }))
      this.setState({statesIdsList: modifiedStatesData})
    }
  }

  getDistrictsData = async () => {
    const {stateId} = this.state
    const districtsUrl = `https://apis.ccbp.in/covid19-districts-data/${stateId}`
    const response = await fetch(districtsUrl)

    if (response.ok) {
      const districtsData = await response.json()
      const modifiedDistrictsData = districtsData.districts.map(each => ({
        districtId: each.district_id,
        districtName: each.district_name,
      }))
      this.setState({districtsList: modifiedDistrictsData})
    }
  }

  getVaccinationDetails = async () => {
    this.setState({vacDetailsFetchStatus: fetchConstants.loading})
    const {stateId, districtId} = this.state
    const vaccinationUrl = `https://apis.ccbp.in/covid19-vaccination-data?state_id=${stateId}&date=2021-10-30&district_id=${districtId}`
    const response = await fetch(vaccinationUrl)
    if (response.ok) {
      const vaccinationData = await response.json()
      this.setState({vaccinationData})
      this.setState({vacDetailsFetchStatus: fetchConstants.success})
    }
  }

  onSelectOnState = event => {
    const {statesIdsList} = this.state
    const selectedStateName = statesIdsList.filter(
      each => each.stateId === parseInt(event.target.value),
    )[0].stateName
    this.setState(
      {stateId: event.target.value, stateName: selectedStateName},
      this.getDistrictsData,
    )
  }

  onSelectOnDistrict = event => {
    this.setState({districtId: event.target.value}, this.getVaccinationDetails)
  }

  renderOnVacDetailsLoading = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  clickOnDosesButton = () => {
    this.setState({showDosesTrend: true, showAgeTrend: false})
  }

  clickOnAgeButton = () => {
    this.setState({showDosesTrend: false, showAgeTrend: true})
  }

  renderOfVaccinationDetails = () => {
    const {vaccinationData, showAgeTrend, showDosesTrend} = this.state
    const {
      topBlock,
      // vaccinationByAge,
      vaccinationDoneByTime,
      vaccinationDoneByTimeAgeWise,
    } = vaccinationData

    const {sites, vaccination} = topBlock

    const showByDosesContainer = showDosesTrend
      ? 'doses-trend-container'
      : 'display-none-container'

    const showByAgesContainer = showAgeTrend
      ? 'ages-trend-container'
      : 'display-none-container'

    return (
      <div className="vaccination-trends-container">
        <div className="sites-meta-data-container">
          <div className="sites-container">
            <div className="sites-emoji-container">
              <div className="emoji-container">
                <img
                  src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1639118541/vaccines_1_wf27r2.png"
                  className="vaccine-emoji"
                  alt="vaccine emoji"
                />
              </div>
              <p className="sites-conducting-heading">
                Sites Conducting Vaccination:{' '}
                <span className="sites-count">{sites.total}</span>
              </p>
            </div>
            <div className="public-private-container">
              <p className="public-sites">
                Government: <span className="sites-count">{sites.govt}</span>
              </p>
              <p className="public-sites">
                Private: <span className="sites-count">{sites.pvt}</span>
              </p>
            </div>
          </div>
          <div className="sites-container">
            <div className="sites-emoji-container">
              <div className="emoji-container">
                <img
                  src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1639118541/apartment_u0bv1f.png"
                  className="vaccine-emoji"
                  alt="apartment emoji"
                />
              </div>
              <p className="sites-conducting-heading">
                Total Vaccination Doses:{' '}
                <span className="sites-count">{vaccination.total}</span>
              </p>
            </div>
            <div className="public-private-container">
              <p className="public-sites">
                Dose 1:
                <span className="sites-count"> {vaccination.tot_dose_1}</span>
              </p>
              <p className="public-sites">
                Dose 2:
                <span className="sites-count"> {vaccination.tot_dose_2}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="vaccination-trends-area-chart-container">
          <h1 className="vac-trends-heading">Vaccination Trends</h1>
          <div className="vac-trends-button-container">
            <button
              className="vac-trends-button"
              type="button"
              onClick={this.clickOnDosesButton}
            >
              By Doses
            </button>
            <button
              className="vac-trends-button"
              type="button"
              onClick={this.clickOnAgeButton}
            >
              By Age
            </button>
          </div>
          <div className={showByDosesContainer}>
            <VaccinationTrendChart vacTrendsData={vaccinationDoneByTime} />
          </div>
          <div className={showByAgesContainer}>
            <VaccinationTrendByAges ageDetails={vaccinationDoneByTimeAgeWise} />
          </div>
        </div>
      </div>
    )
  }

  finalVaccinationDetailsRender = () => {
    const {vacDetailsFetchStatus} = this.state

    switch (vacDetailsFetchStatus) {
      case fetchConstants.loading:
        return this.renderOnVacDetailsLoading()
      case fetchConstants.success:
        return this.renderOfVaccinationDetails()
      default:
        return null
    }
  }

  render() {
    const {statesIdsList, districtsList, stateName} = this.state
    return (
      <div className="vaccination-details-container">
        <Header />
        <div className="state-name-container">
          <AiOutlineHome className="home-icon" />
          <h1 className="india-state-name-heading">India/{stateName}</h1>
        </div>
        <div className="drop-down-menu-container">
          <select className="select-menu-class" onChange={this.onSelectOnState}>
            <option value="" disabled selected>
              Select States
            </option>
            {statesIdsList.map(each => (
              <option
                className="state-drop-down-name"
                value={each.stateId}
                key={each.stateName}
              >
                {each.stateName}
              </option>
            ))}
          </select>
          <select
            className="select-menu-class"
            onChange={this.onSelectOnDistrict}
          >
            <option value="" disabled selected>
              Select District
            </option>
            {districtsList.map(each => (
              <option
                className="state-drop-down-name"
                value={each.districtId}
                key={each.districtName}
              >
                {each.districtName}
              </option>
            ))}
          </select>
        </div>
        {this.finalVaccinationDetailsRender()}
        <Footer />
      </div>
    )
  }
}

export default Vaccination
