class ArticlesController {
    constructor(articlesView, requester, baseUrl, appKey) {
        this._articlesView = articlesView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl;
    };

    showAllArticlesGuestPage(){
        this._articlesView.showAllArticlesGuestPage();
        let _that = this;
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles";
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date (elem1._kmd.ect);
                    let date2 = new Date (elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._articlesView.showAllArticlesGuestPage(data);
            },
            function error (data) {
                showPopup('error', 'Error loading posts!');
            });
    }
    showAllArticlesUserPage(){
        this._articlesView.showAllArticlesUserPage();
        let _that = this;
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/articles";
        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date (elem1._kmd.ect);
                    let date2 = new Date (elem2._kmd.ect);
                    return date2 - date1;
                });
                _that._articlesView.showAllArticlesUserPage(data);
            },
            function error (data) {
                showPopup('error', 'Error loading posts!');
            });
    }
}