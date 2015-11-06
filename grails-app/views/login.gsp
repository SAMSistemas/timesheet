<%--
  Created by IntelliJ IDEA.
  User: jonisaa
  Date: 06/11/15
  Time: 09:08
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
</head>

<body>
    <p>Login</p>
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" name="submit" value="Entrar" />
    </form>
</body>
</html>