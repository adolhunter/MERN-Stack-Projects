/* global db print */
/* eslint no-restricted-globals: "off" */

db.issues.remove({});
const issueDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('01/16/2019'),
    due: undefined,
    title: 'Error in console when clicking add',
    description:
      'steps to recreate the problem:'
      + '\n1. Refresh the brower.'
      + '\n2. select new in the filter.'
      + '\n3. put in information and click add.',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('01/26/2019'),
    due: new Date('02/01/2019'),
    title: 'Missing bottom border',
    description: 'There needs to be a border in the bottom of the panel',
  },
];

db.issues.insertMany(issueDB);
const count = db.issues.count();
print('Inserted', count, 'issues');
db.counters.remove({ _id: 'issues' });
db.deleted_issues.remove({});
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
db.deleted_issues.createIndex({ id: 1 }, { unique: true });
