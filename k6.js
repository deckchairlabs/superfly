import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  vus: 10,
  duration: '30s',
}

export default function () {
  http.get('https://deckchair-test.web.app')
  sleep(1)
}
