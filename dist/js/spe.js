"use strict";

$(window).ready(function () {
  var obj = new URLSearchParams(location.search);
  var pid = obj.get("pid");
  console.log(pid);
  var objres;
  var id;
  $.get("http://localhost:3000/prolist", {
    pid: pid
  }, function (res) {
    console.log(res); //这条商品信息

    $('.small img').prop("src", res[0].pimg);
    $(".big img").prop("src", res[0].pimg);
    id = res[0].id;
    objres = res;
  }).then(function (res) {
    console.log(objres);
    add(); // fdj()
  });
  var uid = localStorage.getItem("id");
  console.log(uid); //点击添加购物车按钮

  function add() {
    $('#add-buycart-btn').click(function () {
      if (!uid) {
        alert("请先登录");
        return;
      }

      var num = $('#pro-num option:selected').text();
      objres[0].pnum = num;
      objres[0].uid = uid;
      delete objres[0].id;
      objres = objres[0];
      console.log(objres);
      console.log(objres);
      console.log(num);
      $.get('http://localhost:3000/carts', {}, function (data) {
        console.log(data);
      }).then(function (res) {
        var newk = res.find(function (v) {
          return v.pid == pid;
        });

        if (newk) {
          $.ajax({
            url: "http://localhost:3000/carts/".concat(newk.id),
            type: "PATCH",
            data: objres,
            success: function success(res) {
              console.log(res);
            },
            error: function error(_error) {
              console.log(_error);
            }
          });
        } else {
          $.ajax({
            url: "http://localhost:3000/carts",
            type: "POST",
            data: objres,
            success: function success(res) {
              console.log(res);
            },
            error: function error(_error2) {
              console.log(_error2);
            }
          });
        }
      });
    });
  }

  function fdj() {
    $('.small').mouseenter(function (e) {
      $('.small .mask').css("display", "block");
      $('.big').css("display", "inline-block");
      var bIW = $('.big img').width();
      var bIH = $('.big img').height();
      var bw = $('.big').width();
      var bh = $('.big').height();
      var sw = $('.small').width();
      var sh = $('.small').height();
      $('.big img').width(sw * bw / $('.mask').width());
      $('.big img').height(sh * bh / $('.mask').height());
      $(this).mousemove(function (e) {
        var mt = e.offsetY - $('.mask').height() / 2;
        $('.small .mask').css("top", mt);
        var ml = e.offsetX - $('.mask').width() / 2;
        $('.small .mask').css("left", ml);
        $('.big img').css("left", bIW * $('.mask').css("left") / sw);
        console.log($('.big img').css("left"));
        $('.big img').css("top", bIH * $('.mask').css("top") / sh);
      });
    });
    $('.small').mouseleave(function () {
      $('.small .mask').css("display", "none");
      $('.big').css("display", "none");
    });
  }
});