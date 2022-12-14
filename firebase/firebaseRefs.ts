import { collection } from "firebase/firestore";
import { firestore } from "./clientApp";

export const devicesRef = collection(firestore, "devices");
