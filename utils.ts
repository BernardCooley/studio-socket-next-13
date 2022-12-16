import { routes } from "./routes";
import { IRoute } from "./types";

export const getErrorMessages = (errors: any, fieldName: string): string[] => {
    return errors
        .filter((error: any) => error.path.includes(fieldName))
        .map((error: any) => error.message);
};

export const getRoute = (name: string): IRoute => {
    return routes.filter((route: any) => route.name === name)[0];
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
