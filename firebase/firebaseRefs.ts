import { collection } from "firebase/firestore";
import { db } from "./clientApp";

export const devicesRef = collection(db, "devices");
export const studiosRef = collection(db, "studios");
export const usersRef = collection(db, "users");
