// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const faunadb = require("faunadb");

const q = faunadb.query;

require("dotenv").config();

const handler = async (event) => {
  try {
    
    var client = new faunadb.Client({ secret: 'fnAD-FFF4dACB_qSECHwa-B70OtnDVtQvBSqC71A' });


    const result = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_contact"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };