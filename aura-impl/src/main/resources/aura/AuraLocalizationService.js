/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*jslint sub: true */
/**
 * @description The Aura Localization service Service, accessible using $A.localizationService. Provides utility methods
 * for localizing data or getting formatters for numbers, currencies, dates, etc.
 * @constructor
 * @export
 */
function AuraLocalizationService() {
    this.numberFormat = undefined;
    this.percentFormat = undefined;
    this.currencyFormat = undefined;
    // moment.js and walltime-js must be loaded before we can use date/time related APIs
    
    this.ZERO = "0";
    
    this.cache = {
        format : {},
        langLocale : {}
    };
}
        
/**
 * Formats a number with the default number format.
 * <p>Example:</p>
 * <pre>
 * //Returns 0.146 
 * $A.localizationService.formatNumber(0.14566); 
 * </pre>
 * @param {Number} number The number to be formatted.
 * @return {Number} The formatted number
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatNumber = function(number) {
    return this.getDefaultNumberFormat().format(number);
};

/**
 * Returns a formatted percentage number based on the default percentage format.
 * <p>Example:</p>
 * <pre>
 * //Returns 15%
 * $A.localizationService.formatPercent(0.14566);
 * </pre>
 * @param {Number} number The number to be formatted.
 * @return {Number} The formatted percentage
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatPercent = function(number) {
    return this.getDefaultPercentFormat().format(number);
};

/**
 * Returns a currency number based on the default currency format.
 * <p>Example:</p>
 * <pre>
 * //Returns $0.15
 * $A.localizationService.formatCurrency(0.14566);
 * </pre>
 * @param {Number} number The currency number to be formatted.
 * @return {Number} The formatted currency
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatCurrency = function(number) {
    return this.getDefaultCurrencyFormat().format(number);
};


/**
 * Returns a NumberFormat object.
 * <p>Example:</p>
 * <pre>var f = cmp.get("v.format");
 * var num = cmp.get("v.value");
 * var nf = $A.localizationService.getNumberFormat(f);
 * var formatted = nf.format(num);
 * //If format is not provided, the default locale is used
 * var formatted = $A.localizationService.formatNumber(num); 
 * </pre>
 * @param {String} format The number format. <code>format=".00"</code> displays the number followed by two decimal places. 
 * @param {String} symbols 
 * @return {Number} The number format
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getNumberFormat = function(format, symbols) {
    return new Aura.Utils.NumberFormat(format, symbols);
};

/**
 * Returns the default NumberFormat object.
 * <p>Example:</p>
 * <pre>
 * //Returns 20,000.123
 * $A.localizationService.getDefaultNumberFormat().format(20000.123);
 * </pre>
 * @return {Number} The number format returned by <code>$Locale.numberFormat</code>.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getDefaultNumberFormat = function() {
    if (!this.numberFormat) {
        this.numberFormat = new Aura.Utils.NumberFormat($A.get("$Locale.numberFormat"));
    }
    return this.numberFormat;
};


/**
 * Returns the default percentage format.
 * <p>Example:</p>
 * <pre>
 * //Returns 20%
 * $A.localizationService.getDefaultPercentFormat().format(0.20);
 * </pre>
 * @return {Number} The percentage format returned by <code>$Locale.percentFormat</code>.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getDefaultPercentFormat = function() {
    if (!this.percentFormat) {
        this.percentFormat = new Aura.Utils.NumberFormat($A.get("$Locale.percentFormat"));
    }
    return this.percentFormat;
};

/**
 * Returns the default currency format.
 * <p>Example:</p>
 * <pre>
 * //Returns $20,000.00
 * $A.localizationService.getDefaultCurrencyFormat().format(20000);
 * </pre>
 * @return {Number} The currency format returned by <code>$Locale.currencyFormat</code>.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getDefaultCurrencyFormat = function() {
    if (!this.currencyFormat) {
        this.currencyFormat = new Aura.Utils.NumberFormat($A.get("$Locale.currencyFormat"));
    }
    return this.currencyFormat;
};

/**
 * Displays a length of time.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @param {Boolean} noSuffix Set to true if the token should be displayed without a suffix
 * @return {String} A duration object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDuration = function(d, noSuffix) {
    return d["humanize"](noSuffix);
};

/**
 * Displays a length of time in days.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in days.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInDays = function(d) {
    return d["asDays"]();
};

/**
 * Displays a length of time in hours.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in hours.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInHours = function(d) {
    return d["asHours"]();
};

/**
 * Displays a length of time in milliseconds.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in milliseconds.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInMilliseconds = function(d) {
    return d["asMilliseconds"]();
};

/**
 * Displays a length of time in minutes.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in minutes.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInMinutes = function(d) {
    return d["asMinutes"]();
};

/**
 * Displays a length of time in months.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in months.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInMonths = function(d) {
    return d["asMonths"]();
};

/**
 * Displays a length of time in seconds.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in seconds.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInSeconds = function(d) {
    return d["asSeconds"]();
};

/**
 * Displays a length of time in years.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The length of time in years.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.displayDurationInYears = function(d) {
    return d["asYears"]();
};

/**
 * Creates an object representing a length of time.
 * @param {Number|Object} num The length of milliseconds/unit
 * @param {String} unit The unit of measurement of time
 * @return {Object} A duration object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.duration = function(num, unit) {
    return unit ? moment["duration"](num, unit) : moment["duration"](num);
};

/**
 * Converts the passed in Date by setting it to the end of a unit of time.
 * @param {String|Number|Date} date A format that the JavaScript Date object can parse
 * @param {String} unit The unit of time in year, month, week, day, hour, minute or second
 * @return {Date} A JavaScript Date object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.endOf = function(date, unit) {
    return moment(date)["endOf"](unit)["toDate"]();
};

/**
 * Formats a date.
 * @param {String|Number|Date} date The date format that the JavaScript Date object can parse.
 * @param {String} formatString A Java format string. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string. The default is from LocaleValueProvider.
 * @return A formatted and localized date string
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatDate = function(date, formatString, locale) {
    var mDate = moment(date);
    if (mDate && mDate["isValid"]()) {
        var format = formatString;
        if (!format) { // use default format
            format = $A.get("$Locale.dateFormat");
        }
        return this.displayDateTime(mDate, format, locale);
    } else {
        throw {message: "Invalid date value"};
    }
};

/**
 * Formats a date in UTC.
 * @param {String|Number|Date} date The date format that JS Date object can parse.
 * @param {String} formatString A Java format string. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string. The default is from LocaleValueProvider.
 * @return A formatted and localized date string
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatDateUTC = function(date, formatString, locale) {
    var mDate = moment["utc"](date);
    if (mDate && mDate["isValid"]()) {
        var format = formatString;
        if (!format) { // use default format
            format = $A.get("$Locale.dateFormat");
        }
        return this.displayDateTime(mDate, format, locale);
    } else {
        throw {message: "Invalid date value"};
    }
};

/**
 * Formats a datetime.
 * @param {String|Number|Date} date The datetime format that the JavaScript Date object can parse.
 * @param {String} formatString A Java format string. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string. The default is from LocaleValueProvider.
 * @return A formatted and localized datetime string
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatDateTime = function(date, formatString, locale) {
    var mDate = moment(date);
    if (mDate && mDate["isValid"]()) {
        var format = formatString;
        if (!format) { // use default format
            format = $A.get("$Locale.datetimeFormat");
        }
        return this.displayDateTime(mDate, format, locale);
    } else {
        throw {message: "Invalid date time value"};
    }
};

/**
 * Formats a datetime in UTC.
 * @param {String|Number|Date} date The datetime format that the JavaScript Date object can parse.
 * @param {String} formatString A Java format string. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string. The default is from LocaleValueProvider.
 * @return A formatted and localized datetime string
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatDateTimeUTC = function(date, formatString, locale) {
    var mDate = moment["utc"](date);
    if (mDate && mDate["isValid"]()) {
        var format = formatString;
        if (!format) { // use default format
            format = $A.get("$Locale.datetimeFormat");
        }
        return this.displayDateTime(mDate, format, locale);
    } else {
        throw {message: "Invalid date time value"};
    }
};

/**
 * Formats a time.
 * @param {String|Number|Date} date The time format that JavaScript Date object can parse
 * @param {String} formatString A Java format string. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string. The default is from LocaleValueProvider.
 * @return A formatted and localized time string
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatTime = function(date, formatString, locale) {
    var mDate = moment(date);
    if (mDate && mDate["isValid"]()) {
        var format = formatString;
        if (!format) { // use default format
            format = $A.get("$Locale.timeFormat");
        }
        return this.displayDateTime(mDate, format, locale);
    } else {
        throw {message: "Invalid time value"};
    }
};

/**
 * Formats a time in UTC.
 * @param {String|Number|Date} date The time format that JavaScript Date object can parse.
 * @param {String} formatString A Java format string. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string. The default is from LocaleValueProvider.
 * @return a formatted and localized time string
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.formatTimeUTC = function(date, formatString, locale) {
    var mDate = moment["utc"](date);
    if (mDate && mDate["isValid"]()) {
        var format = formatString;
        if (!format) { // use default format
            format = $A.get("$Locale.timeFormat");
        }
        return this.displayDateTime(mDate, format, locale);
    } else {
        throw {message: "Invalid time value"};
    }
};

/**
 * Gets the number of days in a duration.
 * @param {Duration} d The duration object returned by this.duration
 * @return {Number} The number of days in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getDaysInDuration = function(d) {
    return d["days"]();
};

/**
 * Gets the number of hours in a duration.
 * @param {Duration} d The duration object returned by this.duration
 * @return {Number} The number of hours in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getHoursInDuration = function(d) {
    return d["hours"]();
};

/**
 * Get the date time related labels (month name, weekday name, am/pm etc.).
 * @return {Object} the localized label set.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getLocalizedDateTimeLabels = function() {
    var langLocale = $A.get("$Locale.langLocale");
    var l = this.getNormalizedLangLocale(langLocale);
    return moment["langData"](l);
};

/**
 * Gets the number of milliseconds in a duration.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The number of milliseconds in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getMillisecondsInDuration = function(d) {
    return d["milliseconds"]();
};

/**
 * Gets the number of minutes in a duration.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The number of minutes in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getMinutesInDuration = function(d) {
    return d["minutes"]();
};

/**
 * Gets the number of months in a duration.
 * @param thisration object returned by localizationService.duration
 * @return {Number} The number of months in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getMonthsInDuration = function(d) {
    return d["months"]();
};

/**
 * Gets the number of seconds in a duration.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The number of seconds in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getSecondsInDuration = function(d) {
    return d["seconds"]();
};

/**
 * Gets the number of years in a duration.
 * @param {Duration} d The duration object returned by localizationService.duration
 * @return {Number} The number of years in d.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.getYearsInDuration = function(d) {
    return d["years"]();
};

/**
 * An utility function to check if a datetime pattern string uses a 24-hour or period (12 hour with am/pm) time view.
 * @param {String} datetime pattern string
 * @return {Boolean} Returns true if it uses period time view.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.isPeriodTimeView = function(pattern) {
    if (!pattern || typeof pattern  != 'string') {
        return false;
    }
    var shouldEscape = false;
    for (var i = 0; i < pattern.length; i++) {
        var c = pattern.charAt(i);
        if (c === 'h' && shouldEscape === false) {
            return true;
        }
        if (c === '[') {
            shouldEscape = true;
        } else if (c === ']') {
            shouldEscape = false;
        }
    }
    return false;
};

/**
 * Checks if date1 is after date2.
 * @param {String|Number|Date} date1 A date format that the JavaScript Date object can parse
 * @param {String|Number|Date} date2 A date format that the JavaScript Date object can parse
 * @param {String} unit The unit to limit the granularity, that is, year, month, week, day, hour, minute and second.
 *                 By default, millisecond is used.
 * @return {Boolean} Returns true if date1 is after date2, or false otherwise.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.isAfter = function(date1, date2, unit) {
    return moment(date1)["isAfter"](date2, unit);
};

/**
 * Checks if date1 is before date2.
 * @param {String|Number|Date} date1 A date format that the JavaScript Date object can parse
 * @param {String|Number|Date} date2 A date format that the JavaScript Date object can parse
 * @param {String} unit The unit to limit the granularity, that is, year, month, week, day, hour, minute and second.
 *                 By default, millisecond is used.
 * @return {Boolean} Returns true if date1 is before date2, or false otherwise.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.isBefore = function(date1, date2, unit) {
    return moment(date1)["isBefore"](date2, unit);
};

/**
 * Checks if date1 is the same as date2.
 * @param {String|Number|Date} date1 A date format that the JavaScript Date object can parse
 * @param {String|Number|Date} date2 A date format that the JavaScript Date object can parse
 * @param {String} unit The unit to limit the granularity, that is, year, month, week, day, hour, minute and second.
 *                 By default, millisecond is used.
 * @return {Boolean} Returns true if date1 is the same as date2, or false otherwise.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.isSame = function(date1, date2, unit) {
    return moment(date1)["isSame"](date2, unit);
};

/**
 * Parses a string to a JavaScript Date.
 * @param {String} dateTimeString The datetime string to be parsed.
 * @param {String} targetFormat A Java format string which is used to parse datetime. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string used to parse datetime. The default is from LocaleValueProvider.
 * @return {Date} A JavaScript Date object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.parseDateTime = function(dateTimeString, targetFormat, locale) {
	var that = this;
	
    if (!dateTimeString) {
        return null;
    }

    var mDate = moment(dateTimeString, that.getNormalizedFormat(targetFormat), that.getNormalizedLangLocale(locale));
    if (mDate && mDate["isValid"]()) {
        return mDate["toDate"]();
    }
    return null;
};

/**
 * Parses a date time string in an ISO-8601 format.
 * @param {String} dateTimeString The datetime string in an ISO-8601 format
 * @return {Date} A JavaScript Date object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.parseDateTimeISO8601 = function(dateTimeString) {
    if (!dateTimeString) {
        return null;
    }

    var mDate = moment(dateTimeString);
    if (mDate && mDate["isValid"]()) {
        return mDate["toDate"]();
    }
    return null;
};

/**
 * Parses a string to a JavaScript Date in UTC.
 * @param {String} dateTimeString The datetime string to be parsed
 * @param {String} targetFormat A Java format string which is used to parse datetime. The default is from LocaleValueProvider.
 * @param {String} locale A Java locale string used to parse datetime. The default is from LocaleValueProvider.
 * @return {Date} A JavaScript Date object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.parseDateTimeUTC = function(dateTimeString, targetFormat, locale) {
	var that = this;
	
    if (!dateTimeString) {
        return null;
    }

    var mDate = moment["utc"](dateTimeString, that.getNormalizedFormat(targetFormat), that.getNormalizedLangLocale(locale));
    if (mDate && mDate["isValid"]()) {
        return mDate["toDate"]();
    }
    return null;
};

/**
 * Converts the passed in Date by setting it to the start of a unit of time.
 * @param {String|Number|Date} date It could be anything that JS Date object can parse.
 * @param {String} unit Year, month, week, day, hour, minute or second
 * @return {Date} A JavaScript Date object
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.startOf = function(date, unit) {
    return moment(date)["startOf"](unit)["toDate"]();
};

/**
 * Most of modern browsers support this method on Date object. But that is not the case for IE8 and older.
 * @param {Date} date a Date object
 * @return {String} An ISO8601 string to represent passed in Date object.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.toISOString = function(date) {
    if (date && (date instanceof Date)) {
        if (date.toISOString) {
            return date.toISOString();
        } else {
            return date.getUTCFullYear() + '-'
                 + this.pad(date.getUTCMonth() + 1) + '-'
                 + this.pad(date.getUTCDate()) + 'T'
                 + this.pad(date.getUTCHours()) + ':'
                 + this.pad(date.getUTCMinutes()) + ':'
                 + this.pad(date.getUTCSeconds()) + '.'
                 + this.doublePad(date.getUTCMilliseconds()) + 'Z';
        }
    } else {
        return date;
    }
};

/**
 * Translate the localized digit string to a string with Arabic digits if there is any.
 * @param {String} input a string with localized digits.
 * @return {String} a string with Arabic digits.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.translateFromLocalizedDigits = function(input) {
    if (!input) {
        return input;
    }

    var localizedZero = $A.get("$Locale.zero");
    var zeroCharCodeOffset = localizedZero.charCodeAt(0) - this.ZERO.charCodeAt(0);
    if (!zeroCharCodeOffset) {
        return input;
    }

    var charArray = input.split("");
    for (var i = 0; i < charArray.length; i++) {
        var charCode = charArray[i].charCodeAt(0);
        if (charCode <= localizedZero.charCodeAt(0) + 9 && charCode >= localizedZero.charCodeAt(0)) {
            charArray[i] = String.fromCharCode(charCode - zeroCharCodeOffset);
        }
    }
    return charArray.join("");
};

/**
 * Translate the input date from other calendar system (for example, Buddhist calendar) to Gregorian calendar
 * based on the locale.
 * @param {Date} date a Date Object.
 * @return {Date} an updated Date object.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.translateFromOtherCalendar = function(date) {
    var userLocaleLang = $A.get("$Locale.userLocaleLang");
    var userLocaleCountry = $A.get("$Locale.userLocaleCountry");
    if ('th' === userLocaleLang && 'TH' === userLocaleCountry) { // Buddhist year
        date.setFullYear(date.getFullYear() - 543);
    }
    return date;
};

/**
 * Translate the input string to a string with localized digits (different from Arabic) if there is any.
 * @param {String} input a string with Arabic digits.
 * @return {String} a string with localized digits.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.translateToLocalizedDigits = function(input) {
    if (!input) {
        return input;
    }

    var localizedZero = $A.get("$Locale.zero");
    var zeroCharCodeOffset = localizedZero.charCodeAt(0) - this.ZERO.charCodeAt(0);
    if (!zeroCharCodeOffset) {
        return input;
    }

    var charArray = input.split("");
    for (var i = 0; i < charArray.length; i++) {
        var charCode = charArray[i].charCodeAt(0);
        if (charCode <= "9".charCodeAt(0) && charCode >= "0".charCodeAt(0)) {
            charArray[i] = String.fromCharCode(charCode + zeroCharCodeOffset);
        }
    }
    return charArray.join("");
};

/**
 * Translate the input date to a date in other calendar system, for example, Buddhist calendar based on the locale.
 * @param {Date} date a Date Object.
 * @return {Date} an updated Date object.
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.translateToOtherCalendar = function(date) {
    var userLocaleLang = $A.get("$Locale.userLocaleLang");
    var userLocaleCountry = $A.get("$Locale.userLocaleCountry");
    if ('th' === userLocaleLang && 'TH' === userLocaleCountry) { // Buddhist year
        date.setFullYear(date.getFullYear() + 543);
    }
    return date;
};

/**
 * Converts a datetime from UTC to a specified timezone.
 * @param {Date} date A JavaScript Date object
 * @param {String} timezone A time zone id based on the java.util.TimeZone class, for example, America/Los_Angeles
 * @param {Function} callback A function to be called after the conversion is done
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.UTCToWallTime = function(date, timezone, callback) {
	var that = this;
	
    if (typeof callback === 'function') {
        if (!timezone) {
            timezone = $A.get("$Locale.timezone");
        }

        if (timezone == "GMT" || timezone == "UTC") {
            callback(date);
            return;
        }

        if (!WallTime["zones"] || !WallTime["zones"][timezone]) {
            // retrieve timezone data from server
            this.getTimeZoneInfo(timezone, function() {
                callback(that.getWallTimeFromUTC(date, timezone));
            });
        } else {
            callback(that.getWallTimeFromUTC(date, timezone));
        }
    }
};

/**
 * Converts a datetime from a specified timezone to UTC.
 * @param {Date} date A JavaScript Date object
 * @param {String} timezone A time zone id based on the java.util.TimeZone class, for example, America/Los_Angeles
 * @param {Function} callback A function to be called after the conversion is done
 * @memberOf AuraLocalizationService
 * @public
 * @export
 */
AuraLocalizationService.prototype.WallTimeToUTC = function(date, timezone, callback) {
	var that = this;
	
    if (typeof callback === 'function') {
        if (!timezone) {
            timezone = $A.get("$Locale.timezone");
        }

        if (timezone == "GMT" || timezone == "UTC") {
            callback(date);
            return;
        }

        if (!WallTime["zones"] || !WallTime["zones"][timezone]) {
            // retrieve timezone data from server
            this.getTimeZoneInfo(timezone, function() {
                callback(that.getUTCFromWallTime(date, timezone));
            });
        } else {
            callback(that.getUTCFromWallTime(date, timezone));
        }
    }
};

/**---------- Private functions ----------*/

/**
 * Display date, datetime or time based on the format string.
 *
 * @private
 */
AuraLocalizationService.prototype.displayDateTime = function(mDate, format, locale) {
	var that = this;
	
    if (locale) { // set locale locally
        mDate["lang"](that.getNormalizedLangLocale(locale));
    }
    return mDate["format"](that.getNormalizedFormat(format));
};

/**
 * Normalize a Java format string to make it compatible with moment.js
 *
 * @private
 */
AuraLocalizationService.prototype.getNormalizedFormat = function(format) {
    if (format) {
        if (!this.cache.format[format]) {
            var normalizedFormat = format.replace(/y/g, "Y").replace(/d/g, "D").replace(/E/g, "d").replace(/a/g, "A");
            this.cache.format[format] = normalizedFormat;
        }
        return this.cache.format[format];
    }
    return format;
};

/**
 * Normalize the input Java locale string to moment.js compatible one.
 *
 * @private
 */
AuraLocalizationService.prototype.getNormalizedLangLocale = function(langLocale) {
    if (!langLocale) {
        return langLocale;
    }

    if (!this.cache.langLocale[langLocale]) {
        var lang = [];
        var token = "";

        var index = langLocale.indexOf("_");
        while (index > 0) {
            token = langLocale.substring(0, index);
            langLocale = langLocale.substring(index + 1);
            lang.push(token.toLowerCase());
            index = langLocale.indexOf("_");
        }

        langLocale = langLocale.substring(index + 1);
        if (!$A.util.isEmpty(langLocale)) {
            lang.push(langLocale.toLowerCase());
        }

        var ret = lang[0];
        if (lang[1]) {
            var langAndCountry = lang[0] + "-" + lang[1];
            
            if (moment["langData"](langAndCountry)) {
                ret = langAndCountry;
            }
        }
        if (!moment["langData"](ret)) {
            ret = "en";
        }
        this.cache.langLocale[langLocale] = ret;
    }
    return this.cache.langLocale[langLocale];
};

/**
 * retrieve timezone info from server.
 *
 * @private
 */
AuraLocalizationService.prototype.getTimeZoneInfo = function(timezone, callback) {
	var that = this;
	
    var a = $A.get("c.aura://TimeZoneInfoController.getTimeZoneInfo");
    a.setParams({
        "timezoneId": timezone
    });
    a.setCallback(that, function(action){
        var state = action.getState();
        if(state === "SUCCESS"){
            var ret = action.returnValue;
            if (ret) {
                WallTime["data"] = ret;
                if (WallTime["zones"]) {
                    WallTime["addRulesZones"](WallTime["data"]["rules"], WallTime["data"]["zones"]);
                } else { // initialize walltime-js if it doesn't yet
                    WallTime["autoinit"] = true;
                    WallTime["init"](WallTime["data"]["rules"], WallTime["data"]["zones"]);
                    }
                }
            }
            callback();
        });
        $A.enqueueAction(a);
    };

/**
 * @private
 */
AuraLocalizationService.prototype.getUTCFromWallTime = function(d, timezone) {
    var ret = d;
    try {
        ret = WallTime["WallTimeToUTC"](timezone, d);
    } catch (e) {
        // The timezone id is invalid or for some reason, we can't get timezone info.
        // use default timezone
        timezone = $A.get("$Locale.timezone");
        if (timezone == "GMT" || timezone == "UTC") {
            return d;
        }
        try {
            ret = WallTime["WallTimeToUTC"](timezone, d);
            } catch (ignore) {}
        }
        return ret;
    };

/**
 * @private
 */
AuraLocalizationService.prototype.getWallTimeFromUTC = function(d, timezone) {
    var ret = d;
    try {
        ret = WallTime["UTCToWallTime"](d, timezone)["wallTime"];
    } catch (e) {
        // The timezone id is invalid or for some reason, we can't get timezone info.
        // use default timezone
        timezone = $A.get("$Locale.timezone");
        if (timezone == "GMT" || timezone == "UTC") {
            return d;
        }
        try {
            ret = WallTime["UTCToWallTime"](d, timezone)["wallTime"];
        } catch (ignore) {}
    }
    return ret;
};

/**
 * Initialize localization service.
 * @private
 */
AuraLocalizationService.prototype.init = function() {
	var that = this;
    // Set global default language locale
    var defaultLangLocale = $A.get("$Locale.langLocale");
    if (defaultLangLocale) {
        moment.lang(that.getNormalizedLangLocale(defaultLangLocale));
    }
};

/**
 * Append zero in front if necessary to standardize a number with two digits. For example, "9" becomes "09".
 * @private
 */
AuraLocalizationService.prototype.pad = function(n) {
    return n < 10 ? '0' + n : n;
};

/**
 * Append zero in front if necessary to standardize a number with three digits. For example, "99" becomes "099".
 * @private
 */
AuraLocalizationService.prototype.doublePad = function(n) {
    return n < 10 ? '00' + n : n  < 100 ? '0' + n : n;
};

Aura.Services.AuraLocalizationService = AuraLocalizationService;
