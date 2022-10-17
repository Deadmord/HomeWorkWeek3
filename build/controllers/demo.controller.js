"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getHelloworld = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        message: 'Hello world!!!'
    });
});
const getWithTimeout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => {
        return res.status(200).json({
            message: 'Ping is OK, Timeout in 3000ms'
        });
    }, 3000);
});
const getWithDelay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Read delay from getting paramrtr
    let delayINSeconds = parseInt(req.params.seconds);
    setTimeout(() => {
        return res.status(200).json({
            message: `Ping is OK, Timeout in ${delayINSeconds} sec`
        });
    }, delayINSeconds * 1000);
});
const getWithDelayValidated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Read delay from getting paramrtr
    const secondsStringParametr = req.params.seconds;
    if (isNaN(Number(secondsStringParametr))) {
        //Error
        //return res.status(406).json({
        //    error: "Incoret seconds parametr value"
        //});
        //Error w/o messege
        return res.sendStatus(406);
    }
    /*
    let delayINSeconds: number = parseInt(req.params.seconds);
    if(isNaN(delayINSeconds)) {
        //Error
        return res.status(406).json({
            error: "Incoret seconds parametr value"
        });
    }
    */
    else {
        let delayInSeconds = parseInt(req.params.seconds);
        setTimeout(() => {
            return res.status(200).json({
                message: `Ping is OK, Timeout in ${delayInSeconds} sec`
            });
        }, delayInSeconds * 1000);
    }
});
exports.default = { getHelloworld, getWithTimeout, getWithDelay, getWithDelayValidated };
