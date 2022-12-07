-- CreateTable
CREATE TABLE `ChangedTimes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hairdresser_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `pauzes` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChangedTimes` ADD CONSTRAINT `ChangedTimes_hairdresser_id_fkey` FOREIGN KEY (`hairdresser_id`) REFERENCES `Hairdresser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
