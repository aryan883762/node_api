const requestHelper = require('../../common/request_helper');
var md5 = require('md5');
const { sign } = require('../../jwt/jwt-module')
const utils = require('../../common/utils');
const Joi = require('joi');
class AuthService {
    constructor(UserModel) {
        this.UserModel = UserModel
        this.signUp = this.signUp.bind(this)
        this.login = this.login.bind(this)
        this._response = {status: false, message: "Server error! Please try again later!!"};
    }
    /*Login*/ 
    async login(body) {
        try {
            const schema = Joi.object().keys({
                userId: Joi.string().required(),
                password: Joi.string().required()
            });
            await utils.validate(body, schema)    
            let userId = body.userId
            let password = md5(body.password)
            this._response = { status: false, message: "Invalid username or password" };
            const user = await this.UserModel.findOne({userId, password})
            if(user){
                if (user['password'] === password) {
                    let userData = {
                        _id: user._id,
                        id: user['userId'],
                        email: user['email']
                    };
               
                    let token = utils.createJWT(userData);
                    let responseData = {
                        _id: user._id,
                        userId: user['userId'],
                        email: user['email'],
                        phone: user['phone'],
                        firstname: user['firstname'],
                        token
                    };
                    this._response = {status: true, message: "Login success", data: responseData };
                    return requestHelper.respondWithJsonBody(200, this._response);
                }
            }
            return requestHelper.respondWithJsonBody(200, this._response);   
        }catch(err){
            this._response.message = err.message;
            if (err && err.status_code == 400) {
                return requestHelper.respondWithJsonBody(400, this._response,);
            }
            return requestHelper.respondWithJsonBody(500, this._response);
        }
    }

    /*signup*/ 
    async signUp(body) {
        try {
            const schema = Joi.object().keys({
                userId: Joi.string().required(),
                email: Joi.string().required(),
                agency_code: Joi.string().required(),
                phone: Joi.string().required(),
                office_symbol: Joi.string().required(),
                firstname: Joi.string().required(),
                middlename: Joi.string().required(),
                lastname: Joi.string().required(),
                email: Joi.string().required(),
                role: Joi.string().required(),
                password: Joi.string().required()
            });
            await utils.validate(body, schema)    
            const user = new this.UserModel({
                email: body.email,
                userId: body.userId,
                agency_code: body.agency_code,
                phone: body.phone,
                office_symbol: body.office_symbol,
                firstname: body.firstname,
                middlename: body.middlename,
                lastname: body.lastname,
                role: body.role,
                password: md5(body.password)
            })
            const userExist = await this.UserModel.findOne({userId: user.userId})
            if(userExist){
                this._response = {status: false, message: "User already exist"}; 
                return requestHelper.respondWithJsonBody(200, this._response);
            }else{
            await user.save()
                this._response = {status: true, message: "Registered Successfully"}; 
                return requestHelper.respondWithJsonBody(200, this._response);
            }
        } catch(err) {
            this._response ={ status: false, message: err.message };
            if (err && err.status_code == 400) {
                return requestHelper.respondWithJsonBody(400, this._response,);
            }
            return requestHelper.respondWithJsonBody(500, this._response);
        }
    }

}
module.exports = AuthService