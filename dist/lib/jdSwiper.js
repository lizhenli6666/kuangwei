"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JDSwiper = /*#__PURE__*/function () {
  function JDSwiper(obj) {
    var _this = this;

    _classCallCheck(this, JDSwiper);

    this.el = document.querySelector(obj.el);
    console.log(this);
    this.autoPlay = obj.autoPlay; //轮播的li

    this.oLis = this.el.querySelectorAll(".item li"); // 所以的小圆点

    this.pageLis = this.el.querySelectorAll(".swiper-page li");
    this.pageNum = 0;
    this.showPagePointWithNum(); // 1- 右按钮 添加点击事件

    this.rightBtn = this.el.querySelector(".rightBtn");

    this.rightBtn.onclick = function () {
      // console.log(1)
      _this.next();
    }; // 2- 左按钮


    this.leftBtn = this.el.querySelector(".leftBtn");

    this.leftBtn.onclick = function () {
      // console.log(1)
      // this.oLis[this.pageNum].style.opacity = 0
      animate(_this.oLis[_this.pageNum], {
        opacity: 0
      }); //页码增加

      _this.pageNum--; // console.log(this.pageNum);

      if (_this.pageNum == -1) {
        _this.pageNum = _this.oLis.length - 1;
      } // this.oLis[this.pageNum].style.opacity = 1


      animate(_this.oLis[_this.pageNum], {
        opacity: 1
      });

      _this.showPagePointWithNum();
    }; //3 - 自动轮播
    // 判断


    if (this.autoPlay) {
      var timer = setInterval(function () {
        _this.next();
      }, 2000);

      this.el.onmouseenter = function () {
        clearInterval(timer);
      };

      this.el.onmouseleave = function () {
        timer = setInterval(function () {
          _this.next();
        }, 2000);
      };
    } // 给所有的小圆点添加点击事件


    this.pageLis.forEach(function (li, i) {
      li.onclick = function () {
        //this.pageNum  li 隐藏
        animate(_this.oLis[_this.pageNum], {
          opacity: 0
        }); // console.log(i);

        _this.pageNum = i; // li 显示

        animate(_this.oLis[_this.pageNum], {
          opacity: 1
        });

        _this.showPagePointWithNum(); //
        // console.log(this);

      };
    });
  } // 播放一页


  _createClass(JDSwiper, [{
    key: "next",
    value: function next() {
      // console.log(this.pageNum);
      //
      // this.oLis[this.pageNum].style.opacity = 0
      animate(this.oLis[this.pageNum], {
        opacity: 0
      }); //页码增加

      this.pageNum++; // console.log(this.pageNum);

      if (this.pageNum == this.oLis.length) {
        this.pageNum = 0;
      } // this.oLis[this.pageNum].style.opacity = 1


      animate(this.oLis[this.pageNum], {
        opacity: 1
      });
      this.showPagePointWithNum();
    } //根据页码 改变 小圆点

  }, {
    key: "showPagePointWithNum",
    value: function showPagePointWithNum() {
      this.pageNum;

      for (var i = 0; i < this.pageLis.length; i++) {
        this.pageLis[i].style.borderTop = "2px solid white";
        this.pageLis[i].style.color = "#666";
      }

      this.pageLis[this.pageNum].style.borderTop = "2px solid black";
      this.pageLis[this.pageNum].style.color = "black";
    }
  }]);

  return JDSwiper;
}();