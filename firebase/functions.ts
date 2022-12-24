import {
    CollectionReference,
    DocumentData,
    getDocs,
    query,
    where,
    WhereFilterOp,
    limit,
    getDoc,
    Query,
} from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { IFirebaseImage, UserData } from "../types";
import { trimFileExtension } from "../utils";

export const getDocumentsWhere = async (
    collectionRef: CollectionReference<DocumentData>,
    getBy: string,
    operator: WhereFilterOp,
    name: string | number,
    singleDoc?: boolean
) => {
    try {
        const response = query(collectionRef, where(getBy, operator, name));
        const docs = (await getDocs(response)).docs.map((doc) => doc.data());

        if (singleDoc) {
            return docs[0];
        }

        return docs;
    } catch (e) {
        console.log(`Error getting docs where ${getBy} is ${name} ${e}`);
    }
    return null;
};

export const getUserData = async (docRef: any): Promise<UserData | null> => {
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserData;
        }
    } catch (e) {
        console.log(`Error getting docs`);
    }
    return null;
};

export const getFirebaseImage = async (
    folder: string,
    filename: string
): Promise<IFirebaseImage | void> => {
    const storage = getStorage();

    const pathReference = ref(storage, `${folder}/${filename}`);
    return getDownloadURL(pathReference)
        .then((url) => {
            return { url, name: filename };
        })
        .catch(() => {});
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

export const getFirebaseData = async (
    ref: Query<DocumentData>,
    amount: number = 1,
    filterField?: string,
    filterType?: WhereFilterOp,
    filterValue?: string | string[]
): Promise<DocumentData[] | null> => {
    let q;

    if (filterField && filterValue && filterType) {
        q = query(
            ref,
            limit(amount),
            where(filterField, filterType, filterValue)
        );
    } else {
        q = query(ref, limit(amount));
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
