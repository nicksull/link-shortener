export const isValidUrl = (urlToCheck) => {
  try {
    const url = new URL(urlToCheck);
    return true;
  } catch (_) {
    return false;
  }
};
