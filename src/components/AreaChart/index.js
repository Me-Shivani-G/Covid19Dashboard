import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export const VaccinationTrendChart = props => {
  const {vacTrendsData} = props
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <AreaChart
        data={vacTrendsData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="label"
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
        />
        <YAxis
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
          tickFormatter={value =>
            new Intl.NumberFormat('en', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="dose_one"
          stackId="1"
          stroke="green"
          fill="#233323"
        />
        <Area
          type="monotone"
          dataKey="dose_two"
          stackId="1"
          stroke="indigo"
          fill="#3E4226"
        />
        <Area
          type="monotone"
          dataKey="count"
          stackId="1"
          stroke="violet"
          fill="#2E1E30"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export const VaccinationTrendByAges = props => {
  const {ageDetails} = props

  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <AreaChart
        data={ageDetails}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="label"
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
        />
        <YAxis
          tick={{fontFamily: 'sans-serif', fontSize: '12', fontWeight: '600'}}
          tickFormatter={value =>
            new Intl.NumberFormat('en', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value)
          }
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="vac_18_45"
          stackId="1"
          stroke="green"
          fill="#233323"
        />
        <Area
          type="monotone"
          dataKey="vac_45_60"
          stackId="1"
          stroke="indigo"
          fill="#3E4226"
        />
        <Area
          type="monotone"
          dataKey="vac_60_above"
          stackId="1"
          stroke="violet"
          fill="#2E1E30"
        />
        <Area
          type="monotone"
          dataKey="total"
          stackId="1"
          stroke="blue"
          fill="#331427"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
