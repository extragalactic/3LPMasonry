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
    notes: {
        entityMap: {},
        blocks: []
    },
    surveyor: String,
    estimator: String,
    status: String
});

const CustomersModel = mongoose.model('customers', CustomerSchema);

module.exports = CustomersModel;

