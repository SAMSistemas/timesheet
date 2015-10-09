<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'client.label', default: 'Client')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>

    <style>
    .card-title {
        color: #009688 !important;
        font-size: 180%  !important;
    }
    .transparent-green {
        background-color: transparent;
        color: #009688;
        padding-right: 10px;
        padding-left: 5px;
    }

    .transparent-green:hover  {
        color: white;
    }
    #edit-icon {
        margin-right: 5px;
    }

    </style>

</head>

<body>

<a href="#list-client" class="skip" tabindex="-1"><g:message code="default.link.skip.label"
                                                             default="Skip to content&hellip;"/></a>

<div class="nav" role="navigation">
    <ul>
        <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
        <li><g:link class="create" action="create"><g:message code="default.new.label"
                                                              args="[entityName]"/></g:link></li>
    </ul>
</div>

<div id="list-client" class="content scaffold-list" role="main">

    <g:if test="${flash.message}">
        <div class="message" role="status">${flash.message}</div>
    </g:if>

    %{--<h1><g:message code="default.list.label" args="[entityName]"/></h1>--}%

    <h3 class="card-title">Lista de Clientes</h3>


    <div id="table" ng-app="sortApp" ng-controller="mainController">

        <search-form ng-model="search.name" ng-placeholder="Search for name"></search-form>

        <search-form ng-model="search.short_name" ng-placeholder="Search for short name"></search-form>

        <table class="responsive-table striped centered">

            <thead>
            <tr>
                <th></th>
                <th><a href ng-click="reverseOrder(name)">Nombre del cliente</a></th>
                <th><a href ng-click="reverseOrder(short_name)">Sigla del cliente</a></th>
                <th><a href ng-click="reverseOrder(enabled)">Habilitado</a></th>
                <th></th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            <tr ng-repeat="client in clients | orderBy:sortType:sortReverse | filter:search:startsWith">
                <td><i class="material-icons center">business</i></td>
                <td>{{ client.name }}</td>
                <td>{{ client.short_name }}</td>
                <td>{{ client.enabled }}</td>
                <td><a ng-href="/client/edit/{{ client.id }}" class="waves-effect waves-light btn transparent-green z-depth-0 modal-trigger"><i id="edit-icon" class="material-icons left">mode_edit</i>Editar</a></td>
                <td><a href ng-click="disable(client)" ng-show="client.enabled">Disable</a>
                    <a href ng-click="able(client)" ng-hide="client.enabled">Able</a></td>
            </tr>
            </tbody>

        </table>

    </div>

</div>

<asset:javascript src="public/client.js"/>

</body>
</html>