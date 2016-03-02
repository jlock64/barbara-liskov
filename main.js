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
            // console.log("USER SUBMIT",userSubmit);
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
    searchResults: function(userSubmit) {
      // console.log("THE KEYWORD", userSubmit);
      // console.log('VAR DATASTORAGE',page.dataStore);
      // console.log("USER SUBMIT",userSubmit);
      var matchedObj = _.map(page.dataStore, function(object) {
        // console.log("OBJECT FROM matchedObj MAP",object);
        var filteredObjs = _.filter(object, function(el){
          return el.title.match(userSubmit) || el.blurb.match(userSubmit)
        });
        return filteredObjs;
      });
      // console.log("MATCHED OBJ", matchedObj[0]);

      //append results to page
      // page.addDataToPage(matchedObj[0][0]);
      $('div.mainContainer').html('');
      _.each(matchedObj[0], function(el) {
          var tmpl = _.template(templates.post);
          $('div.mainContainer').append(tmpl(el));
          $('.mainContainer').scrollTop($('.mainContainer')[0].scrollHeight);

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
                // window.glob = data;
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
        page.dataStore.splice(0, 1, filteredArr);
        console.log(page.dataStore);
        $('div.mainContainer').html('');
        _.each(filteredArr, function(el) {
            var tmpl = _.template(templates.post);
            $('div.mainContainer').append(tmpl(el));
            $('.mainContainer').scrollTop($('.mainContainer')[0].scrollHeight);

        })
    }

}
