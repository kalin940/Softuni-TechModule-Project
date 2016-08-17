class PostController{
    constructor(postView, requester, baseUrl, appKey){
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + '/appdata/' + appKey + '/cars/'
    };

    showCreatePostPage(data, isLoggedIn){
        this._postView.showCreatePostPage(data, isLoggedIn);
    }
    
    createNewPost(requestData){
        if (requestData.title.length < 5){
            showPopup('error', "Post title must consist of at least 5 symbols");
            return;
        }
        
        if (requestData.content.length < 10){
            showPopup('error', "Post content must consist of at least 10 symbols.");
            return;
        }
        
        let requestUrl = this._baseServiceUrl;
        
        this._requester.post(requestUrl, requestData, function success(response) {
            showPopup('success', "You have successfully created a new post.");
            redirectUrl("#/");
        },
        function error(response) {
            showPopup('error', "An error has occurred while attempting to create a new post.");
        });
    }
}