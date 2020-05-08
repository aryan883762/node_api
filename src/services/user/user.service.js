const requestHelper = require('../../common/request_helper');
const Joi = require('joi');
const utils = require('../../common/utils');
class UserService {

    constructor(UserModel) {
        this.UserModel = UserModel
        this.getProfile = this.getProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this._reponse = {status: true, message: "Server error! Please try again later" };
    }

    /*Get user profile */
    async getProfile(req) {
      try {
        let result = await this.UserModel.findById(req.user._id)
        if(result) {
          const user = {
            userId: result.userId,
            email: result.email,
            agency_code: result.agency_code,
            phone: result.phone,
            office_symbol: result.office_symbol,
            firstname: result.firstname,
            middlename: result.middlename,
            lastname: result.lastname,
            role: result.role };
          this._response = {status: true, data: user}; 
          return requestHelper.respondWithJsonBody(200, this._response);
        } else {
          this._response = {status: false, message: "No data found!", data: null}; 
          return requestHelper.respondWithJsonBody(200, this._response);
        }
      }
      catch(err) {
        this._response ={ message: err.message };
        if (err && err.status_code == 400) {
            return requestHelper.respondWithJsonBody(400, this._response,);
        }
        return requestHelper.respondWithJsonBody(500, this._response);
      }
    }

    /*Update user profile */
    async updateProfile(req) {
      try {
        let id = req.user._id
        let body = req.body 
        const schema = Joi.object().keys({
          email: Joi.string().allow(""),
          agency_code: Joi.string().allow(""),
          phone: Joi.string().allow(""),
          office_symbol: Joi.string().allow(""),
          firstname: Joi.string().allow(""),
          middlename: Joi.string().allow(""),
          lastname: Joi.string().allow(""),
          role: Joi.string().allow("")
      });
      await utils.validate(body, schema)  
        let result = await this.UserModel.updateOne({_id: id}, {$set: body})
        if(result) {
          this._response = {status: true, message:"updated successfully", data: result}; 
          return requestHelper.respondWithJsonBody(200, this._response);
        } else {
          this._response = {status: true, message: "error while updating", data: null}; 
          return requestHelper.respondWithJsonBody(200, this._response);
        }
      }
      catch(err) {
        this._response ={ message: err.message };
        if (err && err.status_code == 400) {
            return requestHelper.respondWithJsonBody(400, this._response,);
        }
        return requestHelper.respondWithJsonBody(500, this._response);
      }
    }


}
module.exports = UserService