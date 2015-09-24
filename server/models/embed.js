var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    /*bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;*/

var EmbedSchema = new Schema({
    
    embedName: { type: String, required: true, index: {unique:true} },
    embedLink: { type: String },
    howto: { type: String },
    description: { type: String },
    category: { type: String },
    tags: { type: Array },
    subject: { type: String }

});

EmbedSchema.index({ embedName: 'text', howto: 'text', description: 'text', category: 'text', tags: 'text', subject: 'text'});

module.exports = mongoose.model('Embed', EmbedSchema);