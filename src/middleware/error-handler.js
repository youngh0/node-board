const { GeneralError } = require('../error/errors');

const handleErrors = (err, req, res, next) => {

    // 내가 발생시킨 에러의 경우 내가 지정한 status code 반환 ex) 400, 404...
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: err.getCode(),
            message: err.message
        });
    }

    // 500번대 에러
    return res.status(500).json({
        status: 500,
        message: err.message
    });
}


module.exports = handleErrors;
