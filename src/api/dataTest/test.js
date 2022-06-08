import { Get, Post} from '../../http/request.js'

export function testPost(data) {
    return Post('/apc/train/test/', data).then(res => {
        console.log(res);
        return res;
    })

}