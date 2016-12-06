export default payload => {
  const severity = (
    [ `debug`, `info`, `notice`, `warn`, `err` ]
      .reduce((acc, level) => {
        return payload.data.indexOf(level) !== -1 ? level : acc
      }, undefined)
  )

  return (
    severity
    ? { ...payload, severity }
    : { ...payload }
  )
}
