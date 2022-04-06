export function isLoading(...statuses) {
  return statuses.some(status => status === 'loading')
}

export function hasSucceeded(...statuses) {
  return statuses.every(status => status === 'succeeded')
}

export function hasFailed(...statuses) {
  return statuses.some(status => status === 'failed')
}

export function shallRetry(...statuses) {
  return statuses.every(status => status === 'idle' || status === 'failed')
}

export function resolveStatus(onSuccess, onFailure, onNeither, ...statuses) {
  if (hasSucceeded(...statuses)) return onSuccess()
  else if (hasFailed(...statuses)) return onFailure()
  else return onNeither()
}
