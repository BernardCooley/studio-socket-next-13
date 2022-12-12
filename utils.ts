import { routes } from "./routes";
import { IRoute } from "./types";

export const getErrorMessages = (errors: any, fieldName: string) => {
    return errors
        .filter((error: any) => error.path.includes(fieldName))
        .map((error: any) => error.message);
};

export const getRoute = (name: string): IRoute => {
    return routes.filter((route: any) => route.name === name)[0];
};

export const trimFileExtension = (filename: string) => {
    return filename.substring(0, filename.lastIndexOf(".")) || filename;
};
