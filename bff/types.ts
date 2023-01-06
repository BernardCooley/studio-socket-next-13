export interface ISelect {
    select: {
        [key: string]: boolean;
    };
}

export interface IOrderBy {
    [key: string]: "asc" | "desc";
}

export interface IFetchDevicesBody {
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
