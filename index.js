function makeWikiUrl(article) {
    return "https://wikipedia.org/wiki/" + encodeURIComponent(article);
}

function createArticles(pages) {
    for (var i = 0; i < pages.length; i++) {
        $('.pages ul').append(
            '<a class="item" target="_blank" href=' + makeWikiUrl(pages[i].title) + '>\
                <li>\
                    <h1>' + pages[i].title + '</h1>'
            + pages[i].snippet +
            '</li>\
        </a>');
    }
}

function getUrl(inputContent) {
    return 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&srsearch=' + inputContent + '&srwhat=text';
}

function clear() {
    $('.item').remove();
}

function clearInput() {
    $('.item-input').remove();
}

function error() {
    return $('.pages ul').append('<div class="item error">\
                                          <p>\
                                            Please enter your query\
                                          </p>\
                                  </div>')
}

function getPagesByTitles(query) {
    clear();
    if (!query) {
        error();

    } else if (query === " " || query === "~") {
        error();
        return;
    }

    var pages = [];
    $.ajax({
        url: getUrl(query),
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
            for (var i = 0; i < data.query.search.length; i++) {
                pages.push({
                    title: data.query.search[i].title,
                    snippet: data.query.search[i].snippet
                });
            }
            createArticles(pages);
        }
    })
}

function moveInputToTop() {
    $('.center-of-desktop').addClass("wrapper");
}

window.onload = function () {
    var input = $('.input');
    input.keypress(function (e) {
        if (e.which === 13) {
            moveInputToTop();
            getPagesByTitles(input.val());
            return false;
        }
    });
};