import axios from 'axios';
import Qs from 'qs';
import Vue from 'vue';

export const utils = {
  // 根据页数，单页数获取序号
  getIndexByPage(pageNum, pageSize) {
    return [(pageNum - 1) * pageSize + 1, pageNum * pageSize];
  },
  //格式化一个日期
  formatDate: function (mydate) {
    var yearNow = mydate.getFullYear();
    var monthNow = addLeadingZero(mydate.getMonth() + 1);
    var dayNow = addLeadingZero(mydate.getDate());
    var hoursNow = addLeadingZero(mydate.getHours());
    var minutesNow = addLeadingZero(mydate.getMinutes());
    var secondsNow = addLeadingZero(mydate.getSeconds());
    return yearNow + '-' + monthNow + '-' + dayNow + ' ' + hoursNow + ':' + minutesNow + ':' + secondsNow;

    function addLeadingZero(num) {
      //为一个小于10的数字添加前导零
      return num < 10 ? '0' + num : num;
    }
  },
  //ie下的日期字符串格式化
  formatDateString: function (str, browser) {
    if (browser != 'msie') return new Date(str);
    str = str.replace(/\.000\+0000/, '').replace(/-/g, '/').replace(/T|Z/g, ' ');
    str = new Date((new Date(str).getTime() + 8 * 60 * 60 * 1000));
    return str;
  },
  //获取几天前的时间点
  dateSomeDaysAgo: function (day, ms) {
    return new Date(new Date(new Date().toDateString()).getTime() - day * 1440 * 60 * 1000 - ms);
  },
  //核对cookie
  getcookieInter: function (loadingInter, loading) {
    var cookieflag = getcookie('download');
    if (cookieflag == 'success') {
      //下载成功
      clearInterval(loadingInter);
      loading.close();
      //清除cookie
      document.cookie = 'download=false';
    }
    //获取cookie
    function getcookie(cookieName) {
      var strCookie = document.cookie;
      var arrCookie = strCookie.split("; ");
      for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
          return arr[1];
        }
      }
      return "";
    }
  },
  //获取浏览器信息
  getBrowserInfo: function () {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
    var m = ua.match(re);
    if (m == null) {
      return {
        browser: 'msie',
        ver: 11
      }
    };
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
  },
  //获取某个dom元素的实际尺寸
  getDOMTrueSize: function (element, property) {
    var proValue = null;
    if (!document.defaultView) {
      proValue = element.currentStyle[property];
    } else {
      proValue = document.defaultView.getComputedStyle(element)[property];
    }
    return parseInt(proValue);
  },
  ssget(key){
    return JSON.parse(sessionStorage.getItem(key));
  },
  checkInit(checkObj, data){
    var innerdata = [];
    for(var i in data){
      innerdata.push({
        selected: false
      });
    }
    checkObj.data = innerdata;
    checkObj.all = false;
    var vm = new Vue({
      data(){
        return {
          checkObj: checkObj,
          isJustOneQuit: false,
          someSelect: {
            val: false
          }
        }
      },
      methods: {
        haveSelect(){
          var oneselected = false;
          for(var i in this.checkObj.data){
            if(this.checkObj.data[i].selected == true) {
              oneselected = true;
            };
          }
          this.someSelect.val = oneselected;
        }
      },
      watch: {
        'checkObj.all': {
          handler(val){
            if(this.isJustOneQuit) {
              this.isJustOneQuit = false;
              return;
            };
            var data = this.checkObj.data;
            for(var i in data){
              data[i].selected = val;
            }
          },
          deep: true
        },
        'checkObj.data': {
          handler(val){
            var data = val;
            var isAllChecked = true;
            var doNotChecked = 0;
            for(var i in data){
              if(!data[i].selected){
                isAllChecked = false;
                doNotChecked++;
              }
            }
            if(doNotChecked == 1 && this.checkObj.all == true) this.isJustOneQuit = true;
            this.checkObj.all = isAllChecked;
            this.haveSelect();
          },
          deep: true
        }
      }
    });
    return vm.$data.someSelect;
  },
  l(){
    var len = arguments.length;
    var strArr = [];
    for(var i = 0; i < len; i++){
      strArr.push('arguments[' + i + ']');
    }
    var str = 'console.log(' + strArr.join() + ')';
    eval(str);
  }
};
export function lxAxios(url, method, data, token) {
  const config = {
    method,
    url: url + "?_t=" + new Date().getTime(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "token": sessionStorage.getItem('token') == null ? '' : sessionStorage.getItem('token'),
      // 'X-Requested-With': 'XMLHttpRequest'
    },
    // 对所有返回数据的处理
    // transformResponse: [function (data) {
    //   // 对 data 进行任意转换处理
    //   console.log('after', JSON.parse(data));
    //   return JSON.parse(data);
    // }],
  }
  if (token) config.headers.token = token;
  if (method == "POST") {
    config.data = Qs.stringify(data); // post请求用data
  } else {
    config.params = data; // get请求用params
  }
  return axios(config);
}
//ajax请求
export var lxAjax = function (url, type, data, isFile, isJSON) {
  return new Promise((resolve, reject) => {
      if (isJSON){
          data = JSON.stringify(data);
      }
      var content = {
          url: url + '?_t=' + new Date().getTime(),
          type: type,
          data: data,
          headers: {
            "token": sessionStorage.getItem('token') == null ? '' : sessionStorage.getItem('token'),
          },
          success: function (res) {
              //console.log(res);
              resolve(res);
          },
          error: function (e) {
              //console.log(e);
              reject(e);
          }
      };
      if (isFile) {
          content.processData = false;
          content.contentType = false;
      }
      if (isJSON){
          content.contentType = "application/json";
      }
      $.ajax(content);
  });
}