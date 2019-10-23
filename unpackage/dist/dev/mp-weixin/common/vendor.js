(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/calendar.js":
/*!**************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/calendar.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                     * @1900-2100区间内的公历、农历互转
                                                                                                     * @charset UTF-8
                                                                                                     * @github  https://github.com/jjonline/calendar.js
                                                                                                     * @Author  Jea杨(JJonline@JJonline.Cn)
                                                                                                     * @Time    2014-7-21
                                                                                                     * @Time    2016-8-13 Fixed 2033hex、Attribution Annals
                                                                                                     * @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
                                                                                                     * @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
                                                                                                     * @Version 1.0.3
                                                                                                     * @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
                                                                                                     * @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
                                                                                                     */
/* eslint-disable */
var calendar = {

  /**
                     * 农历1900-2100的润大小信息表
                     * @Array Of Property
                     * @return Hex
                     */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049
  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520], // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
                                                                    * 天干地支之天干速查表
                                                                    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
                                                                    * @return Cn string
                                                                    */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
                                                                                                                 * 天干地支之地支速查表
                                                                                                                 * @Array Of Property
                                                                                                                 * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
                                                                                                                 * @return Cn string
                                                                                                                 */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
                                                                                                                                     * 天干地支之地支速查表<=>生肖
                                                                                                                                     * @Array Of Property
                                                                                                                                     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
                                                                                                                                     * @return Cn string
                                                                                                                                     */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
                                                                                                                                         * 24节气速查表
                                                                                                                                         * @Array Of Property
                                                                                                                                         * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
                                                                                                                                         * @return Cn string
                                                                                                                                         */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
                                                                                                                                                                                                                                                                                                                                                                                                                   * 1900-2100各年的24节气日期速查表
                                                                                                                                                                                                                                                                                                                                                                                                                   * @Array Of Property
                                                                                                                                                                                                                                                                                                                                                                                                                   * @return 0x string For splice
                                                                                                                                                                                                                                                                                                                                                                                                                   */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
                                                                                                             * 数字转中文速查表
                                                                                                             * @Array Of Property
                                                                                                             * @trans ['日','一','二','三','四','五','六','七','八','九','十']
                                                                                                             * @return Cn string
                                                                                                             */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
                                                                                                                             * 日期转农历称呼速查表
                                                                                                                             * @Array Of Property
                                                                                                                             * @trans ['初','十','廿','卅']
                                                                                                                             * @return Cn string
                                                                                                                             */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
                                                       * 月份转农历称呼速查表
                                                       * @Array Of Property
                                                       * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
                                                       * @return Cn string
                                                       */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
                                                                                                                                       * 返回农历y年一整年的总天数
                                                                                                                                       * @param lunar Year
                                                                                                                                       * @return Number
                                                                                                                                       * @eg:var count = calendar.lYearDays(1987) ;//count=387
                                                                                                                                       */
  lYearDays: function lYearDays(y) {
    var i;var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {sum += this.lunarInfo[y - 1900] & i ? 1 : 0;}
    return sum + this.leapDays(y);
  },

  /**
         * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
         * @param lunar Year
         * @return Number (0-12)
         * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
         */
  leapMonth: function leapMonth(y) {// 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
         * 返回农历y年闰月的天数 若该年没有闰月则返回0
         * @param lunar Year
         * @return Number (0、29、30)
         * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
         */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },

  /**
         * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
         * @param lunar Year
         * @return Number (-1、29、30)
         * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
         */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
         * 返回公历(!)y年m月的天数
         * @param solar Year
         * @return Number (-1、28、29、30、31)
         * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
         */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {// 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
        * 农历年份转换为干支纪年
        * @param  lYear 农历年的年份数
        * @return Cn string
        */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
        * 公历月、日判断所属星座
        * @param  cMonth [description]
        * @param  cDay [description]
        * @return Cn string
        */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
         * 传入offset偏移量返回干支
         * @param offset 相对甲子的偏移量
         * @return Cn string
         */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
         * 传入公历(!)y年获得该年第n个节气的公历日期
         * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
         * @return day Number
         * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
         */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {return -1;}
    if (n < 1 || n > 24) {return -1;}
    var _table = this.sTermInfo[y - 1900];
    var _info = [
    parseInt('0x' + _table.substr(0, 5)).toString(),
    parseInt('0x' + _table.substr(5, 5)).toString(),
    parseInt('0x' + _table.substr(10, 5)).toString(),
    parseInt('0x' + _table.substr(15, 5)).toString(),
    parseInt('0x' + _table.substr(20, 5)).toString(),
    parseInt('0x' + _table.substr(25, 5)).toString()];

    var _calday = [
    _info[0].substr(0, 1),
    _info[0].substr(1, 2),
    _info[0].substr(3, 1),
    _info[0].substr(4, 2),

    _info[1].substr(0, 1),
    _info[1].substr(1, 2),
    _info[1].substr(3, 1),
    _info[1].substr(4, 2),

    _info[2].substr(0, 1),
    _info[2].substr(1, 2),
    _info[2].substr(3, 1),
    _info[2].substr(4, 2),

    _info[3].substr(0, 1),
    _info[3].substr(1, 2),
    _info[3].substr(3, 1),
    _info[3].substr(4, 2),

    _info[4].substr(0, 1),
    _info[4].substr(1, 2),
    _info[4].substr(3, 1),
    _info[4].substr(4, 2),

    _info[5].substr(0, 1),
    _info[5].substr(1, 2),
    _info[5].substr(3, 1),
    _info[5].substr(4, 2)];

    return parseInt(_calday[n - 1]);
  },

  /**
         * 传入农历数字月份返回汉语通俗表示法
         * @param lunar month
         * @return Cn string
         * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
         */
  toChinaMonth: function toChinaMonth(m) {// 月 => \u6708
    if (m > 12 || m < 1) {return -1;} // 若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字
    return s;
  },

  /**
         * 传入农历日期数字返回汉字表示法
         * @param lunar day
         * @return Cn string
         * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
         */
  toChinaDay: function toChinaDay(d) {// 日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";break;
      case 20:
        s = "\u4E8C\u5341";break;
        break;
      case 30:
        s = "\u4E09\u5341";break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];}

    return s;
  },

  /**
         * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
         * @param y year
         * @return Cn string
         * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
         */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
         * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
         * @param y  solar year
         * @param m  solar month
         * @param d  solar day
         * @return JSON object
         * @eg:console.log(calendar.solar2lunar(1987,11,01));
         */
  solar2lunar: function solar2lunar(y, m, d) {// 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    // 未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i;var leap = 0;var temp = 0;
    // 修正ymd参数
    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == leap + 1) {isLeap = false;}
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--i;
      }
    }
    if (offset < 0) {
      offset += temp;--i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = this.toAstro(m, d);

    return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': this.getAnimal(year), 'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month), 'IDayCn': this.toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661F\u671F" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
  },

  /**
         * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
         * @param y  lunar year
         * @param m  lunar month
         * @param d  lunar day
         * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
         * @return JSON object
         * @eg:console.log(calendar.lunar2solar(1987,9,10));
         */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {// 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {return -1;} // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {return -1;} // 超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {return -1;} // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0;var isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {// 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {offset += day;}
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return this.solar2lunar(cY, cM, cD);
  } };var _default =


calendar;exports.default = _default;

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue":
/*!************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_calendar_item_vue_vue_type_template_id_75ed7f9a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-calendar-item.vue?vue&type=template&id=75ed7f9a& */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=template&id=75ed7f9a&");
/* harmony import */ var _uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-calendar-item.vue?vue&type=script&lang=js& */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-calendar-item.vue?vue&type=style&index=0&lang=css& */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_calendar_item_vue_vue_type_template_id_75ed7f9a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_calendar_item_vue_vue_type_template_id_75ed7f9a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-calendar-item.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=script&lang=js&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-calendar-item.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=template&id=75ed7f9a&":
/*!*******************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=template&id=75ed7f9a& ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_template_id_75ed7f9a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-calendar-item.vue?vue&type=template&id=75ed7f9a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=template&id=75ed7f9a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_template_id_75ed7f9a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_item_vue_vue_type_template_id_75ed7f9a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue":
/*!*******************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_calendar_vue_vue_type_template_id_231504dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-calendar.vue?vue&type=template&id=231504dd& */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=template&id=231504dd&");
/* harmony import */ var _uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-calendar.vue?vue&type=script&lang=js& */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-calendar.vue?vue&type=style&index=0&lang=css& */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_calendar_vue_vue_type_template_id_231504dd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_calendar_vue_vue_type_template_id_231504dd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-calendar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=script&lang=js&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-calendar.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=template&id=231504dd&":
/*!**************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=template&id=231504dd& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_template_id_231504dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-calendar.vue?vue&type=template&id=231504dd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=template&id=231504dd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_template_id_231504dd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_calendar_vue_vue_type_template_id_231504dd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue":
/*!*************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_popup_vue_vue_type_template_id_a09e8646___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-popup.vue?vue&type=template&id=a09e8646& */ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=template&id=a09e8646&");
/* harmony import */ var _uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-popup.vue?vue&type=script&lang=js& */ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-popup.vue?vue&type=style&index=0&lang=css& */ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_popup_vue_vue_type_template_id_a09e8646___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_popup_vue_vue_type_template_id_a09e8646___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-popup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=script&lang=js&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-popup.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=template&id=a09e8646&":
/*!********************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=template&id=a09e8646& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_template_id_a09e8646___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-popup.vue?vue&type=template&id=a09e8646& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=template&id=a09e8646&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_template_id_a09e8646___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_popup_vue_vue_type_template_id_a09e8646___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue":
/*!***************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_swipe_action_vue_vue_type_template_id_8ac54f86___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-swipe-action.vue?vue&type=template&id=8ac54f86& */ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=template&id=8ac54f86&");
/* harmony import */ var _uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-swipe-action.vue?vue&type=script&lang=js& */ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-swipe-action.vue?vue&type=style&index=0&lang=css& */ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_swipe_action_vue_vue_type_template_id_8ac54f86___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_swipe_action_vue_vue_type_template_id_8ac54f86___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-swipe-action.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=script&lang=js&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-swipe-action.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=template&id=8ac54f86&":
/*!**********************************************************************************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=template&id=8ac54f86& ***!
  \**********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_template_id_8ac54f86___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-swipe-action.vue?vue&type=template&id=8ac54f86& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=template&id=8ac54f86&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_template_id_8ac54f86___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_swipe_action_vue_vue_type_template_id_8ac54f86___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../HBuilderProjects/zeroCardLife/pages.json":
/*!*************************************************************!*\
  !*** E:/HBuilderX/HBuilderProjects/zeroCardLife/pages.json ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref5.isPage,initRelation$$1 = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);


function callHook$1(vm, hook, params) {
  var handlers = vm.$options[hook];
  if (hook === 'onError' && handlers) {
    handlers = [handlers];
  }
  if(typeof handlers === 'function'){
    handlers = [handlers]
  }

  var ret;
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
//      try {
        ret = handlers[i].call(vm, params);
//       } catch (e) {//fixed by xxxxxx
//         handleError(e, vm, (hook + " hook"));
//       }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  // for child
  if (vm.$children.length) {
    vm.$children.forEach(function (v) {
      return callHook$1(v, hook, params);
    });
  }

  return ret
}

function getRootVueVm(page) {
  return page.$vm.$root;
}

/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  return {
    // 页面的初始数据
    data: {
      $root: {}
    },

    // mp lifecycle for vue
    // 生命周期函数--监听页面加载
    onLoad:function onLoad(query) {
      //页面加载的时候
      var app = new vue__WEBPACK_IMPORTED_MODULE_0___default.a(App);
      // 挂载Vue对象到page上
      this.$vm = app;
      var rootVueVM = app.$root;
      rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__//fixed by xxxxxx(createIntersectionObserver)
      rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
      
      //初始化mp对象
      if (!rootVueVM.$mp) {
        rootVueVM.$mp = {};
      }
      var mp = rootVueVM.$mp;
      mp.mpType = 'page';
      mp.page = this;
      mp.query = query;
      mp.status = 'load';
      //mount 要在 mp.status = 'load';赋值之后，不然mount方法会重复添加微信Page
      //具体原因参考mpvue核心库源码，_initMP方法
      app.$mount();
    },

    handleProxy: function handleProxy(e) {
      var rootVueVM = getRootVueVm(this);
      return rootVueVM.$handleProxyWithVue(e)
    },

    // 生命周期函数--监听页面显示
    onShow:function onShow() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'show';
      callHook$1(rootVueVM, 'onShow');
      //   // 只有页面需要 setData
      rootVueVM.$nextTick(function () {
        rootVueVM._initDataToMP();
      });
    },

    // 生命周期函数--监听页面初次渲染完成
    onReady:function onReady() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'ready';
      callHook$1(rootVueVM, 'onReady');
    },

    // 生命周期函数--监听页面隐藏
    onHide: function onHide() {
      var rootVueVM = getRootVueVm(this);
      var mp = rootVueVM.$mp;
      mp.status = 'hide';
      callHook$1(rootVueVM, 'onHide');
    },

    // 生命周期函数--监听页面卸载
    onUnload: function onUnload() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onUnload');
      rootVueVM.$destroy();
    },

    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function onPullDownRefresh() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onPullDownRefresh');
    },

    // 页面上拉触底事件的处理函数
    onReachBottom: function onReachBottom() {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onReachBottom');
    },

    // Do something when page scroll
    onPageScroll: function onPageScroll(options) {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onPageScroll', options);
    },

    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap: function onTabItemTap(options) {
      var rootVueVM = getRootVueVm(this);
      callHook$1(rootVueVM, 'onTabItemTap', options);
    },
		
    // // 用户点击右上角分享
    onShareAppMessage: App.onShareAppMessage ?
      function (options) {
        var rootVueVM = getRootVueVm(this);
        return callHook$1(rootVueVM, 'onShareAppMessage', options);
      } : null,

    //fixed by xxxxxx
    onNavigationBarButtonTap: function onNavigationBarButtonTap(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarButtonTap", options)
    },
    onNavigationBarSearchInputChanged: function onNavigationBarSearchInputChanged(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputChanged", options)
    },
    onNavigationBarSearchInputConfirmed: function onNavigationBarSearchInputConfirmed(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputConfirmed", options)
    },
    onNavigationBarSearchInputClicked: function onNavigationBarSearchInputClicked(options) {
        var rootVueVM = getRootVueVm(this);
    		callHook$1(rootVueVM, "onNavigationBarSearchInputClicked", options)
    },
    onBackPress: function onBackPress(options) {
        var rootVueVM = getRootVueVm(this);
    		return callHook$1(rootVueVM, "onBackPress",options)
    },
		$getAppWebview:function (e) {
				return plus.webview.getWebviewById('' + this.__wxWebviewId__)
		}
  };
});


/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// fix env
try {
    if (!global) global = {}
    global.process = global.process || {}
    global.process.env = global.process.env || {}
    global.App = global.App || App
    global.Page = global.Page || Page
    global.Component = global.Component || Component
    global.getApp = global.getApp || getApp
} catch (e) {}

;(function(global, factory) {
     true
        ? (module.exports = factory())
        : undefined
})(this, function() {
    "use strict"

    //fixed by xxxxxx
    function calcDiff(holder, key, newObj, oldObj) {
        if (newObj === oldObj || newObj === undefined) {
            return
        }

        if (newObj == null || oldObj == null || typeof newObj !== typeof oldObj) {
            holder[key] = newObj
        } else if (Array.isArray(newObj) && Array.isArray(oldObj)) {
            if (newObj.length === oldObj.length) {
                for (var i = 0, len = newObj.length; i < len; ++i) {
                    calcDiff(holder, key + "[" + i + "]", newObj[i], oldObj[i])
                }
            } else {
                holder[key] = newObj
            }
        } else if (typeof newObj === "object" && typeof oldObj === "object") {
            var newKeys = Object.keys(newObj)
            var oldKeys = Object.keys(oldObj)

            if (newKeys.length !== oldKeys.length) {
                holder[key] = newObj
            } else {
                var allKeysSet = Object.create(null)
                for (var i = 0, len = newKeys.length; i < len; ++i) {
                    allKeysSet[newKeys[i]] = true
                    allKeysSet[oldKeys[i]] = true
                }
                if (Object.keys(allKeysSet).length !== newKeys.length) {
                    holder[key] = newObj
                } else {
                    for (var i = 0, len = newKeys.length; i < len; ++i) {
                        var k = newKeys[i]
                        calcDiff(holder, key + "." + k, newObj[k], oldObj[k])
                    }
                }
            }
        } else if (newObj !== oldObj) {
            holder[key] = newObj
        }
    }

    function diff(newObj, oldObj) {
        var keys = Object.keys(newObj)
        var diffResult = {}
        for (var i = 0, len = keys.length; i < len; ++i) {
            var k = keys[i]
            var oldKeyPath = k.split(".")
            var oldValue = oldObj[oldKeyPath[0]]
            for (var j = 1, jlen = oldKeyPath.length; j < jlen && oldValue !== undefined; ++j) {
                oldValue = oldValue[oldKeyPath[j]]
            }
            calcDiff(diffResult, k, newObj[k], oldValue)
        }
        return diffResult
    }

    /*  */

    // these helpers produces better vm code in JS engines due to their
    // explicitness and function inlining
    function isUndef(v) {
        return v === undefined || v === null
    }

    function isDef(v) {
        return v !== undefined && v !== null
    }

    function isTrue(v) {
        return v === true
    }

    function isFalse(v) {
        return v === false
    }

    /**
     * Check if value is primitive
     */
    function isPrimitive(value) {
        return typeof value === "string" || typeof value === "number"
    }

    /**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     */
    function isObject(obj) {
        return obj !== null && typeof obj === "object"
    }

    var _toString = Object.prototype.toString

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    function isPlainObject(obj) {
        return _toString.call(obj) === "[object Object]"
    }

    function isRegExp(v) {
        return _toString.call(v) === "[object RegExp]"
    }

    /**
     * Check if val is a valid array index.
     */
    function isValidArrayIndex(val) {
        var n = parseFloat(val)
        return n >= 0 && Math.floor(n) === n && isFinite(val)
    }

    /**
     * Convert a value to a string that is actually rendered.
     */
    function toString(val) {
        return val == null
            ? ""
            : typeof val === "object"
                ? JSON.stringify(val, null, 2)
                : String(val)
    }

    /**
     * Convert a input value to a number for persistence.
     * If the conversion fails, return original string.
     */
    function toNumber(val) {
        var n = parseFloat(val)
        return isNaN(n) ? val : n
    }

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     */
    function makeMap(str, expectsLowerCase) {
        var map = Object.create(null)
        var list = str.split(",")
        for (var i = 0; i < list.length; i++) {
            map[list[i]] = true
        }
        return expectsLowerCase
            ? function(val) {
                  return map[val.toLowerCase()]
              }
            : function(val) {
                  return map[val]
              }
    }

    /**
     * Check if a tag is a built-in tag.
     */
    var isBuiltInTag = makeMap("slot,component", true)

    /**
     * Check if a attribute is a reserved attribute.
     */
    var isReservedAttribute = makeMap("key,ref,slot,is")

    /**
     * Remove an item from an array
     */
    function remove(arr, item) {
        if (arr.length) {
            var index = arr.indexOf(item)
            if (index > -1) {
                return arr.splice(index, 1)
            }
        }
    }

    /**
     * Check whether the object has the property.
     */
    var hasOwnProperty = Object.prototype.hasOwnProperty

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key)
    }

    /**
     * Create a cached version of a pure function.
     */
    function cached(fn) {
        var cache = Object.create(null)
        return function cachedFn(str) {
            var hit = cache[str]
            return hit || (cache[str] = fn(str))
        }
    }

    /**
     * Camelize a hyphen-delimited string.
     */
    var camelizeRE = /-(\w)/g
    var camelize = cached(function(str) {
        return str.replace(camelizeRE, function(_, c) {
            return c ? c.toUpperCase() : ""
        })
    })

    /**
     * Capitalize a string.
     */
    var capitalize = cached(function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    })

    /**
     * Hyphenate a camelCase string.
     */
    var hyphenateRE = /([^-])([A-Z])/g
    var hyphenate = cached(function(str) {
        return str
            .replace(hyphenateRE, "$1-$2")
            .replace(hyphenateRE, "$1-$2")
            .toLowerCase()
    })

    /**
     * Simple bind, faster than native
     */
    function bind(fn, ctx) {
        function boundFn(a) {
            var l = arguments.length
            return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx)
        }
        // record original fn length
        boundFn._length = fn.length
        return boundFn
    }

    /**
     * Convert an Array-like object to a real Array.
     */
    function toArray(list, start) {
        start = start || 0
        var i = list.length - start
        var ret = new Array(i)
        while (i--) {
            ret[i] = list[i + start]
        }
        return ret
    }

    /**
     * Mix properties into target object.
     */
    function extend(to, _from) {
        for (var key in _from) {
            to[key] = _from[key]
        }
        return to
    }

    /**
     * Merge an Array of Objects into a single Object.
     */
    function toObject(arr) {
        var res = {}
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                extend(res, arr[i])
            }
        }
        return res
    }

    /**
     * Perform no operation.
     * Stubbing args to make Flow happy without leaving useless transpiled code
     * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
     */
    function noop(a, b, c) {}

    /**
     * Always return false.
     */
    var no = function(a, b, c) {
        return false
    }

    /**
     * Return same value
     */
    var identity = function(_) {
        return _
    }

    /**
     * Generate a static keys string from compiler modules.
     */

    /**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     */
    function looseEqual(a, b) {
        var isObjectA = isObject(a)
        var isObjectB = isObject(b)
        if (isObjectA && isObjectB) {
            try {
                return JSON.stringify(a) === JSON.stringify(b)
            } catch (e) {
                // possible circular reference
                return a === b
            }
        } else if (!isObjectA && !isObjectB) {
            return String(a) === String(b)
        } else {
            return false
        }
    }

    function looseIndexOf(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (looseEqual(arr[i], val)) {
                return i
            }
        }
        return -1
    }

    /**
     * Ensure a function is called only once.
     */
    function once(fn) {
        var called = false
        return function() {
            if (!called) {
                called = true
                fn.apply(this, arguments)
            }
        }
    }

    var SSR_ATTR = "data-server-rendered"

    var ASSET_TYPES = ["component", "directive", "filter"]

    var LIFECYCLE_HOOKS = [
        "beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "beforeDestroy",
        "destroyed",
        "activated",
        "deactivated",
        "onLaunch",
        "onLoad",
        "onShow",
        "onReady",
        "onHide",
        "onUnload",
        "onPullDownRefresh",
        "onReachBottom",
        "onShareAppMessage",
        "onPageScroll",
        "onTabItemTap",
        "attached",
        "ready",
        "moved",
        "detached",
        "onUniNViewMessage", //fixed by xxxxxx
        "onNavigationBarButtonTap", //fixed by xxxxxx
        "onBackPress",//fixed by xxxxxx
    ]

    /*  */

    var config = {
        /**
         * Option merge strategies (used in core/util/options)
         */
        optionMergeStrategies: Object.create(null),

        /**
         * Whether to suppress warnings.
         */
        silent: false,

        /**
         * Show production mode tip message on boot?
         */
        productionTip: "production" !== "production",

        /**
         * Whether to enable devtools
         */
        devtools: "production" !== "production",

        /**
         * Whether to record perf
         */
        performance: false,

        /**
         * Error handler for watcher errors
         */
        errorHandler: null,

        /**
         * Warn handler for watcher warns
         */
        warnHandler: null,

        /**
         * Ignore certain custom elements
         */
        ignoredElements: [],

        /**
         * Custom user key aliases for v-on
         */
        keyCodes: Object.create(null),

        /**
         * Check if a tag is reserved so that it cannot be registered as a
         * component. This is platform-dependent and may be overwritten.
         */
        isReservedTag: no,

        /**
         * Check if an attribute is reserved so that it cannot be used as a component
         * prop. This is platform-dependent and may be overwritten.
         */
        isReservedAttr: no,

        /**
         * Check if a tag is an unknown element.
         * Platform-dependent.
         */
        isUnknownElement: no,

        /**
         * Get the namespace of an element
         */
        getTagNamespace: noop,

        /**
         * Parse the real tag name for the specific platform.
         */
        parsePlatformTagName: identity,

        /**
         * Check if an attribute must be bound using property, e.g. value
         * Platform-dependent.
         */
        mustUseProp: no,

        /**
         * Exposed for legacy reasons
         */
        _lifecycleHooks: LIFECYCLE_HOOKS
    }

    /*  */

    var emptyObject = Object.freeze({})

    /**
     * Check if a string starts with $ or _
     */
    function isReserved(str) {
        var c = (str + "").charCodeAt(0)
        return c === 0x24 || c === 0x5f
    }

    /**
     * Define a property.
     */
    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        })
    }

    /**
     * Parse simple path.
     */
    var bailRE = /[^\w.$]/

    function parsePath(path) {
        if (bailRE.test(path)) {
            return
        }
        var segments = path.split(".")
        return function(obj) {
            for (var i = 0; i < segments.length; i++) {
                if (!obj) {
                    return
                }
                obj = obj[segments[i]]
            }
            return obj
        }
    }

    /*  */

    var warn = noop

    var formatComponentName = null // work around flow check

    /*  */

    function handleError(err, vm, info) {
        if (config.errorHandler) {
            config.errorHandler.call(null, err, vm, info)
        } else {
            if (inBrowser && typeof console !== "undefined") {
                console.error(err)
            } else {
                throw err
            }
        }
    }

    /*  */

    // can we use __proto__?
    var hasProto = "__proto__" in {}

    // Browser environment sniffing
    var inBrowser = typeof window !== "undefined"
    var UA = ["mpvue-runtime"].join()
    var isIE = UA && /msie|trident/.test(UA)
    var isIE9 = UA && UA.indexOf("msie 9.0") > 0
    var isEdge = UA && UA.indexOf("edge/") > 0
    var isAndroid = UA && UA.indexOf("android") > 0
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

    // Firefix has a "watch" function on Object.prototype...
    var nativeWatch = {}.watch

    var supportsPassive = false
    if (inBrowser) {
        try {
            var opts = {}
            Object.defineProperty(opts, "passive", {
                get: function get() {
                    /* istanbul ignore next */
                    supportsPassive = true
                }
            }) // https://github.com/facebook/flow/issues/285
            window.addEventListener("test-passive", null, opts)
        } catch (e) {}
    }

    // this needs to be lazy-evaled because vue may be required before
    // vue-server-renderer can set VUE_ENV
    var _isServer
    var isServerRendering = function() {
        if (_isServer === undefined) {
            /* istanbul ignore if */
            if (!inBrowser && typeof global !== "undefined") {
                // detect presence of vue-server-renderer and avoid
                // Webpack shimming the process
                _isServer = global["process"].env.VUE_ENV === "server"
            } else {
                _isServer = false
            }
        }
        return _isServer
    }

    // detect devtools
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

    /* istanbul ignore next */
    function isNative(Ctor) {
        return typeof Ctor === "function" && /native code/.test(Ctor.toString())
    }

    var hasSymbol =
        typeof Symbol !== "undefined" &&
        isNative(Symbol) &&
        typeof Reflect !== "undefined" &&
        isNative(Reflect.ownKeys)

    /**
     * Defer a task to execute it asynchronously.
     */
    var nextTick = (function() {
        var callbacks = []
        var pending = false
        var timerFunc

        function nextTickHandler() {
            pending = false
            var copies = callbacks.slice(0)
            callbacks.length = 0
            for (var i = 0; i < copies.length; i++) {
                copies[i]()
            }
        }

        // the nextTick behavior leverages the microtask queue, which can be accessed
        // via either native Promise.then or MutationObserver.
        // MutationObserver has wider support, however it is seriously bugged in
        // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
        // completely stops working after triggering a few times... so, if native
        // Promise is available, we will use it:
        /* istanbul ignore if */
        if (typeof Promise !== "undefined" && isNative(Promise)) {
            var p = Promise.resolve()
            var logError = function(err) {
                console.error(err)
            }
            timerFunc = function() {
                p.then(nextTickHandler).catch(logError)
                // in problematic UIWebViews, Promise.then doesn't completely break, but
                // it can get stuck in a weird state where callbacks are pushed into the
                // microtask queue but the queue isn't being flushed, until the browser
                // needs to do some other work, e.g. handle a timer. Therefore we can
                // "force" the microtask queue to be flushed by adding an empty timer.
                if (isIOS) {
                    setTimeout(noop)
                }
            }
            // } else if (typeof MutationObserver !== 'undefined' && (
            //   isNative(MutationObserver) ||
            //   // PhantomJS and iOS 7.x
            //   MutationObserver.toString() === '[object MutationObserverConstructor]'
            // )) {
            //   // use MutationObserver where native Promise is not available,
            //   // e.g. PhantomJS IE11, iOS7, Android 4.4
            //   var counter = 1
            //   var observer = new MutationObserver(nextTickHandler)
            //   var textNode = document.createTextNode(String(counter))
            //   observer.observe(textNode, {
            //     characterData: true
            //   })
            //   timerFunc = () => {
            //     counter = (counter + 1) % 2
            //     textNode.data = String(counter)
            //   }
        } else {
            // fallback to setTimeout
            /* istanbul ignore next */
            timerFunc = function() {
                setTimeout(nextTickHandler, 0)
            }
        }

        return function queueNextTick(cb, ctx) {
            var _resolve
            callbacks.push(function() {
                if (cb) {
                    try {
                        cb.call(ctx)
                    } catch (e) {
                        handleError(e, ctx, "nextTick")
                    }
                } else if (_resolve) {
                    _resolve(ctx)
                }
            })
            if (!pending) {
                pending = true
                timerFunc()
            }
            if (!cb && typeof Promise !== "undefined") {
                return new Promise(function(resolve, reject) {
                    _resolve = resolve
                })
            }
        }
    })()

    var _Set
    /* istanbul ignore if */
    if (typeof Set !== "undefined" && isNative(Set)) {
        // use native Set when available.
        _Set = Set
    } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = (function() {
            function Set() {
                this.set = Object.create(null)
            }
            Set.prototype.has = function has(key) {
                return this.set[key] === true
            }
            Set.prototype.add = function add(key) {
                this.set[key] = true
            }
            Set.prototype.clear = function clear() {
                this.set = Object.create(null)
            }

            return Set
        })()
    }

    /*  */

    var uid$1 = 0

    /**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     */
    var Dep = function Dep() {
        this.id = uid$1++
        this.subs = []
    }

    Dep.prototype.addSub = function addSub(sub) {
        this.subs.push(sub)
    }

    Dep.prototype.removeSub = function removeSub(sub) {
        remove(this.subs, sub)
    }

    Dep.prototype.depend = function depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    Dep.prototype.notify = function notify() {
        // stabilize the subscriber list first
        var subs = this.subs.slice()
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }

    // the current target watcher being evaluated.
    // this is globally unique because there could be only one
    // watcher being evaluated at any time.
    Dep.target = null
    var targetStack = []

    function pushTarget(_target) {
        if (Dep.target) {
            targetStack.push(Dep.target)
        }
        Dep.target = _target
    }

    function popTarget() {
        Dep.target = targetStack.pop()
    }

    /*
     * not type checking this file because flow doesn't play well with
     * dynamically accessing methods on Array prototype
     */

    var arrayProto = Array.prototype
    var arrayMethods = Object.create(arrayProto)
    ;["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function(method) {
        // cache original method
        var original = arrayProto[method]
        def(arrayMethods, method, function mutator() {
            var args = [],
                len = arguments.length
            while (len--) args[len] = arguments[len]

            var result = original.apply(this, args)
            var ob = this.__ob__
            var inserted
            switch (method) {
                case "push":
                case "unshift":
                    inserted = args
                    break
                case "splice":
                    inserted = args.slice(2)
                    break
            }
            if (inserted) {
                ob.observeArray(inserted)
            }
            // notify change
            ob.dep.notify()
            return result
        })
    })

    /*  */

    var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

    /**
     * By default, when a reactive property is set, the new value is
     * also converted to become reactive. However when passing down props,
     * we don't want to force conversion because the value may be a nested value
     * under a frozen data structure. Converting it would defeat the optimization.
     */
    var observerState = {
        shouldConvert: true
    }

    /**
     * Observer class that are attached to each observed
     * object. Once attached, the observer converts target
     * object's property keys into getter/setters that
     * collect dependencies and dispatches updates.
     */
    var Observer = function Observer(value) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, "__ob__", this)
        if (Array.isArray(value)) {
            var augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    Observer.prototype.walk = function walk(obj) {
        var keys = Object.keys(obj)
        for (var i = 0; i < keys.length; i++) {
            defineReactive$$1(obj, keys[i], obj[keys[i]])
        }
    }

    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function observeArray(items) {
        for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }

    // helpers

    /**
     * Augment an target Object or Array by intercepting
     * the prototype chain using __proto__
     */
    function protoAugment(target, src, keys) {
        /* eslint-disable no-proto */
        target.__proto__ = src
        /* eslint-enable no-proto */
    }

    /**
     * Augment an target Object or Array by defining
     * hidden properties.
     */
    /* istanbul ignore next */
    function copyAugment(target, src, keys) {
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i]
            def(target, key, src[key])
        }
    }

    /**
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     */
    function observe(value, asRootData) {
        if (!isObject(value)) {
            return
        }
        var ob
        if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
            ob = value.__ob__
        } else if (
            observerState.shouldConvert &&
            !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
            Object.isExtensible(value) &&
            !value._isVue
        ) {
            ob = new Observer(value)
        }
        if (asRootData && ob) {
            ob.vmCount++
        }
        return ob
    }

    /**
     * Define a reactive property on an Object.
     */
    function defineReactive$$1(obj, key, val, customSetter, shallow) {
        var dep = new Dep()

        var property = Object.getOwnPropertyDescriptor(obj, key)
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        var getter = property && property.get
        var setter = property && property.set

        var childOb = !shallow && observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                var value = getter ? getter.call(obj) : val
                if (Dep.target) {
                    dep.depend()
                    if (childOb) {
                        childOb.dep.depend()
                    }
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
                return value
            },
            set: function reactiveSetter(newVal) {
                var value = getter ? getter.call(obj) : val
                /* eslint-disable no-self-compare */
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return
                }
                /* eslint-enable no-self-compare */
                if (false) {}
                if (setter) {
                    setter.call(obj, newVal)
                } else {
                    val = newVal
                }
                childOb = !shallow && observe(newVal)
                dep.notify()
            }
        })
    }

    /**
     * Set a property on an object. Adds the new property and
     * triggers change notification if the property doesn't
     * already exist.
     */
    function set(target, key, val) {
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key)
            target.splice(key, 1, val)
            return val
        }
        if (hasOwn(target, key)) {
            target[key] = val
            return val
        }
        var ob = target.__ob__
        if (target._isVue || (ob && ob.vmCount)) {
             false &&
                false
            return val
        }
        if (!ob) {
            target[key] = val
            return val
        }
        defineReactive$$1(ob.value, key, val)
        ob.dep.notify()
        return val
    }

    /**
     * Delete a property and trigger change if necessary.
     */
    function del(target, key) {
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1)
            return
        }
        var ob = target.__ob__
        if (target._isVue || (ob && ob.vmCount)) {
             false &&
                false
            return
        }
        if (!hasOwn(target, key)) {
            return
        }
        delete target[key]
        if (!ob) {
            return
        }
        ob.dep.notify()
    }

    /**
     * Collect dependencies on array elements when the array is touched, since
     * we cannot intercept array element access like property getters.
     */
    function dependArray(value) {
        for (var e = void 0, i = 0, l = value.length; i < l; i++) {
            e = value[i]
            e && e.__ob__ && e.__ob__.dep.depend()
            if (Array.isArray(e)) {
                dependArray(e)
            }
        }
    }

    /*  */

    /**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     */
    var strats = config.optionMergeStrategies

    /**
     * Options with restrictions
     */
    /**
     * Helper that recursively merges two data objects together.
     */
    function mergeData(to, from) {
        if (!from) {
            return to
        }
        var key, toVal, fromVal
        var keys = Object.keys(from)
        for (var i = 0; i < keys.length; i++) {
            key = keys[i]
            toVal = to[key]
            fromVal = from[key]
            if (!hasOwn(to, key)) {
                set(to, key, fromVal)
            } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
                mergeData(toVal, fromVal)
            }
        }
        return to
    }

    /**
     * Data
     */
    function mergeDataOrFn(parentVal, childVal, vm) {
        if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
                return parentVal
            }
            if (!parentVal) {
                return childVal
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn() {
                return mergeData(
                    typeof childVal === "function" ? childVal.call(this) : childVal,
                    parentVal.call(this)
                )
            }
        } else if (parentVal || childVal) {
            return function mergedInstanceDataFn() {
                // instance merge
                var instanceData = typeof childVal === "function" ? childVal.call(vm) : childVal
                var defaultData = typeof parentVal === "function" ? parentVal.call(vm) : undefined
                if (instanceData) {
                    return mergeData(instanceData, defaultData)
                } else {
                    return defaultData
                }
            }
        }
    }

    strats.data = function(parentVal, childVal, vm) {
        if (!vm) {
            if (childVal && typeof childVal !== "function") {
                 false &&
                    false

                return parentVal
            }
            return mergeDataOrFn.call(this, parentVal, childVal)
        }

        return mergeDataOrFn(parentVal, childVal, vm)
    }

    /**
     * Hooks and props are merged as arrays.
     */
    function mergeHook(parentVal, childVal) {
        return childVal
            ? parentVal
                ? parentVal.concat(childVal)
                : Array.isArray(childVal)
                    ? childVal
                    : [childVal]
            : parentVal
    }

    LIFECYCLE_HOOKS.forEach(function(hook) {
        strats[hook] = mergeHook
    })

    /**
     * Assets
     *
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */
    function mergeAssets(parentVal, childVal) {
        var res = Object.create(parentVal || null)
        return childVal ? extend(res, childVal) : res
    }

    ASSET_TYPES.forEach(function(type) {
        strats[type + "s"] = mergeAssets
    })

    /**
     * Watchers.
     *
     * Watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */
    strats.watch = function(parentVal, childVal) {
        // work around Firefox's Object.prototype.watch...
        if (parentVal === nativeWatch) {
            parentVal = undefined
        }
        if (childVal === nativeWatch) {
            childVal = undefined
        }
        /* istanbul ignore if */
        if (!childVal) {
            return Object.create(parentVal || null)
        }
        if (!parentVal) {
            return childVal
        }
        var ret = {}
        extend(ret, parentVal)
        for (var key in childVal) {
            var parent = ret[key]
            var child = childVal[key]
            if (parent && !Array.isArray(parent)) {
                parent = [parent]
            }
            ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child]
        }
        return ret
    }

    /**
     * Other object hashes.
     */
    strats.props = strats.methods = strats.inject = strats.computed = function(
        parentVal,
        childVal
    ) {
        if (!childVal) {
            return Object.create(parentVal || null)
        }
        if (!parentVal) {
            return childVal
        }
        var ret = Object.create(null)
        extend(ret, parentVal)
        extend(ret, childVal)
        return ret
    }
    strats.provide = mergeDataOrFn

    /**
     * Default strategy.
     */
    var defaultStrat = function(parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal
    }

    /**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     */
    function normalizeProps(options) {
        var props = options.props
        if (!props) {
            return
        }
        var res = {}
        var i, val, name
        if (Array.isArray(props)) {
            i = props.length
            while (i--) {
                val = props[i]
                if (typeof val === "string") {
                    name = camelize(val)
                    res[name] = {
                        type: null
                    }
                } else {
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key]
                name = camelize(key)
                res[name] = isPlainObject(val)
                    ? val
                    : {
                          type: val
                      }
            }
        }
        options.props = res
    }

    /**
     * Normalize all injections into Object-based format
     */
    function normalizeInject(options) {
        var inject = options.inject
        if (Array.isArray(inject)) {
            var normalized = (options.inject = {})
            for (var i = 0; i < inject.length; i++) {
                normalized[inject[i]] = inject[i]
            }
        }
    }

    /**
     * Normalize raw function directives into object format.
     */
    function normalizeDirectives(options) {
        var dirs = options.directives
        if (dirs) {
            for (var key in dirs) {
                var def = dirs[key]
                if (typeof def === "function") {
                    dirs[key] = {
                        bind: def,
                        update: def
                    }
                }
            }
        }
    }

    /**
     * Merge two option objects into a new one.
     * Core utility used in both instantiation and inheritance.
     */
    function mergeOptions(parent, child, vm) {
        if (typeof child === "function") {
            child = child.options
        }

        normalizeProps(child)
        normalizeInject(child)
        normalizeDirectives(child)
        var extendsFrom = child.extends
        if (extendsFrom) {
            parent = mergeOptions(parent, extendsFrom, vm)
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
        var options = {}
        var key
        for (key in parent) {
            mergeField(key)
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key)
            }
        }

        function mergeField(key) {
            var strat = strats[key] || defaultStrat
            options[key] = strat(parent[key], child[key], vm, key)
        }
        return options
    }

    /**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     */
    function resolveAsset(options, type, id, warnMissing) {
        /* istanbul ignore if */
        if (typeof id !== "string") {
            return
        }
        var assets = options[type]
        // check local registration variations first
        if (hasOwn(assets, id)) {
            return assets[id]
        }
        var camelizedId = camelize(id)
        if (hasOwn(assets, camelizedId)) {
            return assets[camelizedId]
        }
        var PascalCaseId = capitalize(camelizedId)
        if (hasOwn(assets, PascalCaseId)) {
            return assets[PascalCaseId]
        }
        // fallback to prototype chain
        var res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
        if (false) {}
        return res
    }

    /*  */

    function validateProp(key, propOptions, propsData, vm) {
        var prop = propOptions[key]
        var absent = !hasOwn(propsData, key)
        var value = propsData[key]
        // handle boolean props
        if (isType(Boolean, prop.type)) {
            if (absent && !hasOwn(prop, "default")) {
                value = false
            } else if (!isType(String, prop.type) && (value === "" || value === hyphenate(key))) {
                value = true
            }
        }
        // check default value
        if (value === undefined) {
            value = getPropDefaultValue(vm, prop, key)
            // since the default value is a fresh copy,
            // make sure to observe it.
            var prevShouldConvert = observerState.shouldConvert
            observerState.shouldConvert = true
            observe(value)
            observerState.shouldConvert = prevShouldConvert
        }
        return value
    }

    /**
     * Get the default value of a prop.
     */
    function getPropDefaultValue(vm, prop, key) {
        // no default, return undefined
        if (!hasOwn(prop, "default")) {
            return undefined
        }
        var def = prop.default
        // warn against non-factory defaults for Object & Array
        if (false) {}
        // the raw prop value was also undefined from previous render,
        // return previous default value to avoid unnecessary watcher trigger
        if (
            vm &&
            vm.$options.propsData &&
            vm.$options.propsData[key] === undefined &&
            vm._props[key] !== undefined
        ) {
            return vm._props[key]
        }
        // call factory function for non-Function types
        // a value is Function if its prototype is function even across different execution context
        return typeof def === "function" && getType(prop.type) !== "Function" ? def.call(vm) : def
    }

    /**
     * Use function string name to check built-in types,
     * because a simple equality check will fail when running
     * across different vms / iframes.
     */
    function getType(fn) {
        var match = fn && fn.toString().match(/^\s*function (\w+)/)
        return match ? match[1] : ""
    }

    function isType(type, fn) {
        if (!Array.isArray(fn)) {
            return getType(fn) === getType(type)
        }
        for (var i = 0, len = fn.length; i < len; i++) {
            if (getType(fn[i]) === getType(type)) {
                return true
            }
        }
        /* istanbul ignore next */
        return false
    }

    /*  */

    /* not type checking this file because flow doesn't play well with Proxy */

    var mark
    var measure

    /*  */

    var VNode = function VNode(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        asyncFactory
    ) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.functionalContext = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isComment = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

    var prototypeAccessors = {
        child: {}
    }

    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    prototypeAccessors.child.get = function() {
        return this.componentInstance
    }

    Object.defineProperties(VNode.prototype, prototypeAccessors)

    var createEmptyVNode = function(text) {
        if (text === void 0) text = ""

        var node = new VNode()
        node.text = text
        node.isComment = true
        return node
    }

    function createTextVNode(val) {
        return new VNode(undefined, undefined, undefined, String(val))
    }

    // optimized shallow clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    function cloneVNode(vnode) {
        var cloned = new VNode(
            vnode.tag,
            vnode.data,
            vnode.children,
            vnode.text,
            vnode.elm,
            vnode.context,
            vnode.componentOptions,
            vnode.asyncFactory
        )
        cloned.ns = vnode.ns
        cloned.isStatic = vnode.isStatic
        cloned.key = vnode.key
        cloned.isComment = vnode.isComment
        cloned.isCloned = true
        return cloned
    }

    function cloneVNodes(vnodes) {
        var len = vnodes.length
        var res = new Array(len)
        for (var i = 0; i < len; i++) {
            res[i] = cloneVNode(vnodes[i])
        }
        return res
    }

    /*  */

    var normalizeEvent = cached(function(name) {
        var passive = name.charAt(0) === "&"
        name = passive ? name.slice(1) : name
        var once$$1 = name.charAt(0) === "~" // Prefixed last, checked first
        name = once$$1 ? name.slice(1) : name
        var capture = name.charAt(0) === "!"
        name = capture ? name.slice(1) : name
        return {
            name: name,
            once: once$$1,
            capture: capture,
            passive: passive
        }
    })

    function createFnInvoker(fns) {
        function invoker() {
            var arguments$1 = arguments

            var fns = invoker.fns
            if (Array.isArray(fns)) {
                var cloned = fns.slice()
                for (var i = 0; i < cloned.length; i++) {
                    cloned[i].apply(null, arguments$1)
                }
            } else {
                // return handler return value for single handlers
                return fns.apply(null, arguments)
            }
        }
        invoker.fns = fns
        return invoker
    }

    function updateListeners(on, oldOn, add, remove$$1, vm) {
        var name, cur, old, event
        for (name in on) {
            cur = on[name]
            old = oldOn[name]
            event = normalizeEvent(name)
            if (isUndef(cur)) {
                 false &&
                    false
            } else if (isUndef(old)) {
                if (isUndef(cur.fns)) {
                    cur = on[name] = createFnInvoker(cur)
                }
                add(event.name, cur, event.once, event.capture, event.passive)
            } else if (cur !== old) {
                old.fns = cur
                on[name] = old
            }
        }
        for (name in oldOn) {
            if (isUndef(on[name])) {
                event = normalizeEvent(name)
                remove$$1(event.name, oldOn[name], event.capture)
            }
        }
    }

    /*  */

    /*  */

    function extractPropsFromVNodeData(data, Ctor, tag) {
        // we are only extracting raw values here.
        // validation and default values are handled in the child
        // component itself.
        var propOptions = Ctor.options.props
        if (isUndef(propOptions)) {
            return
        }
        var res = {}
        var attrs = data.attrs
        var props = data.props
        if (isDef(attrs) || isDef(props)) {
            for (var key in propOptions) {
                var altKey = hyphenate(key)
                checkProp(res, props, key, altKey, true) ||
                    checkProp(res, attrs, key, altKey, false)
            }
        }
        return res
    }

    function checkProp(res, hash, key, altKey, preserve) {
        if (isDef(hash)) {
            if (hasOwn(hash, key)) {
                res[key] = hash[key]
                if (!preserve) {
                    delete hash[key]
                }
                return true
            } else if (hasOwn(hash, altKey)) {
                res[key] = hash[altKey]
                if (!preserve) {
                    delete hash[altKey]
                }
                return true
            }
        }
        return false
    }

    /*  */

    // The template compiler attempts to minimize the need for normalization by
    // statically analyzing the template at compile time.
    //
    // For plain HTML markup, normalization can be completely skipped because the
    // generated render function is guaranteed to return Array<VNode>. There are
    // two cases where extra normalization is needed:

    // 1. When the children contains components - because a functional component
    // may return an Array instead of a single root. In this case, just a simple
    // normalization is needed - if any child is an Array, we flatten the whole
    // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
    // because functional components already normalize their own children.
    function simpleNormalizeChildren(children) {
        for (var i = 0; i < children.length; i++) {
            if (Array.isArray(children[i])) {
                return Array.prototype.concat.apply([], children)
            }
        }
        return children
    }

    // 2. When the children contains constructs that always generated nested Arrays,
    // e.g. <template>, <slot>, v-for, or when the children is provided by user
    // with hand-written render functions / JSX. In such cases a full normalization
    // is needed to cater to all possible types of children values.
    function normalizeChildren(children) {
        return isPrimitive(children)
            ? [createTextVNode(children)]
            : Array.isArray(children)
                ? normalizeArrayChildren(children)
                : undefined
    }

    function isTextNode(node) {
        return isDef(node) && isDef(node.text) && isFalse(node.isComment)
    }

    function normalizeArrayChildren(children, nestedIndex) {
        var res = []
        var i, c, last
        for (i = 0; i < children.length; i++) {
            c = children[i]
            if (isUndef(c) || typeof c === "boolean") {
                continue
            }
            last = res[res.length - 1]
            //  nested
            if (Array.isArray(c)) {
                res.push.apply(res, normalizeArrayChildren(c, (nestedIndex || "") + "_" + i))
            } else if (isPrimitive(c)) {
                if (isTextNode(last)) {
                    // merge adjacent text nodes
                    // this is necessary for SSR hydration because text nodes are
                    // essentially merged when rendered to HTML strings
                    last.text += String(c)
                } else if (c !== "") {
                    // convert primitive to vnode
                    res.push(createTextVNode(c))
                }
            } else {
                if (isTextNode(c) && isTextNode(last)) {
                    // merge adjacent text nodes
                    res[res.length - 1] = createTextVNode(last.text + c.text)
                } else {
                    // default key for nested array children (likely generated by v-for)
                    if (
                        isTrue(children._isVList) &&
                        isDef(c.tag) &&
                        isUndef(c.key) &&
                        isDef(nestedIndex)
                    ) {
                        c.key = "__vlist" + nestedIndex + "_" + i + "__"
                    }
                    res.push(c)
                }
            }
        }
        return res
    }

    /*  */

    function ensureCtor(comp, base) {
        if (comp.__esModule && comp.default) {
            comp = comp.default
        }
        return isObject(comp) ? base.extend(comp) : comp
    }

    function createAsyncPlaceholder(factory, data, context, children, tag) {
        var node = createEmptyVNode()
        node.asyncFactory = factory
        node.asyncMeta = {
            data: data,
            context: context,
            children: children,
            tag: tag
        }
        return node
    }

    function resolveAsyncComponent(factory, baseCtor, context) {
        if (isTrue(factory.error) && isDef(factory.errorComp)) {
            return factory.errorComp
        }

        if (isDef(factory.resolved)) {
            return factory.resolved
        }

        if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
            return factory.loadingComp
        }

        if (isDef(factory.contexts)) {
            // already pending
            factory.contexts.push(context)
        } else {
            var contexts = (factory.contexts = [context])
            var sync = true

            var forceRender = function() {
                for (var i = 0, l = contexts.length; i < l; i++) {
                    contexts[i].$forceUpdate()
                }
            }

            var resolve = once(function(res) {
                // cache resolved
                factory.resolved = ensureCtor(res, baseCtor)
                // invoke callbacks only if this is not a synchronous resolve
                // (async resolves are shimmed as synchronous during SSR)
                if (!sync) {
                    forceRender()
                }
            })

            var reject = once(function(reason) {
                 false &&
                    false
                if (isDef(factory.errorComp)) {
                    factory.error = true
                    forceRender()
                }
            })

            var res = factory(resolve, reject)

            if (isObject(res)) {
                if (typeof res.then === "function") {
                    // () => Promise
                    if (isUndef(factory.resolved)) {
                        res.then(resolve, reject)
                    }
                } else if (isDef(res.component) && typeof res.component.then === "function") {
                    res.component.then(resolve, reject)

                    if (isDef(res.error)) {
                        factory.errorComp = ensureCtor(res.error, baseCtor)
                    }

                    if (isDef(res.loading)) {
                        factory.loadingComp = ensureCtor(res.loading, baseCtor)
                        if (res.delay === 0) {
                            factory.loading = true
                        } else {
                            setTimeout(function() {
                                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                    factory.loading = true
                                    forceRender()
                                }
                            }, res.delay || 200)
                        }
                    }

                    if (isDef(res.timeout)) {
                        setTimeout(function() {
                            if (isUndef(factory.resolved)) {
                                reject(null)
                            }
                        }, res.timeout)
                    }
                }
            }

            sync = false
            // return in case resolved synchronously
            return factory.loading ? factory.loadingComp : factory.resolved
        }
    }

    /*  */

    function getFirstComponentChild(children) {
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                var c = children[i]
                if (isDef(c) && isDef(c.componentOptions)) {
                    return c
                }
            }
        }
    }

    /*  */

    /*  */

    function initEvents(vm) {
        vm._events = Object.create(null)
        vm._hasHookEvent = false
        // init parent attached events
        var listeners = vm.$options._parentListeners
        if (listeners) {
            updateComponentListeners(vm, listeners)
        }
    }

    var target

    function add(event, fn, once$$1) {
        if (once$$1) {
            target.$once(event, fn)
        } else {
            target.$on(event, fn)
        }
    }

    function remove$1(event, fn) {
        target.$off(event, fn)
    }

    function updateComponentListeners(vm, listeners, oldListeners) {
        target = vm
        updateListeners(listeners, oldListeners || {}, add, remove$1, vm)
    }

    function eventsMixin(Vue) {
        var hookRE = /^hook:/
        Vue.prototype.$on = function(event, fn) {
            var this$1 = this

            var vm = this
            if (Array.isArray(event)) {
                for (var i = 0, l = event.length; i < l; i++) {
                    this$1.$on(event[i], fn)
                }
            } else {
                ;(vm._events[event] || (vm._events[event] = [])).push(fn)
                // optimize hook:event cost by using a boolean flag marked at registration
                // instead of a hash lookup
                if (hookRE.test(event)) {
                    vm._hasHookEvent = true
                }
            }
            return vm
        }

        Vue.prototype.$once = function(event, fn) {
            var vm = this

            function on() {
                vm.$off(event, on)
                fn.apply(vm, arguments)
            }
            on.fn = fn
            vm.$on(event, on)
            return vm
        }

        Vue.prototype.$off = function(event, fn) {
            var this$1 = this

            var vm = this
            // all
            if (!arguments.length) {
                vm._events = Object.create(null)
                return vm
            }
            // array of events
            if (Array.isArray(event)) {
                for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
                    this$1.$off(event[i$1], fn)
                }
                return vm
            }
            // specific event
            var cbs = vm._events[event]
            if (!cbs) {
                return vm
            }
            if (arguments.length === 1) {
                vm._events[event] = null
                return vm
            }
            // specific handler
            var cb
            var i = cbs.length
            while (i--) {
                cb = cbs[i]
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1)
                    break
                }
            }
            return vm
        }

        Vue.prototype.$emit = function(event) {
            var vm = this
            var cbs = vm._events[event]
            if (cbs) {
                cbs = cbs.length > 1 ? toArray(cbs) : cbs
                var args = toArray(arguments, 1)
                for (var i = 0, l = cbs.length; i < l; i++) {
                    try {
                        cbs[i].apply(vm, args)
                    } catch (e) {
                        handleError(e, vm, 'event handler for "' + event + '"')
                    }
                }
            }
            return vm
        }
    }

    /*  */

    /**
     * Runtime helper for resolving raw children VNodes into a slot object.
     */
    function resolveSlots(children, context) {
        var slots = {}
        if (!children) {
            return slots
        }
        var defaultSlot = []
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i]
            // named slots should only be respected if the vnode was rendered in the
            // same context.
            if (
                (child.context === context || child.functionalContext === context) &&
                child.data &&
                child.data.slot != null
            ) {
                var name = child.data.slot
                var slot = slots[name] || (slots[name] = [])
                if (child.tag === "template") {
                    slot.push.apply(slot, child.children)
                } else {
                    slot.push(child)
                }
            } else {
                defaultSlot.push(child)
            }
        }
        // ignore whitespace
        if (!defaultSlot.every(isWhitespace)) {
            slots.default = defaultSlot
        }
        return slots
    }

    function isWhitespace(node) {
        return node.isComment || node.text === " "
    }

    function resolveScopedSlots(
        fns, // see flow/vnode
        res
    ) {
        res = res || {}
        for (var i = 0; i < fns.length; i++) {
            if (Array.isArray(fns[i])) {
                resolveScopedSlots(fns[i], res)
            } else {
                res[fns[i].key] = fns[i].fn
            }
        }
        return res
    }

    /*  */

    var activeInstance = null

    function initLifecycle(vm) {
        var options = vm.$options

        // locate first non-abstract parent
        var parent = options.parent
        if (parent && !options.abstract) {
            while (parent.$options.abstract && parent.$parent) {
                parent = parent.$parent
            }
            parent.$children.push(vm)
        }

        vm.$parent = parent
        vm.$root = parent ? parent.$root : vm

        vm.$children = []
        vm.$refs = {}

        vm._watcher = null
        vm._inactive = null
        vm._directInactive = false
        vm._isMounted = false
        vm._isDestroyed = false
        vm._isBeingDestroyed = false
    }

    function lifecycleMixin(Vue) {
        Vue.prototype._update = function(vnode, hydrating) {
            var vm = this
            if (vm._isMounted) {
                callHook(vm, "beforeUpdate")
            }
            var prevEl = vm.$el
            var prevVnode = vm._vnode
            var prevActiveInstance = activeInstance
            activeInstance = vm
            vm._vnode = vnode
            // Vue.prototype.__patch__ is injected in entry points
            // based on the rendering backend used.
            if (!prevVnode) {
                // initial render
                vm.$el = vm.__patch__(
                    vm.$el,
                    vnode,
                    hydrating,
                    false /* removeOnly */,
                    vm.$options._parentElm,
                    vm.$options._refElm
                )
                // no need for the ref nodes after initial patch
                // this prevents keeping a detached DOM tree in memory (#5851)
                vm.$options._parentElm = vm.$options._refElm = null
            } else {
                // updates
                vm.$el = vm.__patch__(prevVnode, vnode)
            }
            activeInstance = prevActiveInstance
            // update __vue__ reference
            if (prevEl) {
                prevEl.__vue__ = null
            }
            if (vm.$el) {
                vm.$el.__vue__ = vm
            }
            // if parent is an HOC, update its $el as well
            if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
                vm.$parent.$el = vm.$el
            }
            // updated hook is called by the scheduler to ensure that children are
            // updated in a parent's updated hook.
        }

        Vue.prototype.$forceUpdate = function() {
            var vm = this
            if (vm._watcher) {
                vm._watcher.update()
            }
        }

        Vue.prototype.$destroy = function() {
            var vm = this
            if (vm._isBeingDestroyed) {
                return
            }
            callHook(vm, "beforeDestroy")
            vm._isBeingDestroyed = true
            // remove self from parent
            var parent = vm.$parent
            if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
                remove(parent.$children, vm)
            }
            // teardown watchers
            if (vm._watcher) {
                vm._watcher.teardown()
            }
            var i = vm._watchers.length
            while (i--) {
                vm._watchers[i].teardown()
            }
            // remove reference from data ob
            // frozen object may not have observer.
            if (vm._data.__ob__) {
                vm._data.__ob__.vmCount--
            }
            // call the last hook...
            vm._isDestroyed = true
            // invoke destroy hooks on current rendered tree
            vm.__patch__(vm._vnode, null)
            // fire destroyed hook
            callHook(vm, "destroyed")
            // turn off all instance listeners.
            vm.$off()
            // remove __vue__ reference
            if (vm.$el) {
                vm.$el.__vue__ = null
            }
        }
    }

    function mountComponent(vm, el, hydrating) {
        vm.$el = el
        if (!vm.$options.render) {
            vm.$options.render = createEmptyVNode
        }
        callHook(vm, "beforeMount")

        var updateComponent
        /* istanbul ignore if */
        if (false) {} else {
            updateComponent = function() {
                vm._update(vm._render(), hydrating)
            }
        }

        vm._watcher = new Watcher(vm, updateComponent, noop)
        hydrating = false

        // manually mounted instance, call mounted on self
        // mounted is called for render-created child components in its inserted hook
        if (vm.$vnode == null) {
            vm._isMounted = true
            callHook(vm, "mounted")
        }
        return vm
    }

    function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
        var hasChildren = !!(
            renderChildren || // has new static slots
            vm.$options._renderChildren || // has old static slots
            parentVnode.data.scopedSlots || // has new scoped slots
            vm.$scopedSlots !== emptyObject
        ) // has old scoped slots

        vm.$options._parentVnode = parentVnode
        vm.$vnode = parentVnode // update vm's placeholder node without re-render

        if (vm._vnode) {
            // update child tree's parent
            vm._vnode.parent = parentVnode
        }
        vm.$options._renderChildren = renderChildren

        // update $attrs and $listensers hash
        // these are also reactive so they may trigger child update if the child
        // used them during render
        vm.$attrs = parentVnode.data && parentVnode.data.attrs
        vm.$listeners = listeners

        // update props
        if (propsData && vm.$options.props) {
            observerState.shouldConvert = false
            var props = vm._props
            var propKeys = vm.$options._propKeys || []
            for (var i = 0; i < propKeys.length; i++) {
                var key = propKeys[i]
                props[key] = validateProp(key, vm.$options.props, propsData, vm)
            }
            observerState.shouldConvert = true
            // keep a copy of raw propsData
            vm.$options.propsData = propsData
        }

        // update listeners
        if (listeners) {
            var oldListeners = vm.$options._parentListeners
            vm.$options._parentListeners = listeners
            updateComponentListeners(vm, listeners, oldListeners)
        }
        // resolve slots + force update if has children
        if (hasChildren) {
            vm.$slots = resolveSlots(renderChildren, parentVnode.context)
            vm.$forceUpdate()
        }
    }

    function isInInactiveTree(vm) {
        while (vm && (vm = vm.$parent)) {
            if (vm._inactive) {
                return true
            }
        }
        return false
    }

    function activateChildComponent(vm, direct) {
        if (direct) {
            vm._directInactive = false
            if (isInInactiveTree(vm)) {
                return
            }
        } else if (vm._directInactive) {
            return
        }
        if (vm._inactive || vm._inactive === null) {
            vm._inactive = false
            for (var i = 0; i < vm.$children.length; i++) {
                activateChildComponent(vm.$children[i])
            }
            callHook(vm, "activated")
        }
    }

    function deactivateChildComponent(vm, direct) {
        if (direct) {
            vm._directInactive = true
            if (isInInactiveTree(vm)) {
                return
            }
        }
        if (!vm._inactive) {
            vm._inactive = true
            for (var i = 0; i < vm.$children.length; i++) {
                deactivateChildComponent(vm.$children[i])
            }
            callHook(vm, "deactivated")
        }
    }

    function callHook(vm, hook) {
        var handlers = vm.$options[hook]
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    handlers[i].call(vm)
                } catch (e) {
                    handleError(e, vm, hook + " hook")
                }
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook)
        }
    }

    /*  */

    var MAX_UPDATE_COUNT = 100

    var queue = []
    var activatedChildren = []
    var has = {}
    var circular = {}
    var waiting = false
    var flushing = false
    var index = 0

    /**
     * Reset the scheduler's state.
     */
    function resetSchedulerState() {
        index = queue.length = activatedChildren.length = 0
        has = {}
        waiting = flushing = false
    }

    /**
     * Flush both queues and run the watchers.
     */
    function flushSchedulerQueue() {
        flushing = true
        var watcher, id

        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child)
        // 2. A component's user watchers are run before its render watcher (because
        //    user watchers are created before the render watcher)
        // 3. If a component is destroyed during a parent component's watcher run,
        //    its watchers can be skipped.
        queue.sort(function(a, b) {
            return a.id - b.id
        })

        // do not cache length because more watchers might be pushed
        // as we run existing watchers
        for (index = 0; index < queue.length; index++) {
            watcher = queue[index]
            id = watcher.id
            has[id] = null
            watcher.run()
            // in dev build, check and stop circular updates.
            if (false) {}
        }

        // keep copies of post queues before resetting state
        var activatedQueue = activatedChildren.slice()
        var updatedQueue = queue.slice()

        resetSchedulerState()

        // call component updated and activated hooks
        callActivatedHooks(activatedQueue)
        callUpdatedHooks(updatedQueue)

        // devtool hook
        /* istanbul ignore if */
        if (devtools && config.devtools) {
            devtools.emit("flush")
        }
    }

    function callUpdatedHooks(queue) {
        var i = queue.length
        while (i--) {
            var watcher = queue[i]
            var vm = watcher.vm
            if (vm._watcher === watcher && vm._isMounted) {
                callHook(vm, "updated")
            }
        }
    }

    /**
     * Queue a kept-alive component that was activated during patch.
     * The queue will be processed after the entire tree has been patched.
     */
    function queueActivatedComponent(vm) {
        // setting _inactive to false here so that a render function can
        // rely on checking whether it's in an inactive tree (e.g. router-view)
        vm._inactive = false
        activatedChildren.push(vm)
    }

    function callActivatedHooks(queue) {
        for (var i = 0; i < queue.length; i++) {
            queue[i]._inactive = true
            activateChildComponent(queue[i], true /* true */)
        }
    }

    /**
     * Push a watcher into the watcher queue.
     * Jobs with duplicate IDs will be skipped unless it's
     * pushed when the queue is being flushed.
     */
    function queueWatcher(watcher) {
        var id = watcher.id
        if (has[id] == null) {
            has[id] = true
            if (!flushing) {
                queue.push(watcher)
            } else {
                // if already flushing, splice the watcher based on its id
                // if already past its id, it will be run next immediately.
                var i = queue.length - 1
                while (i > index && queue[i].id > watcher.id) {
                    i--
                }
                queue.splice(i + 1, 0, watcher)
            }
            // queue the flush
            if (!waiting) {
                waiting = true
                nextTick(flushSchedulerQueue)
            }
        }
    }

    /*  */

    var uid$2 = 0

    /**
     * A watcher parses an expression, collects dependencies,
     * and fires callback when the expression value changes.
     * This is used for both the $watch() api and directives.
     */
    var Watcher = function Watcher(vm, expOrFn, cb, options) {
        this.vm = vm
        vm._watchers.push(this)
        // options
        if (options) {
            this.deep = !!options.deep
            this.user = !!options.user
            this.lazy = !!options.lazy
            this.sync = !!options.sync
        } else {
            this.deep = this.user = this.lazy = this.sync = false
        }
        this.cb = cb
        this.id = ++uid$2 // uid for batching
        this.active = true
        this.dirty = this.lazy // for lazy watchers
        this.deps = []
        this.newDeps = []
        this.depIds = new _Set()
        this.newDepIds = new _Set()
        this.expression = ""
        // parse expression for getter
        if (typeof expOrFn === "function") {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
            if (!this.getter) {
                this.getter = function() {}
                 false &&
                    false
            }
        }
        this.value = this.lazy ? undefined : this.get()
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    Watcher.prototype.get = function get() {
        pushTarget(this)
        var value
        var vm = this.vm
        try {
            value = this.getter.call(vm, vm)
        } catch (e) {
            if (this.user) {
                handleError(e, vm, 'getter for watcher "' + this.expression + '"')
            } else {
                throw e
            }
        } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value)
            }
            popTarget()
            this.cleanupDeps()
        }
        return value
    }

    /**
     * Add a dependency to this directive.
     */
    Watcher.prototype.addDep = function addDep(dep) {
        var id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    /**
     * Clean up for dependency collection.
     */
    Watcher.prototype.cleanupDeps = function cleanupDeps() {
        var this$1 = this

        var i = this.deps.length
        while (i--) {
            var dep = this$1.deps[i]
            if (!this$1.newDepIds.has(dep.id)) {
                dep.removeSub(this$1)
            }
        }
        var tmp = this.depIds
        this.depIds = this.newDepIds
        this.newDepIds = tmp
        this.newDepIds.clear()
        tmp = this.deps
        this.deps = this.newDeps
        this.newDeps = tmp
        this.newDeps.length = 0
    }

    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    Watcher.prototype.update = function update() {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true
        } else if (this.sync) {
            this.run()
        } else {
            queueWatcher(this)
        }
    }

    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    Watcher.prototype.run = function run() {
        if (this.active) {
            var value = this.get()
            if (
                value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep
            ) {
                // set new value
                var oldValue = this.value
                this.value = value
                if (this.user) {
                    try {
                        this.cb.call(this.vm, value, oldValue)
                    } catch (e) {
                        handleError(e, this.vm, 'callback for watcher "' + this.expression + '"')
                    }
                } else {
                    this.cb.call(this.vm, value, oldValue)
                }
            }
        }
    }

    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    Watcher.prototype.evaluate = function evaluate() {
        this.value = this.get()
        this.dirty = false
    }

    /**
     * Depend on all deps collected by this watcher.
     */
    Watcher.prototype.depend = function depend() {
        var this$1 = this

        var i = this.deps.length
        while (i--) {
            this$1.deps[i].depend()
        }
    }

    /**
     * Remove self from all dependencies' subscriber list.
     */
    Watcher.prototype.teardown = function teardown() {
        var this$1 = this

        if (this.active) {
            // remove self from vm's watcher list
            // this is a somewhat expensive operation so we skip it
            // if the vm is being destroyed.
            if (!this.vm._isBeingDestroyed) {
                remove(this.vm._watchers, this)
            }
            var i = this.deps.length
            while (i--) {
                this$1.deps[i].removeSub(this$1)
            }
            this.active = false
        }
    }

    /**
     * Recursively traverse an object to evoke all converted
     * getters, so that every nested property inside the object
     * is collected as a "deep" dependency.
     */
    var seenObjects = new _Set()

    function traverse(val) {
        seenObjects.clear()
        _traverse(val, seenObjects)
    }

    function _traverse(val, seen) {
        var i, keys
        var isA = Array.isArray(val)
        if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
            return
        }
        if (val.__ob__) {
            var depId = val.__ob__.dep.id
            if (seen.has(depId)) {
                return
            }
            seen.add(depId)
        }
        if (isA) {
            i = val.length
            while (i--) {
                _traverse(val[i], seen)
            }
        } else {
            keys = Object.keys(val)
            i = keys.length
            while (i--) {
                _traverse(val[keys[i]], seen)
            }
        }
    }

    /*  */

    var sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop
    }

    function proxy(target, sourceKey, key) {
        sharedPropertyDefinition.get = function proxyGetter() {
            return this[sourceKey][key]
        }
        sharedPropertyDefinition.set = function proxySetter(val) {
            this[sourceKey][key] = val
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    function initState(vm) {
        vm._watchers = []
        var opts = vm.$options
        if (opts.props) {
            initProps(vm, opts.props)
        }
        if (opts.methods) {
            initMethods(vm, opts.methods)
        }
        if (opts.data) {
            initData(vm)
        } else {
            observe((vm._data = {}), true /* asRootData */)
        }
        if (opts.computed) {
            initComputed(vm, opts.computed)
        }
        if (opts.watch && opts.watch !== nativeWatch) {
            initWatch(vm, opts.watch)
        }
    }

    function checkOptionType(vm, name) {
        var option = vm.$options[name]
        if (!isPlainObject(option)) {
            warn('component option "' + name + '" should be an object.', vm)
        }
    }

    function initProps(vm, propsOptions) {
        var propsData = vm.$options.propsData || {}
        var props = (vm._props = {})
        // cache prop keys so that future props updates can iterate using Array
        // instead of dynamic object key enumeration.
        var keys = (vm.$options._propKeys = [])
        var isRoot = !vm.$parent
        // root instance props should be converted
        observerState.shouldConvert = isRoot
        var loop = function(key) {
            keys.push(key)
            var value = validateProp(key, propsOptions, propsData, vm)
            /* istanbul ignore else */
            {
                defineReactive$$1(props, key, value)
            }
            // static props are already proxied on the component's prototype
            // during Vue.extend(). We only need to proxy props defined at
            // instantiation here.
            if (!(key in vm)) {
                proxy(vm, "_props", key)
            }
        }

        for (var key in propsOptions) loop(key)
        observerState.shouldConvert = true
    }

    function initData(vm) {
        var data = vm.$options.data
        data = vm._data = typeof data === "function" ? getData(data, vm) : data || {}
        if (!isPlainObject(data)) {
            data = {}
             false &&
                false
        }
        // proxy data on instance
        var keys = Object.keys(data)
        var props = vm.$options.props
        var methods = vm.$options.methods
        var i = keys.length
        while (i--) {
            var key = keys[i]
            if (props && hasOwn(props, key)) {
                 false &&
                    false
            } else if (!isReserved(key)) {
                proxy(vm, "_data", key)
            }
        }
        // observe data
        observe(data, true /* asRootData */)
    }

    function getData(data, vm) {
        try {
            return data.call(vm)
        } catch (e) {
            handleError(e, vm, "data()")
            return {}
        }
    }

    var computedWatcherOptions = {
        lazy: true
    }

    function initComputed(vm, computed) {
         false && false
        var watchers = (vm._computedWatchers = Object.create(null))

        for (var key in computed) {
            var userDef = computed[key]
            var getter = typeof userDef === "function" ? userDef : userDef.get
            watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)

            // component-defined computed properties are already defined on the
            // component prototype. We only need to define computed properties defined
            // at instantiation here.
            if (!(key in vm)) {
                defineComputed(vm, key, userDef)
            } else {
            }
        }
    }

    function defineComputed(target, key, userDef) {
        if (typeof userDef === "function") {
            sharedPropertyDefinition.get = createComputedGetter(key)
            sharedPropertyDefinition.set = noop
        } else {
            sharedPropertyDefinition.get = userDef.get
                ? userDef.cache !== false
                    ? createComputedGetter(key)
                    : userDef.get
                : noop
            sharedPropertyDefinition.set = userDef.set ? userDef.set : noop
        }
        Object.defineProperty(target, key, sharedPropertyDefinition)
    }

    function createComputedGetter(key) {
        return function computedGetter() {
            var watcher = this._computedWatchers && this._computedWatchers[key]
            if (watcher) {
                if (watcher.dirty) {
                    watcher.evaluate()
                }
                if (Dep.target) {
                    watcher.depend()
                }
                return watcher.value
            }
        }
    }

    function initMethods(vm, methods) {
         false && false
        var props = vm.$options.props
        for (var key in methods) {
            vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
        }
    }

    function initWatch(vm, watch) {
         false && false
        for (var key in watch) {
            var handler = watch[key]
            if (Array.isArray(handler)) {
                for (var i = 0; i < handler.length; i++) {
                    createWatcher(vm, key, handler[i])
                }
            } else {
                createWatcher(vm, key, handler)
            }
        }
    }

    function createWatcher(vm, keyOrFn, handler, options) {
        if (isPlainObject(handler)) {
            options = handler
            handler = handler.handler
        }
        if (typeof handler === "string") {
            handler = vm[handler]
        }
        return vm.$watch(keyOrFn, handler, options)
    }

    function stateMixin(Vue) {
        // flow somehow has problems with directly declared definition object
        // when using Object.defineProperty, so we have to procedurally build up
        // the object here.
        var dataDef = {}
        dataDef.get = function() {
            return this._data
        }
        var propsDef = {}
        propsDef.get = function() {
            return this._props
        }
        Object.defineProperty(Vue.prototype, "$data", dataDef)
        Object.defineProperty(Vue.prototype, "$props", propsDef)

        Vue.prototype.$set = set
        Vue.prototype.$delete = del

        Vue.prototype.$watch = function(expOrFn, cb, options) {
            var vm = this
            if (isPlainObject(cb)) {
                return createWatcher(vm, expOrFn, cb, options)
            }
            options = options || {}
            options.user = true
            var watcher = new Watcher(vm, expOrFn, cb, options)
            if (options.immediate) {
                cb.call(vm, watcher.value)
            }
            return function unwatchFn() {
                watcher.teardown()
            }
        }
    }

    /*  */

    function initProvide(vm) {
        var provide = vm.$options.provide
        if (provide) {
            vm._provided = typeof provide === "function" ? provide.call(vm) : provide
        }
    }

    function initInjections(vm) {
        var result = resolveInject(vm.$options.inject, vm)
        if (result) {
            observerState.shouldConvert = false
            Object.keys(result).forEach(function(key) {
                /* istanbul ignore else */
                {
                    defineReactive$$1(vm, key, result[key])
                }
            })
            observerState.shouldConvert = true
        }
    }

    function resolveInject(inject, vm) {
        if (inject) {
            // inject is :any because flow is not smart enough to figure out cached
            var result = Object.create(null)
            var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject)

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i]
                var provideKey = inject[key]
                var source = vm
                while (source) {
                    if (source._provided && provideKey in source._provided) {
                        result[key] = source._provided[provideKey]
                        break
                    }
                    source = source.$parent
                }
                if (false) {}
            }
            return result
        }
    }

    /*  */

    function createFunctionalComponent(Ctor, propsData, data, context, children) {
        var props = {}
        var propOptions = Ctor.options.props
        if (isDef(propOptions)) {
            for (var key in propOptions) {
                props[key] = validateProp(key, propOptions, propsData || {})
            }
        } else {
            if (isDef(data.attrs)) {
                mergeProps(props, data.attrs)
            }
            if (isDef(data.props)) {
                mergeProps(props, data.props)
            }
        }
        // ensure the createElement function in functional components
        // gets a unique context - this is necessary for correct named slot check
        var _context = Object.create(context)
        var h = function(a, b, c, d) {
            return createElement(_context, a, b, c, d, true)
        }
        var vnode = Ctor.options.render.call(null, h, {
            data: data,
            props: props,
            children: children,
            parent: context,
            listeners: data.on || {},
            injections: resolveInject(Ctor.options.inject, context),
            slots: function() {
                return resolveSlots(children, context)
            }
        })
        if (vnode instanceof VNode) {
            vnode.functionalContext = context
            vnode.functionalOptions = Ctor.options
            if (data.slot) {
                ;(vnode.data || (vnode.data = {})).slot = data.slot
            }
        }
        return vnode
    }

    function mergeProps(to, from) {
        for (var key in from) {
            to[camelize(key)] = from[key]
        }
    }

    /*  */

    // hooks to be invoked on component VNodes during patch
    var componentVNodeHooks = {
        init: function init(vnode, hydrating, parentElm, refElm) {
            if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
                var child = (vnode.componentInstance = createComponentInstanceForVnode(
                    vnode,
                    activeInstance,
                    parentElm,
                    refElm
                ))
                child.$mount(hydrating ? vnode.elm : undefined, hydrating)
            } else if (vnode.data.keepAlive) {
                // kept-alive components, treat as a patch
                var mountedNode = vnode // work around flow
                componentVNodeHooks.prepatch(mountedNode, mountedNode)
            }
        },

        prepatch: function prepatch(oldVnode, vnode) {
            var options = vnode.componentOptions
            var child = (vnode.componentInstance = oldVnode.componentInstance)
            updateChildComponent(
                child,
                options.propsData, // updated props
                options.listeners, // updated listeners
                vnode, // new parent vnode
                options.children // new children
            )
        },

        insert: function insert(vnode) {
            var context = vnode.context
            var componentInstance = vnode.componentInstance

            if (!componentInstance._isMounted) {
                componentInstance._isMounted = true
                callHook(componentInstance, "mounted")
            }
            if (vnode.data.keepAlive) {
                if (context._isMounted) {
                    // vue-router#1212
                    // During updates, a kept-alive component's child components may
                    // change, so directly walking the tree here may call activated hooks
                    // on incorrect children. Instead we push them into a queue which will
                    // be processed after the whole patch process ended.
                    queueActivatedComponent(componentInstance)
                } else {
                    activateChildComponent(componentInstance, true /* direct */)
                }
            }
        },

        destroy: function destroy(vnode) {
            var componentInstance = vnode.componentInstance
            if (!componentInstance._isDestroyed) {
                if (!vnode.data.keepAlive) {
                    componentInstance.$destroy()
                } else {
                    deactivateChildComponent(componentInstance, true /* direct */)
                }
            }
        }
    }

    var hooksToMerge = Object.keys(componentVNodeHooks)

    function createComponent(Ctor, data, context, children, tag) {
        if (isUndef(Ctor)) {
            return
        }

        var baseCtor = context.$options._base

        // plain options object: turn it into a constructor
        if (isObject(Ctor)) {
            Ctor = baseCtor.extend(Ctor)
        }

        // if at this stage it's not a constructor or an async component factory,
        // reject.
        if (typeof Ctor !== "function") {
            return
        }

        // async component
        var asyncFactory
        if (isUndef(Ctor.cid)) {
            asyncFactory = Ctor
            Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)
            if (Ctor === undefined) {
                // return a placeholder node for async component, which is rendered
                // as a comment node but preserves all the raw information for the node.
                // the information will be used for async server-rendering and hydration.
                return createAsyncPlaceholder(asyncFactory, data, context, children, tag)
            }
        }

        data = data || {}

        // resolve constructor options in case global mixins are applied after
        // component constructor creation
        resolveConstructorOptions(Ctor)

        // transform component v-model data into props & events
        if (isDef(data.model)) {
            transformModel(Ctor.options, data)
        }

        // extract props
        var propsData = extractPropsFromVNodeData(data, Ctor, tag)

        // functional component
        if (isTrue(Ctor.options.functional)) {
            return createFunctionalComponent(Ctor, propsData, data, context, children)
        }

        // keep listeners
        var listeners = data.on

        if (isTrue(Ctor.options.abstract)) {
            // abstract components do not keep anything
            // other than props & listeners & slot

            // work around flow
            var slot = data.slot
            data = {}
            if (slot) {
                data.slot = slot
            }
        }

        // merge component management hooks onto the placeholder node
        mergeHooks(data)

        // return a placeholder vnode
        var name = Ctor.options.name || tag
        var vnode = new VNode(
            "vue-component-" + Ctor.cid + (name ? "-" + name : ""),
            data,
            undefined,
            undefined,
            undefined,
            context,
            {
                Ctor: Ctor,
                propsData: propsData,
                listeners: listeners,
                tag: tag,
                children: children
            },
            asyncFactory
        )
        return vnode
    }

    function createComponentInstanceForVnode(
        vnode, // we know it's MountedComponentVNode but flow doesn't
        parent, // activeInstance in lifecycle state
        parentElm,
        refElm
    ) {
        var vnodeComponentOptions = vnode.componentOptions
        var options = {
            _isComponent: true,
            parent: parent,
            propsData: vnodeComponentOptions.propsData,
            _componentTag: vnodeComponentOptions.tag,
            _parentVnode: vnode,
            _parentListeners: vnodeComponentOptions.listeners,
            _renderChildren: vnodeComponentOptions.children,
            _parentElm: parentElm || null,
            _refElm: refElm || null
        }
        // check inline-template render functions
        var inlineTemplate = vnode.data.inlineTemplate
        if (isDef(inlineTemplate)) {
            options.render = inlineTemplate.render
            options.staticRenderFns = inlineTemplate.staticRenderFns
        }
        return new vnodeComponentOptions.Ctor(options)
    }

    function mergeHooks(data) {
        if (!data.hook) {
            data.hook = {}
        }
        for (var i = 0; i < hooksToMerge.length; i++) {
            var key = hooksToMerge[i]
            var fromParent = data.hook[key]
            var ours = componentVNodeHooks[key]
            data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
        }
    }

    function mergeHook$1(one, two) {
        return function(a, b, c, d) {
            one(a, b, c, d)
            two(a, b, c, d)
        }
    }

    // transform component v-model info (value and callback) into
    // prop and event handler respectively.
    function transformModel(options, data) {
        var prop = (options.model && options.model.prop) || "value"
        var event = (options.model && options.model.event) || "input"
        ;(data.props || (data.props = {}))[prop] = data.model.value
        var on = data.on || (data.on = {})
        if (isDef(on[event])) {
            on[event] = [data.model.callback].concat(on[event])
        } else {
            on[event] = data.model.callback
        }
    }

    /*  */

    var SIMPLE_NORMALIZE = 1
    var ALWAYS_NORMALIZE = 2

    // wrapper function for providing a more flexible interface
    // without getting yelled at by flow
    function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
        if (Array.isArray(data) || isPrimitive(data)) {
            normalizationType = children
            children = data
            data = undefined
        }
        if (isTrue(alwaysNormalize)) {
            normalizationType = ALWAYS_NORMALIZE
        }
        return _createElement(context, tag, data, children, normalizationType)
    }

    function _createElement(context, tag, data, children, normalizationType) {
        if (isDef(data) && isDef(data.__ob__)) {
             false &&
                false
            return createEmptyVNode()
        }
        // object syntax in v-bind
        if (isDef(data) && isDef(data.is)) {
            tag = data.is
        }
        if (!tag) {
            // in case of component :is set to falsy value
            return createEmptyVNode()
        }
        // warn against non-primitive key
        if (
            false
        ) {}
        // support single function children as default scoped slot
        if (Array.isArray(children) && typeof children[0] === "function") {
            data = data || {}
            data.scopedSlots = {
                default: children[0]
            }
            children.length = 0
        }
        if (normalizationType === ALWAYS_NORMALIZE) {
            children = normalizeChildren(children)
        } else if (normalizationType === SIMPLE_NORMALIZE) {
            children = simpleNormalizeChildren(children)
        }
        var vnode, ns
        if (typeof tag === "string") {
            var Ctor
            ns = config.getTagNamespace(tag)
            if (config.isReservedTag(tag)) {
                // platform built-in elements
                vnode = new VNode(
                    config.parsePlatformTagName(tag),
                    data,
                    children,
                    undefined,
                    undefined,
                    context
                )
            } else if (isDef((Ctor = resolveAsset(context.$options, "components", tag)))) {
                // component
                vnode = createComponent(Ctor, data, context, children, tag)
            } else {
                // unknown or unlisted namespaced elements
                // check at runtime because it may get assigned a namespace when its
                // parent normalizes children
                vnode = new VNode(tag, data, children, undefined, undefined, context)
            }
        } else {
            // direct component options / constructor
            vnode = createComponent(tag, data, context, children)
        }
        if (isDef(vnode)) {
            if (ns) {
                applyNS(vnode, ns)
            }
            return vnode
        } else {
            return createEmptyVNode()
        }
    }

    function applyNS(vnode, ns) {
        vnode.ns = ns
        if (vnode.tag === "foreignObject") {
            // use default namespace inside foreignObject
            return
        }
        if (isDef(vnode.children)) {
            for (var i = 0, l = vnode.children.length; i < l; i++) {
                var child = vnode.children[i]
                if (isDef(child.tag) && isUndef(child.ns)) {
                    applyNS(child, ns)
                }
            }
        }
    }

    /*  */

    /**
     * Runtime helper for rendering v-for lists.
     */
    function renderList(val, render) {
        var ret, i, l, keys, key
        if (Array.isArray(val) || typeof val === "string") {
            ret = new Array(val.length)
            for (i = 0, l = val.length; i < l; i++) {
                ret[i] = render(val[i], i)
            }
        } else if (typeof val === "number") {
            ret = new Array(val)
            for (i = 0; i < val; i++) {
                ret[i] = render(i + 1, i)
            }
        } else if (isObject(val)) {
            keys = Object.keys(val)
            ret = new Array(keys.length)
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i]
                ret[i] = render(val[key], key, i)
            }
        }
        if (isDef(ret)) {
            ret._isVList = true
        }
        return ret
    }

    /*  */

    /**
     * Runtime helper for rendering <slot>
     */
    function renderSlot(name, fallback, props, bindObject) {
        var scopedSlotFn = this.$scopedSlots[name]
        if (scopedSlotFn) {
            // scoped slot
            props = props || {}
            if (bindObject) {
                props = extend(extend({}, bindObject), props)
            }
            return scopedSlotFn(props) || fallback
        } else {
            var slotNodes = this.$slots[name]
            // warn duplicate slot usage
            if (slotNodes && "production" !== "production") {
                slotNodes._rendered &&
                    warn(
                        'Duplicate presence of slot "' +
                            name +
                            '" found in the same render tree ' +
                            "- this will likely cause render errors.",
                        this
                    )
                slotNodes._rendered = true
            }
            return slotNodes || fallback
        }
    }

    /*  */

    /**
     * Runtime helper for resolving filters
     */
    function resolveFilter(id) {
        return resolveAsset(this.$options, "filters", id, true) || identity
    }

    /*  */

    /**
     * Runtime helper for checking keyCodes from config.
     */
    function checkKeyCodes(eventKeyCode, key, builtInAlias) {
        var keyCodes = config.keyCodes[key] || builtInAlias
        if (Array.isArray(keyCodes)) {
            return keyCodes.indexOf(eventKeyCode) === -1
        } else {
            return keyCodes !== eventKeyCode
        }
    }

    /*  */

    /**
     * Runtime helper for merging v-bind="object" into a VNode's data.
     */
    function bindObjectProps(data, tag, value, asProp, isSync) {
        if (value) {
            if (!isObject(value)) {
                 false &&
                    false
            } else {
                if (Array.isArray(value)) {
                    value = toObject(value)
                }
                var hash
                var loop = function(key) {
                    if (key === "class" || key === "style" || isReservedAttribute(key)) {
                        hash = data
                    } else {
                        var type = data.attrs && data.attrs.type
                        hash =
                            asProp || config.mustUseProp(tag, type, key)
                                ? data.domProps || (data.domProps = {})
                                : data.attrs || (data.attrs = {})
                    }
                    if (!(key in hash)) {
                        hash[key] = value[key]

                        if (isSync) {
                            var on = data.on || (data.on = {})
                            on["update:" + key] = function($event) {
                                value[key] = $event
                            }
                        }
                    }
                }

                for (var key in value) loop(key)
            }
        }
        return data
    }

    /*  */

    /**
     * Runtime helper for rendering static trees.
     */
    function renderStatic(index, isInFor) {
        var tree = this._staticTrees[index]
        // if has already-rendered static tree and not inside v-for,
        // we can reuse the same tree by doing a shallow clone.
        if (tree && !isInFor) {
            return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree)
        }
        // otherwise, render a fresh tree.
        tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(
            this._renderProxy
        )
        markStatic(tree, "__static__" + index, false)
        return tree
    }

    /**
     * Runtime helper for v-once.
     * Effectively it means marking the node as static with a unique key.
     */
    function markOnce(tree, index, key) {
        markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true)
        return tree
    }

    function markStatic(tree, key, isOnce) {
        if (Array.isArray(tree)) {
            for (var i = 0; i < tree.length; i++) {
                if (tree[i] && typeof tree[i] !== "string") {
                    markStaticNode(tree[i], key + "_" + i, isOnce)
                }
            }
        } else {
            markStaticNode(tree, key, isOnce)
        }
    }

    function markStaticNode(node, key, isOnce) {
        node.isStatic = true
        node.key = key
        node.isOnce = isOnce
    }

    /*  */

    function bindObjectListeners(data, value) {
        if (value) {
            if (!isPlainObject(value)) {
                 false &&
                    false
            } else {
                var on = (data.on = data.on ? extend({}, data.on) : {})
                for (var key in value) {
                    var existing = on[key]
                    var ours = value[key]
                    on[key] = existing ? [].concat(ours, existing) : ours
                }
            }
        }
        return data
    }

    /*  */

    function initRender(vm) {
        vm._vnode = null // the root of the child tree
        vm._staticTrees = null
        var parentVnode = (vm.$vnode = vm.$options._parentVnode) // the placeholder node in parent tree
        var renderContext = parentVnode && parentVnode.context
        vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext)
        vm.$scopedSlots = emptyObject
        // bind the createElement fn to this instance
        // so that we get proper render context inside it.
        // args order: tag, data, children, normalizationType, alwaysNormalize
        // internal version is used by render functions compiled from templates
        vm._c = function(a, b, c, d) {
            return createElement(vm, a, b, c, d, false)
        }
        // normalization is always applied for the public version, used in
        // user-written render functions.
        vm.$createElement = function(a, b, c, d) {
            return createElement(vm, a, b, c, d, true)
        }

        // $attrs & $listeners are exposed for easier HOC creation.
        // they need to be reactive so that HOCs using them are always updated
        var parentData = parentVnode && parentVnode.data
        /* istanbul ignore else */
        {
            defineReactive$$1(vm, "$attrs", parentData && parentData.attrs, null, true)
            defineReactive$$1(vm, "$listeners", parentData && parentData.on, null, true)
        }
    }

    function renderMixin(Vue) {
        Vue.prototype.$nextTick = function(fn) {
            return nextTick(fn, this)
        }

        Vue.prototype._render = function() {
            var vm = this
            var ref = vm.$options
            var render = ref.render
            var staticRenderFns = ref.staticRenderFns
            var _parentVnode = ref._parentVnode

            if (vm._isMounted) {
                // clone slot nodes on re-renders
                for (var key in vm.$slots) {
                    vm.$slots[key] = cloneVNodes(vm.$slots[key])
                }
            }

            vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject

            if (staticRenderFns && !vm._staticTrees) {
                vm._staticTrees = []
            }
            // set parent vnode. this allows render functions to have access
            // to the data on the placeholder node.
            vm.$vnode = _parentVnode
            // render self
            var vnode
            try {
                vnode = render.call(vm._renderProxy, vm.$createElement)
            } catch (e) {
                handleError(e, vm, "render function")
                // return error render result,
                // or previous vnode to prevent render error causing blank component
                /* istanbul ignore else */
                {
                    vnode = vm._vnode
                }
            }
            // return empty vnode in case the render function errored out
            if (!(vnode instanceof VNode)) {
                if (false) {}
                vnode = createEmptyVNode()
            }
            // set parent
            vnode.parent = _parentVnode
            return vnode
        }

        // internal render helpers.
        // these are exposed on the instance prototype to reduce generated render
        // code size.
        Vue.prototype._o = markOnce
        Vue.prototype._n = toNumber
        Vue.prototype._s = toString
        Vue.prototype._l = renderList
        Vue.prototype._t = renderSlot
        Vue.prototype._q = looseEqual
        Vue.prototype._i = looseIndexOf
        Vue.prototype._m = renderStatic
        Vue.prototype._f = resolveFilter
        Vue.prototype._k = checkKeyCodes
        Vue.prototype._b = bindObjectProps
        Vue.prototype._v = createTextVNode
        Vue.prototype._e = createEmptyVNode
        Vue.prototype._u = resolveScopedSlots
        Vue.prototype._g = bindObjectListeners
    }

    /*  */

    var uid = 0

    function initMixin(Vue) {
        Vue.prototype._init = function(options) {
            var vm = this
            // a uid
            vm._uid = uid++

            var startTag, endTag
            /* istanbul ignore if */
            if (false) {}

            // a flag to avoid this being observed
            vm._isVue = true
            // merge options
            if (options && options._isComponent) {
                // optimize internal component instantiation
                // since dynamic options merging is pretty slow, and none of the
                // internal component options needs special treatment.
                initInternalComponent(vm, options)
            } else {
                vm.$options = mergeOptions(
                    resolveConstructorOptions(vm.constructor),
                    options || {},
                    vm
                )
            }
            /* istanbul ignore else */
            {
                vm._renderProxy = vm
            }
            // expose real self
            vm._self = vm
            initLifecycle(vm)
            initEvents(vm)
            initRender(vm)
            callHook(vm, "beforeCreate")
            initInjections(vm) // resolve injections before data/props
            initState(vm)
            initProvide(vm) // resolve provide after data/props
            callHook(vm, "created")

            /* istanbul ignore if */
            if (false) {}

            if (vm.$options.el) {
                vm.$mount(vm.$options.el)
            }
        }
    }

    function initInternalComponent(vm, options) {
        var opts = (vm.$options = Object.create(vm.constructor.options))
        // doing this because it's faster than dynamic enumeration.
        opts.parent = options.parent
        opts.propsData = options.propsData
        opts._parentVnode = options._parentVnode
        opts._parentListeners = options._parentListeners
        opts._renderChildren = options._renderChildren
        opts._componentTag = options._componentTag
        opts._parentElm = options._parentElm
        opts._refElm = options._refElm
        if (options.render) {
            opts.render = options.render
            opts.staticRenderFns = options.staticRenderFns
        }
    }

    function resolveConstructorOptions(Ctor) {
        var options = Ctor.options
        if (Ctor.super) {
            var superOptions = resolveConstructorOptions(Ctor.super)
            var cachedSuperOptions = Ctor.superOptions
            if (superOptions !== cachedSuperOptions) {
                // super option changed,
                // need to resolve new options.
                Ctor.superOptions = superOptions
                // check if there are any late-modified/attached options (#4976)
                var modifiedOptions = resolveModifiedOptions(Ctor)
                // update base extend options
                if (modifiedOptions) {
                    extend(Ctor.extendOptions, modifiedOptions)
                }
                options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
                if (options.name) {
                    options.components[options.name] = Ctor
                }
            }
        }
        return options
    }

    function resolveModifiedOptions(Ctor) {
        var modified
        var latest = Ctor.options
        var extended = Ctor.extendOptions
        var sealed = Ctor.sealedOptions
        for (var key in latest) {
            if (latest[key] !== sealed[key]) {
                if (!modified) {
                    modified = {}
                }
                modified[key] = dedupe(latest[key], extended[key], sealed[key])
            }
        }
        return modified
    }

    function dedupe(latest, extended, sealed) {
        // compare latest and sealed to ensure lifecycle hooks won't be duplicated
        // between merges
        if (Array.isArray(latest)) {
            var res = []
            sealed = Array.isArray(sealed) ? sealed : [sealed]
            extended = Array.isArray(extended) ? extended : [extended]
            for (var i = 0; i < latest.length; i++) {
                // push original options and not sealed options to exclude duplicated options
                if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
                    res.push(latest[i])
                }
            }
            return res
        } else {
            return latest
        }
    }

    function Vue$3(options) {
        if (false) {}
        this._init(options)
    }

    initMixin(Vue$3)
    stateMixin(Vue$3)
    eventsMixin(Vue$3)
    lifecycleMixin(Vue$3)
    renderMixin(Vue$3)

    /*  */

    function initUse(Vue) {
        Vue.use = function(plugin) {
            var installedPlugins = this._installedPlugins || (this._installedPlugins = [])
            if (installedPlugins.indexOf(plugin) > -1) {
                return this
            }

            // additional parameters
            var args = toArray(arguments, 1)
            args.unshift(this)
            if (typeof plugin.install === "function") {
                plugin.install.apply(plugin, args)
            } else if (typeof plugin === "function") {
                plugin.apply(null, args)
            }
            installedPlugins.push(plugin)
            return this
        }
    }

    /*  */

    function initMixin$1(Vue) {
        Vue.mixin = function(mixin) {
            this.options = mergeOptions(this.options, mixin)
            return this
        }
    }

    /*  */

    function initExtend(Vue) {
        /**
         * Each instance constructor, including Vue, has a unique
         * cid. This enables us to create wrapped "child
         * constructors" for prototypal inheritance and cache them.
         */
        Vue.cid = 0
        var cid = 1

        /**
         * Class inheritance
         */
        Vue.extend = function(extendOptions) {
            extendOptions = extendOptions || {}
            var Super = this
            var SuperId = Super.cid
            var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
            if (cachedCtors[SuperId]) {
                return cachedCtors[SuperId]
            }

            var name = extendOptions.name || Super.options.name
            var Sub = function VueComponent(options) {
                this._init(options)
            }
            Sub.prototype = Object.create(Super.prototype)
            Sub.prototype.constructor = Sub
            Sub.cid = cid++
            Sub.options = mergeOptions(Super.options, extendOptions)
            Sub["super"] = Super

            // For props and computed properties, we define the proxy getters on
            // the Vue instances at extension time, on the extended prototype. This
            // avoids Object.defineProperty calls for each instance created.
            if (Sub.options.props) {
                initProps$1(Sub)
            }
            if (Sub.options.computed) {
                initComputed$1(Sub)
            }

            // allow further extension/mixin/plugin usage
            Sub.extend = Super.extend
            Sub.mixin = Super.mixin
            Sub.use = Super.use

            // create asset registers, so extended classes
            // can have their private assets too.
            ASSET_TYPES.forEach(function(type) {
                Sub[type] = Super[type]
            })
            // enable recursive self-lookup
            if (name) {
                Sub.options.components[name] = Sub
            }

            // keep a reference to the super options at extension time.
            // later at instantiation we can check if Super's options have
            // been updated.
            Sub.superOptions = Super.options
            Sub.extendOptions = extendOptions
            Sub.sealedOptions = extend({}, Sub.options)

            // cache constructor
            cachedCtors[SuperId] = Sub
            return Sub
        }
    }

    function initProps$1(Comp) {
        var props = Comp.options.props
        for (var key in props) {
            proxy(Comp.prototype, "_props", key)
        }
    }

    function initComputed$1(Comp) {
        var computed = Comp.options.computed
        for (var key in computed) {
            defineComputed(Comp.prototype, key, computed[key])
        }
    }

    /*  */

    function initAssetRegisters(Vue) {
        /**
         * Create asset registration methods.
         */
        ASSET_TYPES.forEach(function(type) {
            Vue[type] = function(id, definition) {
                if (!definition) {
                    return this.options[type + "s"][id]
                } else {
                    /* istanbul ignore if */
                    if (type === "component" && isPlainObject(definition)) {
                        definition.name = definition.name || id
                        definition = this.options._base.extend(definition)
                    }
                    if (type === "directive" && typeof definition === "function") {
                        definition = {
                            bind: definition,
                            update: definition
                        }
                    }
                    this.options[type + "s"][id] = definition
                    return definition
                }
            }
        })
    }

    /*  */

    var patternTypes = [String, RegExp, Array]

    function getComponentName(opts) {
        return opts && (opts.Ctor.options.name || opts.tag)
    }

    function matches(pattern, name) {
        if (Array.isArray(pattern)) {
            return pattern.indexOf(name) > -1
        } else if (typeof pattern === "string") {
            return pattern.split(",").indexOf(name) > -1
        } else if (isRegExp(pattern)) {
            return pattern.test(name)
        }
        /* istanbul ignore next */
        return false
    }

    function pruneCache(cache, current, filter) {
        for (var key in cache) {
            var cachedNode = cache[key]
            if (cachedNode) {
                var name = getComponentName(cachedNode.componentOptions)
                if (name && !filter(name)) {
                    if (cachedNode !== current) {
                        pruneCacheEntry(cachedNode)
                    }
                    cache[key] = null
                }
            }
        }
    }

    function pruneCacheEntry(vnode) {
        if (vnode) {
            vnode.componentInstance.$destroy()
        }
    }

    var KeepAlive = {
        name: "keep-alive",
        abstract: true,

        props: {
            include: patternTypes,
            exclude: patternTypes
        },

        created: function created() {
            this.cache = Object.create(null)
        },

        destroyed: function destroyed() {
            var this$1 = this

            for (var key in this$1.cache) {
                pruneCacheEntry(this$1.cache[key])
            }
        },

        watch: {
            include: function include(val) {
                pruneCache(this.cache, this._vnode, function(name) {
                    return matches(val, name)
                })
            },
            exclude: function exclude(val) {
                pruneCache(this.cache, this._vnode, function(name) {
                    return !matches(val, name)
                })
            }
        },

        render: function render() {
            var vnode = getFirstComponentChild(this.$slots.default)
            var componentOptions = vnode && vnode.componentOptions
            if (componentOptions) {
                // check pattern
                var name = getComponentName(componentOptions)
                if (
                    name &&
                    ((this.include && !matches(this.include, name)) ||
                        (this.exclude && matches(this.exclude, name)))
                ) {
                    return vnode
                }
                var key =
                    vnode.key == null
                        ? // same constructor may get registered as different local components
                          // so cid alone is not enough (#3269)
                          componentOptions.Ctor.cid +
                          (componentOptions.tag ? "::" + componentOptions.tag : "")
                        : vnode.key
                if (this.cache[key]) {
                    vnode.componentInstance = this.cache[key].componentInstance
                } else {
                    this.cache[key] = vnode
                }
                vnode.data.keepAlive = true
            }
            return vnode
        }
    }

    var builtInComponents = {
        KeepAlive: KeepAlive
    }

    /*  */

    function initGlobalAPI(Vue) {
        // config
        var configDef = {}
        configDef.get = function() {
            return config
        }
        Object.defineProperty(Vue, "config", configDef)

        // exposed util methods.
        // NOTE: these are not considered part of the public API - avoid relying on
        // them unless you are aware of the risk.
        Vue.util = {
            warn: warn,
            extend: extend,
            mergeOptions: mergeOptions,
            defineReactive: defineReactive$$1
        }

        Vue.set = set
        Vue.delete = del
        Vue.nextTick = nextTick

        Vue.options = Object.create(null)
        ASSET_TYPES.forEach(function(type) {
            Vue.options[type + "s"] = Object.create(null)
        })

        // this is used to identify the "base" constructor to extend all plain-object
        // components with in Weex's multi-instance scenarios.
        Vue.options._base = Vue

        extend(Vue.options.components, builtInComponents)

        initUse(Vue)
        initMixin$1(Vue)
        initExtend(Vue)
        initAssetRegisters(Vue)
    }

    initGlobalAPI(Vue$3)

    Object.defineProperty(Vue$3.prototype, "$isServer", {
        get: isServerRendering
    })

    Object.defineProperty(Vue$3.prototype, "$ssrContext", {
        get: function get() {
            /* istanbul ignore next */
            return this.$vnode && this.$vnode.ssrContext
        }
    })

    Vue$3.version = "2.4.1"
    Vue$3.mpvueVersion = "1.0.12"

    /* globals renderer */

    var isReservedTag = makeMap(
        "template,script,style,element,content,slot,link,meta,svg,view," +
            "a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select," +
            "slider,slider-neighbor,indicator,trisition,trisition-group,canvas," +
            "list,cell,header,loading,loading-indicator,refresh,scrollable,scroller," +
            "video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown",
        true
    )

    // these are reserved for web because they are directly compiled away
    // during template compilation
    var isReservedAttr = makeMap("style,class")

    // Elements that you can, intentionally, leave open (and which close themselves)
    // more flexable than web
    var canBeLeftOpenTag = makeMap(
        "web,spinner,switch,video,textarea,canvas," + "indicator,marquee,countdown",
        true
    )

    var isUnaryTag = makeMap("embed,img,image,input,link,meta", true)

    function mustUseProp() {
        /* console.log('mustUseProp') */
    }

    function getTagNamespace() {
        /* console.log('getTagNamespace') */
    }

    function isUnknownElement() {
        /* console.log('isUnknownElement') */
    }

    function getComKey(vm) {
        return vm && vm.$attrs ? vm.$attrs["mpcomid"] : "0"
    }

    // 用于小程序的 event type 到 web 的 event
    var eventTypeMap = {
        tap: ["tap", "click"],
        touchstart: ["touchstart"],
        touchmove: ["touchmove"],
        touchcancel: ["touchcancel"],
        touchend: ["touchend"],
        longtap: ["longtap"],
        input: ["input"],
        blur: ["change", "blur"],
        submit: ["submit"],
        focus: ["focus"],
        scrolltoupper: ["scrolltoupper"],
        scrolltolower: ["scrolltolower"],
        scroll: ["scroll"]
    }

    /*  */

    // import { namespaceMap } from 'mp/util/index'

    var obj = {}

    function createElement$1(tagName, vnode) {
        return obj
    }

    function createElementNS(namespace, tagName) {
        return obj
    }

    function createTextNode(text) {
        return obj
    }

    function createComment(text) {
        return obj
    }

    function insertBefore(parentNode, newNode, referenceNode) {}

    function removeChild(node, child) {}

    function appendChild(node, child) {}

    function parentNode(node) {
        return obj
    }

    function nextSibling(node) {
        return obj
    }

    function tagName(node) {
        return "div"
    }

    function setTextContent(node, text) {
        return obj
    }

    function setAttribute(node, key, val) {
        return obj
    }

    var nodeOps = Object.freeze({
        createElement: createElement$1,
        createElementNS: createElementNS,
        createTextNode: createTextNode,
        createComment: createComment,
        insertBefore: insertBefore,
        removeChild: removeChild,
        appendChild: appendChild,
        parentNode: parentNode,
        nextSibling: nextSibling,
        tagName: tagName,
        setTextContent: setTextContent,
        setAttribute: setAttribute
    })

    /*  */

    var ref = {
        create: function create(_, vnode) {
            registerRef(vnode)
        },
        update: function update(oldVnode, vnode) {
            if (oldVnode.data.ref !== vnode.data.ref) {
                registerRef(oldVnode, true)
                registerRef(vnode)
            }
        },
        destroy: function destroy(vnode) {
            registerRef(vnode, true)
        }
    }

    function registerRef(vnode, isRemoval) {
        var key = vnode.data.ref
        if (!key) {
            return
        }

        var vm = vnode.context
        var ref = vnode.componentInstance || vnode.elm
        var refs = vm.$refs
        if (isRemoval) {
            if (Array.isArray(refs[key])) {
                remove(refs[key], ref)
            } else if (refs[key] === ref) {
                refs[key] = undefined
            }
        } else {
            if (vnode.data.refInFor) {
                if (!Array.isArray(refs[key])) {
                    refs[key] = [ref]
                } else if (refs[key].indexOf(ref) < 0) {
                    // $flow-disable-line
                    refs[key].push(ref)
                }
            } else {
                refs[key] = ref
            }
        }
    }

    /**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/paldepind/snabbdom/blob/master/LICENSE
     *
     * modified by Evan You (@yyx990803)
     *

    /*
     * Not type-checking this because this file is perf-critical and the cost
     * of making flow understand it is not worth it.
     */

    var emptyNode = new VNode("", {}, [])

    var hooks = ["create", "activate", "update", "remove", "destroy"]

    function sameVnode(a, b) {
        return (
            a.key === b.key &&
            ((a.tag === b.tag &&
                a.isComment === b.isComment &&
                isDef(a.data) === isDef(b.data) &&
                sameInputType(a, b)) ||
                (isTrue(a.isAsyncPlaceholder) &&
                    a.asyncFactory === b.asyncFactory &&
                    isUndef(b.asyncFactory.error)))
        )
    }

    // Some browsers do not support dynamically changing type for <input>
    // so they need to be treated as different nodes
    function sameInputType(a, b) {
        if (a.tag !== "input") {
            return true
        }
        var i
        var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type
        var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type
        return typeA === typeB
    }

    function createKeyToOldIdx(children, beginIdx, endIdx) {
        var i, key
        var map = {}
        for (i = beginIdx; i <= endIdx; ++i) {
            key = children[i].key
            if (isDef(key)) {
                map[key] = i
            }
        }
        return map
    }

    function createPatchFunction(backend) {
        var i, j
        var cbs = {}

        var modules = backend.modules
        var nodeOps = backend.nodeOps

        for (i = 0; i < hooks.length; ++i) {
            cbs[hooks[i]] = []
            for (j = 0; j < modules.length; ++j) {
                if (isDef(modules[j][hooks[i]])) {
                    cbs[hooks[i]].push(modules[j][hooks[i]])
                }
            }
        }

        function emptyNodeAt(elm) {
            return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
        }

        function createRmCb(childElm, listeners) {
            function remove$$1() {
                if (--remove$$1.listeners === 0) {
                    removeNode(childElm)
                }
            }
            remove$$1.listeners = listeners
            return remove$$1
        }

        function removeNode(el) {
            var parent = nodeOps.parentNode(el)
            // element may have already been removed due to v-html / v-text
            if (isDef(parent)) {
                nodeOps.removeChild(parent, el)
            }
        }

        var inPre = 0

        function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
            vnode.isRootInsert = !nested // for transition enter check
            if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
                return
            }

            var data = vnode.data
            var children = vnode.children
            var tag = vnode.tag
            if (isDef(tag)) {
                vnode.elm = vnode.ns
                    ? nodeOps.createElementNS(vnode.ns, tag)
                    : nodeOps.createElement(tag, vnode)
                setScope(vnode)

                /* istanbul ignore if */
                {
                    createChildren(vnode, children, insertedVnodeQueue)
                    if (isDef(data)) {
                        invokeCreateHooks(vnode, insertedVnodeQueue)
                    }
                    insert(parentElm, vnode.elm, refElm)
                }

                if (false) {}
            } else if (isTrue(vnode.isComment)) {
                vnode.elm = nodeOps.createComment(vnode.text)
                insert(parentElm, vnode.elm, refElm)
            } else {
                vnode.elm = nodeOps.createTextNode(vnode.text)
                insert(parentElm, vnode.elm, refElm)
            }
        }

        function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
            var i = vnode.data
            if (isDef(i)) {
                var isReactivated = isDef(vnode.componentInstance) && i.keepAlive
                if (isDef((i = i.hook)) && isDef((i = i.init))) {
                    i(vnode, false /* hydrating */, parentElm, refElm)
                }
                // after calling the init hook, if the vnode is a child component
                // it should've created a child instance and mounted it. the child
                // component also has set the placeholder vnode's elm.
                // in that case we can just return the element and be done.
                if (isDef(vnode.componentInstance)) {
                    initComponent(vnode, insertedVnodeQueue)
                    if (isTrue(isReactivated)) {
                        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
                    }
                    return true
                }
            }
        }

        function initComponent(vnode, insertedVnodeQueue) {
            if (isDef(vnode.data.pendingInsert)) {
                insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
                vnode.data.pendingInsert = null
            }
            vnode.elm = vnode.componentInstance.$el
            if (isPatchable(vnode)) {
                invokeCreateHooks(vnode, insertedVnodeQueue)
                setScope(vnode)
            } else {
                // empty component root.
                // skip all element-related modules except for ref (#3455)
                registerRef(vnode)
                // make sure to invoke the insert hook
                insertedVnodeQueue.push(vnode)
            }
        }

        function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
            var i
            // hack for #4339: a reactivated component with inner transition
            // does not trigger because the inner node's created hooks are not called
            // again. It's not ideal to involve module-specific logic in here but
            // there doesn't seem to be a better way to do it.
            var innerNode = vnode
            while (innerNode.componentInstance) {
                innerNode = innerNode.componentInstance._vnode
                if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                    for (i = 0; i < cbs.activate.length; ++i) {
                        cbs.activate[i](emptyNode, innerNode)
                    }
                    insertedVnodeQueue.push(innerNode)
                    break
                }
            }
            // unlike a newly created component,
            // a reactivated keep-alive component doesn't insert itself
            insert(parentElm, vnode.elm, refElm)
        }

        function insert(parent, elm, ref$$1) {
            if (isDef(parent)) {
                if (isDef(ref$$1)) {
                    if (ref$$1.parentNode === parent) {
                        nodeOps.insertBefore(parent, elm, ref$$1)
                    }
                } else {
                    nodeOps.appendChild(parent, elm)
                }
            }
        }

        function createChildren(vnode, children, insertedVnodeQueue) {
            if (Array.isArray(children)) {
                for (var i = 0; i < children.length; ++i) {
                    createElm(children[i], insertedVnodeQueue, vnode.elm, null, true)
                }
            } else if (isPrimitive(vnode.text)) {
                nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
            }
        }

        function isPatchable(vnode) {
            while (vnode.componentInstance) {
                vnode = vnode.componentInstance._vnode
            }
            return isDef(vnode.tag)
        }

        function invokeCreateHooks(vnode, insertedVnodeQueue) {
            for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, vnode)
            }
            i = vnode.data.hook // Reuse variable
            if (isDef(i)) {
                if (isDef(i.create)) {
                    i.create(emptyNode, vnode)
                }
                if (isDef(i.insert)) {
                    insertedVnodeQueue.push(vnode)
                }
            }
        }

        // set scope id attribute for scoped CSS.
        // this is implemented as a special case to avoid the overhead
        // of going through the normal attribute patching process.
        function setScope(vnode) {
            var i
            var ancestor = vnode
            while (ancestor) {
                if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                    nodeOps.setAttribute(vnode.elm, i, "")
                }
                ancestor = ancestor.parent
            }
            // for slot content they should also get the scopeId from the host instance.
            if (
                isDef((i = activeInstance)) &&
                i !== vnode.context &&
                isDef((i = i.$options._scopeId))
            ) {
                nodeOps.setAttribute(vnode.elm, i, "")
            }
        }

        function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
            for (; startIdx <= endIdx; ++startIdx) {
                createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm)
            }
        }

        function invokeDestroyHook(vnode) {
            var i, j
            var data = vnode.data
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.destroy))) {
                    i(vnode)
                }
                for (i = 0; i < cbs.destroy.length; ++i) {
                    cbs.destroy[i](vnode)
                }
            }
            if (isDef((i = vnode.children))) {
                for (j = 0; j < vnode.children.length; ++j) {
                    invokeDestroyHook(vnode.children[j])
                }
            }
        }

        function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
            for (; startIdx <= endIdx; ++startIdx) {
                var ch = vnodes[startIdx]
                if (isDef(ch)) {
                    if (isDef(ch.tag)) {
                        removeAndInvokeRemoveHook(ch)
                        invokeDestroyHook(ch)
                    } else {
                        // Text node
                        removeNode(ch.elm)
                    }
                }
            }
        }

        function removeAndInvokeRemoveHook(vnode, rm) {
            if (isDef(rm) || isDef(vnode.data)) {
                var i
                var listeners = cbs.remove.length + 1
                if (isDef(rm)) {
                    // we have a recursively passed down rm callback
                    // increase the listeners count
                    rm.listeners += listeners
                } else {
                    // directly removing
                    rm = createRmCb(vnode.elm, listeners)
                }
                // recursively invoke hooks on child component root node
                if (
                    isDef((i = vnode.componentInstance)) &&
                    isDef((i = i._vnode)) &&
                    isDef(i.data)
                ) {
                    removeAndInvokeRemoveHook(i, rm)
                }
                for (i = 0; i < cbs.remove.length; ++i) {
                    cbs.remove[i](vnode, rm)
                }
                if (isDef((i = vnode.data.hook)) && isDef((i = i.remove))) {
                    i(vnode, rm)
                } else {
                    rm()
                }
            } else {
                removeNode(vnode.elm)
            }
        }

        function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
            var oldStartIdx = 0
            var newStartIdx = 0
            var oldEndIdx = oldCh.length - 1
            var oldStartVnode = oldCh[0]
            var oldEndVnode = oldCh[oldEndIdx]
            var newEndIdx = newCh.length - 1
            var newStartVnode = newCh[0]
            var newEndVnode = newCh[newEndIdx]
            var oldKeyToIdx, idxInOld, elmToMove, refElm

            // removeOnly is a special flag used only by <transition-group>
            // to ensure removed elements stay in correct relative positions
            // during leaving transitions
            var canMove = !removeOnly

            while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (isUndef(oldStartVnode)) {
                    oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
                } else if (isUndef(oldEndVnode)) {
                    oldEndVnode = oldCh[--oldEndIdx]
                } else if (sameVnode(oldStartVnode, newStartVnode)) {
                    patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
                    oldStartVnode = oldCh[++oldStartIdx]
                    newStartVnode = newCh[++newStartIdx]
                } else if (sameVnode(oldEndVnode, newEndVnode)) {
                    patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newEndVnode = newCh[--newEndIdx]
                } else if (sameVnode(oldStartVnode, newEndVnode)) {
                    // Vnode moved right
                    patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
                    canMove &&
                        nodeOps.insertBefore(
                            parentElm,
                            oldStartVnode.elm,
                            nodeOps.nextSibling(oldEndVnode.elm)
                        )
                    oldStartVnode = oldCh[++oldStartIdx]
                    newEndVnode = newCh[--newEndIdx]
                } else if (sameVnode(oldEndVnode, newStartVnode)) {
                    // Vnode moved left
                    patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
                    canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
                    oldEndVnode = oldCh[--oldEndIdx]
                    newStartVnode = newCh[++newStartIdx]
                } else {
                    if (isUndef(oldKeyToIdx)) {
                        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                    }
                    idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
                    if (isUndef(idxInOld)) {
                        // New element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
                        newStartVnode = newCh[++newStartIdx]
                    } else {
                        elmToMove = oldCh[idxInOld]
                        /* istanbul ignore if */
                        if (false) {}
                        if (sameVnode(elmToMove, newStartVnode)) {
                            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
                            oldCh[idxInOld] = undefined
                            canMove &&
                                nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
                            newStartVnode = newCh[++newStartIdx]
                        } else {
                            // same key but different element. treat as new element
                            createElm(
                                newStartVnode,
                                insertedVnodeQueue,
                                parentElm,
                                oldStartVnode.elm
                            )
                            newStartVnode = newCh[++newStartIdx]
                        }
                    }
                }
            }
            if (oldStartIdx > oldEndIdx) {
                refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
                addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
            } else if (newStartIdx > newEndIdx) {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
            }
        }

        function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
            if (oldVnode === vnode) {
                return
            }

            var elm = (vnode.elm = oldVnode.elm)

            if (isTrue(oldVnode.isAsyncPlaceholder)) {
                if (isDef(vnode.asyncFactory.resolved)) {
                    hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
                } else {
                    vnode.isAsyncPlaceholder = true
                }
                return
            }

            // reuse element for static trees.
            // note we only do this if the vnode is cloned -
            // if the new node is not cloned it means the render functions have been
            // reset by the hot-reload-api and we need to do a proper re-render.
            if (
                isTrue(vnode.isStatic) &&
                isTrue(oldVnode.isStatic) &&
                vnode.key === oldVnode.key &&
                (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
            ) {
                vnode.componentInstance = oldVnode.componentInstance
                return
            }

            var i
            var data = vnode.data
            if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
                i(oldVnode, vnode)
            }

            var oldCh = oldVnode.children
            var ch = vnode.children
            if (isDef(data) && isPatchable(vnode)) {
                for (i = 0; i < cbs.update.length; ++i) {
                    cbs.update[i](oldVnode, vnode)
                }
                if (isDef((i = data.hook)) && isDef((i = i.update))) {
                    i(oldVnode, vnode)
                }
            }
            if (isUndef(vnode.text)) {
                if (isDef(oldCh) && isDef(ch)) {
                    if (oldCh !== ch) {
                        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
                    }
                } else if (isDef(ch)) {
                    if (isDef(oldVnode.text)) {
                        nodeOps.setTextContent(elm, "")
                    }
                    addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
                } else if (isDef(oldCh)) {
                    removeVnodes(elm, oldCh, 0, oldCh.length - 1)
                } else if (isDef(oldVnode.text)) {
                    nodeOps.setTextContent(elm, "")
                }
            } else if (oldVnode.text !== vnode.text) {
                nodeOps.setTextContent(elm, vnode.text)
            }
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.postpatch))) {
                    i(oldVnode, vnode)
                }
            }
        }

        function invokeInsertHook(vnode, queue, initial) {
            // delay insert hooks for component root nodes, invoke them after the
            // element is really inserted
            if (isTrue(initial) && isDef(vnode.parent)) {
                vnode.parent.data.pendingInsert = queue
            } else {
                for (var i = 0; i < queue.length; ++i) {
                    queue[i].data.hook.insert(queue[i])
                }
            }
        }

        var bailed = false
        // list of modules that can skip create hook during hydration because they
        // are already rendered on the client or has no need for initialization
        var isRenderedModule = makeMap("attrs,style,class,staticClass,staticStyle,key")

        // Note: this is a browser-only function so we can assume elms are DOM nodes.
        function hydrate(elm, vnode, insertedVnodeQueue) {
            if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
                vnode.elm = elm
                vnode.isAsyncPlaceholder = true
                return true
            }
            vnode.elm = elm
            var tag = vnode.tag
            var data = vnode.data
            var children = vnode.children
            if (isDef(data)) {
                if (isDef((i = data.hook)) && isDef((i = i.init))) {
                    i(vnode, true /* hydrating */)
                }
                if (isDef((i = vnode.componentInstance))) {
                    // child component. it should have hydrated its own tree.
                    initComponent(vnode, insertedVnodeQueue)
                    return true
                }
            }
            if (isDef(tag)) {
                if (isDef(children)) {
                    // empty element, allow client to pick up and populate children
                    if (!elm.hasChildNodes()) {
                        createChildren(vnode, children, insertedVnodeQueue)
                    } else {
                        var childrenMatch = true
                        var childNode = elm.firstChild
                        for (var i$1 = 0; i$1 < children.length; i$1++) {
                            if (
                                !childNode ||
                                !hydrate(childNode, children[i$1], insertedVnodeQueue)
                            ) {
                                childrenMatch = false
                                break
                            }
                            childNode = childNode.nextSibling
                        }
                        // if childNode is not null, it means the actual childNodes list is
                        // longer than the virtual children list.
                        if (!childrenMatch || childNode) {
                            if (
                                false
                            ) {}
                            return false
                        }
                    }
                }
                if (isDef(data)) {
                    for (var key in data) {
                        if (!isRenderedModule(key)) {
                            invokeCreateHooks(vnode, insertedVnodeQueue)
                            break
                        }
                    }
                }
            } else if (elm.data !== vnode.text) {
                elm.data = vnode.text
            }
            return true
        }

        return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
            if (isUndef(vnode)) {
                if (isDef(oldVnode)) {
                    invokeDestroyHook(oldVnode)
                }
                return
            }

            var isInitialPatch = false
            var insertedVnodeQueue = []

            if (isUndef(oldVnode)) {
                // empty mount (likely as component), create new root element
                isInitialPatch = true
                createElm(vnode, insertedVnodeQueue, parentElm, refElm)
            } else {
                var isRealElement = isDef(oldVnode.nodeType)
                if (!isRealElement && sameVnode(oldVnode, vnode)) {
                    // patch existing root node
                    patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
                } else {
                    if (isRealElement) {
                        // mounting to a real element
                        // check if this is server-rendered content and if we can perform
                        // a successful hydration.
                        if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                            oldVnode.removeAttribute(SSR_ATTR)
                            hydrating = true
                        }
                        if (isTrue(hydrating)) {
                            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                                invokeInsertHook(vnode, insertedVnodeQueue, true)
                                return oldVnode
                            } else {
                            }
                        }
                        // either not server-rendered, or hydration failed.
                        // create an empty node and replace it
                        oldVnode = emptyNodeAt(oldVnode)
                    }
                    // replacing existing element
                    var oldElm = oldVnode.elm
                    var parentElm$1 = nodeOps.parentNode(oldElm)
                    createElm(
                        vnode,
                        insertedVnodeQueue,
                        // extremely rare edge case: do not insert if old element is in a
                        // leaving transition. Only happens when combining transition +
                        // keep-alive + HOCs. (#4590)
                        oldElm._leaveCb ? null : parentElm$1,
                        nodeOps.nextSibling(oldElm)
                    )

                    if (isDef(vnode.parent)) {
                        // component root element replaced.
                        // update parent placeholder node element, recursively
                        var ancestor = vnode.parent
                        while (ancestor) {
                            ancestor.elm = vnode.elm
                            ancestor = ancestor.parent
                        }
                        if (isPatchable(vnode)) {
                            for (var i = 0; i < cbs.create.length; ++i) {
                                cbs.create[i](emptyNode, vnode.parent)
                            }
                        }
                    }

                    if (isDef(parentElm$1)) {
                        removeVnodes(parentElm$1, [oldVnode], 0, 0)
                    } else if (isDef(oldVnode.tag)) {
                        invokeDestroyHook(oldVnode)
                    }
                }
            }

            invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
            return vnode.elm
        }
    }

    /*  */

    // import baseModules from 'core/vdom/modules/index'
    // const platformModules = []
    // import platformModules from 'web/runtime/modules/index'

    // the directive module should be applied last, after all
    // built-in modules have been applied.
    // const modules = platformModules.concat(baseModules)
    var modules = [ref]

    var corePatch = createPatchFunction({
        nodeOps: nodeOps,
        modules: modules
    })

    function patch() {
        corePatch.apply(this, arguments)
        this.$updateDataToMP()
    }

    function callHook$1(vm, hook, params) {
        var handlers = vm.$options[hook]
        if (hook === "onError" && handlers) {
            handlers = [handlers]
        }

        var ret
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                try {
                    ret = handlers[i].call(vm, params)
                } catch (e) {
                    handleError(e, vm, hook + " hook")
                }
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook)
        }

        // for child
        if (vm.$children.length) {
            vm.$children.forEach(function(v) {
                return callHook$1(v, hook, params)
            })
        }

        return ret
    }

    // mpType 小程序实例的类型，可能的值是 'app', 'page'
    // rootVueVM 是 vue 的根组件实例，子组件中访问 this.$root 可得
    function getGlobalData(app, rootVueVM) {
        var mp = rootVueVM.$mp
        if (app && app.globalData) {
            mp.appOptions = app.globalData.appOptions
        }
    }

    // 格式化 properties 属性，并给每个属性加上 observer 方法

    // properties 的 一些类型 https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
    // properties: {
    //   paramA: Number,
    //   myProperty: { // 属性名
    //     type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //     value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
    //     observer: function(newVal, oldVal, changedPath) {
    //        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    //        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
    //     }
    //   },
    // }

    // props 的一些类型 https://cn.vuejs.org/v2/guide/components-props.html#ad
    // props: {
    //   // 基础的类型检查 (`null` 匹配任何类型)
    //   propA: Number,
    //   // 多个可能的类型
    //   propB: [String, Number],
    //   // 必填的字符串
    //   propC: {
    //     type: String,
    //     required: true
    //   },
    //   // 带有默认值的数字
    //   propD: {
    //     type: Number,
    //     default: 100
    //   },
    //   // 带有默认值的对象
    //   propE: {
    //     type: Object,
    //     // 对象或数组且一定会从一个工厂函数返回默认值
    //     default: function () {
    //       return { message: 'hello' }
    //     }
    //   },
    //   // 自定义验证函数
    //   propF: {
    //     validator: function (value) {
    //       // 这个值必须匹配下列字符串中的一个
    //       return ['success', 'warning', 'danger'].indexOf(value) !== -1
    //     }
    //   }
    // }

    // core/util/options
    function normalizeProps$1(props, res, vm) {
        if (!props) {
            return
        }
        var i, val, name
        if (Array.isArray(props)) {
            i = props.length
            while (i--) {
                val = props[i]
                if (typeof val === "string") {
                    name = camelize(val)
                    res[name] = {
                        type: null
                    }
                } else {
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key]
                name = camelize(key)
                res[name] = isPlainObject(val)
                    ? val
                    : {
                          type: val
                      }
            }
        }

        // fix vueProps to properties
        for (var key$1 in res) {
            if (res.hasOwnProperty(key$1)) {
                var item = res[key$1]
                if (item.default) {
                    item.value = item.default
                }
                var oldObserver = item.observer
                item.observer = function(newVal, oldVal) {
                    vm[name] = newVal
                    // 先修改值再触发原始的 observer，跟 watch 行为保持一致
                    if (typeof oldObserver === "function") {
                        oldObserver.call(vm, newVal, oldVal)
                    }
                }
            }
        }

        return res
    }

    function normalizeProperties(vm) {
        var properties = vm.$options.properties
        var vueProps = vm.$options.props
        var res = {}

        normalizeProps$1(properties, res, vm)
        normalizeProps$1(vueProps, res, vm)

        return res
    }

    /**
     * 把 properties 中的属性 proxy 到 vm 上
     */
    function initMpProps(vm) {
        var mpProps = (vm._mpProps = {})
        var keys = Object.keys(vm.$options.properties || {})
        keys.forEach(function(key) {
            if (!(key in vm)) {
                proxy(vm, "_mpProps", key)
                mpProps[key] = undefined // for observe
            }
        })
        observe(mpProps, true)
    }

    function initMP(mpType, next) {
        var rootVueVM = this.$root
        if (!rootVueVM.$mp) {
            rootVueVM.$mp = {}
        }

        var mp = rootVueVM.$mp

        // Please do not register multiple Pages
        // if (mp.registered) {
        if (mp.status) {
            // 处理子组件的小程序生命周期
            if (mpType === "app") {
                callHook$1(this, "onLaunch", mp.appOptions)
            } else {
                this.__wxWebviewId__ = rootVueVM.__wxWebviewId__
                this.__wxExparserNodeId__ = rootVueVM.__wxExparserNodeId__
                callHook$1(this, "onLoad", mp.query)
                // callHook$1(this, "onReady") // 避免 onReady触发两次
            }
            return next()
        }
        // mp.registered = true

        mp.mpType = mpType
        mp.status = "register"

        if (mpType === "app") {
            global.App({
                // 页面的初始数据
                globalData: {
                    appOptions: {}
                },

                handleProxy: function handleProxy(e) {
                    return rootVueVM.$handleProxyWithVue(e)
                },

                // Do something initial when launch.
                onLaunch: function onLaunch(options) {
                    if (options === void 0) options = {}

                    mp.app = this
                    mp.status = "launch"
                    this.globalData.appOptions = mp.appOptions = options
                    callHook$1(rootVueVM, "onLaunch", options)
                    next()
                },

                // Do something when app show.
                onShow: function onShow(options) {
                    if (options === void 0) options = {}

                    mp.status = "show"
                    this.globalData.appOptions = mp.appOptions = options
                    callHook$1(rootVueVM, "onShow", options)
                },

                // Do something when app hide.
                onHide: function onHide() {
                    mp.status = "hide"
                    callHook$1(rootVueVM, "onHide")
                },

                onError: function onError(err) {
                    callHook$1(rootVueVM, "onError", err)
                },
                //fixed by xxxxxx
                onUniNViewMessage: function onUniNViewMessage(e) {
                    callHook$1(rootVueVM, "onUniNViewMessage", e)
                }
            })
        } else if (mpType === "component") {
            initMpProps(rootVueVM)

            global.Component({
                // 小程序原生的组件属性
                properties: normalizeProperties(rootVueVM),
                // 页面的初始数据
                data: {
                    $root: {}
                },
                methods: {
                    handleProxy: function handleProxy(e) {
                        return rootVueVM.$handleProxyWithVue(e)
                    }
                },
                // mp lifecycle for vue
                // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
                created: function created() {
                    mp.status = "created"
                    mp.page = this
                },
                // 组件生命周期函数，在组件实例进入页面节点树时执行
                attached: function attached() {
                    mp.status = "attached"
                    callHook$1(rootVueVM, "attached")
                },
                // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
                ready: function ready() {
                    mp.status = "ready"

                    callHook$1(rootVueVM, "ready")
                    next()

                    // 只有页面需要 setData
                    rootVueVM.$nextTick(function() {
                        rootVueVM._initDataToMP()
                    })
                },
                // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
                moved: function moved() {
                    callHook$1(rootVueVM, "moved")
                },
                // 组件生命周期函数，在组件实例被从页面节点树移除时执行
                detached: function detached() {
                    mp.status = "detached"
                    callHook$1(rootVueVM, "detached")
                }
            })
        } else {
            var app = global.getApp()
    
            
            global.Page({
                // 页面的初始数据
                data: {
                    $root: {}
                },

                handleProxy: function handleProxy(e) {
                    return rootVueVM.$handleProxyWithVue(e)
                },

                // mp lifecycle for vue
                // 生命周期函数--监听页面加载
                onLoad: function onLoad(query) {
                    rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
                    rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__
                    mp.page = this
                    mp.query = query
                    mp.status = "load"
                    getGlobalData(app, rootVueVM)
                    //仅load时重置数据
                    if (rootVueVM.$options && typeof rootVueVM.$options.data === "function") {
                    		Object.assign(rootVueVM.$data, rootVueVM.$options.data())
                    }
                    callHook$1(rootVueVM, "onLoad", query)
                },

                // 生命周期函数--监听页面显示
                onShow: function onShow() {
                    rootVueVM.__wxWebviewId__ = this.__wxWebviewId__//fixed by xxxxxx(createIntersectionObserver)
                    rootVueVM.__wxExparserNodeId__ = this.__wxExparserNodeId__
                    mp.page = this
                    mp.status = "show"
                
                    callHook$1(rootVueVM, "onShow")
                    
                    //   // 只有页面需要 setData
                    rootVueVM.$nextTick(function () {
                    	rootVueVM._initDataToMP();
                    });
                },

                // 生命周期函数--监听页面初次渲染完成
                onReady: function onReady() {
                    mp.status = "ready"

                    callHook$1(rootVueVM, "onReady")
                    next()
                },

                // 生命周期函数--监听页面隐藏
                onHide: function onHide() {
                    mp.status = "hide"
                    callHook$1(rootVueVM, "onHide")
                },

                // 生命周期函数--监听页面卸载
                onUnload: function onUnload() {
                    mp.status = "unload"
                    callHook$1(rootVueVM, "onUnload")
                    mp.page = null
                },

                // 页面相关事件处理函数--监听用户下拉动作
                onPullDownRefresh: function onPullDownRefresh() {
                    callHook$1(rootVueVM, "onPullDownRefresh")
                },

                // 页面上拉触底事件的处理函数
                onReachBottom: function onReachBottom() {
                    callHook$1(rootVueVM, "onReachBottom")
                },

                // 用户点击右上角分享
                onShareAppMessage: rootVueVM.$options.onShareAppMessage
                    ? function(options) {
                          return callHook$1(rootVueVM, "onShareAppMessage", options)
                      }
                    : null,

                // Do something when page scroll
                onPageScroll: function onPageScroll(options) {
                    callHook$1(rootVueVM, "onPageScroll", options)
                },

                // 当前是 tab 页时，点击 tab 时触发
                onTabItemTap: function onTabItemTap(options) {
                    callHook$1(rootVueVM, "onTabItemTap", options)
                }
            })
        }
    }

    // 节流方法，性能优化
    // 全局的命名约定，为了节省编译的包大小一律采取形象的缩写，说明如下。
    // $c === $child
    // $k === $comKey

    // 新型的被拍平的数据结构
    // {
    //   $root: {
    //     '1-1'{
    //       // ... data
    //     },
    //     '1.2-1': {
    //       // ... data1
    //     },
    //     '1.2-2': {
    //       // ... data2
    //     }
    //   }
    // }

    function getVmData(vm) {
        // 确保当前 vm 所有数据被同步
        var dataKeys = [].concat(
            Object.keys(vm._data || {}),
            Object.keys(vm._props || {}),
            Object.keys(vm._mpProps || {}),
            Object.keys(vm._computedWatchers || {})
        )
        return dataKeys.reduce(function(res, key) {
            res[key] = vm[key]
            return res
        }, {})
    }

    function getParentComKey(vm, res) {
        if (res === void 0) res = []

        var ref = vm || {}
        var $parent = ref.$parent
        if (!$parent) {
            return res
        }
        res.unshift(getComKey($parent))
        if ($parent.$parent) {
            return getParentComKey($parent, res)
        }
        return res
    }

    function formatVmData(vm) {
        var $p = getParentComKey(vm).join(",")
        var $k = $p + ($p ? "," : "") + getComKey(vm)

        // getVmData 这儿获取当前组件内的所有数据，包含 props、computed 的数据
        // 改动 vue.runtime 所获的的核心能力
        var data = Object.assign(getVmData(vm), {
            $k: $k,
            $kk: $k + ",",
            $p: $p
        })
        var key = "$root." + $k
        var res = {}
        res[key] = data
        return res
    }

    function collectVmData(vm, res) {
        if (res === void 0) res = {}

        var vms = vm.$children
        if (vms && vms.length) {
            vms.forEach(function(v) {
                return collectVmData(v, res)
            })
        }
        return Object.assign(res, formatVmData(vm))
    }

    /**
     * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
     * 自动合并 data
     *
     * @param  {function}   func      传入函数
     * @param  {number}     wait      表示时间窗口的间隔
     * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
     *                                如果想忽略结尾边界上的调用，传入{trailing: false}
     * @return {function}             返回客户调用函数
     */
    function throttle(func, wait, options) {
        var context, args, result
        var timeout = null
        // 上次执行时间点
        var previous = 0
        if (!options) {
            options = {}
        }
        // 延迟执行函数
        function later() {
            // 若设定了开始边界不执行选项，上次执行时间始终为0
            previous = options.leading === false ? 0 : Date.now()
            timeout = null
            result = func.apply(context, args)
            if (!timeout) {
                context = args = null
            }
        }
        return function(handle, data) {
            var now = Date.now()
            // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
            if (!previous && options.leading === false) {
                previous = now
            }
            // 延迟执行时间间隔
            var remaining = wait - (now - previous)
            context = this
            args = args ? [handle, Object.assign(args[1], data)] : [handle, data]
            // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
            // remaining大于时间窗口wait，表示客户端系统时间被调整过
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout)
                timeout = null
                previous = now
                result = func.apply(context, args)
                if (!timeout) {
                    context = args = null
                }
                // 如果延迟执行不存在，且没有设定结尾边界不执行选项
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
            return result
        }
    }

    // 优化频繁的 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
    var throttleSetData = throttle(function(handle, data) {
        handle && handle(data)
    }, 50)

    function getPage(vm) {
        var rootVueVM = vm.$root
        var ref = rootVueVM.$mp || {}
        var mpType = ref.mpType
        if (mpType === void 0) mpType = ""
        var page = ref.page

        // 优化后台态页面进行 setData: https://mp.weixin.qq.com/debug/wxadoc/dev/framework/performance/tips.html
        if (mpType === "app" || !page || typeof page.setData !== "function") {
            return
        }
        return page
    }

    // 优化每次 setData 都传递大量新数据
    function updateDataToMP() {
        var page = getPage(this)
        if (!page) {
            return
        }

        var data = JSON.parse(JSON.stringify(formatVmData(this)))
        //fixed by xxxxxx
        throttleSetData(page.setData.bind(page), diff(data, page.data))
    }

    function initDataToMP() {
        var page = getPage(this)
        if (!page) {
            return
        }

        var data = collectVmData(this.$root)
        //fixed by xxxxxx
        page.setData(JSON.parse(JSON.stringify(data)))
    }

    function getVM(vm, comkeys) {
        if (comkeys === void 0) comkeys = []

        var keys = comkeys.slice(1)
        if (!keys.length) {
            return vm
        }

        return keys.reduce(function(res, key) {
            var len = res.$children.length
            for (var i = 0; i < len; i++) {
                var v = res.$children[i]
                var k = getComKey(v)
                if (k === key) {
                    res = v
                    return res
                }
            }
            return res
        }, vm)
    }

    function getHandle(vnode, eventid, eventTypes) {
        if (eventTypes === void 0) eventTypes = []

        var res = []
        if (!vnode || !vnode.tag) {
            return res
        }

        var ref = vnode || {}
        var data = ref.data
        if (data === void 0) data = {}
        var children = ref.children
        if (children === void 0) children = []
        var componentInstance = ref.componentInstance
        if (componentInstance) {
            // 增加 slot 情况的处理
            // Object.values 会多增加几行编译后的代码
            Object.keys(componentInstance.$slots).forEach(function(slotKey) {
                var slot = componentInstance.$slots[slotKey]
                var slots = Array.isArray(slot) ? slot : [slot]
                slots.forEach(function(node) {
                    res = res.concat(getHandle(node, eventid, eventTypes))
                })
            })
        } else {
            // 避免遍历超出当前组件的 vm
            children.forEach(function(node) {
                res = res.concat(getHandle(node, eventid, eventTypes))
            })
        }

        var attrs = data.attrs
        var on = data.on
        if (attrs && on && attrs["eventid"] === eventid) {
            eventTypes.forEach(function(et) {
                var h = on[et]
                if (typeof h === "function") {
                    res.push(h)
                } else if (Array.isArray(h)) {
                    res = res.concat(h)
                }
            })
            return res
        }

        return res
    }

    function getWebEventByMP(e) {
        var type = e.type
        var timeStamp = e.timeStamp
        var touches = e.touches
        var detail = e.detail
        if (detail === void 0) detail = {}
        var target = e.target
        if (target === void 0) target = {}
        var currentTarget = e.currentTarget
        if (currentTarget === void 0) currentTarget = {}
        var x = detail.x
        var y = detail.y
        var event = {
            mp: e,
            type: type,
            timeStamp: timeStamp,
            x: x,
            y: y,
            target: Object.assign({}, target, detail),
            detail: detail, //fixed by xxxxxx
            currentTarget: currentTarget,
            stopPropagation: noop,
            preventDefault: noop
        }

        if (touches && touches.length) {
            Object.assign(event, touches[0])
            event.touches = touches
        }
        return event
    }

    function handleProxyWithVue(e) {
        var rootVueVM = this.$root
        var type = e.type
        var target = e.target
        if (target === void 0) target = {}
        var currentTarget = e.currentTarget
        var ref = currentTarget || target
        var dataset = ref.dataset
        if (dataset === void 0) dataset = {}
        var comkey = dataset.comkey
        if (comkey === void 0) comkey = ""
        var eventid = dataset.eventid
        var vm = getVM(rootVueVM, comkey.split(","))

        if (!vm) {
            return
        }

        var webEventTypes = eventTypeMap[type] || [type]
        var handles = getHandle(vm._vnode, eventid, webEventTypes)

        // TODO, enevt 还需要处理更多
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Event
        if (handles.length) {
            var event = getWebEventByMP(e)
            if (handles.length === 1) {
                var result = handles[0](event)
                return result
            }
            handles.forEach(function(h) {
                return h(event)
            })
        }
    }

    // for platforms
    // import config from 'core/config'
    // install platform specific utils
    Vue$3.config.mustUseProp = mustUseProp
    Vue$3.config.isReservedTag = isReservedTag
    Vue$3.config.isReservedAttr = isReservedAttr
    Vue$3.config.getTagNamespace = getTagNamespace
    Vue$3.config.isUnknownElement = isUnknownElement

    // install platform patch function
    Vue$3.prototype.__patch__ = patch

    // public mount method
    Vue$3.prototype.$mount = function(el, hydrating) {
        var this$1 = this

        // el = el && inBrowser ? query(el) : undefined
        // return mountComponent(this, el, hydrating)

        // 初始化小程序生命周期相关
        var options = this.$options

        if (options && (options.render || options.mpType)) {
            var mpType = options.mpType
            if (mpType === void 0) mpType = "page"
            return this._initMP(mpType, function() {
                return mountComponent(this$1, undefined, undefined)
            })
        } else {
            return mountComponent(this, undefined, undefined)
        }
    }

    // for mp
    Vue$3.prototype._initMP = initMP

    Vue$3.prototype.$updateDataToMP = updateDataToMP
    Vue$3.prototype._initDataToMP = initDataToMP

    Vue$3.prototype.$handleProxyWithVue = handleProxyWithVue

    /*  */

    return Vue$3
})

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default2 =





























{
  name: 'UniCalendarItem',
  props: {
    /**
            * 当前日期
            */
    canlender: {
      type: null,
      default: function _default() {
        return {};
      } },

    lunar: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {};
  },
  created: function created() {},
  methods: {
    selectDays: function selectDays(week, index, ischeck, isDay, lunar) {
      this.$emit('selectDays', {
        week: week,
        index: index,
        ischeck: ischeck,
        isDay: isDay,
        lunar: lunar });

    } } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;










































var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar.js */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/calendar.js"));
var _uniCalendarItem = _interopRequireDefault(__webpack_require__(/*! ./uni-calendar-item.vue */ "../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var _default2 =
{
  name: 'UniCalendar',
  components: {
    uniCalendarItem: _uniCalendarItem.default },

  props: {
    /**
            * 当前日期
            */
    date: {
      type: String,
      default: '' },

    /**
                      * 打点日期
                      */
    selected: {
      type: Array,
      default: function _default() {
        return [];
      } },

    /**
            * 是否开启阴历日期
            */
    lunar: {
      type: Boolean,
      default: false },

    /**
                         * 是否禁用今天之前的日期
                         */
    disableBefore: {
      type: Boolean,
      default: false },

    /**
                         * 开始时间
                         */
    startDate: {
      type: String,
      default: '' },

    /**
                      * 结束时间
                      */
    endDate: {
      type: String,
      default: '' },

    /**
                      * 范围
                      */
    range: {
      type: Boolean,
      default: false },

    /**
                         * 插入
                         */
    insert: {
      type: Boolean,
      default: false } },


  data: function data() {
    /**
                          * TODO 兼容新旧编译器
                          * 新编译器（自定义组件模式）下必须使用固定数值，否则部分平台下会获取不到节点。
                          * 随机数值是在旧编译器下使用的，旧编译器模式已经不推荐使用，后续直接废掉随机数值的写法。
                          */
    return {
      maskShow: false, // 显示日历
      aniMaskShow: false,
      dateShow: false, // 日期是否选择
      canlender: {
        weeks: [] },

      multiple: 0,
      multipleDates: {
        begin: '',
        end: '',
        data: [] },

      isLunar: false };

  },
  watch: {
    date: function date() {
      this.init();
    },
    selected: function selected() {
      this.init();
    },
    lunar: function lunar(newVal) {
      this.isLunar = newVal;
      this.init();
    },
    disableBefore: function disableBefore() {
      this.init();
    },
    startDate: function startDate() {
      this.init();
    },
    endDate: function endDate() {
      this.init();
    } },

  created: function created() {
    this.isLunar = this.lunar;
    this.init();
  },
  methods: {
    init: function init() {
      // 初始化日历
      // this.canlender = this.getWeek(this.date || new Date());
      this.getMonthAll(0, this.date, true);
    },
    open: function open() {var _this = this;
      this.maskShow = true;
      this.multiple = 0;
      this.multipleDates.data = [];
      this.multipleDates.begin = '';
      this.multipleDates.end = '';
      this.init();
      this.$nextTick(function () {
        setTimeout(function () {return _this.aniMaskShow = true;}, 30);
      });
    },
    close: function close() {var _this2 = this;
      this.aniMaskShow = false;
      this.$nextTick(function () {
        setTimeout(function () {return _this2.maskShow = false;}, 300);
      });
    },
    confirm: function confirm() {
      this.setEmit('confirm');
      this.close();
    },
    /**
        * 获取当前月份全部日期
        */
    getMonthAll: function getMonthAll(index, date) {
      if (date === '') {
        date = new Date();
      }
      var canlender = this.getWeek(this.getDate(date, index, 'month'));
      this.canlender = canlender;
      if (this.insert) {
        this.setEmit('change');
      }
    },
    /**
        * 设置事件
        * @param {Object} canlender
        */
    setEmit: function setEmit(name) {
      var canlender = this.canlender;
      this.$emit(name, {
        range: this.range ? this.multipleDates : {},
        year: canlender.year,
        month: canlender.month,
        date: canlender.date,
        lunar: canlender.lunar,
        clockinfo: canlender.clockinfo || {},
        fulldate: canlender.year + '-' + canlender.month + '-' + canlender.date });

    },
    /**
        * 今天之前是否禁用
        * @param {Object} year 年
        * @param {Object} month 月
        * @param {Object} date 日
        */
    isDisableBefore: function isDisableBefore(year, month, date) {
      var nowDate = this.date || new Date();
      var time = year + '-' + month + '-' + date;
      var startDate = false;
      var endDate = false;
      if (this.startDate) {
        startDate = this.dateCompare(this.startDate, time);
      }
      if (this.endDate) {
        endDate = this.dateCompare(this.getDate(this.endDate, 1), time);
      }

      if (this.disableBefore) {
        if (!this.startDate) {
          if (!this.endDate) {
            return !this.dateCompare(this.getDate(nowDate, 0), time);
          } else {
            return !this.dateCompare(this.getDate(nowDate, 0), time) || endDate;
          }
        } else {
          return !this.dateCompare(this.getDate(nowDate, 0), time) || !startDate || endDate;
        }
      } else {
        if (!this.startDate) {
          if (!this.endDate) {
            return false;
          } else {
            return endDate;
          }
        } else {
          return !startDate || endDate;
        }
      }
    },
    /**
        * 返回今天
        */
    backtoday: function backtoday() {
      this.getMonthAll(0, this.date);
    },
    /**
        * 切换前一月 || 后一月
        * @param {Object} id
        * @param {Object} types
        */
    dataBefor: function dataBefor(id, types) {
      var year = this.canlender.year + '-' + this.canlender.month + '-' + this.canlender.date;
      this.getMonthAll(id, year);
    },
    /**
        * 选择当前的日期
        * week 当前的周
        * index 点击的下标索引
        * ischeck 是否选中
        */
    selectDays: function selectDays(params) {var

      week =



      params.week,index = params.index,ischeck = params.ischeck,isDay = params.isDay;
      if (!ischeck) return;
      if (isDay) return;
      // 多选判断

      var canlender = this.canlender;
      var month = canlender.weeks[week][index].month < 10 ? '0' + canlender.weeks[week][index].month : canlender.weeks[
      week][index].month;
      var date = canlender.weeks[week][index].date < 10 ? '0' + canlender.weeks[week][index].date : canlender.weeks[
      week][index].date;
      var time = canlender.year + '-' + month + '-' + date;
      this.isClick = true;
      // this.multiple = this.multiple === 0 ? 1 : 0;

      if (this.multiple === 0) {
        this.multipleDates.begin = time;
        this.multiple = 1;
      } else if (this.multiple === 1) {
        this.multiple = 2;
        if (this.multipleDates.data) {
          this.multipleDates.data = [];
        }
        var compare = this.dateCompare(this.multipleDates.begin, time);
        if (compare) {
          this.multipleDates.data = this.geDateAll(this.multipleDates.begin, time);
          this.multipleDates.end = time;
        } else {
          this.multipleDates.data = this.geDateAll(time, this.multipleDates.begin);
          this.multipleDates.end = this.multipleDates.begin;
          this.multipleDates.begin = time;
        }
      } else {
        this.multiple = 0;
        this.multipleDates.data = [];
        this.multipleDates.begin = '';
        this.multipleDates.end = '';
      }
      this.getMonthAll(0, time);
    },
    // 获取日历内容
    getWeek: function getWeek(dateData) {var _this3 = this;
      // 判断当前是 安卓还是ios ，传入不容的日期格式
      if (typeof dateData !== 'object') {
        dateData = dateData.replace(/-/g, '/');
      }
      var selected = this.selected;
      var nowDate = this.getDate(this.date || new Date());var _this$getNewDate =





      this.getNewDate(dateData),year = _this$getNewDate.year,month = _this$getNewDate.month,date = _this$getNewDate.date,day = _this$getNewDate.day;
      var canlender = [];
      var dates = {
        firstDay: new Date(year, month - 1, 1).getDay(),
        lastMonthDays: [], // 上个月末尾几天
        currentMonthDys: [], // 本月天数
        nextMonthDays: [], // 下个月开始几天
        endDay: new Date(year, month, 0).getDay(),
        weeks: []

        // 循环上个月末尾几天添加到数组
      };for (var i = dates.firstDay; i > 0; i--) {
        var beforeDate = new Date(year, month - 1, -i + 1).getDate() + '';
        dates.lastMonthDays.push({
          date: beforeDate,
          month: month - 1,
          disable: this.isDisableBefore(year, month - 1, beforeDate),
          lunar: this.getlunar(year, month - 1, beforeDate),
          isDay: false });

      }
      var clockinfo = {
        have: false

        // 循环本月天数添加到数组
      };var _loop = function _loop(_i) {
        var have = false;
        var clockinfoTemp = {};
        // 处理打卡信息
        for (var j = 0; j < selected.length; j++) {
          var selDate = selected[j].date.split('-');

          if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(_i) === Number(
          selDate[2])) {
            have = true;
            clockinfoTemp.have = true;
            clockinfoTemp.date = selected[j].date;
            if (selected[j].info) {
              clockinfoTemp.info = selected[j].info;
            }
            if (JSON.stringify(selected[j].data) === '{}' || selected[j].data !== undefined) {
              clockinfoTemp.data = selected[j].data;
            }
            if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(date) ===
            Number(selDate[2])) {
              clockinfo = clockinfoTemp;
            }
          }
        }
        // 多选
        var _this3$multipleDates =



        _this3.multipleDates,begin = _this3$multipleDates.begin,end = _this3$multipleDates.end,data = _this3$multipleDates.data;var _begin$split =
        begin.split('-'),_begin$split2 = _slicedToArray(_begin$split, 3),bYear = _begin$split2[0],bMonth = _begin$split2[1],bDate = _begin$split2[2];var _end$split =
        end.split('-'),_end$split2 = _slicedToArray(_end$split, 3),eYear = _end$split2[0],eMonth = _end$split2[1],eDate = _end$split2[2];
        var checked = false;
        var multipleBegin = false;
        var multipleEnd = false;
        data.forEach(function (item, index) {var _item$split =
          item.split('-'),_item$split2 = _slicedToArray(_item$split, 3),mYear = _item$split2[0],mMonth = _item$split2[1],mDate = _item$split2[2];
          if (year === Number(mYear) && month === Number(mMonth) && _i === Number(mDate)) {
            checked = true;
          }
        });
        // 开始日期
        if (year === Number(bYear) && month === Number(bMonth) && _i === Number(bDate)) {
          multipleBegin = true;
        }

        // 结束日期
        if (year === Number(eYear) && month === Number(eMonth) && _i === Number(eDate)) {
          // console.log(eYear, eMonth, eDate, 'end');
          multipleEnd = true;
        }

        dates.currentMonthDys.push({
          checked: _this3.range ? checked : false,
          multipleBegin: _this3.range ? multipleBegin : false,
          multipleEnd: _this3.range ? multipleEnd : false,
          date: _i + '',
          month: month,
          have: have,
          clockinfo: clockinfoTemp,
          disable: _this3.isDisableBefore(year, month, _i + ''),
          lunar: _this3.getlunar(year, month, _i + ''),
          isDay: nowDate === year + '-' + (month < 10 ? '0' + month : month) + '-' + (_i < 10 ? '0' + _i : _i) });};for (var _i = 1; _i <= new Date(year, month, 0).getDate(); _i++) {_loop(_i);

      }
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      // 循环下个月开始几天 添加到数组
      for (var _i2 = 1; _i2 < surplus + 1; _i2++) {
        dates.nextMonthDays.push({
          date: _i2 + '',
          month: month + 1,
          disable: this.isDisableBefore(year, month + 1, _i2 + ''),
          lunar: this.getlunar(year, month + 1, _i2 + ''),
          isDay: false });

      }

      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var _i3 = 0; _i3 < canlender.length; _i3++) {
        if (_i3 % 7 === 0) {
          dates.weeks[parseInt(_i3 / 7)] = new Array(7);
        }
        dates.weeks[parseInt(_i3 / 7)][_i3 % 7] = canlender[_i3];
      }

      return {
        weeks: dates.weeks,
        month: month,
        date: date,
        day: day,
        year: year,
        clockinfo: clockinfo,
        lunar: _calendar.default.solar2lunar(year, month, date),
        lastDate: dates.currentMonthDys[dates.currentMonthDys.length - 1].date };

    },
    /**
        * 计算阴历日期显示
        */
    getlunar: function getlunar(year, month, date) {
      return _calendar.default.solar2lunar(year, month, date).IDayCn;
    },
    /**
        * 获取日期
        * @param {Object} dateData
        */
    getNewDate: function getNewDate(dateData) {
      var _date = new Date(dateData);
      return {
        year: _date.getFullYear(), // 年
        month: _date.getMonth() + 1, // 月
        date: _date.getDate(), // 日
        day: _date.getDay() // 天
      };
    },
    /**
        * 获取任意时间
        */
    getDate: function getDate(date) {var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (typeof date !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }
          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;}

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return y + '-' + m + '-' + d;
    },
    /**
        * 比较时间大小
        */
    dateCompare: function dateCompare(startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    },
    geDateAll: function geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        // console.log((new Date(parseInt(k))).format());
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))));
      }
      return arr;
    } } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =














{
  name: 'UniPopup',
  props: {
    /**
            * 页面显示
            */
    show: {
      type: Boolean,
      default: false },

    /**
                         * 对齐方式
                         */
    position: {
      type: String,
      // top - 顶部， middle - 居中, bottom - 底部
      default: 'middle' },

    /**
                            * 显示模式
                            */
    mode: {
      type: String,
      default: 'insert' },

    /**
                            * 额外信息
                            */
    msg: {
      type: String,
      default: '' },

    /**
                      * h5遮罩是否到顶
                      */
    h5Top: {
      type: Boolean,
      default: false },

    buttonMode: {
      type: String,
      default: 'bottom' } },


  data: function data() {
    return {
      offsetTop: 0 };

  },
  watch: {
    h5Top: function h5Top(newVal) {
      if (newVal) {
        this.offsetTop = 44;
      } else {
        this.offsetTop = 0;
      }
    } },

  created: function created() {
    var offsetTop = 0;







    this.offsetTop = offsetTop;
  },
  methods: {
    hide: function hide() {
      if (this.mode === 'insert' && this.position === 'middle') return;
      this.$emit('hidePopup');
    },
    closeMask: function closeMask() {
      if (this.mode === 'insert') {
        this.$emit('hidePopup');
      }
    },
    moveHandle: function moveHandle() {} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
















{
  name: 'uni-swipe-action',
  props: {
    isOpened: {
      type: Boolean,
      default: false },

    disabled: {
      type: Boolean,
      default: false },

    autoClose: {
      type: Boolean,
      default: true },

    options: Array },

  watch: {
    isOpened: function isOpened(newValue, oldValue) {
      this.isShowBtn = newValue ? true : false;
      this.endMove();
    } },

  data: function data() {
    var elId = "Uni_".concat(Math.ceil(Math.random() * 10e5).toString(36));
    return {
      elId: elId,
      isShowBtn: false,
      transformX: 'translateX(0px)' };

  },
  created: function created() {
    this.direction = '';
    this.startX = 0;
    this.startY = 0;
    this.btnGroupWidth = 0;
    this.isMoving = false;
  },






  onReady: function onReady() {
    this.getSize();
  },

  methods: {
    getSize: function getSize() {var _this = this;
      uni.createSelectorQuery().in(this).select("#".concat(this.elId)).boundingClientRect().exec(function (ret) {
        _this.btnGroupWidth = ret[0].width;
      });
      if (this.isOpened === true) {
        this.isShowBtn = true;
        this.endMove();
      }
    },
    bindClickBtn: function bindClickBtn(item, index) {
      this.$emit('click', {
        text: item.text,
        style: item.style,
        index: index });

    },
    bindClickCont: function bindClickCont(e) {
      if (this.isShowBtn && this.autoClose === true) {
        this.isShowBtn = false;
        this.endMove();
      }
    },
    touchStart: function touchStart(event) {
      this.startX = event.touches[0].pageX;
      this.startY = event.touches[0].pageY;
    },
    touchMove: function touchMove(event) {
      if (this.direction === 'Y' || this.disabled === true) {
        return;
      }
      var moveY = event.touches[0].pageY - this.startY,
      moveX = event.touches[0].pageX - this.startX;
      if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX)) {//纵向滑动
        this.direction = 'Y';
        return;
      }
      this.direction = moveX > 0 ? 'right' : 'left';
      this.isMoving = true;
    },
    touchEnd: function touchEnd(event) {
      this.isMoving = false;
      if (this.direction !== 'right' && this.direction !== 'left') {
        this.direction = '';
        return;
      }
      if (this.direction == 'right') {
        this.isShowBtn = false;
      } else {
        this.isShowBtn = true;
      }
      this.endMove();
    },
    endMove: function endMove() {
      if (this.direction === 'Y' || this.disabled === true) {
        this.direction = '';
        return;
      }
      if (this.isShowBtn) {
        this.transformX = "translateX(".concat(-this.btnGroupWidth, "px)");
        this.$emit('opened');
      } else {
        this.transformX = 'translateX(0px)';
        this.$emit('closed');
      }
      this.direction = '';
    },
    close: function close() {
      this.isShowBtn = false;
      this.endMove();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=template&id=75ed7f9a&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar-item.vue?vue&type=template&id=75ed7f9a& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    _vm._l(_vm.canlender.weeks, function(weeks, week) {
      return _c("block", { key: week }, [
        _c(
          "view",
          { staticClass: "uni-calender__body-date-week" },
          _vm._l(weeks, function(day, index) {
            return _c("block", { key: index }, [
              _c(
                "view",
                {
                  staticClass: "uni-calender__date",
                  class: {
                    "uni-calender__disable":
                      _vm.canlender.month !== day.month || day.disable,
                    "uni-calender__date-current":
                      ((day.date == _vm.canlender.date && !day.checked) ||
                        day.multipleBegin ||
                        day.multipleEnd) &&
                      _vm.canlender.month == day.month &&
                      !day.disable,
                    "uni-calender__lunar": _vm.lunar,
                    "uni-calender__active": !day.isDay,
                    "uni-calender__is-day": day.isDay,
                    "uni-calender__multiple":
                      day.multipleBegin || day.multipleEnd,
                    "uni-calender__multiple-box": day.checked
                  },
                  attrs: { eventid: "02bbaa04-0-" + week + "-" + index },
                  on: {
                    tap: function($event) {
                      _vm.selectDays(
                        week,
                        index,
                        _vm.canlender.month === day.month,
                        day.disable,
                        _vm.canlender.lunar
                      )
                    }
                  }
                },
                [
                  _c("view", { staticClass: "uni-calender__circle-box" }, [
                    _vm._v(_vm._s(day.date)),
                    _vm.lunar
                      ? _c("view", { staticClass: "uni-calender__lunar" }, [
                          _vm._v(_vm._s(day.lunar))
                        ])
                      : _vm._e(),
                    day.have
                      ? _c("view", { staticClass: "uni-calender__data-circle" })
                      : _vm._e(),
                    day.have && !_vm.lunar
                      ? _c("view", { staticClass: "uni-calender__lunar" }, [
                          _vm._v(_vm._s(day.clockinfo.info))
                        ])
                      : _vm._e()
                  ]),
                  _c("view", {
                    staticClass: "uni-calender_check-bg",
                    class: {
                      "uni-calender_check": day.checked,
                      "calender_check-begin": day.multipleBegin,
                      "calender_check-end": day.multipleEnd
                    }
                  })
                ]
              )
            ])
          })
        )
      ])
    })
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=template&id=231504dd&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-calendar/uni-calendar.vue?vue&type=template&id=231504dd& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", [
    _vm.maskShow && !_vm.insert
      ? _c("view", {
          staticClass: "uni-calendar__mask",
          class: { "ani-mask-show": _vm.aniMaskShow }
        })
      : _vm._e(),
    _vm.maskShow || _vm.insert
      ? _c(
          "view",
          {
            staticClass: "uni-calendar__box",
            class: {
              "ani-calendar-show": _vm.aniMaskShow,
              "uni-calendar__static": _vm.insert
            }
          },
          [
            !_vm.insert
              ? _c("view", { staticClass: "uni-calendar__nav" }, [
                  _c(
                    "view",
                    {
                      staticClass: "uni-calendar__nav-item",
                      attrs: { eventid: "5125b83c-0" },
                      on: { click: _vm.close }
                    },
                    [_vm._v("取消")]
                  ),
                  _c(
                    "view",
                    {
                      staticClass: "uni-calendar__nav-item",
                      attrs: { eventid: "5125b83c-1" },
                      on: { click: _vm.confirm }
                    },
                    [_vm._v("确认")]
                  )
                ])
              : _vm._e(),
            _c("view", { staticClass: "uni-calendar__wrapper" }, [
              _c(
                "view",
                { staticClass: "uni-calenda__content" },
                [
                  _c("view", { staticClass: "uni-calendar__panel" }, [
                    _c(
                      "view",
                      {
                        staticClass: "uni-calendar__date-befor",
                        attrs: { eventid: "5125b83c-2" },
                        on: {
                          tap: function($event) {
                            _vm.dataBefor(-1, "month")
                          }
                        }
                      },
                      [_c("text", { staticClass: "iconfont icon-jiantou" })]
                    ),
                    _c("view", { staticClass: "uni-calendar__panel-box" }, [
                      _c("view", [
                        _vm._v(_vm._s(_vm.canlender.year || "") + "年")
                      ]),
                      _c("view", [
                        _vm._v(_vm._s(_vm.canlender.month || "") + "月")
                      ])
                    ]),
                    _c(
                      "view",
                      {
                        staticClass:
                          "uni-calendar__date-after uni-calendar__rollback",
                        attrs: { eventid: "5125b83c-3" },
                        on: {
                          tap: function($event) {
                            _vm.dataBefor(1, "month")
                          }
                        }
                      },
                      [_c("text", { staticClass: "iconfont icon-jiantou " })]
                    ),
                    _c(
                      "view",
                      {
                        staticClass: "uni-calendar__backtoday",
                        attrs: { eventid: "5125b83c-4" },
                        on: { tap: _vm.backtoday }
                      },
                      [_vm._v("回到今天")]
                    )
                  ]),
                  _vm.isLunar
                    ? _c("view", { staticClass: "uni-calendar__day-detail" }, [
                        _c("view", [
                          _vm._v(
                            _vm._s(
                              _vm.canlender.year +
                                "年" +
                                _vm.canlender.month +
                                "月" +
                                _vm.canlender.date +
                                "日 （" +
                                _vm.canlender.lunar.astro +
                                ")"
                            )
                          )
                        ]),
                        _c("view", [
                          _vm._v(
                            _vm._s(
                              _vm.canlender.lunar.gzYear +
                                "年" +
                                _vm.canlender.lunar.gzMonth +
                                "月" +
                                _vm.canlender.lunar.gzDay +
                                "日 (" +
                                _vm.canlender.lunar.Animal +
                                "年)"
                            ) +
                              "\n\t\t\t\t\t\t" +
                              _vm._s(
                                _vm.canlender.lunar.IMonthCn +
                                  _vm.canlender.lunar.IDayCn
                              ) +
                              " " +
                              _vm._s(
                                _vm.canlender.lunar.isTerm
                                  ? _vm.canlender.lunar.Term
                                  : ""
                              )
                          )
                        ])
                      ])
                    : _vm._e(),
                  _vm._m(0),
                  _c("uni-calendar-item", {
                    attrs: {
                      canlender: _vm.canlender,
                      lunar: _vm.isLunar,
                      eventid: "5125b83c-5",
                      mpcomid: "5125b83c-0"
                    },
                    on: { selectDays: _vm.selectDays }
                  })
                ],
                1
              )
            ])
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("view", { staticClass: "uni-calendar__header" }, [
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("日")]),
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("一")]),
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("二")]),
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("三")]),
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("四")]),
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("五")]),
      _c("view", { staticClass: "uni-calendar__week" }, [_vm._v("六")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=template&id=a09e8646&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-popup/uni-popup.vue?vue&type=template&id=a09e8646& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", [
    _c("view", {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      staticClass: "uni-mask",
      style: { top: _vm.offsetTop + "px" },
      attrs: { eventid: "bfbdd508-0" },
      on: {
        click: _vm.hide,
        touchmove: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          _vm.moveHandle($event)
        }
      }
    }),
    _c(
      "view",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.show,
            expression: "show"
          }
        ],
        staticClass: "uni-popup",
        class: "uni-popup-" + _vm.position + " " + "uni-popup-" + _vm.mode
      },
      [
        _vm._v(_vm._s(_vm.msg)),
        _vm._t("default", null, { mpcomid: "bfbdd508-0" }),
        _vm.position === "middle" && _vm.mode === "insert"
          ? _c("view", {
              staticClass: " uni-icon uni-icon-close",
              class: {
                "uni-close-bottom": _vm.buttonMode === "bottom",
                "uni-close-right": _vm.buttonMode === "right"
              },
              attrs: { eventid: "bfbdd508-1" },
              on: { click: _vm.closeMask }
            })
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!../../HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=template&id=8ac54f86&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/HBuilderX/HBuilderProjects/zeroCardLife/components/uni-swipe-action/uni-swipe-action.vue?vue&type=template&id=8ac54f86& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", { staticClass: "uni-swipe-action" }, [
    _c(
      "view",
      {
        staticClass: "uni-swipe-action__container",
        class: { "uni-swipe-action--show": _vm.isShowBtn },
        style: {
          transform: _vm.transformX,
          "-webkit-transform": _vm.transformX
        },
        attrs: { eventid: "59c3549c-1" },
        on: {
          touchstart: _vm.touchStart,
          touchmove: _vm.touchMove,
          touchend: _vm.touchEnd,
          touchcancel: _vm.touchEnd,
          click: _vm.bindClickCont
        }
      },
      [
        _c(
          "view",
          { staticClass: "uni-swipe-action__content" },
          [_vm._t("default", null, { mpcomid: "59c3549c-0" })],
          2
        ),
        _c(
          "view",
          {
            staticClass: "uni-swipe-action__btn-group",
            attrs: { id: _vm.elId }
          },
          _vm._l(_vm.options, function(item, index) {
            return _c(
              "div",
              {
                key: index,
                staticClass: "uni-swipe-action--btn",
                style: {
                  backgroundColor:
                    item.style && item.style.backgroundColor
                      ? item.style.backgroundColor
                      : "#C7C6CD",
                  color:
                    item.style && item.style.color
                      ? item.style.color
                      : "#FFFFFF",
                  fontSize:
                    item.style && item.style.fontSize
                      ? item.style.fontSize
                      : "28upx"
                },
                attrs: { eventid: "59c3549c-0-" + index },
                on: {
                  click: function($event) {
                    _vm.bindClickBtn(item, index)
                  }
                }
              },
              [_vm._v(_vm._s(item.text))]
            )
          })
        )
      ]
    ),
    _vm.isShowBtn
      ? _c("view", {
          staticClass: "uni-swipe-action__mask",
          attrs: { eventid: "59c3549c-2" },
          on: {
            click: _vm.close,
            touchmove: function($event) {
              $event.stopPropagation()
              $event.preventDefault()
              _vm.close($event)
            }
          }
        })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map