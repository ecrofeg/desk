"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = function (response, message) {
    return response.json({
        error: {
            message: message,
            code: 500
        }
    });
};
