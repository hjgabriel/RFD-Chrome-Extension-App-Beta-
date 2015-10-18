// Saves options data to chrome.storage
function save_options() {
  var time = document.getElementById('time').value;
  var desktop = document.getElementById('desktop').checked;
  chrome.storage.sync.set({
    TimeRefresh: time,
    DeskNotify: desktop
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores options data from chrome storage
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    TimeRefresh: '1',
    DeskNotify: true
  }, function(items) {
    document.getElementById('time').value = items.TimeRefresh;
    document.getElementById('desktop').checked = items.DeskNotify;
  });
}
//Required for options.html
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);