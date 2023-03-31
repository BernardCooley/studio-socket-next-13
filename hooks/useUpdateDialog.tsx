import { useFormContext } from "../contexts/FormContext";
import { FormMessageTypes } from "../types";

interface UpdateDialogProps {
    question: string;
    messageType: FormMessageTypes;
    defaultIcon: JSX.Element;
    successIcon: JSX.Element;
    successAction: () => Promise<{ [key: string]: string } | null>;
    successMessage?: string | null;
    successMessageType: FormMessageTypes;
    messageTimeout?: number;
    loadingMessage?: string;
}

const useUpdateDialog = () => {
    const { updateIcon, updateDialogButtons, updateLoadingMessage } =
        useFormContext();

    const update = ({
        defaultIcon,
        successIcon,
        successAction,
        loadingMessage = "",
    }: UpdateDialogProps) => {
        updateIcon(defaultIcon);

        updateDialogButtons([
            {
                text: "Yes",
                onClick: async () => {
                    updateLoadingMessage(loadingMessage);
                    try {
                        const message = await successAction();
                        updateLoadingMessage("");
                        updateDialogButtons([]);
                        updateIcon(successIcon);
                    } catch (err: any) {
                        updateLoadingMessage("");
                    }
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
            {
                text: "No",
                onClick: () => {
                    updateDialogButtons([]);
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
        ]);
    };

    return { update };
};

export default useUpdateDialog;
