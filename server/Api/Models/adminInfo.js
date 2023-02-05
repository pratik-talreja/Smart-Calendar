import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    useremail: {
        type: String,
        required: 'Name is required'
    },
    userId:{
        type: String,
        required: 'Id is required'
    },
    subject: {
        type: String,
    },
    text: {
        type: String
    }
}, { versionKey: false });

Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true });

const AdminHelpModel = mongoose.model('CustomerHelpEmails', Schema);

export default AdminHelpModel;