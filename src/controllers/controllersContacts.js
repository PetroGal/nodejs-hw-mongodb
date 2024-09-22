import {
  createContact,
  getContacts,
  getContact,
} from '../services/servicesContacts.js';
import createHttpError from 'http-errors';

import { deleteContact } from '../services/servicesContacts.js';
import { updateContact } from '../services/servicesContacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res, next) => {
  console.log('Request received for /contacts');
  console.log('Query params: ', req.query);
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseContactFilterParams(req.query);

    const { _id: userId } = req.user;

    const contacts = await getContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter: { ...filter, userId },
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContact({ _id: contactId, userId });

  if (!contact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const contact = await createContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();

  if (!contactId) {
    next(createHttpError());
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  console.log('Received contactId:', contactId);

  const result = await updateContact(contactId, userId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
