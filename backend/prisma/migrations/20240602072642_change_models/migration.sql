/*
  Warnings:

  - You are about to drop the column `createdAt` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `notes` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `Notes_authorId_fkey`;

-- AlterTable
ALTER TABLE `notes` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
