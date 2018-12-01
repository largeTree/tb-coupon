import $ from "jquery";

const _baseUrl = 'http://127.0.0.1:8081/';
const _timeout = 3000;

export default {
    post(url, params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: _baseUrl + url,
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
    }
}