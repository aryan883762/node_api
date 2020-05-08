const router = require('express').Router()
const requestHelper = require('../common/request_helper');
const { authService } = require("../services/index")
    //login
    router.post('/login', async (req, res) => {
        const body = req.body
        const result = await authService.login(body)
        return requestHelper.handleResponse(res, result)
    })

    //signup
    router.post('/signup', async (req, res) => {
        const body = req.body
        const result = await authService.signUp(body)
        return requestHelper.handleResponse(res, result)
        
    })


module.exports = router