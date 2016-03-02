$(document).ready(function(){
  page.init();

});

var page ={
url: "http://api.nytimes.com/svc/topstories/v1/", //section
section: "world",
key: ".json?api-key=0c061decbcee9fc4a2a618b408849de6:18:74588993",

init: function(){
  page.initStyling();
  page.initEvents();
},
initStyling: function(){
  page.getData();
},
initEvents: function(){

},



buildUrl: function(){
  return page.url + page.section + page.key;
},

getData: function () {
  $.ajax({
    method:'GET',
    url: page.buildUrl(),
    dataType: "json",
    success: function(data){
      window.glob = data;
      // page.getDataObj(data);
      page.addDataToPage(data);
      // console.log(newArr);

    },
    error: function(err){
      console.log(err)
    }




  })

},

getDataObj: function(data){
  return _.map(data.results, function(el){
    var imgUrl = "";
    if(el.multimedia[3]) {
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


addDataToPage: function(dataObj){
  var newArr = page.getDataObj(dataObj);
  var filteredArr = _.filter(newArr, function (el){
    return el.image
  })
  _.each(filteredArr, function (el) {
    var tmpl = _.template(templates.post);
    $('div.mainContainer').append(tmpl(el));
  })


}











}
