export interface IFetchDevicesBody {
    take?: number;
    include: {
        connections: {
            include: {
                connector: boolean;
                description: boolean;
                devices: boolean;
            };
        };
        manufacturers: boolean;
        deviceTypes: boolean;
        users: boolean;
    };
}
