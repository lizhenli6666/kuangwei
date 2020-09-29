"use strict";

loadList();
var pagenum = 0; // let debounced = _.debounce(loadMore, 1000)

function loadList() {
  list();

  function list() {
    try {
      var html = '';
      var htmlprolist = '';
      var htmlnew = ''; // $.get(`http://jx.xuzhixiang.top/ap/api/allproductlist.php?pagesize=20&pagenum=${pagenum}`, {}, function(data) {

      $.get("http://localhost:3000/prolist", {}, function (dat) {
        console.log(dat);
        var data = dat.slice(0, 4);
        var datanew = data.slice(0, 2);
        dat.forEach(function (v) {
          htmlprolist += "\n                <li>\n                    <h2>".concat(v.pname, "</h2>\n                   <a  href=\"spe.html?pid=").concat(v.pid, "\"> <img src=\"").concat(v.pimg, "\"></a>       \n                </li>\n                 ");
        });
        data.forEach(function (v) {
          html += "\n                <li>\n                    <h2>".concat(v.pname, "</h2>\n                   <a  href=\"spe.html?pid=").concat(v.pid, "\"> <img src=\"").concat(v.pimg, "\"></a>       \n                </li>\n                 ");
        });
        datanew.forEach(function (v) {
          htmlnew += "\n                <li>\n                    <h2>".concat(v.pname, "</h2>\n                   <a  href=\"spe.html?pid=").concat(v.pid, "\"> <img src=\"").concat(v.pimg, "\"></a>       \n                </li>\n                 ");
          $('.showli').html(html); //jQuery拼接HTML标签元素

          $('.prolist-ul').html(htmlprolist);
          $('.new-prolist-ul').html(htmlnew);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

$(window).scroll(function () {
  var wst = $(window).scrollTop(); // console.log(wst);

  var ph = document.documentElement.clientHeight;
  var ch = window.innerHeight;

  if (ph - wst - ch <= 100) {// debounced()
  }
});

function loadMore() {
  pagenum++;
  loadList();
}