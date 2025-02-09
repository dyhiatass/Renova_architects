import fs from "fs";
import path from "path";

function printTree(dir: string, level: number = 0): void {
  try {
    const files: string[] = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath: string = path.join(dir, file);
      const stats: fs.Stats = fs.statSync(filePath);

      // Exclure `node_modules` et autres dossiers indésirables
      if (file !== "node_modules") {
        console.log(" ".repeat(level * 2) + "📂 " + file);

        if (stats.isDirectory()) {
          printTree(filePath, level + 1);
        }
      }
    });
  } catch (error) {
    console.error(` Erreur lors de la lecture du dossier ${dir}:`, error);
  }
}

// Récupérer l'argument de ligne de commande (ou répertoire courant)
const directory: string = process.argv[2] || ".";
printTree(directory);
