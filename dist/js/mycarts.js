"use strict";

$(window).ready(function () {
  //提示条的警告
  $('.warn i').click(function () {
    $(this).parent().remove();
  });
  var prolist = [];
  var uid = localStorage.getItem('id');
  console.log(uid);
  var html = '';
  $.get('http://localhost:3000/carts', {
    uid: uid
  }, function (data) {}).then(function (res) {
    console.log(res); //[{},{}]

    if (res.length == 0) {
      $('.carts-null').show();
      $('.csrts-content').hide();
    }

    prolist = res;
    res.forEach(function (v) {
      html += "\n                    <li>\n                    <input type=\"checkbox\" class=\"single-box\" data-id=\"".concat(v.pid, "\">\n                       <h2>").concat(v.pname, "</h2>\n                       <p> ").concat(v.pprice, " </p>\n                       <img src=\"").concat(v.pimg, "\"><br>\n                       <div> \u6570\u91CF\uFF1A\n                       <button class=\"add-count-btn\"  carts-id=\"").concat(v.id, "\"  data-pid=\"").concat(v.pid, "\">+</button> \n                       <input type=\"text\" class=\"geshu\" value=\"").concat(v.pnum, "\" disabled=\"disabled\">\n                       <button  class=\"sub-count-btn\" carts-id=\"").concat(v.id, "\"  data-pid=\"").concat(v.pid, "\">-</button></div>     \n                       <button class=\"delBtn\" data-pid=\"").concat(v.pid, "\" carts-id=\"").concat(v.id, "\">\u5220\u9664</button>\n                   </li>\n                    ");
    });
    $('#carts-list').html(html); //数量小于1 ，减不能用

    $('.geshu').each(function (i, a) {
      if ($(this).val() <= 1) {
        $(this).next().attr('disabled', "disabled");
      }
    });
    countItem();
    add();
    sub();
    del();
    selSingle();
    selAll();
  }); //
  //登录后显示列表

  if (!uid) {
    $('.carts-null').show();
    $('.csrts-content').hide();
  } else {
    $('.carts-null').hide();
  } //数量框禁用


  $('.geshu').attr("disabled", "disabled"); //加减事件

  function add() {
    $('.add-count-btn').click(function () {
      var pid = $(this).attr("data-pid");
      var obj = prolist.find(function (v) {
        return v.pid == pid;
      });
      var pnumnow = parseInt(obj.pnum) + 1;
      $(this).next().val(pnumnow);
      var id = $(this).attr("carts-id"); //发起修改请求

      $.ajax({
        type: "PATCH",
        url: "http://localhost:3000/carts/".concat(id),
        data: {
          pnum: pnumnow
        },
        success: function success(data) {
          console.log(data);
        },
        error: function error(err) {
          console.error(err);
        }
      });
      obj.pnum = pnumnow;

      if (obj.pnum >= 1) {
        $(this).next().next().removeProp("disabled");
      }

      count();
    });
  }

  function sub() {
    $('.sub-count-btn').click(function () {
      var pid = $(this).attr("data-pid");
      var obj = prolist.find(function (v) {
        return v.pid == pid;
      });
      var pnumnow = parseInt(obj.pnum) - 1;
      $(this).prev().val(pnumnow);
      var id = $(this).attr("carts-id"); //发起修改请求

      $.ajax({
        type: "PATCH",
        //patch 局部修改
        url: "http://localhost:3000/carts/".concat(id),
        data: {
          pnum: pnumnow
        },
        success: function success(data) {
          console.log(data);
        },
        error: function error(err) {
          console.error(err);
        }
      });
      obj.pnum = pnumnow;

      if (obj.pnum <= 1) {
        $(this).prop("disabled", "true");
      }

      count();
    });
  } //删除按钮


  function del() {
    $('.delBtn').click(function () {
      console.log("点击了删除按钮");
      var id = $(this).attr("carts-id");
      $.ajax({
        url: "http://localhost:3000/carts/".concat(id),
        type: "DELETE",
        data: {},
        success: function success(res) {
          console.log(res);
        },
        error: function error(_error) {
          console.log(_error);
        }
      });
      $(this).parent().remove();
      prolist = prolist.filter(function (v) {
        return v.id != id;
      });
      count();
      countItem();
    });
  } //单选全选按钮


  function selAll() {
    $('#all-check').change(function () {
      //将所有的框都变为全选框的状态
      $.each($('.single-box'), function (v, n) {
        $(n).prop("checked", $('#all-check').prop("checked"));
      }); //商品列表数组的checked状态也为全选框的状态

      prolist.forEach(function (v) {
        v.checked = $('#all-check').prop("checked");
      });
      count();
    });
  }

  function selSingle() {
    $('.single-box').change(function () {
      //当单选变化的时候，从数组中找出 并改变状态 判断所有的状态赋值给全选
      var id = $(this).attr("data-id"); // console.log(id);

      var obj = prolist.find(function (v) {
        return v.pid == id;
      }); // console.log(obj);

      obj.checked = $(this).prop("checked"); // console.log(obj.checked);

      var flag = prolist.every(function (v) {
        return v.checked == true;
      }); // console.log(flag);

      $('#all-check').prop("checked", flag);
      count();
    });
  } //计数


  function count() {
    var totalnum = 0;
    var totalprice = 0;
    prolist.forEach(function (v) {
      if (v.checked) {
        totalnum += parseInt(v.pnum);
        totalprice += v.pprice * v.pnum;
      }
    });
    console.log(totalnum);
    $('#total-num').html(totalnum);
    $('#total-price').html(totalprice);
  }

  function countItem() {
    console.log(prolist.length);
    $('#carts-total-num').html(prolist.length);
  }
}); //sticky-header的购物车数量