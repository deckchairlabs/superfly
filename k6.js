import { check, sleep } from 'k6'
import http from 'k6/http'

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
}

export default function () {
  const response = http.get(
    `https://${__ENV.SERVICE_HOSTNAME || 'localhost:3000'}/`
  )
  check(response, {
    'status is 200': (r) => r.status === 200,
  })
  sleep(1)
}
