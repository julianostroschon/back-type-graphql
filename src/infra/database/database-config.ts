const getConfig = (configName: string, fallback: string | undefined = undefined): any => {
  return process.env[configName] || fallback
}

const DATABASE = Object.freeze({
  prefix: getConfig('DB_PREFIX', ''),
  ssl: getConfig('DB_SSL'),
  port: getConfig('DB_PORT', '4432'),
  host: getConfig('DB_HOST', '127.0.0.1'),
  user: getConfig('DB_USER', 'root'),
  password: getConfig('DB_PASSWORD', 'root'),
  name: getConfig('DB_NAME', 'posrgres')
})

export { DATABASE }
