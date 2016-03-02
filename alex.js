$(document).ready(function() {
    page.init();
});

var page = {
    dataStore: [],
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
        $('ul li').on('click', function(event) {
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
            // console.log(userSubmit);
            page.searchResults(userSubmit);
        });
        $('input[type="text"]').on('click', function() {
          $(this).css({
            "background-color": '#AA0000',
            'color': '#fff'
          });
        })
    },

    clickedSection: function(section) {
      return page.url + section + page.key;
      // console.log(page.url + section + page.key);
    },
<<<<<<< HEAD
    searchResults: function(userSubmit) {
      console.log("THE KEYWORD", userSubmit);
      // console.log(page.dataStore);
      //after that search with _.where
      var filteredTitles = _.filter(page.dataStore[0].results, function(el) {
          var deepFilter = _.filter(el, function(el) {
              console.log("THE FILTERED ELS", el);
              return userSubmit;
          });
          console.log("DEEP FILTER", deepFilter);
          return deepFilter;
      });
      console.log("THE FILTERED TITLES", filteredTitles);
      //append results to page
      $('div.mainContainer').html('');
      _.each(filteredTitles, function(el) {
          var tmpl = _.template(templates.post);
          $('div.mainContainer').append(tmpl(el));
      });
=======

    searchResults: function(userSubmit) {},
    getSearchObj: function(data) {
        return _.map(data.results, function(el) {
            var imgUrl = "";
            if (el.multimedia[3]) {
                imgUrl = el.multimedia[3].url;
            }
            return {
                title: el.title,
                blurb: el.abstract,
                url: el.url,
                subsection: el.subsection,
                date: moment(el.published_date).format('LL'),
                image: imgUrl
            }
        })
>>>>>>> 82ca02cbd81089564ad38f79c95f5c8515a47e0c
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
                // window.glob = data;
                page.addDataToPage(data);
                page.dataStore.push(data);
            },
            error: function(err) {
                console.log(err)
            }
        })
    },
<<<<<<< HEAD
    linkedPage: function(link) {
=======

    newPage: function(link) {
>>>>>>> 82ca02cbd81089564ad38f79c95f5c8515a47e0c
        $.ajax({
            method: 'GET',
            url: link,
            dataType: 'json',
            success: function(data) {
                window.glob = data;
                // page.getDataObj(data);
                page.addDataToPage(data);
                page.dataStore.push(data);
                // console.log(newArr);
            },
            error: function(err) {
                console.log('error!',err)
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
        var filteredArr = _.filter(newArr, function(el) {
            return el.image
        })
        $('div.mainContainer').html('');
        _.each(filteredArr, function(el) {
            var tmpl = _.template(templates.post);
            $('div.mainContainer').append(tmpl(el));
            $('.mainContainer').scrollTop($('.mainContainer')[0].scrollHeight);

        })
    }

}
