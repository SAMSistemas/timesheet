<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'jobLog.label', default: 'JobLog')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <a href="#list-jobLog" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
        <div class="nav" role="navigation">
            <ul>
                <li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
                <li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
            </ul>
        </div>
        <div id="list-jobLog" class="content scaffold-list" role="main">
            <g:if test="${flash.message}">
                <div class="message" role="status">${flash.message}</div>
            </g:if>
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>

            <div id="table" ng-app="sortApp" ng-controller="mainController">

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-search"></i></div>
                            <input type="text" class="form-control" placeholder="Search for project" ng-model="search.project">
                        </div>
                    </div>
                </form>

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-search"></i></div>
                            <input type="text" class="form-control" placeholder="Search for person" ng-model="search.person">
                        </div>
                    </div>
                </form>

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon"><i class="fa fa-search"></i></div>
                            <input type="text" class="form-control" placeholder="Search for tasktype" ng-model="search.tasktype">
                        </div>
                    </div>
                </form>

                <table>
                    <thead>
                    <tr>
                        <td>
                            <a href="#" ng-click="sortType = 'project'; sortReverse = !sortReverse">
                                Project
                                <span ng-show="sortType == 'project' && !sortReverse" class="fa fa-caret-down"></span>
                                <span ng-show="sortType == 'project' && sortReverse" class="fa fa-caret-up"></span>
                            </a>
                        </td>
                        <td>
                            <a href="#" ng-click="sortType = 'person'; sortReverse = !sortReverse">
                                Person
                                <span ng-show="sortType == 'person' && !sortReverse" class="fa fa-caret-down"></span>
                                <span ng-show="sortType == 'person' && sortReverse" class="fa fa-caret-up"></span>
                            </a>
                        </td>
                        <td>
                            <a href="#" ng-click="sortType = 'tasktype'; sortReverse = !sortReverse">
                                Tasktype
                                <span ng-show="sortType == 'tasktype' && !sortReverse" class="fa fa-caret-down"></span>
                                <span ng-show="sortType == 'tasktype' && sortReverse" class="fa fa-caret-up"></span>
                            </a>
                        </td>
                        <td></td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr ng-repeat="joblog in joblogs | orderBy:sortType:sortReverse | filter:search:startsWith">
                        <td>{{ joblog.project }}</td>
                        <td>{{ joblog.person }}</td>
                        <td>{{ joblog.taskType }}</td>
                        <td><a ng-href="/joblog/edit/{{ joblog.id }}">Edit</a></td>
                    </tbody>

                </table>
            </div>
        </div>

    <asset:javascript src="joblog.js"/>
    </body>
</html>