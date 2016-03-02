var templates ={

  post: [
    '<div class="postWrapper">',
      '<img src= "<%= image %>">',
      '<a href="<%= url %>">',
      '<%= title %>',
      '</a>',
      '<h6><%= date %></h6>',
      '<h3><%= subsection %></h3>',
    '</div>'
  ].join(''),
  err: [
    '<div class="postWrapper">',
      '<h2>No Stories Found!</h2>',
    '</div>'
  ]
}
