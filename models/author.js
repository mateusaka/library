const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 100
    },
    dateOfBirth: {
        type: Date
    },
    dateOfDeath: {
        type: Date
    }
});

AuthorSchema.virtual("name").get(function () {
    let fullName = "";

    if(this.firstName && this.lastName) {
        fullName = `${this.lastName}, ${this.firstName}`
    }

    return fullName;
});

AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);