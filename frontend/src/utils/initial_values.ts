import { EnumFileType } from "./enums";
import { PostData } from "./interfaces";

export const InitialValuePostData: PostData = {
    fileType: EnumFileType.TEXT,
    fastaText: "",
    fastaFile: null,
    fastaFileName: ""
}
