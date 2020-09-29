"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fdj = function fdj(obj) {
  var _this = this;

  _classCallCheck(this, fdj);

  this.obj = obj;
  this.el = document.querySelector(this.obj.el);
  this.small = this.el.querySelector(".small");
  this.mask = this.el.querySelector(".small .mask");
  this.big = this.el.querySelector(".big");
  this.bigImg = this.el.querySelector(".big img");

  this.small.onmouseenter = function () {
    _this.mask.style.display = "block";
    _this.big.style.display = "inline-block";
    _this.bigImg.style.width = _this.small.offsetWidth * _this.big.offsetWidth / _this.mask.offsetWidth + 'px';
    _this.bigImg.style.height = _this.small.offsetHeight * _this.big.offsetHeight / _this.mask.offsetHeight + 'px';

    _this.small.onmousemove = function (ev) {
      var e = ev || window.event;
      _this.mask.style.top = e.offsetY - _this.mask.offsetHeight / 2 + 'px';
      _this.mask.style.left = e.offsetX - _this.mask.offsetWidth / 2 + 'px';
      _this.bigImg.style.left = -_this.bigImg.offsetWidth * _this.mask.offsetLeft / _this.small.offsetWidth + 'px';
      _this.bigImg.style.top = -_this.bigImg.offsetHeight * _this.mask.offsetTop / _this.small.offsetHeight + 'px';
      var sh = parseInt($('.small').height());
      var sw = parseInt($('.small').width());
      var mh = parseInt($('.mask').height());
      var mw = parseInt($('.mask').width());
      var t = sh - mh;
      var w = sw - mw;

      if (parseInt($('.mask').css("left")) <= 0) {
        $('.mask').css("left", 0);
      }

      if (parseInt($('.mask').css("left")) >= sw - mw) {
        $('.mask').css("left", w);
      }

      if (parseInt($('.mask').css("top")) <= 0) {
        $('.mask').css("top", 0);
      }

      if (parseInt($('.mask').css("top")) >= sh - mh) {
        $('.mask').css("top", t);
      }

      if (parseInt($('.big img').css("left")) >= 0) {
        $('.big img').css("left", 0);
      }
    };
  };

  this.small.onmouseleave = function () {
    _this.mask.style.display = "none";
    _this.big.style.display = "none";
  };
};

new fdj({
  el: "#fdj"
});