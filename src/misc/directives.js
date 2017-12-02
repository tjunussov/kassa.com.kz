import Vue from 'vue'


Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})

Vue.directive('unwrap', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    console.log(
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
    )

    var model = vnode.data.directives.find(function(o) { //Search the vModelName attached to the element
      return o.name === 'model';
    }).expression;

    // el.value = "Chuhna";

    vnode.context[model] = "Chuhan";

    // var el = app.$refs.input
    // var event = new Event('input', {bubbles: true})
    // el.value = 'Test'
    // el.dispatchEvent(event)
  }
})

// Vue.directive('show-label', function (el, binding) {
//   el.innerHTML = el.innerHTML.replace(/%s/g, binding.value)
//   el.style.display = !binding.value ? 'none' : ''
// })