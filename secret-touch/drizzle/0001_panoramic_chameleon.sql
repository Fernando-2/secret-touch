CREATE TABLE `booking` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`service` varchar(32) NOT NULL,
	`date` varchar(10) NOT NULL,
	`time` varchar(16) NOT NULL,
	`status` varchar(16) NOT NULL,
	`payment_status` varchar(32) NOT NULL,
	`price_cents` int NOT NULL,
	`notes` text,
	`internal_notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`vehicle` varchar(255) NOT NULL,
	CONSTRAINT `booking_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_email_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password_hash` varchar(255) NOT NULL;