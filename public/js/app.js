(function() {
  var socket = io.connect('http://localhost')
    , list = dojo.byId("list")
    , listPos = dojo.position(list);

  var halfPage = dojo.position(dojo.body()).h/2;

  var isCall = false;
  dojo.connect("onscroll", function (ev) { isCall = true; });

  var prevScrollY = 0;
  setInterval(function () {
    if (isCall) {
      isCall = false;

      var windowScrollY = window.scrollY
        , isMoreNeeded = (listPos.h - halfPage) < windowScrollY;

      if ((prevScrollY < windowScrollY)
           && isMoreNeeded) {
        socket.emit('scroll');
      }
      prevScrollY = windowScrollY;
    }
  }, 10);

  socket.on("scroll-data", function (data) {
    injectItem(data);
  });

  var injectItem = function (data) {
    dojo.place("<li>" + data.html + "</li>", list);
  };
}());
