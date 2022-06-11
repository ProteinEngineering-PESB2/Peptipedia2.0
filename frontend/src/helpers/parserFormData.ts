import { EnumFileType } from "../utils/enums";
import { PostData } from "../utils/interfaces";

export const parserFormDataWithoutOptions = (data: PostData): any => {
  if (data.fileType === EnumFileType.TEXT) {
    const postData = {
      data: data.fastaText,
    };

    return postData;
  } else if (data.fileType === EnumFileType.FILE) {
    const postData = new FormData();
    postData.append("file", data.fastaFile!);

    return postData;
  }
};
