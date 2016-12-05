const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

const getTimestamp = (...args) => {
  try {
    return new Date(...args).toISOString()
  } catch (err) {
    return undefined
  }
}

export default payload => {
  const [ month, date, time ] = (
    payload.data.slice(0, payload.data.indexOf(`[`)).trim().split(` `)
  ) // [`Nov`, `23`, `11:27:43.438`]

  const [ hours, minutes, seconds, milliseconds ] = (
    time.split(/\D/g)
  ) // [`11`, `27`, `43`, `438`]

  const timestamp = getTimestamp(
    new Date().getFullYear(),
    monthMap[month],
    date,
    hours,
    minutes,
    seconds,
    milliseconds
  )

  return (
    timestamp
    ? { ...payload, timestamp }
    : { ...payload }
  )
}
