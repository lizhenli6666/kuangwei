"use strict";

//login
$('#login-btn').click(function () {
  var username = $("#account").val();
  var password = $("#psd").val();
  $.get('http://jx.xuzhixiang.top/ap/api/login.php', {
    username: username,
    password: password
  }, function (data) {
    console.log(data);

    if (data.code == 1) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('id', data.data.id);
      localStorage.setItem('username', data.data.username);
      location.reload();
    }
  });
});

if (localStorage.getItem('username')) {
  //   $('.header-ul .log-reg').css("display", "none") display以后该元素还存在
  $('.header-ul .log-reg').remove();
  $('<li class="username"><a href="index.html" id="username"></a><a id="exit">退出</a></li>').insertBefore($('.header-ul li').eq(0));
  $(' #username').html(localStorage.getItem('username'));
} //点击退出


$('#exit').click(function () {
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  location.reload();
}); //register

$('#reg-btn').click(function () {
  console.log('点击了注册按钮');
  var username = $("#username").val();
  var password = $("#reg-psd").val();
  $.get('http://jx.xuzhixiang.top/ap/api/reg.php', {
    username: username,
    password: password
  }, function (data) {
    console.log(data);

    if (data.code == 1) {
      //   location.href = 'index.html'
      $(".expanded-reg").hide();
      $(".expanded-log").show();
      console.log($(".expanded-log"));
    } else {
      $('.expanded-reg p').html(data.msg);
    }
  });
});