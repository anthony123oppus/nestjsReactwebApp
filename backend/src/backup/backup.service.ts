import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import * as path from 'path';
import * as dotenv from 'dotenv'

dotenv.config();

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  private backupDatabase(filename: string) {
    const backupPath = path.join(__dirname, '..', '..', '..', 'src', 'backups', filename);

    const username = process.env.MYSQL_USERNAME;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;

    // Adjust the command below based on your database type and configuration
    const command = `wsl mysqldump -u ${username} -p${password} ${database} > ${backupPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`Error executing backup command: ${error.message}`);
        return;
      }
    //   for  warning purpose only
    //   if (stderr) {
    //     this.logger.error(`Backup stderr: ${stderr}`);
    //     return;
    //   }
      this.logger.log(`Database backup completed: ${backupPath}`);
    });
  }

  // @Cron(CronExpression.EVERY_10_SECONDS) //  backup every second
  // handleDailyBackup() {
  //   const currentDate = new Date();
  //   const dateString = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  //   const timeString = currentDate.toTimeString().slice(0, 8).replace(/:/g, '-'); // Format: HH-MM-SS

  //   const filename = `backup-daily-${dateString}-${timeString}.sql`;
  //   this.backupDatabase(filename);
  // }

//   @Cron('0 0 * * *') // Daily at midnight
//   handleDailyBackup() {
//     const filename = `backup-daily-${new Date().toISOString().slice(0, 10)}.sql`;
//     this.backupDatabase(filename);
//   }

//   @Cron('0 0 * * 0') // Weekly on Sunday at midnight
//   handleWeeklyBackup() {
//     const filename = `backup-weekly-${new Date().toISOString().slice(0, 10)}.sql`;
//     this.backupDatabase(filename);
//   }

//   @Cron('0 0 1 * *') // Monthly on the 1st at midnight
//   handleMonthlyBackup() {
//     const filename = `backup-monthly-${new Date().toISOString().slice(0, 10)}.sql`;
//     this.backupDatabase(filename);
//   }
}
