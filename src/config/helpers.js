export const createBlobUrlFile = (files) => {
    const selectedFilesArray = Array.from(files);
    const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
    });
    return { 'urlArray': imagesArray, filesArray: selectedFilesArray }
};