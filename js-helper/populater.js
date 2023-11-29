// const parsePopulates = (populates, isInternal) => {
//  if (populates.length === 0) throw new Error('Populates array is empty');
//  const populate = [];
//  for (let i = 1; i < populates.length; i++) {
//   const isStartPath = populates[i].startsWith('path');
//   if (!isStartPath) continue;
//   const startPathName = populates[i].split('.')[1];
//   const startPath = { path: startPathName };
//   // { path: 'a' }
//   const isSelect = populates[i].includes(startPathName + '.select')
//    ? populates[i]
//       .split('select.')[1]
//       .split(' ')
//       .map((field) => {
//        if (field.startsWith('+')) {
//         field = field.split('+')[1];
//         return { [field]: 1 };
//        }
//        if (field.startsWith('-')) {
//         field = field.split('-')[1];
//         return { [field]: 0 };
//        }
//       })
//    : false;
//   if (isSelect) {
//    startPath.select = isSelect.reduce((acc, curr) => {
//     acc = { ...acc, ...curr };
//     return acc;
//    }, {});
//   }
//   if (isInternal) return startPath;
//   // { path: 'a', select: { name: 1, surname: 0 } }
//   const isPopulate = populates[i].includes(startPathName + '.populate')
//    ? populates[i]
//       .split('populate.')[1]
//       .split(' ')
//       .map((field) => {
//        if (field.startsWith('+')) {
//         field = field.split('+')[1];
//         return { [field]: 1 };
//        }
//        if (field.startsWith('-')) {
//         field = field.split('-')[1];
//         return { [field]: 0 };
//        }
//       })
//    : false;
//   if (isPopulate) {
//    startPath.populate = isPopulate.reduce((acc, curr) => {
//     acc = { ...acc, ...curr };
//     return acc;
//    }, {});
//   }
//   console.log(startPath);
//  }
//  return populate;
// };
//
// // const populates = [
// //  'path.a',
// //  'path.a.select.+name -surname',
// // ];
//
// const oth = [
//  'path.supporters.select.+name +surname',
//  'path.supporters.populate.path.supporter.select.+name +surname.path.avatar.select.+url -key',
// ];
//
// const popOut = (populates) => {
//  const pop = [];
//  for (const popElement of pop) {
//   const isStartPath = popElement.startsWith('path');
//  }
// };
//
// console.log(parsePopulates(oth));
//
// //
// // try {
// //  const parsedPopulates = parsePopulates(populates);
// //  console.log(JSON.stringify(parsedPopulates, null, 2));
// // } catch (error) {
// //  console.error(error.message);
// // }

const createPopulateStringArray = () => {
 return [
  'path.supporters.select.-complaint',
  'path.supporters.populate.path.supporter.select.name path.supporters.populate.path.supporter.select._id',
  'path.supporters.populate.path.supporter.populate.path.avatar.select.url path.supporters.populate.path.supporter.populate.path.avatar.select._id path.supporters.populate.path.supporter.populate.path.avatar.select.key',
 ];
};

const parsePopulateStringArray = (stringArray) => {
 const result = {};

 for (const pathString of stringArray) {
  let currentObj = result;
  const parts = pathString.split('.');

  for (let i = 0; i < parts.length; i++) {
   const part = parts[i];

   if (part.startsWith('select')) {
    currentObj['select'] = { path: parts[i + 1] };
    currentObj = currentObj['select'];
    i++;
   } else if (part.startsWith('populate')) {
    currentObj['populate'] = {};
    currentObj = currentObj['populate'];
   } else {
    currentObj['path'] = part;
   }
  }
 }

 return result;
};

// Örnek kullanım
const stringArray = createPopulateStringArray();
const parsedPopulate = parsePopulateStringArray(stringArray);

console.log(JSON.stringify(parsedPopulate, null, 2));
