MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function () {
    $('td .modal-trigger').not('.modal-trigger-applied').leanModal();
    $('td .modal-trigger').addClass('modal-trigger-applied');
});

observer.observe(document.querySelector('#table-body'), {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false
});