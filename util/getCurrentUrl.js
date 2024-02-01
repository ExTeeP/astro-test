export default () => {
  return process.env.NODE_ENV === 'production' ? import.meta.env.SITE : '.'
}
