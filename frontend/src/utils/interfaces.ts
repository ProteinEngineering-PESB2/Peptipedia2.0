import { FastaFileType } from "./types"

export interface PostData {
    fileType: string
    fastaText: string
    fastaFile: FastaFileType
    fastaFileName: string
}