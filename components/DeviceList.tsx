import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useYDevFilterContext } from "../contexts/YDevFilterContext";
import Icons from "../icons";
import routes from "../routes";
import { noop } from "../utils";
import DeviceItem from "./DeviceItem";
import FilterIcons from "./FilterIcons";
import FilterSortLabel from "./FilterSortLabel";
import PageTitle from "./PageTitle";

interface Props {
    onScrollClick: () => void;
    elementRef: React.RefObject<HTMLDivElement>;
    userDevices: any[];
    pageTitle: string;
    iconType: "left" | "right";
    sortBy: string;
    filterKeys: string[];
}

const DeviceList = ({
    onScrollClick,
    elementRef,
    userDevices,
    pageTitle,
    iconType,
    sortBy,
    filterKeys,
}: Props) => {
    const { openSearch } = useSearchContext();
    const { showFilter } = useYDevFilterContext();
    const router = useRouter();

    useEffect(() => {}, []);

    return (
        <div className="snapScrollPane mb-20">
            <FilterIcons
                filterKeys={filterKeys}
                sortBy={sortBy}
                onFilterClick={() => showFilter("filter")}
                onSortClick={() => showFilter("sort")}
            />
            <Icons
                className={`absolute top-1 ${iconType}-16`}
                iconType={`${
                    iconType === "right" ? "chevronRight" : "chevronLeft"
                }`}
                onClick={onScrollClick}
            />
            <Icons
                className={`absolute top-1 ${
                    iconType === "right" ? "left" : "right"
                }-16`}
                iconType="search"
                onClick={openSearch}
            />
            <PageTitle title={pageTitle} />
            <div>
                <FilterSortLabel filterKeys={filterKeys} sortBy={sortBy} />
                <div className="deviceList" ref={elementRef}>
                    {userDevices &&
                        userDevices.length > 0 &&
                        userDevices.map((device) => (
                            <DeviceItem
                                key={device.id}
                                device={device}
                                onClick={() =>
                                    router.push(routes.device(device.id).as)
                                }
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default DeviceList;
