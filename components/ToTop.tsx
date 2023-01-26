import React from "react";
import Icons from "../icons";

interface Props {
    listId: string;
    showButton: boolean;
}

const ToTop = ({ listId, showButton }: Props) => {
    return (
        <>
            {showButton && (
                <div className="fixed bottom-4 text-primary-light left-4 bg-primary rounded-full p-2 shadow-2xl">
                    <Icons
                        iconType="toTop"
                        fontSize="64px"
                        onClick={() =>
                            document.querySelector(`#${listId}`)?.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            })
                        }
                    />
                </div>
            )}
        </>
    );
};

export default ToTop;
