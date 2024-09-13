import { getRandomArrayElement } from '../utils/common.js';

const jsonPointEvents = [
  {
    'id': '13970780-1672-46c4-a21f-e6b9a595844e',
    'base_price': 8579,
    'date_from': '2024-10-24T06:37:09.899Z',
    'date_to': '2024-10-24T13:03:09.899Z',
    'destination': '039f3178-3015-46b2-a395-fa26efb2015c',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '37d938bd-02ea-4a60-981f-901b03c016e0',
    'base_price': 1294,
    'date_from': '2024-10-25T18:41:09.899Z',
    'date_to': '2024-10-27T09:05:09.899Z',
    'destination': '3a3146cf-f88f-4d1e-8bed-7eb6cef145c8',
    'is_favorite': true,
    'offers': [
      'dec3c29a-c5ad-4388-b49c-c1f1455f0d03',
      '2019ab0e-4e4e-4252-b9c0-d3a9f4db2923',
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    'type': 'bus'
  },
  {
    'id': '67c5e788-e587-4e68-86b3-1fbfc0b2e0d6',
    'base_price': 1619,
    'date_from': '2024-10-28T15:57:09.899Z',
    'date_to': '2024-10-29T03:09:09.899Z',
    'destination': 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    'is_favorite': true,
    'offers': [
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    'type': 'drive'
  },
  {
    'id': '731df982-97a5-4a33-92e6-a4680ee76e39',
    'base_price': 6096,
    'date_from': '2024-10-30T12:44:09.899Z',
    'date_to': '2024-11-01T12:11:09.899Z',
    'destination': '7aa8ddd3-9ebe-45cf-8456-5377802ac252',
    'is_favorite': false,
    'offers': [
      'b8529b05-414e-414f-98c4-fc46a0a36ef8',
      'ac05e5bb-729e-41c4-b1cf-71087cd46806'
    ],
    'type': 'flight'
  },
  {
    'id': 'aab5c3e1-40a6-4294-bdbe-3ec77807cb1a',
    'base_price': 3295,
    'date_from': '2024-11-03T06:31:09.899Z',
    'date_to': '2024-11-04T03:00:09.899Z',
    'destination': '363aa35f-8cee-48da-9ff8-6d0d6c54d9b0',
    'is_favorite': true,
    'offers': [
      'fc347484-63f4-4b73-9dcd-805ad2192d1e',
      'f2c35098-c7cc-4870-81f8-24bbcbbd2eec',
      '0c3d09c7-3750-4ae0-89f0-b405e76ad1ed'
    ],
    'type': 'train'
  },
  {
    'id': 'd4ca203f-5b65-4a7f-be14-d87f2d661623',
    'base_price': 3850,
    'date_from': '2024-11-04T13:18:09.899Z',
    'date_to': '2024-11-06T11:45:09.899Z',
    'destination': '5052c42d-c848-4f5a-bc0e-1c7a9159b55b',
    'is_favorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': 'ce7a781a-a969-429f-9c75-49bfa5ceaae6',
    'base_price': 9841,
    'date_from': '2024-11-07T20:59:09.899Z',
    'date_to': '2024-11-08T03:18:09.899Z',
    'destination': '363aa35f-8cee-48da-9ff8-6d0d6c54d9b0',
    'is_favorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '42e1b8b6-4b00-4122-b3fd-1bbbfc0e60bd',
    'base_price': 5566,
    'date_from': '2024-11-08T14:35:09.899Z',
    'date_to': '2024-11-09T18:25:09.899Z',
    'destination': '238dfde9-12df-43f3-ae52-52145715e238',
    'is_favorite': false,
    'offers': [
      'c2eae7b6-f4af-4a00-a4fe-f8a34e275ed3',
      'b8529b05-414e-414f-98c4-fc46a0a36ef8',
      'ac05e5bb-729e-41c4-b1cf-71087cd46806'
    ],
    'type': 'flight'
  },
  {
    'id': '12562860-fc48-4748-8868-54808eba1a27',
    'base_price': 3925,
    'date_from': '2024-11-10T07:54:09.899Z',
    'date_to': '2024-11-11T03:40:09.899Z',
    'destination': '3a3146cf-f88f-4d1e-8bed-7eb6cef145c8',
    'is_favorite': false,
    'offers': [
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    'type': 'taxi'
  },
  {
    'id': 'bc5715b7-becf-4523-81d0-d36906233634',
    'base_price': 9639,
    'date_from': '2024-11-11T21:56:09.899Z',
    'date_to': '2024-11-13T18:38:09.899Z',
    'destination': 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    'is_favorite': false,
    'offers': [
      '2019ab0e-4e4e-4252-b9c0-d3a9f4db2923',
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    'type': 'bus'
  },
  {
    'id': 'c17986e9-04e7-436c-a6a8-f7459f1a41cf',
    'base_price': 6519,
    'date_from': '2024-11-14T18:03:09.899Z',
    'date_to': '2024-11-16T14:40:09.899Z',
    'destination': '5052c42d-c848-4f5a-bc0e-1c7a9159b55b',
    'is_favorite': true,
    'offers': [
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    'type': 'drive'
  },
  {
    'id': 'bf2b0573-1003-4c81-8e79-53126c9c9496',
    'base_price': 2504,
    'date_from': '2024-11-18T10:17:09.899Z',
    'date_to': '2024-11-20T01:42:09.899Z',
    'destination': 'd01a72e9-087f-4837-a146-ba6a1709ac22',
    'is_favorite': true,
    'offers': [
      '207e3e47-7a57-4a7d-905b-5d560ec30d59'
    ],
    'type': 'restaurant'
  },
  {
    'id': '533eb36c-a18d-4303-a713-75899514fcc3',
    'base_price': 2636,
    'date_from': '2024-11-21T13:41:09.899Z',
    'date_to': '2024-11-22T19:07:09.899Z',
    'destination': '579b75cd-c26b-43eb-a3f9-d153690db8b9',
    'is_favorite': true,
    'offers': [
      'fb921a7a-4c6b-4aa2-9059-77b60e347ece',
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    'type': 'drive'
  },
  {
    'id': '9bc4db30-c207-4010-b846-8e657d98b412',
    'base_price': 7577,
    'date_from': '2024-11-24T03:58:09.899Z',
    'date_to': '2024-11-24T18:52:09.899Z',
    'destination': '579b75cd-c26b-43eb-a3f9-d153690db8b9',
    'is_favorite': true,
    'offers': [
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    'type': 'taxi'
  },
  {
    'id': '1061052e-72e8-46d1-8109-7b228f27459a',
    'base_price': 9617,
    'date_from': '2024-11-26T07:48:09.899Z',
    'date_to': '2024-11-27T17:42:09.899Z',
    'destination': '363aa35f-8cee-48da-9ff8-6d0d6c54d9b0',
    'is_favorite': true,
    'offers': [
      'fb921a7a-4c6b-4aa2-9059-77b60e347ece',
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    'type': 'drive'
  },
  {
    'id': 'c096e0bb-e83d-42e1-97f1-37aa0f14605c',
    'base_price': 2211,
    'date_from': '2024-11-28T01:29:09.899Z',
    'date_to': '2024-11-29T02:17:09.899Z',
    'destination': '238dfde9-12df-43f3-ae52-52145715e238',
    'is_favorite': false,
    'offers': [
      'b8529b05-414e-414f-98c4-fc46a0a36ef8',
      'ac05e5bb-729e-41c4-b1cf-71087cd46806'
    ],
    'type': 'flight'
  },
  {
    'id': '1ae2cf64-a65c-4c9c-bd32-d9c8b9fdbf6c',
    'base_price': 5769,
    'date_from': '2024-11-29T10:56:09.899Z',
    'date_to': '2024-12-01T07:00:09.899Z',
    'destination': '5052c42d-c848-4f5a-bc0e-1c7a9159b55b',
    'is_favorite': true,
    'offers': [
      '9f523857-6d81-489c-8ec3-41dc9c67c01d',
      '0416f625-1e61-4088-a7ea-b2f1f6769268',
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    'type': 'taxi'
  },
  {
    'id': 'bb531957-64d7-4e80-85cd-9df55381a7e1',
    'base_price': 8717,
    'date_from': '2024-12-01T20:10:09.899Z',
    'date_to': '2024-12-02T18:58:09.899Z',
    'destination': '039f3178-3015-46b2-a395-fa26efb2015c',
    'is_favorite': false,
    'offers': [
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    'type': 'bus'
  },
  {
    'id': 'd9f94162-0cb5-4fc5-a1a0-262654b656af',
    'base_price': 7400,
    'date_from': '2024-12-04T07:15:09.899Z',
    'date_to': '2024-12-04T21:29:09.899Z',
    'destination': 'd01a72e9-087f-4837-a146-ba6a1709ac22',
    'is_favorite': true,
    'offers': [
      'e71488f0-af79-4c1d-b864-cf07ce0d9ee4',
      '52ceefd8-2c4f-4620-9465-44ced8a5693c',
      'fbd3d2b4-1cf5-4b47-b210-c0e11f6f5b0b',
      'f30d0ade-6e37-4627-88e6-c6819e1730a6'
    ],
    'type': 'check-in'
  },
  {
    'id': '87755048-a995-4808-8354-4aa8ccbdef44',
    'base_price': 7898,
    'date_from': '2024-12-05T11:49:09.899Z',
    'date_to': '2024-12-06T05:52:09.899Z',
    'destination': '7aa8ddd3-9ebe-45cf-8456-5377802ac252',
    'is_favorite': false,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': 'e7efd091-fcdd-4072-987b-e1334ac730c6',
    'base_price': 4863,
    'date_from': '2024-12-06T15:34:09.899Z',
    'date_to': '2024-12-07T01:25:09.899Z',
    'destination': 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    'is_favorite': true,
    'offers': [
      'fc347484-63f4-4b73-9dcd-805ad2192d1e',
      'f2c35098-c7cc-4870-81f8-24bbcbbd2eec',
      '0c3d09c7-3750-4ae0-89f0-b405e76ad1ed'
    ],
    'type': 'train'
  },
  {
    'id': 'f24be486-149c-475a-b62e-e5b87fdbdaf9',
    'base_price': 4723,
    'date_from': '2024-12-09T01:48:09.899Z',
    'date_to': '2024-12-10T07:43:09.899Z',
    'destination': 'e2ddfcc3-a9b8-4db6-a811-a3828d2a829c',
    'is_favorite': false,
    'offers': [
      'fe102690-c3f7-4620-9eed-1be6e5515bb1',
      '98dc10ed-69b8-4829-811e-b8c89f220e90',
      '4859058d-caa6-4747-be06-c31841f6f8dd',
      '1807bf59-1021-41a2-a409-155962017348',
      '56b06cbf-bbef-45cc-bedf-04175e6e0d8f'
    ],
    'type': 'ship'
  },
  {
    'id': '8ab36fb2-eba0-4b38-8cf3-19d86dd9b1c1',
    'base_price': 5216,
    'date_from': '2024-12-11T15:29:09.899Z',
    'date_to': '2024-12-12T23:28:09.899Z',
    'destination': '039f3178-3015-46b2-a395-fa26efb2015c',
    'is_favorite': false,
    'offers': [
      '954cc84d-7283-482a-8b23-67924764294f',
      '9e299604-2f87-45dc-95e9-1edbfd566ab1',
      '82528155-38b1-42dd-ba2d-93f78fec7c89'
    ],
    'type': 'taxi'
  },
  {
    'id': '78fd8473-f24b-453c-a2f4-b3a60f15b12d',
    'base_price': 8413,
    'date_from': '2024-12-14T16:23:09.899Z',
    'date_to': '2024-12-16T05:52:09.899Z',
    'destination': '7aa8ddd3-9ebe-45cf-8456-5377802ac252',
    'is_favorite': false,
    'offers': [
      '71ae9618-d5a0-4d77-9d13-7f26805e176c'
    ],
    'type': 'drive'
  },
  {
    'id': '48cdb4b0-6aac-4ea7-9def-4ac030d23f62',
    'base_price': 6061,
    'date_from': '2024-12-17T03:51:09.899Z',
    'date_to': '2024-12-18T04:57:09.899Z',
    'destination': 'd01a72e9-087f-4837-a146-ba6a1709ac22',
    'is_favorite': false,
    'offers': [
      'b2006f18-828a-47e7-8b36-48560d825b83'
    ],
    'type': 'bus'
  }
];

//Для приведения json данных в нужный вид
function parseAndRenameData(data) {
  const parsedData = JSON.parse(JSON.stringify([...data]));
  const renamedData = parsedData.map((item) => {
    const {id, base_price: basePrice, date_from: dateFrom, date_to: dateTo, destination, is_favorite: isFavorite, offers, type} = item;
    return {
      id, basePrice, dateFrom, dateTo, destination, isFavorite, offers, type
    };
  });
  return renamedData;
}

const pointEvents = parseAndRenameData(jsonPointEvents);

function getRandomMockPointEvent() {
  return getRandomArrayElement(pointEvents);
}

export { getRandomMockPointEvent };
