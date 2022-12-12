import { collection } from "firebase/firestore";
import { db } from "./clientApp";

export const devicesRef = collection(db, "devices");
