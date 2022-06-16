import { EnumFileType } from "../utils/enums";
import { PostData, ICheckboxs } from "../utils/interfaces";

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

export const parserFormDataWithOptions = (
  data: PostData,
  options: any
): any => {
  if (data.fileType === EnumFileType.TEXT) {
    const postData = {
      data: data.fastaText,
      options,
    };

    return postData;
  } else if (data.fileType === EnumFileType.FILE) {
    const newOptions = new Blob([JSON.stringify(options)])

    const postData = new FormData();
    postData.append("file", data.fastaFile!);
    postData.append("options", newOptions);

    return postData;
  }
};
