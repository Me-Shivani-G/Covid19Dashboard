import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637926976/check-mark_1_lhao9n.png',

      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637932347/protection_1_vxqdnb.png',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637932539/recovered_1_sxtfix.png',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637933626/breathing_1_ozfip0.png',
      value: totalDeceased,
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state

    const {active} = this.props
    const itsActiveOnLoad = active ? 'confirmed-block' : ''

    return (
      <>
        <ul className="ul-list-each-state ">
          <li
            className={`category-item ${confirmedData.name} ${itsActiveOnLoad} `}
            tabIndex="-1"
            key={confirmedData.name}
            value={confirmedData.name}
            onClick={() => this.onGetTotal(confirmedData.name)}
          >
            <div>
              <p className="stats-title">{confirmedData.name}</p>
              <img
                src={confirmedData.logo}
                alt="state specific confirmed cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{confirmedData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${activeData.name}`}
            tabIndex="-1"
            key={activeData.name}
            value={activeData.name}
            onClick={() => this.onGetTotal(activeData.name)}
          >
            <div>
              <p className="stats-title">{activeData.name}</p>
              <img
                src={activeData.logo}
                alt="state specific active cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{activeData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${recoveredData.name}`}
            tabIndex="-1"
            key={recoveredData.name}
            value={recoveredData.name}
            onClick={() => this.onGetTotal(recoveredData.name)}
          >
            <div>
              <p className="stats-title">{recoveredData.name}</p>
              <img
                src={recoveredData.logo}
                alt="state specific recovered cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{recoveredData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${deceasedData.name}`}
            tabIndex="-1"
            key={deceasedData.name}
            value={deceasedData.name}
            onClick={() => this.onGetTotal(deceasedData.name)}
          >
            <div>
              <p className="stats-title">{deceasedData.name}</p>
              <img
                src={deceasedData.logo}
                alt="state specific deceased cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{deceasedData.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default StateTotalData
