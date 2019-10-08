var xhr = new XMLHttpRequest()
xhr.open("GET",'http://eloquentjavascript.net/author')
xhr.send()
if (xhr.getResponseHeader('content-type') == "text/plain"){
  console.log("text/plain")
}
if (xhr.getResponseHeader('content-type') == "text/html"){
  console.log("text/html")
}
if (xhr.getResponseHeader('content-type') == "application/json"){
  console.log("application/json")
}
var xhr = new XMLHttpRequest()

 xhr.open('GET','http://eloquentjavascript.net/author')

 xhr.setRequestHeader("Accept","text/html")

 xhr.send()