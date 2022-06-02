const admin = require('firebase-admin');
const serviceAccount = require('../config/')
if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
module.exports = admin;
let payload = {
    notification: {
        title: title,
        body: body
    }
}
await admin.messaging().sendToDevice(notificationtoken, payload, options)
    .then(res => {
        res.results?.map(r => {
            if (r.error) {
                return response = {success: false, errorType: 'User', data: res}
            }
            return response = {success: true, data: res}
        })
    })
    .catch(err => response = {success: false, errorType: 'Firebase', data: err})
}
