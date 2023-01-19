import { FirebaseError } from "firebase-admin";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import { db } from "./clientApp";

db;

export const getFirebaseImage = async (
    folder: string,
    name: string,
    extension: string
) => {
    const storage = getStorage();

    const pathReference = ref(storage, `${folder}/${name}.${extension}`);

    try {
        const url = await getDownloadURL(pathReference);
        return {
            url,
            name: `${name}.${extension}`,
        };
    } catch (err) {}
};

export const uploadFirebaseImage = async (
    folder: string,
    file: File,
    userId?: string
): Promise<string> => {
    console.log(`${folder}/${userId || ""}_${file.name}`);
    try {
        const storage = getStorage();
        const storageRef = ref(
            storage,
            `${folder}/${userId || ""}_${file.name}`
        );

        const response = await uploadBytes(storageRef, file);
        return getDownloadURL(response.ref);
    } catch (err: any) {
        return err;
    }
};

export const deleteFirebaseImage = async (
    folder: string,
    name: string
): Promise<string | FirebaseError> => {
    const storage = getStorage();

    try {
        const desertRef = ref(storage, `${folder}/${name}`);

        await deleteObject(desertRef);

        return "deleted";
    } catch (err) {
        return err as FirebaseError;
    }
};
