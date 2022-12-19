/*
  Warnings:

  - Added the required column `personal_data_id` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointments` ADD COLUMN `personal_data_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PersonalDatas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_personal_data_id_fkey` FOREIGN KEY (`personal_data_id`) REFERENCES `PersonalDatas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
