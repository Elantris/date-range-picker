import { DateTime } from 'luxon'
import { FC, useState } from 'react'

const now = DateTime.now()
const todayDate = now.toFormat('yyyy/MM/dd')

export type DateRangeValueProps = {
  startDate: string
  endDate: string
}

const DateRangePicker: FC<{
  defaultValue?: DateRangeValueProps
  onChange?: (newValue: DateRangeValueProps) => void
}> = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState<DateRangeValueProps>(
    defaultValue &&
      DateTime.fromFormat(defaultValue.startDate, 'yyyy/MM/dd').isValid &&
      DateTime.fromFormat(defaultValue.endDate, 'yyyy/MM/dd').isValid
      ? defaultValue
      : {
          startDate: '',
          endDate: '',
        }
  )
  const [uiDate, setUiDate] = useState<DateTime>(DateTime.fromFormat(value?.startDate || todayDate, 'yyyy/MM/dd'))

  const changeMonth = (diff: number) => {
    setUiDate(uiDate.plus({ month: diff }))
  }
  const handleDayClick = (date: string) => {
    if (
      (!value.startDate && !value.endDate) ||
      (value.startDate && value.endDate) ||
      date.localeCompare(value.startDate) === -1
    ) {
      setValue({
        startDate: date,
        endDate: '',
      })
    } else {
      const newValue = {
        startDate: value.startDate,
        endDate: date,
      }
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  const firstMonthDay = now.set({ month: uiDate.month, day: 1 })
  const firstDay = firstMonthDay.minus({ day: firstMonthDay.weekday - 1 })
  const days = Array.from({ length: 35 }, (_, i) => firstDay.plus({ day: i }))

  return (
    <div className="layout">
      <div className="header">
        <button className="month-button" onClick={() => changeMonth(-1)}>
          &lt;
        </button>
        <span>
          {uiDate.year}年{uiDate.month}月
        </span>
        <button className="month-button" onClick={() => changeMonth(1)}>
          &gt;
        </button>
      </div>
      <div className="day-container">
        {days.map((day) => {
          const date = day.toFormat('yyyy/MM/dd')
          const classNames =
            date.localeCompare(value.startDate) === 0 ||
            (date.localeCompare(value.startDate) === 1 && date.localeCompare(value.endDate) <= 0)
              ? 'active'
              : day.month !== uiDate.month
              ? 'secondary'
              : date === todayDate
              ? 'today'
              : ''

          return (
            <div key={date} className={`day-button ${classNames}`} onClick={() => handleDayClick(date)}>
              {day.day}日
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DateRangePicker
