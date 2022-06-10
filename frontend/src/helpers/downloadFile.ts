import JsFileDownloader from "js-file-downloader";
import toast from "react-hot-toast";

const process = (e: ProgressEvent<EventTarget>): any => {
  if (!e.lengthComputable) return;
  const downloadingPercentage = Math.floor((e.loaded / e.total) * 100);
  toast.loading(`Downloading (${downloadingPercentage}%)`)
};

export const downloadFile = (url: string): void => {
  const download = new JsFileDownloader({
    url,
    autoStart: false,
    process: process,
  });

  download
    .start()
    .then(() => {
      toast.success("Downloaded file");
    })
    .catch(() => {
      toast.error("Error downloading file");
    });
};
