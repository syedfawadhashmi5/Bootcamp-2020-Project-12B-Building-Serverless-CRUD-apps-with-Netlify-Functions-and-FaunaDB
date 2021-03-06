const faunadb = require("faunadb"),
  q = faunadb.query

exports.handler = async (event, context) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    let reqObj = JSON.parse(event.body)

    var client = new faunadb.Client({ secret: 'fnAD-FFF4dACB_qSECHwa-B70OtnDVtQvBSqC71A' });


    var result = await client.query(
      q.Delete(q.Ref(q.Collection("todos"), reqObj.id))
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
