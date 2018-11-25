import $ from "jquery";

export default {
    _baseUrl: 'http://127.0.0.1:8081/',
    _timeout: 3000,
    post: function(url, params) {
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