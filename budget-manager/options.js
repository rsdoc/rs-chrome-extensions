$(function () {
  chrome.storage.sync.get('limit', function (budget) {
    $('#limit').val(budget.limit);
  });

  $('#saveLimit').click(function () {
    var limit = $('#limit').val();

    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function () {
        close();
      });
    }
  });

  $('#resetTotal').click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      // added callback function to notify user when value is set to zero
      chrome.notifications.create('resetNotify', {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Total Reset',
        message: 'Total value is reset to zero',
      });
    });
    // close();
  });
});
