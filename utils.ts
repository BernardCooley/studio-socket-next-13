import { RefObject, useEffect, useMemo, useState } from "react";

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
