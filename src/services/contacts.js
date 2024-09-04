import ContactCollection from '../db/models/Contact.js';
import mongoose from 'mongoose';

export const getAllContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

// export const updateContact = async (contactId, payload, options = {}) => {
//   const rawResult = await ContactCollection.findOneAndUpdate(
//     {
//       _id: contactId,
//     },
//     payload,
//     { new: true, includeResultMetadata: true, ...options },
//   );

//   if (!rawResult || !rawResult.value) {
//     return {
//       contact: rawResult.value,
//       isNew: Boolean(rawResult?.lastErrorObject?.upserted),
//     };
//   }
// };

export const updateContact = async (contactId, payload) => {
  try {
    // Validate the contactId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      console.log(`Invalid ObjectId: ${contactId}`);
      return null;
    }

    // Perform the update
    const updatedContact = await ContactCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      { new: true },
    );

    // Log the result of the update operation
    console.log('Update operation result:', updatedContact);

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    return null;
  }
};
