import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    UserCredential
} from "firebase/auth";

interface CreateUser {
    email: string;
    password: string;
}

export const doCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
    console.log(auth, 'auth');
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = (): Promise<void> => {
    return auth.signOut();
};

export const doPasswordReset = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
};

export const doSendEmailVerification = (): Promise<void> => {
    if (auth.currentUser) {
        return sendEmailVerification(auth.currentUser);
    } else {
        return Promise.reject(new Error("No user is currently signed in."));
    }
};
