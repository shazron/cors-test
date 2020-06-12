function status (text) {
  document.getElementById('status').textContent = text
}

function post(url, data, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true /* async */)
  xhr.setRequestHeader('X-Requested-With', 'aio-cli-login');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 /* DONE */) {
      callback && callback(this.responseText)
    }
  }
  xhr.send(data)
}

setTimeout(function(){
  post("127.0.0.1:8000", "this is some data", status)
}, 500)