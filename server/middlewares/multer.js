import multer from "multer"

// funtion which stores file on public folder
const storage = multer.diskStorage({
    // where file is staying
   destination : (req,file,cb)=>{
    //kiuki ye same foler main h
    cb(null,"./public")
   },

   //file name change to originsl name of that file
   filename : (req,file,cb)=>{
    cb(null,file.originalname)
   }
})

export const upload = multer({storage})