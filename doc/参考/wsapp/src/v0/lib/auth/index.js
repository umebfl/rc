import R from 'ramda'
import md5 from 'react-native-md5'
import {Buffer} from 'buffer'

export const get_id_pwd_token = (id, md5_pwd) => {
    return new Buffer(`${id}:${md5_pwd}`).toString('base64')
}
