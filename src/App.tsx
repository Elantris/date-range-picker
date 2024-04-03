import { FC, useState } from 'react'
import './App.css'
import DateRangePicker, { DateRangeValueProps } from './DateRangePicker'

const App: FC = () => {
  const [value, setValue] = useState<DateRangeValueProps>({
    startDate: '',
    endDate: '',
  })
  const [value2, setValue2] = useState<DateRangeValueProps>({
    startDate: '2024/04/02',
    endDate: '2024/04/06',
  })

  return (
    <main>
      <h1>Date Range Picker</h1>

      <h2>Default</h2>
      <input type="text" value={`${value.startDate} ~ ${value.endDate}`} readOnly />
      <DateRangePicker onChange={(newValue) => setValue(newValue)} />

      <h2>With default value</h2>
      <input type="text" value={`${value2.startDate} ~ ${value2.endDate}`} readOnly />
      <DateRangePicker
        defaultValue={{
          startDate: '2024/04/02',
          endDate: '2024/04/06',
        }}
        onChange={(newValue) => setValue2(newValue)}
      />
    </main>
  )
}

export default App
