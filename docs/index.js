function status (text) {
  if (text) {
    document.getElementById('status').textContent = text
  }
}

function post(url, data, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true /* async */)
  xhr.setRequestHeader('X-Requested-With', 'shazron');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onreadystatechange = function () {
    console.log('readyState', this.readyState)
    console.log('responseText', this.responseText)
    if (this.readyState == 4 /* DONE */) {
      callback && callback(this.responseText)
    }
  }
  xhr.send(data)
}

setTimeout(function(){
  var url = 'http://localhost:8000/'
  console.log('Contacting ' + url)
  post(url, "this is some data", status)
  setTimeout(function(){
    document.getElementById('fallback').style = 'display:block'
  }, 2000)
}, 500)

function doGet() {
  var url = 'http://localhost:8000/get-test?foo=bar'
  console.log('Contacting via get: ' + url)
  window.location = url
}