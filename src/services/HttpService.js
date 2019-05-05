import $ from "jquery";

const _timeout = 3000;
const _CODE_SUCCESS = 0;

export var HttpService = {
    name: 'HttpService',
    ajax(url, params, method, timeout) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: _globalConfig._baseUrl + url,
                data: params,
                type: method,
                timeout: timeout || _timeout,
                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, error, e) {
                    reject(xhr, error, e);
                }
            });
        });
    }
};

export var MyHttpService = {
    name: 'MyHttpService',
    doApi(apiKey, params) {
        params = params || {};
        params.apiKey = apiKey;
        return this.post('/api.do', params);
    },
    post(url, params) {
        return this.ajax(url, params, 'post');
    },
    get(url) {
        return this.ajax(url, {}, 'get');
    },
    ajax(url, params, method, timeout) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: _globalConfig._baseUrl + url,
                data: params,
                type: method,
                timeout: timeout || _timeout,
                success: function (data, status, xhr) {
                    // 网络成功，且业务成功时才调用成功方法
                    if (data && data.code === _CODE_SUCCESS) {
                        resolve(data);
                    } else {
                        reject(xhr, data);
                    }
                },
                error: function (xhr, error, e) {
                    reject(xhr, error, e);
                }
            });
        });
    }
}