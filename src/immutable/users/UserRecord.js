import { Record } from 'immutable';

const UserRecord = Record({
  address: {
    street: null,
    suite: null,
    city: null,
    zipcode: null,
    geo: {
      lat: null,
      lng: null
    }
  },
  company: {
    name: null,
    catchPhrase: null,
    bs: null
  },
  email: null,
  id: null,
  name: null,
  phone: null,
  username: null,
  website: null,
  link: null
});

export default UserRecord;
