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
    const {
        addFormMessages,
        updateIcon,
        updateDialogButtons,
        updateLoadingMessage,
    } = useFormContext();

    const update = ({
        question,
        messageType,
        defaultIcon,
        successIcon,
        successAction,
        successMessage,
        successMessageType,
        messageTimeout = 5000,
        loadingMessage = "",
    }: UpdateDialogProps) => {
        addFormMessages(
            new Set([
                {
                    message: question,
                    type: messageType,
                },
            ])
        );

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

                        addFormMessages(
                            new Set([
                                {
                                    message: successMessage
                                        ? successMessage
                                        : message
                                        ? message.message
                                        : "",
                                    type: successMessageType,
                                },
                            ])
                        );
                        updateIcon(successIcon);
                        setTimeout(() => {
                            addFormMessages(new Set([]));
                        }, messageTimeout);
                    } catch (err: any) {
                        updateLoadingMessage("");
                    }
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
            {
                text: "No",
                onClick: () => {
                    addFormMessages(new Set([]));
                    updateDialogButtons([]);
                },
                classes: "bg-primary p-2 px-4 min-w-dialogButton rounded-lg",
            },
        ]);
    };

    return { update };
};

export default useUpdateDialog;
