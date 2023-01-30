-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "formFactorId" TEXT,
    "signalPathId" TEXT,
    "datesProduced" TEXT,
    "countryOfManufacturer" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DeviceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormFactor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FormFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignalPath" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SignalPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "connectorId" TEXT,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Connector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectionDescription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ConnectionDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeviceToManufacturer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DeviceToDeviceType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DeviceToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConnectionToConnectionDescription" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ConnectionToDevice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToManufacturer_AB_unique" ON "_DeviceToManufacturer"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToManufacturer_B_index" ON "_DeviceToManufacturer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToDeviceType_AB_unique" ON "_DeviceToDeviceType"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToDeviceType_B_index" ON "_DeviceToDeviceType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToUser_AB_unique" ON "_DeviceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToUser_B_index" ON "_DeviceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConnectionToConnectionDescription_AB_unique" ON "_ConnectionToConnectionDescription"("A", "B");

-- CreateIndex
CREATE INDEX "_ConnectionToConnectionDescription_B_index" ON "_ConnectionToConnectionDescription"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConnectionToDevice_AB_unique" ON "_ConnectionToDevice"("A", "B");

-- CreateIndex
CREATE INDEX "_ConnectionToDevice_B_index" ON "_ConnectionToDevice"("B");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_formFactorId_fkey" FOREIGN KEY ("formFactorId") REFERENCES "FormFactor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_signalPathId_fkey" FOREIGN KEY ("signalPathId") REFERENCES "SignalPath"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "Connector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToManufacturer" ADD CONSTRAINT "_DeviceToManufacturer_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToManufacturer" ADD CONSTRAINT "_DeviceToManufacturer_B_fkey" FOREIGN KEY ("B") REFERENCES "Manufacturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToDeviceType" ADD CONSTRAINT "_DeviceToDeviceType_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToDeviceType" ADD CONSTRAINT "_DeviceToDeviceType_B_fkey" FOREIGN KEY ("B") REFERENCES "DeviceType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToUser" ADD CONSTRAINT "_DeviceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToUser" ADD CONSTRAINT "_DeviceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToConnectionDescription" ADD CONSTRAINT "_ConnectionToConnectionDescription_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToConnectionDescription" ADD CONSTRAINT "_ConnectionToConnectionDescription_B_fkey" FOREIGN KEY ("B") REFERENCES "ConnectionDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToDevice" ADD CONSTRAINT "_ConnectionToDevice_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToDevice" ADD CONSTRAINT "_ConnectionToDevice_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
