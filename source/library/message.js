export default payload => {
  return {
    ...payload,
    message: payload.data.slice(payload.data.indexOf(`]`) + 1).trim()
  }
}
