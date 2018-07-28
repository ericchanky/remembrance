import axios from 'axios'
import csvtojson from 'csvtojson'

export const fetchPhrase = url => axios.get(url)
  .then(res => csvtojson({ delimiter: '\t', toArrayString: true }).fromString(res.data))
