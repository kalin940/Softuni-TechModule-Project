class PostView{
    constructor(wrapperSelector, mainContentSelector){
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreatePostPage(data, isLoggedIn){
        let _that = this;
        let templateUrl;

        if (isLoggedIn){
            templateUrl = "templates/form-user.html";
        }
        else{
            templateUrl = "templates/form-guest.html";
        }

        $.get(templateUrl, function (template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $('.recent-posts-title').hide();
            $.get('templates/create-post.html', function (template) {
                var renderedContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedContent);

                $('#author').val(data.fullName);

                $('#create-new-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let car=$('#car').val();
                    let description = $('#content').val();
                    let price=$('#price').val();
                    let year=$('#year').val();
                    let date = moment().format("MMMM Do YYYY");

                    let data = {
                        title: title,
                        author: author,
                        car:car,
                        description: description,
                        price:price*1,
                        year:year,
                        date: date
                    };

                    triggerEvent('createPost', data);
                });
            });
        });
    }
}