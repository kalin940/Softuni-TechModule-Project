class SellsController {
    constructor(sellsView, requester, baseUrl, appKey) {
        this._sellsView = sellsView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl;
    };
    showGuestSellsPage(isLoggedIn){
        this._sellsView.showGuestSellsPage(isLoggedIn);
        let _that = this;
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars";
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date (elem1._kmd.ect);
                    let date2 = new Date (elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._sellsView.showGuestSellsPage(isLoggedIn,data);
            },
            function error () {
                showPopup('error', 'Error loading posts!');
            });
    }
    sellSearch(data,isLoggedIn){
        let _that=this;
        let requestSellUrl;
        if(data.car!='' && data.year==''){
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"car\":\""+data.car+"\"}";
        }
        else if(data.car=='' && data.year!=''){
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"year\":\""+data.year+"\"}";
        }
        else if(data.car!='' && data.year!=''){
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"$and\":[{\"car\":\""+data.car+"\",\"year\":\""+data.year+"\"}]}";
        }
        else{
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={}";
        }
        this._requester.get(requestSellUrl,
            function success(data) {
                _that._sellsView.showSearchResultPage(data,isLoggedIn);
            },
            function error () {
                showPopup('error', 'Error loading posts!');
            });
    }
}