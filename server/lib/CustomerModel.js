import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email1: String,
    email2: String,
    hphone: String,
    cphone: String,
    wphone: String,
    address: String,
    coordinance: String,
    notes: {
        entityMap: {},
        blocks: []
    },
    surveyor: {
        firstName: String,
        lastName: String,
        mobile: String,
        id: String
    },
    estimator: String,
    status: String,
    email1Notification: Boolean,
    email2Notification: Boolean,
    cellNotification: Boolean,
    homeNotification: Boolean,
    workNotification: Boolean,
    sendSurvey: Boolean,
    customerUpload: []
});

const CustomersModel = mongoose.model('customers', CustomerSchema);

module.exports = CustomersModel;
