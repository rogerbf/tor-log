export default payload => {
  const messageStart = payload.data.indexOf(`]`)
  if (messageStart !== -1) {
    return { ...payload, message: payload.data.slice(messageStart + 1).trim() }
  } else {
    return { ...payload }
  }
}
