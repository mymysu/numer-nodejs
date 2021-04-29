import fetch from "node-fetch"


/**
 * 
 * @param {import("express").Request} req 
 * @param {import('express').Response} res 
 */

export const Login = (req,res) => {
    // const {username,password} = req.query
    // const data = req.query
    // const {username,password} = req.params


        const data = req.body
        console.log (data)
        res.json({
            ...data,
            gender : 'Female'
        })
    
}
export const User = async(req,res) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = await data.json()
    const {id} = req.params
    const {user} = req.body
    res.json({
        user :"as",
        data :json


    })
}

// export const Register = (req,res) => {
    
// }
export default { Login,User}