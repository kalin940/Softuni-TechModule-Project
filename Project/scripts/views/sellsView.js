class SellsView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }
    showGuestSellsPage(isLoggedIn, mainData){
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
            $('header>h3').text("Sells");
            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: mainData
                };

                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
                $.get('templates/quick-search.html',function (template) {
                    let search = Mustache.render(template, null);
                    $('#search').html(search);
                    $('#quick-search-button').on('click', function (ev) {
                        let car = $('#car').val();
                        let year= $('#year').val();
                        let data={
                            car:car,
                            year:year
                        }
                        triggerEvent('sellSearch', data);
                    });
                });
            })
        });
    }
    showSearchResultPage(data,isLoggedIn){
        let _that = this;
        let templateUrl;
        if(isLoggedIn){
            templateUrl="templates/welcome-user.html";
        }
        else{
            templateUrl="templates/welcome-guest.html";
        }
        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $('header>h3').text("Sells");
            $.get('templates/posts.html', function (template) {
                let blogPosts = {
                    blogPosts: data
                };
            if(blogPosts.blogPosts=='') {
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html("<div>No search results</div>");
            }
            else{
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            }
            $.get('templates/quick-search.html',function (template) {
                let search = Mustache.render(template, null);
                $('#search').html(search);
                $('#quick-search-button').on('click', function (ev) {
                    let car = $('#car').val();
                    let year= $('#year').val();
                    let data={
                        car:car,
                        year:year
                    }
                    triggerEvent('sellSearch', data);
                });
            });
        })
        });
    }
}