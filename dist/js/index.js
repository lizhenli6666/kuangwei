"use strict";

$(window).ready(function () {
  var uid = localStorage.getItem("id");

  if (!uid) {}

  $.get("http://localhost:3000/prolist", {}, function (data) {
    // data = data.slice(0, 5);
    console.log(data);
    var datanew = data.slice(0, 5);
    var html = ''; // console.log(datanew);

    datanew.forEach(function (v, i) {
      // console.log(v.);s
      // console.log(v.pimg);
      console.log($('.swiper-box .item li').eq(i).children());
      $('.swiper-box .item li').eq(i).children().eq(0).prop("src", v.pimg);
    });
  });
});