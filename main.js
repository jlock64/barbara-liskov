$(document).ready(function() {
    page.init();
});
var page = {

  favUrl: "http://tiny-tiny.herokuapp.com/collections/fav",

    dataStore: [],

    favoriteStore: [],
    url: "http://api.nytimes.com/svc/topstories/v1/",
    section: "home",
    key: ".json?api-key=0c061decbcee9fc4a2a618b408849de6:18:74588993",
    init: function() {
        page.initStyling();
        page.initEvents();
    },
    initStyling: function() {
        //getting the home section loaded
        page.getData();
    },
    initEvents: function() {
        // Click on Links
        $('ul li').not('.fav').on('click', function(event) {
            event.preventDefault();
            var section = $(this).text();
            var link = page.clickedSection(section);
            //on click build page
            page.linkedPage(link);
        });
        // submit into Search Bar
        $('form').on('submit', function(event) {
            event.preventDefault();
            var userSubmit = $('input[name="search"]').val();
            //on submit build page
            page.searchResults(userSubmit);
            $('input[name="search"]').val('');
        });
        // change css when search bar clicked
        $('input[type="text"]').on('click', function() {
            $(this).css({
                "background-color": '#AA0000',
                'color': '#fff'
            });
        });
        // active link tab highlighted
        $('ul li').on('click', function() {
        $('ul li').removeClass('highlight');
        $(this).addClass('highlight');
        });
        //clicking on favorite hearts <3
        $('.mainContainer').on('click', '.fa-heart-o', function(event) {
                event.preventDefault();
                console.log('I WAS CLICKED');
                console.log('ive been clicked');
                var indexOfOurTodo = $(this).parent().siblings(
                    '.headline').text();
                console.log("TEST1 indexOfOurTodo", indexOfOurTodo);
                var changeComplete = page.favoriteStore[0].filter(
                    function(el) {
                        return el.title === indexOfOurTodo;
                    }).pop();
                changeComplete.complete = !changeComplete.complete;
                if (!changeComplete.complete) {} else {
                    $(this).css('color', 'red');
                }
            });
            //CLICK COMPLETED BUTTON AND ONLY SHOWS COMPLETED
        $('header').on('click', '.fav', function(event) {
            event.preventDefault();
            var completed = _.where(page.favoriteStore[0], {
                complete: true
            });

            function addAllLikes(arr) {
                $('.mainContainer').html('');
                _.each(completed, function(el) {
                    var tmpl = _.template(templates.post);
                    $('.mainContainer').append(tmpl(el));
                });
            }
            addAllLikes(completed);
        });

        $('header').on('click', '.heart', function(event) {
            event.preventDefault();
            var completed = _.where(page.favoriteStore[0], {
                complete: true
            });

            function addAllLikes(arr) {
                $('.mainContainer').html('');
                _.each(completed, function(el) {
                    var tmpl = _.template(templates.post);
                    $('.mainContainer').append(tmpl(el));
                });
            }
            addAllLikes(completed);
        });






$('header').on('click', '.arrow',function(event){
  event.preventDefault();
  console.log('ive been clicked');
  $(this).replaceWith('<i class="fa fa-chevron-down" rel="mainContainer"></i>');
  var selectedPage = '.' + $(this).attr('rel');
  console.log(selectedPage);
  $(selectedPage).siblings('div').addClass('inactive');
  $(selectedPage).removeClass('inactive');

  //
  // $(selectedPage).removeClass('inactive');

});

$('header').on('click', '.fa-chevron-down',function(event){
  event.preventDefault();
  console.log('ive been clicked');
  $(this).replaceWith('<i class="fa fa-chevron-left arrow" rel="section"></i>');
  var selectedPage = '.' + $(this).attr('rel');
  console.log(selectedPage);
  $(selectedPage).siblings('div').addClass('inactive');
  $(selectedPage).removeClass('inactive');

  //
  // $(selectedPage).removeClass('inactive');

});




  //       $('.mainContainer').on('click', '.fa-heart-o', function(event){
  //         event.preventDefault();
  //         console.log('I WAS CLICKED');
  //         console.log('ive been clicked');
  //         var indexOfOurTodo = $(this).parent().siblings('.headline').text()
  //         console.log("TEST1 indexOfOurTodo", indexOfOurTodo)
  //         var changeComplete = page.favoriteStore[0].filter(function(el) {
  //           return el.title === indexOfOurTodo;
  //         }).pop();
  //         changeComplete.complete = !changeComplete.complete;
  //         if(!changeComplete.complete) {
  //
  //     } else {
  //
  //       $(this).css('color', 'red');
  //
  //
  //     }
  //     page.addFav();
  //
  //
  //   });
  //
  // $('header').on('click', '.fav', function (event) {
  //   event.preventDefault();
  //   var completed = _.where(page.favoriteStore[0],{complete: true});
  //   function addAllLikes(arr) {
  //     $('.mainContainer').html('');
  //     _.each(completed, function (el) {
  //
  //       var tmpl = _.template(templates.post);
  //   $('.mainContainer').append(tmpl(el));
  //     })
  //   }
  //   addAllLikes(completed);
  // });



    },
    //to build new url to load by section
    clickedSection: function(section) {
        return page.url + section + page.key;
    },
    //work with submitted search keyword/s
    searchResults: function(userSubmit) {
        //had to create a literal variable to search case insensitive
        var regex = new RegExp(userSubmit, 'i');
        //mapping over entire object
        var matchedObj = _.map(page.dataStore, function(object) {
          // filtering for matches only
            var filteredObjs = _.filter(object, function(el) {
                return el.title.match(regex) || el.blurb
                    .match(regex);
            });
            //putting filtered objects into new mapped array/object
            return filteredObjs;
        });
        //had to clear container before appending new content
        $('div.mainContainer').html('');
        //loop through each object and append to page
        _.each(matchedObj[0], function(el) {
            var tmpl = _.template(templates.post);
            $('div.mainContainer').append(tmpl(el));
            $('.mainContainer').scrollTop($('.mainContainer')[0].scrollHeight);
        });
    },
    //building intitial url for page load
    buildUrl: function() {
        return page.url + page.section + page.key;
    },
    //getter ajax for initial styling
    getData: function() {
        $.ajax({
            method: 'GET',
            url: page.buildUrl(),
            dataType: 'json',
            success: function(data) {
                // window.glob = data;
                page.addDataToPage(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    //to build the page on nav click get the content
    linkedPage: function(link) {
        $.ajax({
            method: 'GET',
            url: link,
            dataType: 'json',
            success: function(data) {
                window.glob = data;
                page.addDataToPage(data);
            },
            error: function(err) {
                console.log('error!', err);
                var tmpl = _.template(templates.err);
                $('div.mainContainer').append(tmpl());
            }
        });
    },
    //creating the object with the right keys for template used in addDataToPage
    getDataObj: function(data) {
        return _.map(data.results, function(el) {
            var imgUrl = "";
            //needed to filter for just articles with pictures
            if (el.multimedia[4]) {
                imgUrl = el.multimedia[4].url;
            }
            return {
                complete: false,
                title: el.title,
                blurb: el.abstract,
                url: el.url,
                subsection: el.subsection,
                date: moment(el.published_date).format('LL'),
                image: imgUrl
            };
        });
    },
    //to apply template and append to page
    addDataToPage: function(dataObj) {
        var newArr = page.getDataObj(dataObj);
        page.favoriteStore = [];
        page.favoriteStore.push(newArr);
        var filteredArr = _.filter(newArr, function(el) {
            return el.image;
        });
        page.dataStore.splice(0, 1, filteredArr);
        $('div.mainContainer').html('');
        _.each(filteredArr, function(el) {
            var tmpl = _.template(templates.post);
            $('div.mainContainer').append(tmpl(el));
            $('.mainContainer').scrollTop($('.mainContainer')[0]
                .scrollHeight);
        });
    },

 //
 //    addFav: function(newPost){
 //   $.ajax({
 //     url: page.favUrl,
 //     method: 'POST',
 //     data: newPost,
 //     success: function(response){
 //       page.();
 //     },
 //     error: function(err){
 //       console.log("error", err);
 //     }
 //   })
 // },




};
