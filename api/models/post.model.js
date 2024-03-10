import mongoose from "mongoose";
const PostSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
            unique:true,
        },
        image:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUr7wYZW0Zs2NQ-uTZWCp1e8CjO3sqyD_WUWW8BB4Nuw&s",

        },
        category:{
            type:String,
            default:'uncategorized',

        },
        slug:{
            type:String,
            required:true,
            unique:true,
        },

    },{timestamps:true}
)
const Post=mongoose.model('Post',PostSchema);
export default Post;