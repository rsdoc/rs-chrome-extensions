/**
 * background : {
 *  "scripts": ["filename"],
 *  "persistent": false // false means event page and true -> background page
 * }
 */
var contextMenuItem = {
  id: 'spendMoney',
  title: 'SpendMoney',
  contexts: ['selection'],
};

// utility function to check is Int
function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

// adding above object to context menus
chrome.contextMenus.create(contextMenuItem);

// add event listener for click on selection data
chrome.contextMenus.onClicked.addListener(function (clickedData) {
  if (clickedData.menuItemId == 'spendMoney' && clickedData.selectionText) {
    if (isInt(clickedData.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], function (budget) {
        var newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }

        newTotal += parseInt(clickedData.selectionText);

        chrome.storage.sync.set({ total: newTotal }, function () {
          if (newTotal >= budget.limit) {
            var notificationsOptionObj = {
              type: 'basic',
              iconUrl: 'icon48.png',
              title: 'Limit reached 😏',
              message: `Looks like you have reached your limit`,
            };

            chrome.notifications.create(
              'limitNotifyEvennt',
              notificationsOptionObj
            );
          }
        });
      });
    }
  }
});

// adding badges to icon
chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
