import { EnumFileType } from "./enums";
import { IBackdrop, PostData } from "./interfaces";

export const InitialValuePostData: PostData = {
    fileType: EnumFileType.TEXT,
    fastaText: "",
    fastaFile: null,
    fastaFileName: ""
}

export const InitialValueBackdrop: IBackdrop = {
    open: false,
    percentage: 0
}