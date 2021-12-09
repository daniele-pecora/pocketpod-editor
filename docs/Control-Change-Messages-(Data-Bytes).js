// <!-- CREATE SOURCES LINK -->

var h2 = document.createElement('h2')
var a1 = document.createElement('a')
a1.href = 'https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2'
a1.target = '_blank'
a1.appendChild(document.createTextNode('Taken from https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2'))
h2.appendChild(a1)
var h3 = document.createElement('h3')
h3.appendChild(document.createTextNode('Check developer console to grab the JSON representation of this table'))
h3.style.color = 'red'

document.body.prepend(document.createElement('hr'))
document.body.prepend(h3)
document.body.prepend(h2)

document.body.scrollTop = document.documentElement.scrollTop = 0;

// <!-- CREATE JSON REPRESENTATION -->

var all = document.querySelector('table:nth-of-type(1)').querySelectorAll('tr:not(:nth-of-type(1)):not(:nth-of-type(2)):not(:nth-of-type(3))')
var els = []
for (var i = 0; i < all.length; i++) { els.push(all[i]) }
var items = []
var _temp = els.map(item => {
  var o = {}
  // o.rawTR = item
  var tdCC = item.querySelector('td:nth-of-type(1)')
  if (tdCC) {
    try { o.cc = Number.parseInt(tdCC.innerHTML) } catch (e) { console.error('Error parsing for CC: ', tdCC, e) }
  }
  if (o.cc || o.cc === 0) {
    var tdDesc = item.querySelector('td:nth-of-type(4)')
    if (tdDesc) {
      var desc = item.querySelector('td:nth-of-type(4)').innerHTML
        .replace(new RegExp('<br(/)?>', 'ig'), '\n')
        .replace(new RegExp('<(/)?strong(/)?>', 'ig'), '')
        .replace(new RegExp('&nbsp;', 'ig'), ' ')
        .replace(new RegExp('[ ]+','ig'),' ')
      o.desc = desc
    }
    items.push(o)
  }
})
console.log(items)
console.log('#######  MIDI CC TABLE #######')
console.log(JSON.stringify(items,null,2))