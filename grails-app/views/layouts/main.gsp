<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><g:layoutTitle default="Grails"/></title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <asset:stylesheet src="application.css"/>
    <asset:javascript src="application.js"/>

    <g:layoutHead/>

</head>

<body ng-app="myApp">

<header>

    <nav class="fixed blue darken-3">
        <div class="container">
            <div class="nav-wrapper">
                <a class="brand-logo">Timesheet</a>
                <ul id="nav-botton-ul" class="right hide-on-med-and-down">
                    <li id="nav-botton-li"><a href="#" class="waves-effect waves-light btn">Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container">
        <a href="#" data-activates="side-nav" class="button-collapse top-nav hide-on-large-only"><i
                class="mdi-navigation-menu"></i></a>
    </div>


    <ul id="side-nav" class="side-nav fixed">
        <li class="user-panel li-no-hover">
            <div class="user-info">
                <div class="row user-picture-padding">
                    <img class="responsive-img left" src="/assets/account_circle.png" height="75px" width="75px">
                </div>

                <div class="row user-data-padding">
                    <span class="white-text truncate">Leandro Alessandrello</span>
                    <span class="white-text truncate">leandro.alessandrello@samsistemas.com.ar</span>
                </div>
            </div>
        </li>
        <li><a href="/person" class="waves-effect waves-teal btn-flat"><i class="material-icons left">people</i>Personal
        </a>
        </li>
        <li><a href="/client" class="waves-effect waves-teal btn-flat"><i
                class="material-icons left">business</i>Clientes
        </a>
        </li>
        <li><a href="/project" class="waves-effect waves-teal btn-flat"><i class="material-icons left">work</i>Proyectos
        </a>
        </li>
        <li><a href="/taskType" class="waves-effect waves-teal btn-flat"><i
                class="material-icons left">assignment</i>Tipo de Tarea
        </a></li>
        <li><a href="/jobLog/asignation" class="waves-effect waves-teal btn-flat"><i class="material-icons left">today</i>Asignar</a>
        </li>
    </ul>

</header>

<section>
    <div class="container">
        <div class="card z-depth-2">
            <div class="card-content card-content-padding"><g:layoutBody/></div>
        </div>
    </div>
</section>

<script>
    $(".button-collapse").sideNav();
</script>

</body>
</html>
