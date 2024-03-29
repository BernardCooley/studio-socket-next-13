import { CSSProperties } from "react";
import { Node, Position } from "reactflow";

export interface ISelect {
    select: {
        [key: string]: boolean;
    };
}

export interface IOrderBy {
    [key: string]: any;
}

export interface ISearchQuery {
    [key: string]: {
        search: string;
    };
}

export interface IFetchDevicesBody {
    skip: number;
    take?: number;
    select: {
        id: boolean;
        slug: boolean;
        title: boolean;
        deviceId: boolean;
        countryOfManufacturer: boolean;
        datesProduced: boolean;
        formFactor: ISelect;
        manufacturers: ISelect;
        deviceTypes: ISelect;
        users: ISelect;
        connections: {
            select: {
                connector: ISelect;
                description: ISelect;
                devices: ISelect;
            };
        };
    };
    where?: {
        OR?: any;
        AND?: any;
    };
    orderBy?: IOrderBy[];
}

export type AndOr = "AND" | "OR";

export type SortFilter = "sort" | "filter" | null;

export interface IActionButton {
    type: string;
    onClick: () => void;
    confirmAction: string;
}

export interface IActionButtons {
    yours: IActionButton[];
    all: IActionButton[];
}

export interface QueryParam {
    key: string;
    value: string;
}

export type IDeviceNode = Node<any, string | undefined>;

export interface ICustomEdge {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
    style?: CSSProperties;
    data: any;
    markerEnd?: string;
}

export interface IConnector {
    id: string;
    name: string;
}
