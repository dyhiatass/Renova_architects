// // Importation des variables d'environnement depuis le fichier .env
// require('dotenv').config(); 

// // Importation de MongoClient pour interagir avec MongoDB
// const { MongoClient } = require('mongodb'); 

// // Création d'une instance de client MongoDB avec l'URL fournie dans le fichier .env
// const client = new MongoClient(process.env.MONGO_URL); 

// // Fonction principale asynchrone pour gérer les opérations MongoDB
// async function main() {
//     // Connexion au serveur MongoDB
//     await client.connect(); 
//     console.log('Connection ok!'); // Confirmation que la connexion est établie

//     // Accès à la base de données nommée "renova"
//     const db = client.db('renova'); 

//     // Accès à une collection nommée "documents" dans la base de données
//     const collection = db.collection('documents'); 
//     // create
// // try {
// //     const insertData =  await collection.insertMany([
// //         { id: 1, name: "Alice", age: 25 },
// //         { id: 2, name: "Bob", age: 30 },
// //         { id: 3, name: "Charlie", age: 35 }
// //     ]);
// //     console.log(insertData);
// // } catch (error) {
// //     throw error;
// // }

// // read
// // try {
// //     const findData = await collection.find({age:30});
// //   console.log(await findData.toArray());  
    
// // } catch (error) {
// //     throw error;

// // }
// // update
// // try {
// //     const updateData = await collection.updateOne({name: "Alice"}, {$set: {name: 'pauline' , age:10}})
// //     console.log(await updateData);
// // } catch (error) {}

// // try {
// //     const updateData = await collection.updateMany({age: 25}, {$set: {name:12}})
// //     console.log(await updateData);
// // } catch (error) {
    
// // }

// // delete
// try {
//     const deleteData = await collection.deleteMany({name: "Bob"});
//     console.log(await deleteData);
    
// } catch (error) {
    
// }
// }

// // Appel de la fonction principale
// main()
//     .then(console.log) // Affiche le message retourné par la fonction si elle réussit
//     .catch(console.error) // Affiche les erreurs si elles surviennent
//     .finally(() => client.close()); // Ferme la connexion au serveur MongoDB, que l'opération réussisse ou échoue
