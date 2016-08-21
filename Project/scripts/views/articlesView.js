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
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articles: mainData
                };

                let renderedPosts = Mustache.render(template, articles);
                $('.articles').html(renderedPosts);
            })
        });
    }

    showAllArticlesUserPage(mainData){
        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $.get('templates/articles.html', function (template) {
                let articles = {
                    articles: mainData
                };

                let renderedPosts = Mustache.render(template, articles);
                $('.articles').html(renderedPosts);
            })
        });

    }
}