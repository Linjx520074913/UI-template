import config from '../package.json'

export function Message () {
  return {
    'source': config.name,
    'target': config.target,
    'args': {}
  }
}
