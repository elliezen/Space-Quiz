export default [{
  answers: ['number', 'NaN', 'object', 'boolean', 'undefined'],
  correct: 'number',
  question: 'typeof NaN'
}, {
  answers: ['Oracle', 'W3C', 'MIT', 'Nombas', 'Netscape'],
  correct: 'Oracle',
  question: 'the owner of "JavaScript" trademark'
}, {
  answers: ['hello', 'Error', 'undefined'],
  correct: 'hello',
  question: '(function() { console.log("hello"); })();'
}, {
  answers: ['duck', 'camel', 'eagle', 'owl', 'wolf'],
  correct: 'duck',
  question: 'JS typing discipline'
}, {
  answers: ['Django', 'Ember', 'Polymer', 'Vue', 'Backbone'],
  correct: 'Django',
  question: 'not JS framework is'
}, {
  answers: ['string', 'null', 'NaN', 'object', 'undefined'],
  correct: 'string',
  question: 'typeof "null"'
}, {
  answers: ['3', '2', '0', '4', 'null'],
  correct: '3',
  question: 'null || 2 && 3 || 4'
}, {
  answers: ['1995', '1990', '1992', '2001', '1985'],
  correct: '1995',
  question: 'the year JS first appeared'
}, {
  answers: ['NaN', 'null', 'undefined', 'boolean', 'symbol'],
  correct: 'NaN',
  question: 'not JS type is'
}, {
  answers: ['123', '0', '1', '12.3', '1.23'],
  correct: '123',
  question: '~~123'
}, {
  answers: ['null', 'undefined', '8', '42', '||'],
  correct: '8',
  question: 'null || undefined || 8 || 42'
}, {
  answers: ['-1', '0', '2', 'true', 'false'],
  correct: 'true',
  question: 'if (-1 || 0 || 2)'
}, {
  answers: ['"34"', '7', '"3"4', '"034"'],
  correct: '"34"',
  question: '"" + 3 + 4'
}, {
  answers: ['1', 'NaN', 'true', 'false', '"truefalse"'],
  correct: '1',
  question: 'true + false'
}, {
  answers: ['32', '"32"', '"84"', '"8*4"'],
  correct: '32',
  question: '"8" * "4"'
}, {
  answers: ['null', 'NaN', '1', 'undefined', 'undefined1'],
  correct: 'NaN',
  question: 'undefined + 1'
}, {
  answers: ['-1', '0', '2', 'true', 'false'],
  correct: 'false',
  question: 'NaN == NaN'
}, {
  answers: ['"comment', '<!--comment-->', '//comment'],
  correct: '//comment',
  question: 'Add one line comment in JS'
}, {
  answers: ['<body>', '<head>', 'both <body> and <head>'],
  correct: 'both <body> and <head>',
  question: 'the correct place to insert JS'
}, {
  answers: ['<script>', '<javascript>', '<js>', '<scripting>'],
  correct: '<script>',
  question: 'HTML element we put JS inside'
}, {
  answers: ['0', '1', 'Error', '2', '"1"'],
  correct: '1',
  question: '{"1": 0, 1: 1, 0: 2}["1"];'
}, {
  answers: ['0', '1', '2', 'undefined', 'NaN'],
  correct: '2',
  question: 'null + {0: 1}[0] + [,[1],][1][0];'
}, {
  answers: ['0.999999999', '1', '0.5', '8', '4'],
  correct: '8',
  question: '(1,5 - 1) * 2'
}, {
  answers: ['"0null"', '0', 'NaN', 'null', '"null"'],
  correct: '"0null"',
  question: '[] + 0 + null'
}, {
  answers: ['0', 'NaN', '00:00:00'],
  correct: '0',
  question: 'new Date(0) - 0'
}, {
  answers: ['"undefined"', '"0"', '0', 'undefined', 'NaN'],
  correct: '"undefined"',
  question: 'new Array(1)[0] + ""'
}, {
  answers: ['undefined', 'NaN', '0', 'null'],
  correct: 'undefined',
  question: '({})[0]'
}, {
  answers: ['"1,23,4"', '[4,6]', 'NaN', '"1,2,3,4"', '6'],
  correct: '"1,23,4"',
  question: '[1,2] + [3,4]'
}];
