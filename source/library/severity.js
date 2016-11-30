export default payload => {
  let severity

  if (payload.data.indexOf(`[debug]`) !== -1) {
    severity = `debug`
  } else if (payload.data.indexOf(`[info]`) !== -1) {
    severity = `info`
  } else if (payload.data.indexOf(`[notice]`) !== -1) {
    severity = `notice`
  } else if (payload.data.indexOf(`[warn]`) !== -1) {
    severity = `warn`
  } else if (payload.data.indexOf(`[err]`) !== -1) {
    severity = `err`
  } else {
    severity = ``
  }

  if (severity.length > 0) {
    return { ...payload, severity }
  } else {
    return { ...payload }
  }
}
