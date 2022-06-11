export interface PostData {
    fileType: string
    fastaText: string
    fastaFile: null | File
    fastaFileName: string
}

export interface IBackdrop {
    open: boolean
    percentage: number
}