import {
    CollectionReference,
    DocumentData,
    getDocs,
    query,
    where,
    WhereFilterOp,
    limit,
} from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { IFirebaseImage } from "../types";
import { trimFileExtension } from "../utils";
import { devicesRef } from "./firebaseRefs";

export const getDocumentsWhere = async (
    collectionRef: CollectionReference<DocumentData>,
    getBy: string,
    operator: WhereFilterOp,
    name: string | number,
    dingleDoc?: boolean
) => {
    try {
        const response = query(collectionRef, where(getBy, operator, name));
        const docs = (await getDocs(response)).docs.map((doc) => doc.data());

        if (dingleDoc) {
            return docs[0];
        }

        return docs;
    } catch (e) {
        console.log(`Error getting docs where ${getBy} is ${name} ${e}`);
    }
    return null;
};

export const getFirebaseImage = async (
    folder: string,
    filename: string
): Promise<IFirebaseImage | undefined> => {
    const storage = getStorage();
    const pathReference = ref(storage, `${folder}/${filename}`);

    try {
        const name = filename;
        const url = await getDownloadURL(pathReference);
        return { url, name };
    } catch (e) {
        console.log(e);
    }
    return undefined;
};

export const getFirebaseImages = async (
    folder: string
): Promise<IFirebaseImage[] | undefined> => {
    const storage = getStorage();
    const pathReference = ref(storage, `${folder}`);

    try {
        const imageRefs = await listAll(pathReference);
        return await Promise.all(
            imageRefs.items.map(async (imageRef) => {
                const url = await getDownloadURL(imageRef);
                const name = trimFileExtension(imageRef.name);

                return {
                    name,
                    url,
                };
            })
        );
    } catch (e) {
        console.log(e);
    }
    return undefined;
};

export const getFirebaseDevices = async (
    amount: number = 1,
    filterField?: string,
    filterType?: WhereFilterOp,
    filterValue?: string
): Promise<DocumentData[] | null> => {
    let q;

    if (filterField && filterValue && filterType) {
        q = query(
            devicesRef,
            limit(amount),
            where(filterField, filterType, filterValue)
        );
    } else {
        q = query(devicesRef, limit(amount));
    }

    try {
        const data = await getDocs(q);
        const docs = data.docs.map((doc) => doc.data());
        return docs;
    } catch (e) {
        console.log(e);
    }

    return null;
};
