const mongoose = require('mongoose');

const {commonUpdatedAtRefresh, commonDateProperties} = require('./common');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        supportedComplaintResolution: {
            // desteklenen şikayet çözümü
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        passwordChange: {
            // şifre değişikliği
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        complaintEvaluation: {
            // şikayet değerlendirme
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        publicationOfComplaint: {
            // şikayetin yayınlanması
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        responseToComplaint: {
            // şikayete cevap
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        commentsOnComplaint: {
            // şikayete yorum
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        informingAboutOfComplaintToBrand: {
            // şikayetin markaya bildirilmesi
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        incInRateOfReadingComplaints: {
            // şikayet okuma oranı artışı
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        incInRateOfComplaintsSupport: {
            // şikayet desteği oranı artışı
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        infoAboutPublicationOfComplaint: {
            // şikayetin yayınlanması hakkında bilgi
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        promotionAnnouncementAndInfo: {
            // promosyon, duyuru ve bilgilendirme
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        thanksReqForComplaint: {
            // şikayet için teşekkür talebi
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        repliesToYourComments: {
            // yorumlarınıza cevap
            type: Object,
            default: {
                email: true,
                web: true,
                sms: true,
                push: true,
            },
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(NotificationSchema);

module.exports = mongoose.model('Notification', NotificationSchema);
