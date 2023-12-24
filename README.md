# SSR vs. CSR - Next.js + d3

## The problem

There are basically two options when it comes to rendering d3 in a React-App: You either render the svg using React or using d3s builder-pattern API.

Both options are not fully compatible with Server Side Rendering (SSR). In a Next.js-application, the author has to put `"use client"` at the top of every file that contains code for a d3-chart and the user sees a small flash when (re-)loading the page.

Why is that?

When using d3s rendering, the general pattern looks like this:

``` tsx
const Chart = () => {
    const gRef = useRef();

    useEffect(() => {
        d3.select(gRef.current).
            .selectAll("circle")
            .data(data)
            .join("circle")
            // ...
    }, [svgRef])

    return (
        <svg>
            <g ref={gref} />
        </svg>
    )
}
```

The hooks unfortunately remove the ability to render the component on the server.

When using React for rendering, what hinders us to use SSR are axis. Axis in d3 are drawn using `d3.axisBottom / Top / Left / Right`. Unfortunately these functions can only be used during the d3-render-lifecycle, which resurfaces the problem from before:

``` tsx
  const gx = useRef();
  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );

  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
```

...and we're back to using hooks again. The issue can be softened, when we refactor the chart, so that the axis receive their own React-components, which can be client-components. The parent-chart can still remain SSRed.

## A solution

Because the axis are the only reason we have to use CSR when rendering with React, we could reimplement the `d3.axis...`-functions as React-components and use those without hooks. Luckily this has already been done in [tmcw/d3-axis-for-react](https://github.com/tmcw/d3-axis-for-react), which is used by this repository.

## Comparing SSR vs CSR

If you run `pnpm dev` in the project-root and open up `localhost:3000` in the browser, you can compare the two solutions in terms of flashing and transferred JS.

## TODOs

- [ ] Implement responsive scaling
- [ ] Compare CSR-d3-rendering