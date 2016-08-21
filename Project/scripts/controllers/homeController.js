class HomeController{
    constructor(homeView, requester, baseServiceUrl, appKey){
        this._homeView= homeView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseServiceUrl;
    }

    showGuestPage(){
        this._homeView.showGuestPage();
        let _that = this;

        let recentArticles = [];
        let recentPosts=[];
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars";

        this._requester.get(requestUrl,
        function success(data) {
            data.sort(function (elem1, elem2) {
                let date1 = new Date (elem1._kmd.ect);
                let date2 = new Date (elem2._kmd.ect);
                return date2 - date1;
            });
            let currentIdPost=1;
            for (let i = 0; i < data.length && i < 6; i++){
                data[i].postId = currentIdPost;
                currentIdPost++;
                recentPosts.push(data[i]);
            }

            let currentId = 1;
            for (let i = 0; i < data.length && i < 4; i++){
                data[i].postId = currentId;
                currentId++;
                recentArticles.push(data[i]);
            }

            _that._homeView.showGuestPage(recentArticles, recentPosts);
        },
        function error (data) {
            showPopup('error', 'Error loading posts!');
        });
    };

    showUserPage(){
        this._homeView.showUserPage();
        let _that = this;
        let recentArticles = [];
        let recentPosts=[];
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appKey + "/cars";

        this._requester.get(requestUrl,
            function success(data) {
                data.sort(function (elem1, elem2) {
                    let date1 = new Date (elem1._kmd.ect);
                    let date2 = new Date (elem2._kmd.ect);
                    return date2 - date1;
                });
                let currentIdPost=1;
                for (let i = 0; i < data.length && i < 6; i++){
                    data[i].postId = currentIdPost;
                    currentIdPost++;
                    recentPosts.push(data[i]);
                }

                let currentId = 1;
                for (let i = 0; i < data.length && i < 4; i++){
                    data[i].postId = currentId;
                    currentId++;
                    recentArticles.push(data[i]);
                }
                _that._homeView.showUserPage(recentArticles, recentPosts);
            },
            function error (data) {
                showPopup('error', 'Error loading posts!');
            });
    };
}