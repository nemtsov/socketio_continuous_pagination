(function() {
  var socket = io.connect('http://localhost')
    , list = dojo.byId("list");

  dojo.connect("onscroll", function(ev) {
    socket.emit('scroll', {data: "scrolling"});
  })

  socket.on("scroll-data", function(data) {
    dojo.place("<li>" + data.html + "</li>", list);
  });
}());
