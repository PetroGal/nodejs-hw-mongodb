// import * as fs from 'node:fs/promises';
import getAllContacts from './getAllContacts.js';
// import { PATH_DB_CONTACTS } from '../constants/contacts.js';
import createFakeContact from '../utils/createFakeContact.js';
import updateContacts from './updateContacts.js';

export const addOneContact = async () => {
  const contactList = await getAllContacts();
  const newContact = createFakeContact();
  contactList.push(newContact);
  await updateContacts(contactList);
};

addOneContact();
