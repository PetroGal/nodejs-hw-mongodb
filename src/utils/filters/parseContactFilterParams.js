const parseContactType = ({ contactType }) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

// const parseNumber = (number) => {
//   const isString = typeof number === 'string';
//   if (!isString) return;

//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) {
//     return;
//   }

//   return parsedNumber;
// };

const parseNumber = (number) => {
  if (typeof number !== 'string') return null;

  const parsedNumber = parseInt(number, 10);
  if (Number.isNaN(parsedNumber)) {
    return null;
  }

  return parsedNumber;
};

export const parseContactFilterParams = (query) => {
  const { contactType } = query;

  const parsedContactType = parseContactType({ contactType });

  return {
    contactType: parsedContactType,
  };
};
