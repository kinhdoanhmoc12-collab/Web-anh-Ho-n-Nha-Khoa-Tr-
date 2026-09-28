import fs from "fs";
import path from "path";
import { Logger } from "./logger";

const DATA_DIR = path.join(process.cwd(), "data");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

export function createSnapshotBackup(reason = "auto_snapshot") {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const snapshotFolder = path.join(BACKUP_DIR, `snapshot_${timestamp}_${reason}`);
    fs.mkdirSync(snapshotFolder, { recursive: true });

    const filesToBackup = ["posts.json", "banners.json", "users.json", "transactions.json"];
    let copiedCount = 0;

    for (const filename of filesToBackup) {
      const srcPath = path.join(DATA_DIR, filename);
      const destPath = path.join(snapshotFolder, filename);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
      }
    }

    // Retain only latest 30 snapshots to save disk space
    cleanOldSnapshots(30);

    Logger.info(`Auto-backup completed successfully: ${copiedCount} files saved.`, "BackupEngine", {
      folder: snapshotFolder,
    });
  } catch (error) {
    Logger.error("Failed to create snapshot backup", error, "BackupEngine");
  }
}

function cleanOldSnapshots(maxKeep = 30) {
  try {
    if (!fs.existsSync(BACKUP_DIR)) return;
    const items = fs.readdirSync(BACKUP_DIR);
    const snapshotDirs = items
      .filter((name) => name.startsWith("snapshot_"))
      .map((name) => ({
        name,
        fullPath: path.join(BACKUP_DIR, name),
        time: fs.statSync(path.join(BACKUP_DIR, name)).mtimeMs,
      }))
      .sort((a, b) => b.time - a.time);

    if (snapshotDirs.length > maxKeep) {
      const toDelete = snapshotDirs.slice(maxKeep);
      for (const d of toDelete) {
        fs.rmSync(d.fullPath, { recursive: true, force: true });
      }
    }
  } catch (e) {
    console.error("Error cleaning old snapshots:", e);
  }
}
