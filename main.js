$(document).ready(function() {
    page.init();
});
var page = {
    dataStore: [],
    favoriteStore: [],
    url: "http://api.nytimes.com/svc/topstories/v1/", //section
    section: "home",
    key: ".json?api-key=0c061decbcee9fc4a2a618b408849de6:18:74588993",
    init: function() {
        page.initStyling();
        page.initEvents();
    },
    initStyling: function() {
        page.getData();
    },
    initEvents: function() {
        // Click on Links
        $('ul li').not('.fav').on('click', function(event) {
            event.preventDefault();
            var section = $(this).text();
            var link = page.clickedSection(section);
            // console.log(link);
            page.linkedPage(link);
        });
        // click on Search Bar
        $('form').on('submit', function(event) {
            event.preventDefault();
            var userSubmit = $('input[name="search"]').val();
            // console.log("USER SUBMIT",userSubmit);
            page.searchResults(userSubmit);
        });
        // change css when search bar clicked
        $('input[type="text"]').on('click', function() {
            $(this).css({
                "background-color": '#AA0000',
                'color': '#fff'
            });
        });
        $('.mainContainer').on('click', '.fa-heart-o', function(event) {
                event.preventDefault();
                console.log('I WAS CLICKED');
                console.log('ive been clicked');
                var indexOfOurTodo = $(this).parent().siblings(
                    '.headline').text()
                console.log("TEST1 indexOfOurTodo", indexOfOurTodo)
                var changeComplete = page.favoriteStore[0].filter(
                    function(el) {
                        return el.title === indexOfOurTodo;
                    }).pop();
                changeComplete.complete = !changeComplete.complete;
                if (!changeComplete.complete) {} else {
                    $(this).css('color', 'red');
                }
            })
            //CLICK COMPLETED BUTTON AND ONLY SHOWS COMPLETED
        $('header').on('click', '.fav', function(event) {
            event.preventDefault();
            var completed = _.where(page.favoriteStore[0], {
                complete: true
            });

            function addAllLikes(arr) {
                $('.mainContainer').html('');
                _.each(completed, function(el) {
                    var tmpl = _.template(templates
                        .post);
                    $('.mainContainer').append(tmpl(
                        el));
                })
            }
            addAllLikes(completed);
        });
    },
    clickedSection: function(section) {
        return page.url + section + page.key;
        // console.log(page.url + section + page.key);
    },
    searchResults: function(userSubmit) {
        //had to create a literal variable to search case insensitive
        var regex = new RegExp(userSubmit, 'i');
        console.log(regex);
        var matchedObj = _.map(page.dataStore, function(object) {
            var filteredObjs = _.filter(object, function(el) {
                return el.title.match(regex) || el.blurb
                    .match(regex)
            });
            return filteredObjs;
        });
        $('div.mainContainer').html('');
        _.each(matchedObj[0], function(el) {
            var tmpl = _.template(templates.post);
            $('div.mainContainer').append(tmpl(el));
            $('.mainContainer').scrollTop($('.mainContainer')[0]
                .scrollHeight);
        })
    },
    buildUrl: function() {
        return page.url + page.section + page.key;
    },
    getData: function() {
        $.ajax({
            method: 'GET',
            url: page.buildUrl(),
            dataType: 'json',
            success: function(data) {
                window.glob = data;
                page.addDataToPage(data);
            },
            error: function(err) {
                console.log(err)
            }
        })
    },
    linkedPage: function(link) {
        $.ajax({
            method: 'GET',
            url: link,
            dataType: 'json',
            success: function(data) {
                window.glob = data;
                // page.getDataObj(data);
                page.addDataToPage(data);
                // console.log(newArr);
            },
            error: function(err) {
                console.log('error!', err)
                var tmpl = _.template(templates.err);
                $('div.mainContainer').append(tmpl());
            }
        })
    },
    getDataObj: function(data) {
        return _.map(data.results, function(el) {
            var imgUrl = "";
            if (el.multimedia[3]) {
                imgUrl = el.multimedia[3].url;
            }
            return {
                complete: false,
                title: el.title,
                blurb: el.abstract,
                url: el.url,
                subsection: el.subsection,
                date: moment(el.published_date).format('LL'),
                image: imgUrl
            }
        })
    },
    addDataToPage: function(dataObj) {
        var newArr = page.getDataObj(dataObj);
        page.favoriteStore = [];
        page.favoriteStore.push(newArr);
        var filteredArr = _.filter(newArr, function(el) {
            return el.image
        })
        page.dataStore.splice(0, 1, filteredArr);
        // console.log(page.dataStore);
        $('div.mainContainer').html('');
        _.each(filteredArr, function(el) {
            var tmpl = _.template(templates.post);
            $('div.mainContainer').append(tmpl(el));
            $('.mainContainer').scrollTop($('.mainContainer')[0]
                .scrollHeight);
        })
    },
}
