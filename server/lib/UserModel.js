import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    name: String,
    email: String,
    estimator: Boolean,
    surveyor: Boolean,
    office: Boolean,
    mobile: String,
    region: String,
    appointments: [],
    customers: []
});

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;
