import { AnimatePresence } from "framer-motion";
import React from "react";
import { IOrderBy } from "../bff/types";
import { useSearchContext } from "../contexts/SearchContext";
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import Icons from "../icons";
import routes from "../routes";
import { IDevice } from "../types";
import DeviceItem from "./DeviceItem";
import FilterIcons from "./FilterIcons";
import FilterSortLabel from "./FilterSortLabel";
import PageTitle from "./PageTitle";
import ToTop from "./ToTop";

interface Props {
    onScrollClick: () => void;
    elementRef: React.RefObject<HTMLDivElement>;
    devices: IDevice[] | null;
    pageTitle: string;
    iconType: "left" | "right";
    sortBy: IOrderBy[];
    filterKeys: string[];
    onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    showToTopButton: boolean;
    listId: string;
    userId: string;
    searchKeys: string[];
}

const DeviceList = ({
    onScrollClick,
    elementRef,
    devices,
    pageTitle,
    iconType,
    sortBy,
    filterKeys,
    onScroll,
    showToTopButton,
    listId,
    userId,
    searchKeys,
}: Props) => {
    const { openSearch } = useSearchContext();
    const { showFilter } = useYDevFilterContext();

    const Devices = (): JSX.Element => {
        if (!devices) {
            return <></>;
        }
        if (devices.length === 0) {
            return (
                <div className="text-center mt-10">
                    <p className="text-3xl">No devices found</p>
                    <div className="mt-20">
                        <Icons
                            fontSize="250px"
                            iconType="add"
                            onClick={onScrollClick}
                        />
                        <p className="text-xl">Add from database</p>
                    </div>
                </div>
            );
        }
        return (
            <>
                <AnimatePresence>
                    {devices &&
                        devices.length > 0 &&
                        devices.map((device) => (
                            <DeviceItem
                                listId={listId}
                                key={device.id}
                                device={device}
                                href={routes.device(device.id).as}
                                userId={userId}
                            />
                        ))}
                </AnimatePresence>
            </>
        );
    };

    return (
        <div
            className="snapScrollPane mb-20 pt-16 pb-8"
            onScroll={onScroll}
            id={listId}
        >
            <FilterIcons
                filterKeys={filterKeys}
                sortBy={sortBy}
                onFilterClick={() => showFilter("filter")}
                onSortClick={() => showFilter("sort")}
            />
            <Icons
                className={`absolute top-16 ${iconType}-16`}
                iconType={`${
                    iconType === "right" ? "chevronRight" : "chevronLeft"
                }`}
                onClick={onScrollClick}
                fontSize="92px"
            />
            <Icons
                className={`absolute top-16 rounded-lg shadow-lg ${
                    iconType === "right" ? "left" : "right"
                }-16 ${
                    searchKeys.length > 0
                        ? "filterSortIconActive"
                        : "filterSortIconInactive"
                }`}
                iconType="search"
                fontSize="92px"
                onClick={openSearch}
            />
            <PageTitle title={pageTitle} />
            <div>
                {devices && devices.length > 0 && (
                    <FilterSortLabel
                        filterKeys={filterKeys}
                        sortBy={sortBy}
                        searchKeys={searchKeys}
                    />
                )}
                <div className="deviceList" ref={elementRef}>
                    <Devices />
                </div>
            </div>
            <ToTop showButton={showToTopButton} listId={listId} />
        </div>
    );
};

export default DeviceList;
