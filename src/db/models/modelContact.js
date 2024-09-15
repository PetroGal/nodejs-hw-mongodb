import { Schema, model } from 'mongoose';
import { contactTypeList } from '../../constants/constantsContacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactCollection = model('contact', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export default ContactCollection;
