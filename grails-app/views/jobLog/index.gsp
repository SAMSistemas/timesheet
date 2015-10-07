<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <g:set var="entityName" value="${message(code: 'jobLog.label', default: 'JobLog')}"/>
    <title><g:message code="default.list.label" args="[entityName]"/></title>
</head>

<body>

<a href="#list-jobLog" class="skip" tabindex="-1"><g:message code="default.link.skip.label"
                                                             default="Skip to content&hellip;"/></a>

<div class="nav" role="navigation">
    <ul>
        <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
        <li><g:link class="create" action="create"><g:message code="default.new.label"
                                                              args="[entityName]"/></g:link></li>
    </ul>
</div>

<div id="list-jobLog" class="content scaffold-list" role="main">

    <g:if test="${flash.message}">
        <div class="message" role="status">${flash.message}</div>
    </g:if>

    <h1><g:message code="default.list.label" args="[entityName]"/></h1>

    <div id="table" ng-app="sortApp" ng-controller="mainController">

        <search-form ng-model="search.project" ng-placeholder="Search for project"></search-form>

        <search-form ng-model="search.person" ng-placeholder="Search for person"></search-form>

        <search-form ng-model="search.tasktype" ng-placeholder="Search for task type"></search-form>

        <table>

            <thead>
            <tr>
                <th><a href ng-click="reverseOrder(project)">Project Name</a></th>
                <th><a href ng-click="reverseOrder(person)">Person Name</a></th>
                <th><a href ng-click="reverseOrder(tasktype)">Task Type Name</a></th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            <tr ng-repeat="joblog in joblogs | orderBy:sortType:sortReverse | filter:search:startsWith">
                <td>{{ joblog.project }}</td>
                <td>{{ joblog.person }}</td>
                <td>{{ joblog.taskType }}</td>
                <td><a ng-href="/joblog/edit/{{ joblog.id }}">Edit</a></td>
            </tr>
            </tbody>

        </table>

    </div>

</div>

<asset:javascript src="public/joblog.js"/>
</body>
</html>