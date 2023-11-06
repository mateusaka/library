const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            "Available",
            "Maintenance",
            "Loaned",
            "Reserved"
        ],
        default: "Maintenance"
    },
    dueBack: {
        type: Date,
        default: Date.now
    }
});

BookInstanceSchema.virtual("url").get(function () {
    return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("dueBackFormatted").get(function () {
    return DateTime.fromJSDate(this.dueBack).setLocale("en").toLocaleString({
        day: "numeric",
        month: "long", // "short"
        year: "numeric"
    });
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);