import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("text_editor", 1);
  const tranx = db.transaction("text_editor","readwrite")
  const store = tranx.objectStore("text_editor")
  const req = store.put({id: 1, value: content})
  const result = await req
  console.log("Data saved to the DB", result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("text_editor", 1);
  const tranx = db.transaction("text_editor","readwrite")
  const store = tranx.objectStore("text_editor")
  const req = store.getAll()
  const result = await req
  console.log("Data got from the DB", result)
  return result.value
};

initdb();
