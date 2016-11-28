const levels = [
  { name: `debug`, regex: /\[debug]/g },
  { name: `info`, regex: /\[info]/g },
  { name: `notice`, regex: /\[notice]/g },
  { name: `warn`, regex: /\[warn]/g },
  { name: `err`, regex: /\[err]/g }
]

export default payload => {
  return levels.reduce((value, severity) => {
    if (severity.regex.test(payload.data)) {
      return { ...payload, severity: severity.name }
    } else {
      return value
    }
  })
}
