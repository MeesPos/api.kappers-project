/*
  Warnings:

  - Added the required column `treatment_id` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointments` ADD COLUMN `treatment_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Treatments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_treatment_id_fkey` FOREIGN KEY (`treatment_id`) REFERENCES `Treatments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
