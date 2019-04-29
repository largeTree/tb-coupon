import $ from "jquery";
import config from '../../static/config';

const _timeout = 3000;

export default {
    post(url, params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: config._baseUrl + url,
                data: params,
                type: 'post',
                timeout: _timeout,
                success: function(data) {
                    resolve(data);
                },
                error: function(xhr, error, e) {
                    reject(xhr, error, e);
                }
            });
        });
    },
    get(url) {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: config._baseUrl + url,
                type: 'get',
                timeout: _timeout,
                success: function(data) {
                    resolve(data);
                },
                error: function(xhr, error, e) {
                    reject(xhr, error, e);
                }
            });
        });
    }
}