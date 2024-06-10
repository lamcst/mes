import Vue from "vue";

const moment = require("moment");

export default function ({ store }) {
  Vue.filter("toDateTime", function (value, format, invalidText) {

		const defaultFormat =  "ddd DD-MM-YYYY hh:mma";
		return value
			? moment(value)
				.format(format ? format : defaultFormat)
			: invalidText ?? "Not available";
	});
}