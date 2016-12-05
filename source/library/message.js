export default payload => {
  const messageStart = payload.data.indexOf(`]`)
  return (
    messageStart !== -1
    ? { ...payload, message: payload.data.slice(messageStart + 1).trim() }
    : { ...payload }
  )
}
