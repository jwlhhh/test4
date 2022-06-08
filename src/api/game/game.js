import { Get, Post} from '../../http/request.js'

export function getPic() {
    return Get('/api/qwer').then(res => {
        return res;
    })

}

export function test() {
    return Get('/api/test').then(res => {
        return res;
    })
}

export function testToken() {
    return Get('/api/testToken').then(res => {
        console.log(res)
        return res;
    })
}