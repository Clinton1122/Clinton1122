# PriceTable

The comparison table: homepage range, products hub, price page, compare page. Buyers compare prices, so it stays a table at every width; never cards.

- Header row: `surface-inverse` with `sun` labels in `label` style, sticky on vertical scroll.
- First column: `.lm-sticky-col`, frozen while the table scrolls sideways inside `.lm-table-wrap`. The page body never scrolls sideways.
- Price columns: `.lm-price-col` tints the cells `sun-soft`; prices use `.lm-num` (display face, tabular figures, heavier than body, never grey).
- Spec cells use `.lm-spec` (mono).
- Under the table: the "Prices last updated" line (generated from the price data, never typed by hand) and the exclusions note. On mobile a "Swipe to see prices →" hint shows.

The consumer provides rows from the single price source; each model name links to its product page.
