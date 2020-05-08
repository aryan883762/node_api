const router = require('express').Router()
const { userService } = require("../services/index")
const requestHelper = require('../common/request_helper');
const jwtMiddleWare = require('../middleware/jwt-auth')

    // get profile
    router.get('/profile', jwtMiddleWare, async (req, res) => {
        const result = await userService.getProfile(req)
        return requestHelper.handleResponse(res, result)
    })

    //update profile
    router.post('/profile/update', jwtMiddleWare, async (req, res) => {
        const result = await userService.updateProfile(req)
        return requestHelper.handleResponse(res, result)
    })

module.exports = router