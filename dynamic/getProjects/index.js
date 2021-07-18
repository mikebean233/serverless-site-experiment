const Firestore = require('@google-cloud/firestore');

const PROJECTID = process.env.PROJECT_ID;
const COLLECTION_NAME = process.env.COLLECTION;

const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
    // NOTE don't hardcode your project credentials here.
    // If you have to, export the following to your shell:
    //   GOOGLE_APPLICATION_CREDENTIALS=<path>
    // keyFilename: '/cred/cloud-functions-firestore-000000000000.json',
});

/**
 * Retrieve or Store a method into Firestore
 *
 * Responds to any HTTP request.
 *
 * GET = retrieve
 * POST = store (no update)
 *
 * success: returns the document content in JSON format & status=200
 *    else: returns an error:<string> & status=404
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getProjects = (req, res) => {
    try{
        console.log(req);
        let result = [];
        return firestore.collection(COLLECTION_NAME)
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    result.push(doc.data());
                });
                res.json(result);
            });
    } catch(exception) {
        console.error(exception);
        res.status(500).send(exception);
    }
};