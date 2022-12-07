-- CreateTable
CREATE TABLE `DefaultTimes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hairdresser_id` INTEGER NOT NULL,
    `day_of_the_week` VARCHAR(191) NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `pauzes` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DefaultTimes` ADD CONSTRAINT `DefaultTimes_hairdresser_id_fkey` FOREIGN KEY (`hairdresser_id`) REFERENCES `Hairdresser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
