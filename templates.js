var templates ={

  post: [
    '<div class="postWrapper">',
      '<div class="imageWrapper">',
      '<img src= "<%= image %>">',
      '</div>',
      '<h1><%= title %></h1>',
      '<h6><%= date %></h6>',
    '</div>'

  ].join('')
}
