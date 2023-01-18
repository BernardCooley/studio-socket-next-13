import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getFirebaseImage = async (
    folder: string,
    id: string,
    extension: string
) => {
    const storage = getStorage();

    const pathReference = ref(storage, `${folder}/${id}.${extension}`);

    try {
        const url = await getDownloadURL(pathReference);
        return {
            url,
            name: `${id}.${extension}`,
        };
    } catch (err) {}
};
