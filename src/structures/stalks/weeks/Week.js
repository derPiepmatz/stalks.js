"use strict";

const Buy = require("./Buy");
const Sell = require("./Sell");
const Advice = require("./Advice");
const FriendWeek = require("./FriendWeek");
const isDefined = require("../../../util/isDefined");

class Week {
  /**
   * @param {WeekData} weekData - The data for the week.
   * @param {DateResolvable} weekData.date - Use any DateResolvable for this.
   */
  constructor(weekData) {
    if (isDefined(weekData.id)) {
      /**
       * The id of the week.
       * @type {number}
       */
      this.id = weekData.id;
    }

    /**
     * The sunday that the week started on.
     * @type {Date}
     */
    this.date = new Date(weekData.date);

    let buys = [];
    for (let buyData of weekData.buys) {
      buys.push(new Buy({
        local: buyData.local,
        label: buyData.label,
        price: buyData.price,
        quantity: buyData.quantity
      }));
    }
    /**
     * The list of buys were made.
     * @type {Buy[]}
     */
    this.buys = buys;

    /**
     * Whether or not this is the first
     * that turnips have been bought from your island.
     * @type {boolean}
     */
    this.buyLocalFirstTime = weekData.buy_local_first_time;

    let sells = [];
    for (let sellData of weekData.sells) {
      sells.push(new Sell({
        price: sellData.price,
        quantity: sellData.quantity,
        slots: sellData.slots
      }));
    }
    /**
     * Just like buys, this is a list because you can track multiple sales.
     * @type {Sell[]}
     */
    this.sells = sells;

    /**
     * The price Daisy Mae was selling turnips for on your specific island,
     * regardless of where you purchased from.
     * @type {number}
     */
    this.localPrice = weekData.local_price;

    /**
     * A list of prices for each slot.
     * null values can be used for missing prices.
     * @type {number[]}
     */
    this.prices = weekData.prices;

    if (isDefined(weekData.manual_previous_pattern)) {
      /**
       * The pattern you had last week.
       * @type {string}
       */
      this.manualPreviousPattern = weekData.manual_previous_pattern;
    }

    if (isDefined(weekData.previous_pattern)) {
      /**
       * Allows you to explicitly state what your pattern was last week. <br>
       * Should be one of "big_spike", "small_spike", "triple", or "decreasing".
       * @type {string}
       * @readonly
       */
      this.previousPattern = weekData.previous_pattern;
    }

    if (isDefined(weekData.profit)) {
      /**
       * Your calculated profit for the week.
       * @type {number}
       * @readonly
       */
      this.profit = weekData.profit;
    }

    if (isDefined(weekData.advice)) {
      /**
       * Contains all of your predictions and suggestions for the week,
       * based on what you've entered.
       * @type {Advice}
       * @readonly
       */
      this.advice = new Advice({
        sell: weekData.advice.sell,
        advice: weekData.advice.advice,
        prediction: weekData.advice.prediction,
        odds: weekData.advice.odds
      });
    }

    if (isDefined(weekData.friend_weeks)) {
      let friendWeeks = [];
      for (let friendWeekData of weekData.friend_weeks) {
        friendWeeks.push(new FriendWeek(friendWeekData));
      }
      /**
       * A list of all your friends that have entered data for the corresponding week.
       * @type {FriendWeek[]}
       */
      this.friendWeeks = friendWeeks;
    }

    if (isDefined(weekData.version)) {
      /**
       * A sanity check that prevents an outdated frontend from overwriting newer data
       * on the server.
       * @type {number}
       */
      this.version = weekData.version;
    }
  }

  /**
   * Serializes the Week to a JSON.
   * @returns {WeekData}
   */
  toJSON() {
    let json = {};

    if (isDefined(this.id)) {
      json.id = this.id;
    }

    if (isDefined(this.date)) {
      json.date = this.date.toISOString().substr(0, 10);
    }

    if (isDefined(this.buys)) {
      json.buys = [];
      for (let buy of this.buys) {
        json.buys.push(JSON.parse(JSON.stringify(buy)));
      }
    }

    if (isDefined(this.buyLocalFirstTime)) {
      json.buy_local_first_time = this.buyLocalFirstTime;
    }

    if (isDefined(this.sells)) {
      json.sells = [];
      for (let sell of this.sells) {
        json.sells.push(JSON.parse(JSON.stringify(sell)));
      }
    }

    if (isDefined(this.localPrice)) {
      json.local_price = this.localPrice;
    }

    if (isDefined(this.prices)) {
      json.prices = this.prices;
    }

    if (isDefined(this.manualPreviousPattern)) {
      json.manual_previous_pattern = this.manualPreviousPattern;
    }

    if (isDefined(this.previousPattern)) {
      json.previous_pattern = this.previousPattern;
    }

    if (isDefined(this.profit)) {
      json.profit = this.profit;
    }

    if (isDefined(this.advice)) {
      json.advice = JSON.parse(JSON.stringify(this.advice));
    }

    if (isDefined(this.friendWeeks)) {
      json.friend_weeks = [];
      for (let friendWeek of this.friendWeeks) {
        json.friend_weeks.push(JSON.parse(JSON.stringify(friendWeek)));
      }
    }

    if (isDefined(this.version)) {
      json.version = this.version;
    }

    return json;
  }

  /**
   * Returns the sunday of the week.
   * @param {DateResolvable} date
   * @returns {Date}
   */
  static getDateSunday(date) {
    let sundayDate = new Date(date);
    sundayDate.setDate(sundayDate.getDate() - sundayDate.getDay());
    return sundayDate;
  }
}

module.exports = Week;