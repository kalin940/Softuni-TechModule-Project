class ArticlesView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }
    showAllArticlesGuestPage(mainData){
        let _that = this;
        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $('header>h3').text("Articles");
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articles: mainData
                };
                let renderedPosts = Mustache.render(template, articles);
                $('.articles').html(renderedPosts);
                $('.content').shorten({
                    "showChars" : 120
                });
                $('.articles-img').hide();
                $('.recent-posts-title').hide();
                $('.title').on('click', function (ev) {
                    let articleTitle = $(this).text();
                    triggerEvent('showFullArticle', articleTitle);
                })
            })
        });
    }
    showAllArticlesUserPage(mainData){
        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $('header>h3').text("Articles");
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articles: mainData
                };
                let renderedPosts = Mustache.render(template, articles);
                $('.articles').html(renderedPosts);
                $('.content').shorten({
                    "showChars" : 120
                });
                $('.articles-img').hide();
                $('.recent-posts-title').hide();
                $('.title').on('click', function (ev) {
                    let articleTitle = $(this).text();
                    triggerEvent('showFullArticle', articleTitle);
                })
            })
        });
    }
    showFullArticle(data,isLoggedIn){
        let _that = this;
        let templateUrl;
        if(isLoggedIn){
            templateUrl="templates/welcome-user.html";
        }else{
            templateUrl="templates/welcome-guest.html";
        }
        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $('header>h3').text("Articles");
            $('.recent-posts-title').hide();
            $.get('templates/articles.html', function (template) {
                        let articles = {
                            articles: data
                };
                let renderedPosts = Mustache.render(template, articles);
                $('.articles').html(renderedPosts);
                $('.articles-img').show();

                $('#article-title').on('click', function (ev) {
                    let articleTitle = $('#article-title').text;
                    triggerEvent('showFullArticle', articleTitle);
                })
            })
        });
    }
}