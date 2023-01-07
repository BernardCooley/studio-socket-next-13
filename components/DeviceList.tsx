import React, { useEffect } from "react";
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

interface Props {
    onScrollClick: () => void;
    elementRef: React.RefObject<HTMLDivElement>;
    devices: IDevice[];
    pageTitle: string;
    iconType: "left" | "right";
    sortBy: IOrderBy[];
    filterKeys: string[];
    onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
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
}: Props) => {
    const { openSearch } = useSearchContext();
    const { showFilter } = useYDevFilterContext();

    useEffect(() => {}, []);

    return (
        <div className="snapScrollPane mb-20 pt-16 pb-8" onScroll={onScroll}>
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
                className={`absolute top-16 ${
                    iconType === "right" ? "left" : "right"
                }-16`}
                iconType="search"
                fontSize="92px"
                onClick={openSearch}
            />
            <PageTitle title={pageTitle} />
            <div>
                <FilterSortLabel filterKeys={filterKeys} sortBy={sortBy} />
                <div className="deviceList" ref={elementRef}>
                    {devices &&
                        devices.length > 0 &&
                        devices.map((device) => (
                            <DeviceItem
                                key={device.id}
                                device={device}
                                href={routes.device(device.id).as}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default DeviceList;
