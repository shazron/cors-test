function success (text) {
  if (text) {
    document.getElementById('status').textContent = text
  }
}

function failure (err) {
  if (err) {
    console.log(err)
  }
  success('An error occurred.')
  document.getElementById('fallback').style = 'display:block'
}


function post(url, data, success, failure) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true /* async */)
  xhr.setRequestHeader('X-Requested-With', 'shazron');
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 /* DONE */) {
      success && success(this.responseText)
    }
  }
  xhr.onerror = failure
  xhr.send(data)
}

setTimeout(function(){
  var url = 'http://localhost:8000/'
  console.log('Contacting ' + url)
  post(url, "this is some data", success, failure)
}, 500)

function doGet() {
  var url = 'http://localhost:8000/get-test?foo=bar'
  console.log('Contacting via GET: ' + url)
  window.location = url
}