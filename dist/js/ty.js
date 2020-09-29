"use strict";

$('document').ready(function () {
  console.log("页面加载成功");
  $(document).scroll(function () {
    var st = $(document.documentElement).scrollTop(); // console.log($(document.documentElement).scrollTop());

    if (st >= 130) {
      $('.sticky-nav').css({
        height: 40
      });
      $('.sticky-nav a').css({
        fontSize: 12
      });
      $('.sticky-header').css({
        height: 50
      });
      $('.sticky-header').css({
        lineHeight: '50px'
      });
      $('.nav-showli').css("top", 26); // console.log($('sticky-nav').height());
    } else {
      $('.sticky-nav').css({
        height: 50
      });
      $('.sticky-nav a').css({
        fontSize: 18
      });
      $('.sticky-header').css({
        height: 80
      });
      $('.sticky-header').css({
        lineHeight: '80px'
      });
      $('.nav-showli').css("top", 50);
    }
  }); //导航栏划过

  $('.nav-showli').hide();
  $('.nav-ul li').hover(function (index, v) {
    // console.log($(this).index())
    $('.nav-showli').eq($(this).index()).show();
  }, function (index, v) {
    $('.nav-showli').hide();
  }); //点击出现登陆注册
  // $('.expanded-log').hide();
  // $('.expanded-reg').hide();

  $('#a-login').click(function () {
    $('.expanded-reg').hide();

    if ($('.expanded-log').is(':hidden')) {
      //如果当前隐藏
      $('.expanded-log').show(); //那么就显示div   

      $('#mask-body').show();
    } else {
      $('.expanded-log').hide(); //就隐藏div

      $('#mask-body').hide();
    }
  });
  $('#a-reg').click(function () {
    $('.expanded-log').hide();

    if ($('.expanded-reg').is(':hidden')) {
      $('.expanded-reg').show();
      $('#mask-body').show();
    } else {
      $('.expanded-reg').hide();
      $('#mask-body').hide();
    }
  }); //点击空白处注册登录消失

  $('#mask-body').click(function () {
    $('.expanded-log').hide();
    $('.expanded-reg').hide();
    $('#mask-body').hide();
  }); // let w = $(document).width();

  var w = document.documentElement.clientWidth;
  console.log(w);
  $('.nav-showli').css("width", w); //购物车数量

  var uid = localStorage.getItem('id');
  console.log(uid);

  if (uid) {
    console.log(664);
    $.get('http://localhost:3000/carts', {
      uid: uid
    }, function (data) {}).then(function (res) {
      console.log(res);
      $('#carts-total-num').html(res.length);
    });
  }
});