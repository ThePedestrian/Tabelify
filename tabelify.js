/**
 *  
 * Tabelify - A simple function for printing an
 * associative array to a table.
 * 
 * Copyright (c) 2017 - Uffaz Nathaniel
 * 
 * 
 * Released under the MIT License.
 * See https://opensource.org/licenses/MIT for more information. 
 * 
 */


 /**
 * Convert an one-dimensional object or array to a tabular
 * representation.
 */
function tableify(items) {
    
        var SEPERATOR = "|";
        var HEADER_DIVIDER = "-";
    
        // Test if the target is array
        var isArray = function (x) {
            return x && x.constructor === Array;
        };
    
        // Test if the target is undefined
        var isUndefined = function (x) {
            return typeof x === "undefined";
        };
    
        // Utility for iterating
        var forEach = function (item, callback) {
            var isArr = isArray(item);
            for (var key in item) {
                if (!isArr) { // object
                    if (item.hasOwnProperty(key)) {
                        callback(item[key], key);
                    }
                } else {
                    callback(item[key], key);
                }
            }
        };
    
        // Convert to an array if object is passed
        if (!isArray(items)) {
            items = [items];
        }
    
        // The maximum width of each property
        var maxLengths = (function () {
            var maxLengths = {};
            forEach(items, function (item, index) {
                forEach(item, function(val, key) {
                    var length = !isUndefined(val) ? val.toString().length : 0;
                    var keyLength = key.toString().length;
                    if (keyLength > length) { length = keyLength; }
                    if (!maxLengths[key]) { maxLengths[key] = 0; }
                    if (length > maxLengths[key]) { maxLengths[key] = length; }
                });
            });
            return maxLengths;
        })();
    
        // Padded string
        var getPaddedString = function (value, propertyName) {
            value = isUndefined(value) ? "" : value.toString();
            var maxLength = maxLengths[propertyName] || value.length;
            while (value.length < maxLength) {
                value += ' ';
            }
            return value;
        };
    
        var header = '';
        var result = '';
        var isHeaderSet = false;
    
        forEach(items, function(item, index) {
            if (!isHeaderSet) {
                header += SEPERATOR + ' ';
            }
            result += SEPERATOR + ' ';
            forEach(maxLengths, function(ignore, key) {
                if (!isHeaderSet) {
                    header += getPaddedString(key, key);
                    header += ' ' + SEPERATOR + ' ';
                }
                result += getPaddedString(item[key], key);
                result += ' ' + SEPERATOR + ' ';
            });
            result += '\n';
            isHeaderSet = true;
        });
    
        return header + '\n' + Array(header.length).join(HEADER_DIVIDER) + '\n' + result;
    }