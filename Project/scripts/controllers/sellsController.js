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
        let counterEmptyFields=0;
        if(data.price==0){
            counterEmptyFields++;
        }
        if(data.car==''){
            counterEmptyFields++;
        }
        if(data.year==''){
            counterEmptyFields++;
        }
        let requestSellUrl;
        if(counterEmptyFields==0){
            /*requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"price\":{\"$lte\":"+data.price+"}}";*/
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"car\":\""+data.car+"\",\"year\":\""+data.year+"\",\"price\":{\"$lte\":"+data.price+"}}";
        }
        else if(counterEmptyFields==1){
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"$or\":[{\"car\":\""+data.car+"\",\"price\":{\"$lte\":"+data.price+"}},{\"year\":\""+data.year+"\",\"price\":{\"$lte\":"+data.price+"}},{\"car\":\""+data.car+"\",\"year\":\""+data.year+"\"}]}";
        }
        else if(counterEmptyFields==2){
            requestSellUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars/?query={\"$or\":[{\"car\":\""+data.car+"\"},{\"year\":\""+data.year+"\"},{\"price\":{\"$lte\":"+data.price+"}}]}";
        }
        else {
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