import { useState } from "react";

export const useDeleteConfirmation = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  };
};