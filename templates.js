var templates ={

  post: [
    '<div class="postWrapper">',
      '<a class="imgWrapper" href="<%= url %>" target="_blank">',
      '<img src= "<%= image %>">',
      '</a>',
      '<a class="headline" href="<%= url %>" target="_blank">',
      '<%= title %>',
      '</a>',
      '<p>',
      '<%= blurb %>',
      '</p>',
      '<h6><%= date %></h6>',
      '<a href="#"<i class="fa fa-heart-o"></i></a>',
      '<h3><%= subsection %></h3>',
    '</div>'
      ].join('')
}
