export const getGuestId = () => {
  const k = "guestId";
  let id = localStorage.getItem(k);
  if (!id) { id = "guest-" + Math.random().toString(36).slice(2,10); localStorage.setItem(k, id); }
  return id;
};
