<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'person.label', default: 'Person')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>

<body>

<a href="#list-person" class="skip" tabindex="-1"><g:message code="default.link.skip.label"
                                                             default="Skip to content&hellip;"/></a>

<div class="nav" role="navigation">
    <ul>
        <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
        <li><g:link class="create" action="create"><g:message code="default.new.label"
                                                              args="[entityName]"/></g:link></li>
    </ul>
</div>

<div id="list-person" class="content scaffold-list" role="main">

    <g:if test="${flash.message}">
        <div class="message" role="status">${flash.message}</div>
    </g:if>

    <h1><g:message code="default.list.label" args="[entityName]"/></h1>

    <div id="table" ng-app="sortApp" ng-controller="mainController">

        <search-form ng-model="search.name" ng-placeholder="Search for name"></search-form>

        <search-form ng-model="search.lastname" ng-placeholder="Search for lastname"></search-form>

        <search-form ng-model="search.username" ng-placeholder="Search for username"></search-form>

        <table>

            <thead>
            <tr>
                <th><a href ng-click="reverseOrder(name)">Client Name</a></th>
                <th><a href ng-click="reverseOrder(lastname)">Last Name</a></th>
                <th><a href ng-click="reverseOrder(username)">User Name</a></th>
                <th><a href ng-click="reverseOrder(enabled)">Enabled</a></th>
                <th></th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            <tr ng-repeat="person in people | orderBy:sortType:sortReverse | filter:search:startsWith">
                <td>{{ person.name }}</td>
                <td>{{ person.lastname }}</td>
                <td>{{ person.username }}</td>
                <td>{{ person.enabled }}</td>
                <td><a ng-href="/person/edit/{{ person.id }}">Edit</a></td>
                <td><a href ng-click="disable(person)" ng-show="person.enabled">Disable</a>
                    <a href ng-click="able(person)" ng-hide="person.enabled">Able</a></td>
            </tr>
            </tbody>

        </table>

    </div>

</div>

<asset:javascript src="public/person.js"/>
</body>
</html>