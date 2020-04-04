db.issues.remove({});
const issueDB = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('01/16/2019'), due: undefined,
        title: 'Error in console when clicking add'
    }, {
        id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
        created: new Date('01/26/2019'), due: new Date('02/01/2019'),
        title: 'Missing bottom border'
    }
];

db.issues.insertMany(issueDB);
const count = db.issues.count();
print('Inserted', count, 'issues');
db.counters.remove({ _id: 'issues' })
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
