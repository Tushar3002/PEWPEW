import { useState } from "react";

const useStatusConfirmation = () => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusId, setStatusId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const openStatusModal = (id, currentValue) => {
    setStatusId(id);
    setCurrentStatus(currentValue);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setStatusId(null);
    setCurrentStatus(false);
  };

  return {
    showStatusModal,
    statusId,
    currentStatus,
    isUpdatingStatus,
    setIsUpdatingStatus,
    openStatusModal,
    closeStatusModal,
  };
};

export default useStatusConfirmation;