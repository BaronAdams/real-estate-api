import { Request } from "express"
import multer from "multer"
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void =>{
        cb(null,'images')
    },
    filename:(req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        const name = file.originalname
        cb(null, Date.now() + name)
    }
})

export default multer({storage:storage}).single('postimage')

