"use strict";

import Prediction from "./Prediction.js";
import isDefined from "../../../util/isDefined.js";

class Advice {
  /**
   * Represents an Advice.
   * @param {AdviceData} adviceData
   */
  constructor(adviceData) {
    /**
     * A boolean indicating if you should sell or hold.
     * @type {boolean}
     */
    this.sell = adviceData.sell;

    /**
     * Isabelle's friendly advice for your current situation.
     * @type {string}
     */
    this.advice = adviceData.advice;

    if (isDefined(adviceData.prediction)) {
      /**
       * The projected forecasts for your stalk market.
       * @type {Prediction}
       */
      this.prediction = new Prediction(adviceData.prediction);
    }

    /**
     * A dictionary consisting of price/odds mappings. Each key corresponds to a
     * possible price, and the value is the likelihood that you'll hit that price.
     * @type {Object<string, number>}
     */
    this.odds = adviceData.odds;
  }
}

export default Advice;