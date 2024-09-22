import { SORT_ORDER } from '../constants/index.js';
import ContactCollection from '../db/models/modelContact.js';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.userId) {
    contactsQuery.where('userId').eq(filter.userId);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContact = (filter) => ContactCollection.findById(filter);

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
    // Validated the contactId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      console.log(`Invalid ObjectId: ${contactId}`);
      return null;
    }

    const updatedContact = await ContactCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      { new: true },
    );

    console.log('Update operation result:', updatedContact);

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    return null;
  }
};

export const updateMovie = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
