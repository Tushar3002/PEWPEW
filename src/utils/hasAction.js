export const hasAction = (permission, onView) => {
  return (
    Boolean(onView) ||
    Boolean(permission?.canUpdate) ||
    Boolean(permission?.canDelete)
  );
};