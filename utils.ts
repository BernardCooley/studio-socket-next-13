import { SelectOption } from "./types";

export const getErrorMessages = (errors: any, fieldName: string): string[] => {
    if (!errors || errors.length === 0) return [];
    return errors
        .filter(
            (error: any) =>
                error.path.filter((path: string) => path === fieldName).length >
                0
        )
        .map((error: any) => error.message);
};

export const trimFileExtension = (filename: string): string => {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
};

export const noop = () => {};

export const imageToBase65 = (
    image: File
): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            resolve(reader?.result);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const shallowEqual = (object1: any, object2: any) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
};

export const getSelectionOptions = (options: string[]): SelectOption[] => {
    return options.map((o) => {
        return {
            value: o,
            label: o,
        };
    });
};
