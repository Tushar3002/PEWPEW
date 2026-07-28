import { useState } from "react";

const useAttachmentViewer = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = (files, index = 0) => {
    setAttachments(files);
    setCurrentIndex(index);
    setShowViewer(true);
  };

  const closeViewer = () => {
    setShowViewer(false);
  };

  return {
    showViewer,
    attachments,
    currentIndex,
    setCurrentIndex,
    openViewer,
    closeViewer,
  };
};

export default useAttachmentViewer;