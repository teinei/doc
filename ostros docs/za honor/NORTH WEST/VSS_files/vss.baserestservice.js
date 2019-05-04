(function (angular) {

    angular.module("vss")

    /**
     * Base for all rest services
     */
        .factory("vssRestServiceBase", ["$http", "$q", "$window", "vssErrorHandler", function ($http, $q, $window, vssErrorHandler) {
            return {
                /**
                 * Calls a remote rest service
                 * @param method Http method to use
                 * @param url URL to send request to
                 * @param sendingData Data to send to server (default : null)
                 * @param params Query parameters to add to url (default : null)
                 * @param cache Flag if the response should be cached (default : false) Use this option with care!
                 */
                '_callService': function (method, url, sendingData, params, cache, options) {
                    var restPath;
                    if (contextPath === "/" || contextPath === "") {
                        restPath = "/rest/";
                    } else {
                        restPath = contextPath + "/rest/";
                    }

                    // TODO implement CSRF
                    var token = null; // $("meta[name='_csrf']").attr("content");
                    var header = null; // $("meta[name='_csrf_header']").attr("content");
                    var headers = {};

                    if (header != null && header != "") {
                        headers[header] = token;
                    }

                    return $http({
                        'method': method,
                        'url': restPath + url,
                        'data': sendingData,
                        'params': params,
                        'headers': headers,
                        'cache': cache
                    }).then(function successCallback(response) {
                        // If we received blank data return null
                        var data = response.data;
                        if (data == '') {
                            return null;
                        }
                        return data;
                    }, function errorCallback(response) {

                        // If the response is s 401, we need to redirect to log on page.
                        if (response.status == 401) {
                            return window.location.reload();
                        }

                        // If the response is s 403, we need to show an authentication warning
                        if (response.status == 403) {
                            return vssErrorHandler({
                                status: response.status,
                                errorMessage: response.data,
                                statusText: response.statusText,
                                errorMessage: response.data.message,
                            });
                        }

                        // Handle OperationFailedExceptions
                        if (response.status == 500 && options && options.displayError) {
                            var msg = response.data.message;
                            if (msg == undefined) {
                                msg = response.data;
                            }

                            var errorHandler = vssErrorHandler({
                                status: response.status,
                                statusText: response.statusText,
                                errorMessage: msg
                            });
                            if (response.data.cause) {
                                errorHandler.additional = response.data.cause.message;
                            }
                            return errorHandler;
                        }
                        return $q.reject(response.data);
                    });
                },
                '_checkNullArray': function (expectedArray) {
                    if (expectedArray == null) {
                        expectedArray = [];
                    }
                    return expectedArray;
                }
            }

        }]);
})(angular);
