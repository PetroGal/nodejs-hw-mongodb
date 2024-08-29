// import * as fs from 'node:fs/promises';
// import { PATH_DB_CONTACTS } from '../constants/contacts.js';
import createFakeContact from '../utils/createFakeContact.js';
import getAllContacts from '../scripts/getAllContacts.js';
import updateContacts from './updateContacts.js';

const generateContacts = async (number) => {
  const contactList = await getAllContacts();
  const newContactList = Array(number).fill(0).map(createFakeContact);
  contactList.push(...newContactList);
  await updateContacts(contactList);
};

generateContacts(5);
