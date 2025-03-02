import express, { response } from "express"; 
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db/db";
import dotenv from 'dotenv';
import { userMiddleware } from "./middleware/auth";
import { random } from "./utils/hash";
import cors from "cors"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const JWT_SECRET = "secret";

app.post("/api/v1/signup", async(req ,res) => { 
    const {username , password} = req.body;

    const exsitingUser = await UserModel.findOne({ 
        username: username 
    })

    if(exsitingUser){ 
        res.status(403).json({ 
            message: "User already exist withe this username",
        })
        return;
    }

    const user = await UserModel.create({ 
        username: username,
        password: password,
    })
    
    if(user){ 
        res.status(200).json({ 
            message:"User created successfully", 
            user: user,
        })
        return;
    }else{ 
        res.status(400).json({ 
            message:"User creatin faild"
        })
    }
})

app.get("/api/v1/signup", async (req ,res) => {
    const users = await UserModel.find({});
    
    if(!users){
        res.status(403).json({ 
            message: "No user found"
        })
    }

    res.status(200).json({ 
        message: "Users fetched successfully",
        users: users,
    })
})

app.post("/api/v1/signin", async(req , res) => { 
    const {username , password} = req.body;

    const user = await UserModel.findOne({ 
        username: username, 
        password: password,
    })

    if(!user){
        res.status(403).json({ 
            message:"Need to signup first"
        })
        return;
    }

    const token = jwt.sign({
        id: user._id, 
        username: user.username
    } , JWT_SECRET)
    
    res.status(200).json({ 
        user:user, 
        token: token
    })
})

app.post("/api/v1/content" , userMiddleware , async (req ,res) => { 
    const {title , link , type , tag  } = req.body;

    try{
        const content = await ContentModel.create({ 
            title: title, 
            link: link, 
            type: type,
            //@ts-ignore
            userId: req.userId, 
            // tag: [], 
        })
        if(content){ 
            res.status(200).json({ 
                message:"content created successfully", 
                content: content
            })
        }
    }catch(error){ 
        res.status(400).json({
            message:"content creation failed"
        })
        console.log('flaksjfksa')
    }

})

app.post("/api/v1/share", userMiddleware , async (req , res) => {{
    const share = req.body.share; 

    if(share){ 
      const existingUser =  await LinkModel.findOne({ 
            //@ts-ignore
            userId:req.userId    
         })
        if(existingUser){ 
            res.status(200).json({ 
                hash:existingUser.hash
            })
            return ;
        } 
        const hash = random(10);
        await LinkModel.create({
            hash:hash,
            //@ts-ignore
            userId:req.userId
        })
        return;
    }else{ 
        res.status(400).json({ 
            message:"Link is disable!"
        })
    }

}})

app.get("/api/v1/:shareLink", async (req , res) =>{ 
    const shareLink = req.params.shareLink; 

    const link = await LinkModel.findOne({ 
        hash:shareLink,
    })

    if(!link){ 
        res.status(404).json({ 
            message:'link is not found'
        })
        return ;
    }

    const content = await ContentModel.findOne({ 
        //@ts-ignore
        userId: link.userId,
    })

    const user = await UserModel.findOne({ 
        //@ts-ignore
        _id: link.userId,
    })

    if(!user){
        res.status(404).json({
            message:"user not found",
        })
    }
    
    res.status(200).json({ 
        user:user, 
        content: content,
    })

})



app.listen(3000)