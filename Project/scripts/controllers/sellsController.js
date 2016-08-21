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
}