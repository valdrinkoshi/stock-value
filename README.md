<!--[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/valdrinkoshi/stock-value)-->

# stock-value
Web Component to display stock value.

## Installation
```
bower install --save stock-value
```

## Usage
Drop `stock-value` in, provide the `current` and `previous` values, and see if your stock is ⬆ or ⬇.

## Demo
<!--
```
<custom-element-demo height="300">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="stock-value.html">
    <custom-style><style>
     stock-value.portfolio {
        --stock-value-up-symbol: '🤑';
        --stock-value-up-color: olivedrab;
        --stock-value-down-symbol: '😨';
        --stock-value-down-color: orangered;
        --stock-value-neutral-symbol: '😶';
        --stock-value-neutral-color: dimgrey;
     }
    </style></custom-style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
Oil $48.68 <stock-value current="48.68" previous="48.68"></stock-value> <br>
Euro $1.07 <stock-value current="1.081421" previous="1.085135"></stock-value> <br>
Gold $1,213.90 <stock-value current="1213.90123" previous="1211.781"></stock-value> <br>
My portfolio total gain/loss: <stock-value class="portfolio" suffix-symbol current="120.12" previous="1.35" only="difference"></stock-value> <br>
Today vs yesterday: <stock-value class="portfolio" suffix-symbol current="120.12" previous="120.12" only="percent"></stock-value> <br>
Today vs 1 week ago: <stock-value class="portfolio" suffix-symbol current="120.12" previous="120.01" only="percent"></stock-value>
```

[Full demo](https://www.webcomponents.org/element/valdrinkoshi/stock-value/demo/demo/index.html)

[APIs](https://www.webcomponents.org/element/valdrinkoshi/stock-value/stock-value)

## Contributing

1. Fork it on Github.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT](https://opensource.org/licenses/MIT)
