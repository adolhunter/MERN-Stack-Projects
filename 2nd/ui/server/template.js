import serialize from 'serialize-javascript';

export default function template(body, data) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table.table-hover tr {cursor: pointer;}
        #filter-toggle {cursor: pointer;}
    </style>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/9daef59a2e.js" crossorigin="anonymous"></script>
    <title>My MERN Project</title>
</head>

<body>
  <!-- Page generated from template. -->
  <div id="contents">${body}</div>
  <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
  <script src="/env.js"></script>
  <script src="/vendor.bundle.js"></script>
  <script src="/app.bundle.js"></script>
</body>

</html>`;
}
