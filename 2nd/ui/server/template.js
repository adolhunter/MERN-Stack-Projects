export default function template(body) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table.table-hover tr {cursor: pointer;}
    </style>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <script src="https://kit.fontawesome.com/9daef59a2e.js" crossorigin="anonymous"></script>
    <title>My MERN Project</title>
</head>

<body>
    <!-- Page generated from template. -->
    <div id="contents">${body}</div>
</body>

</html>`;
}
