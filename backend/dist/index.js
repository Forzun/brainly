"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db/db");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./middleware/auth");
const hash_1 = require("./utils/hash");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_SECRET = "secret";
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const exsitingUser = yield db_1.UserModel.findOne({
        username: username
    });
    if (exsitingUser) {
        res.status(403).json({
            message: "User already exist withe this username",
        });
        return;
    }
    const user = yield db_1.UserModel.create({
        username: username,
        password: password,
    });
    if (user) {
        res.status(200).json({
            message: "User created successfully",
            user: user,
        });
        return;
    }
    else {
        res.status(400).json({
            message: "User creatin faild"
        });
    }
}));
app.get("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db_1.UserModel.find({});
    if (!users) {
        res.status(403).json({
            message: "No user found"
        });
    }
    res.status(200).json({
        message: "Users fetched successfully",
        users: users,
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({
        username: username,
        password: password,
    });
    if (!user) {
        res.status(403).json({
            message: "Need to signup first"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        username: user.username
    }, JWT_SECRET);
    res.status(200).json({
        user: user,
        token: token
    });
}));
app.post("/api/v1/content", auth_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type, tag } = req.body;
    try {
        const content = yield db_1.ContentModel.create({
            title: title,
            link: link,
            type: type,
            //@ts-ignore
            userId: req.userId,
            // tag: [], 
        });
        if (content) {
            res.status(200).json({
                message: "content created successfully",
                content: content
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "content creation failed"
        });
        console.log('flaksjfksa');
    }
}));
app.post("/api/v1/share", auth_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        const share = req.body.share;
        if (share) {
            const existingUser = yield db_1.LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (existingUser) {
                res.status(200).json({
                    hash: existingUser.hash
                });
                return;
            }
            const hash = (0, hash_1.random)(10);
            yield db_1.LinkModel.create({
                hash: hash,
                //@ts-ignore
                userId: req.userId
            });
            return;
        }
        else {
            res.status(400).json({
                message: "Link is disable!"
            });
        }
    }
}));
app.get("/api/v1/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareLink = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash: shareLink,
    });
    if (!link) {
        res.status(404).json({
            message: 'link is not found'
        });
        return;
    }
    const content = yield db_1.ContentModel.findOne({
        //@ts-ignore
        userId: link.userId,
    });
    const user = yield db_1.UserModel.findOne({
        //@ts-ignore
        _id: link.userId,
    });
    if (!user) {
        res.status(404).json({
            message: "user not found",
        });
    }
    res.status(200).json({
        user: user,
        content: content,
    });
}));
app.listen(3000);
