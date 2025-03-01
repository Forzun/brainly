"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://vbhavesh219:GLdKNb5gXUsAS351@cluster0.znlw8.mongodb.net/Brainly");
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: false }
});
const TagSchema = new mongoose_1.default.Schema({
    title: { type: String, require: true, unique: true }
});
const ContentSchema = new mongoose_1.default.Schema({
    title: { type: String, require: true },
    link: { type: String },
    type: { type: String },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    tag: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag", require: false }
});
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String, require: true, uniqure: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.ContentModel = mongoose_1.default.model("Content", ContentSchema);
exports.TagModel = mongoose_1.default.model("Tag", TagSchema);
exports.LinkModel = mongoose_1.default.model("Link", LinkSchema);
