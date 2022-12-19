/*
  Warnings:

  - Added the required column `hairdresser_id` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointments` ADD COLUMN `hairdresser_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ChangedTimes` MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `start_time` VARCHAR(191) NULL,
    MODIFY `end_time` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `DefaultTimes` MODIFY `start_time` VARCHAR(191) NULL,
    MODIFY `end_time` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Appointments` ADD CONSTRAINT `Appointments_hairdresser_id_fkey` FOREIGN KEY (`hairdresser_id`) REFERENCES `Hairdresser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
