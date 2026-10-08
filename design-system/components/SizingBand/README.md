# SizingBand

The one full-yellow section on a page (`.lm-ground-sun`), with three scenario chips that pre-load the sizing tool. The PRD calls this band "the conversion spine of the page".

Inside `.lm-ground-sun` the primary button inverts to black with a yellow label, and chips are black outlines that fill black when pressed. The consumer provides the three chips as links to `/products/which-powerbox-do-i-need?scenario=…` (or buttons with `aria-pressed` inside the tool).

Use once per page. On mobile, a slim version reappears as a sticky bar after the user scrolls past the "Who it's for" section.
