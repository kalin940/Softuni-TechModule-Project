(function () {
    // Create your own kinvey application
    let baseUrl = "https://baas.kinvey.com";
    // Place your appKey from Kinvey here...
    let appKey = "kid_ByDkShnw";
    // Place your appSecret from Kinvey here...
    let appSecret = "d8053d452d834a78a077c92fc6d788ac";
    
    // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...
    var _guestCredentials = "71bcb302-6dfc-43d2-b22f-d0c213800568.HizREv3pGscFazfPZqyxlMZyS5jvf8UL2VHaXSbhO3w=";

    //Create AuthorizationService and Requester
    let authService = new AuthorizationService(
        baseUrl,
        appKey,
        appSecret,
        _guestCredentials
    );
    
    authService.initAuthorizationType("Kinvey");
    let requester = new Requester(authService);

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";
    
    // Create HomeView, HomeController, UserView, UserController, PostView and PostController
    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appKey);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appKey);
    
    let postView = new PostView(selector, mainContentSelector);
    let postController = new PostController(postView, requester, baseUrl, appKey);

    let articlesView = new ArticlesView(selector, mainContentSelector);
    let articlesController = new ArticlesController(articlesView, requester, baseUrl, appKey);

    let sellsView = new SellsView(selector, mainContentSelector);
    let sellsController = new SellsController(sellsView, requester, baseUrl, appKey);
    initEventServices();

    onRoute("#/",
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        function () {
        if (authService.isLoggedIn()){
            homeController.showUserPage();
        }
        else{
            homeController.showGuestPage();
        }
    });

    onRoute("#/articles",
        function () {
            if (authService.isLoggedIn()){
                articlesController.showAllArticlesUserPage();
            }
            else{
                articlesController.showAllArticlesGuestPage();
            }
        });

   onRoute("#/post-:id", function () {
       let top = $("#post-" + this.params['id'])
           .position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/sells", function () {
            sellsController.showGuestSellsPage(authService.isLoggedIn());
        });
    
    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let data ={
            fullName: sessionStorage['fullName']
        };
        postController.showCreatePostPage(data, authService.isLoggedIn());
    });

    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data); 
    });
    
    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createNewPost(data);
    });
    bindEventHandler('sellSearch', function (ev, data) {
            sellsController.sellSearch(data,authService.isLoggedIn());
    });
    bindEventHandler('showFullArticle', function (ev, data) {
        articlesController.showFullArticle(data,authService.isLoggedIn());
    });
    run('#/');
})();
