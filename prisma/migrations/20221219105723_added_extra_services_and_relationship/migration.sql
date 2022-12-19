-- CreateTable
CREATE TABLE `ExtraServices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtraServicesAppointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appointment_id` INTEGER NOT NULL,
    `extra_service_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExtraServicesAppointments` ADD CONSTRAINT `ExtraServicesAppointments_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `Appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtraServicesAppointments` ADD CONSTRAINT `ExtraServicesAppointments_extra_service_id_fkey` FOREIGN KEY (`extra_service_id`) REFERENCES `ExtraServices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
