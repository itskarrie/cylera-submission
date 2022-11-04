export const getDataFromFile = async (absolutePathName: string) => {
  const fileData = await fetch(absolutePathName);
  return fileData ? fileData : null;
};
