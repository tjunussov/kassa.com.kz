import Vue from 'vue'
import numeral from 'numeral'
import moment from 'moment'

// import tjson from 'E:\\Dev\\GitHub\\tjson2html'


moment.locale('ru');

numeral.register('locale', 'ru', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '₸'
    }
});

// switch between locales
numeral.locale('ru');

Vue.filter('mdate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY')
  }
});
Vue.filter('date', function(value) {
  if(!value) return ""
  return value.toLocaleString('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).initCap();
});

Vue.filter('ndate', function(value) {
  if(!value) return ""
  return value.toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).initCap();
});

Vue.filter('strndate', function(value) {
  if(!value) return ""
  return new Date(value).toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).initCap();
});

Vue.filter('time', function(value) {
  if(!value) return ""
  return value.toLocaleString('ru', {
    hour:'numeric',
    minute:'numeric'
  });
});
Vue.filter('strtime', function(value) {
  if(!value) return ""
  return new Date(value).toLocaleString('ru', {
    hour:'numeric',
    minute:'numeric'
  });
});
Vue.filter('datetime', function(value) {
  if(!value) return ""
  return value.toLocaleString('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour:'numeric',
    minute:'numeric'
  });
});
Vue.filter('mdatetime', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY hh:mm')
  }
});

Vue.filter('name', function(value) {
  if (value) {
    return value.split(" ")[0]
  }
});
Vue.filter('tel', function(value) {
  if (value) {
    return value
  }
});

Vue.filter('shortFio', function(value) {
  if (value && value.length) {
    var matches = value.split(" ").map((a,i)=>{
      if(i == 0) return a
      else if(i == 1) return a.substring(0,1)+'.'
    })
    return (matches.length == 1 ? value.substring(0,2) : matches.join(' '))
  }
});
Vue.filter('codify', function(value) {
  if (value) {
    var matches = value.split(" ").map((a)=>{
      return a.substring(0,1)
    })
    return (matches.length == 1 ? value.substring(0,2) : matches.join('')).toUpperCase()
  }
});



Vue.filter('amount', function (value) {
  return Number(value) / 100
})
Vue.filter('number', function (value) {
  return Number(isNaN(value) ? 0 : value)
})
Vue.filter('money', function (value) {
  return numeral(value).format('0,0')
})
Vue.filter('moneyz', function (value,param) {
  return numeral(value).format('0,0.00 $')
})
Vue.filter('numeral', function (value, fmt) {
  return numeral(value).format(fmt)
})



const PAD_WIDTH_CHARS = 37;

Vue.filter('rpad', function (value,r,width=PAD_WIDTH_CHARS) {
  return (String(value).padEnd(width-String(r).length) + r).substring(0,width)
})
Vue.filter('cols', function (value,r,col1=20,col2=17) {
  return String(r).padStart(col1).substring(0,col1) + String(value).padStart(col2).substring(0,col2)
})
Vue.filter('lpad', function (value,r,width=PAD_WIDTH_CHARS) {
  return (String(r).padEnd(width-String(value).length) + value).substring(0,width)
})

Vue.filter('pad', function (value,width=PAD_WIDTH_CHARS) {
  return String(value).padEnd(width).substring(0,width)
})

Vue.filter('padcenter', function (value,width=PAD_WIDTH_CHARS) {
  var strLen = String(value).length
  var len = width - strLen
  if(len > 0 ) len = Math.floor(len / 2) + strLen

  return String(value).padStart(len).padEnd(width).substring(0,width)
})




// Vue.filter('json2html', function (value, fmt) {
//   return tjson(value, fmt)
// })

Vue.filter('decode', function (key) {
  var args = Array.prototype.slice.call(arguments)
  var iv
  var inv
  for (var i = 1, ii = args.length; i < ii; i += 2) {
    iv = args[i]
    inv = (i + 1 in args) && args[i + 1]
    if (key === iv && inv !== undefined) {
      iv = inv
      break
    } else if ((i + 1) !== ii) {
      iv = key
    }
  }
  return typeof iv === 'function' ? iv(key) : iv
})