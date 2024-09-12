import { SORT_ORDER } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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
