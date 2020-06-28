# shortyURL

URL shortener built with Express JS, MongoDB, and Bootstrap. 

Nano ID was utilized to generate unique, truncated URL's. 

# API Documentaiton

<code>POST /short</code><br>
Accepts JSON payload with a <code>url</code> parameter set to whatever URL you wish to truncate.<br><br>
<b>Returns</b>
| Status code | Interpretation | Result |
| :--: | :--: | :--: |
| 422 | Invalid URL | JSON object with a list of errors indexed by <code>errors</code> key
| 200 | URL already created | JSON object with shortened URL indexed by <code>truncated</code> key
| 201 | URL created | JSON object with shortened URL indexed by <code>truncated</code> key

<code>GET stats/:id </code><br>
<code>id</code> paramater corresponds to the alias created by the <code>POST /short</code> endpoint.<br><br>
<b>Returns</b>
| Status code | Interpretation | Result |
| :--: | :--: | :-- |
| 200 | OK |  JSON populated view with the following information: <b>original URL, new URL, total redirect count, and date of URL registration.</b> |
| 404 | URL not found | 404 error view displayed

<code>GET /:id</code><br>
<code>id</code> paramater corresponds to the alias created by the <code>POST /short</code> endpoint.<br><br>
<b>Returns</b>
| Status code | Interpretation | Result |
| :--: | :--: | :-- |
| 302 | URL redirect success |  Redirection to original URL |
| 404 | URL not found | 404 error view displayed
