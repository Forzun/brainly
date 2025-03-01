import mongoose from "mongoose"; 
mongoose.connect("mongodb+srv://vbhavesh219:GLdKNb5gXUsAS351@cluster0.znlw8.mongodb.net/Brainly")

const UserSchema = new mongoose.Schema({ 
    username:{type: String , require: true, unique:true}, 
    password:{type: String, require: true},
    name:{type: String ,require:false}
})

const TagSchema = new mongoose.Schema({ 
    title:{type:String , require:true , unique:true}
})

const ContentSchema = new mongoose.Schema({ 
        title:{type: String , require: true }, 
        link:{type: String},
        type:{type:String}, 
        userId:{type: mongoose.Schema.Types.ObjectId , ref:"User" }, 
        tag:{type: mongoose.Schema.Types.ObjectId , ref:"Tag" , require:false}
})

const LinkSchema = new mongoose.Schema({ 
    hash:{type:String , require:true , uniqure: true}, 
    userId: {type: mongoose.Schema.Types.ObjectId , ref:"User"}
})


export const UserModel = mongoose.model("User", UserSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const TagModel = mongoose.model("Tag", TagSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);