import mongoose from "mongoose";
const Schema = mongoose.Schema;

const note = new Schema({
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug' required: true },
    flagged: { type: String, enum: ["pending", "completed", "rejected"] },
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Value.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default note