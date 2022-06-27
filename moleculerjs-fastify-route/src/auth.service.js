'use strict';
const DbService = require('moleculer-db');
const CustomError = require("../helpers/error/CustomError");
const MongoDBAdapter = require('moleculer-db-adapter-mongo');
module.exports = {
    name: 'auth',
    mixins: [DbService],
    adapter: new MongoDBAdapter(process.env.MONGO_URL,
        {useNewUrlParser: true, useUnifiedTopology: true}),
    collection: 'user',
    actions: {
        async login(ctx) {
            let {username, password} = ctx.params
            const user = await ctx.call('auth.find', {
                query: {
                    username: username
                }
            })
            if (user.find(e => e).password === password) {
                let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ5LW1mN2hQQm9HRTU5UGREWElXOUdfLU9hYkdzZE9uSGFteVlLMHEiLCJjcmVhdGVkQXQiOiIyMDIyLTAxLTAyVDE0OjAwOjMwLjExN1oiLCJpYXQiOjE2NDEyNDE0MTIsImV4cCI6MTY0MTI0MzIxMn0.9GMhzHi7gKaE8JwL5RY0oPzfnWheWjj5bnpT34zsbic"
                return {
                    success: true,
                    token: token
                };
            }
            return new CustomError("Kullanıcı adı veya parola hatalı.", 400)
        },
        async register(ctx) {
            let {username, password} = ctx.params
            if (!username || !password || password === "" || username === "") return new CustomError("Please dont empty the input.", 400)
            const user = await ctx.call('auth.create', {
                username: username,
                password: password
            })
            if (user) {
                return {
                    success: true,
                    data: user
                }
            }
            return new CustomError("Hata", 400)
        },
    },
    hooks: {
        create() {

        }
    }
}