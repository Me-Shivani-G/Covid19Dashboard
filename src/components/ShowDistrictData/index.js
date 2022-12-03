import './index.css'

const ShowDistrictData = props => {
  const {number, name} = props

  return (
    <li className="stats-data-list">
      <p className="district-number">{number}</p>
      <p className="district-name">{name}</p>
    </li>
  )
}
export default ShowDistrictData
