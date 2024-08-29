import updateContacts from './updateContacts.js';

export const removeAllContacts = async () => {
  await updateContacts([]);
};

removeAllContacts();
